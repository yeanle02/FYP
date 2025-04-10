
//app/api/matches/route.js
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// Debug  function
const debugLog = (stage, data, isError = false) => {
  const prefix = isError ? "🚨 ERROR" : "🔍 DEBUG";
  console.log(`${prefix} ${stage}:`, data);
  return data; 
};


async function getTeamMembers(teamName) {
  debugLog("getTeamMembers", `Starting query for team: ${teamName}`);
  try {

    const connection = await connectToDatabase();

    const { client, db } = await connectToDatabase();
    debugLog("getTeamMembers", "MongoDB connection established");
    
    const playersCollection = db.collection('team_player');
    const query = { Team: teamName };
    debugLog("getTeamMembers", `Executing query: ${JSON.stringify(query)}`);
    
    const players = await playersCollection.find(query).toArray();
    debugLog("getTeamMembers", `Found ${players.length} players for team: ${teamName}`);
    return players;
  } catch (error) {
    return debugLog("getTeamMembers", error, true);
  }
}

async function getHistoricalMatches(teamName) {
  debugLog("getHistoricalMatches", `Starting query for team: ${teamName}`);
  try {
    const { client, db } = await connectToDatabase();
    debugLog("getHistoricalMatches", "MongoDB connection established");
    
    const matchesCollection = db.collection("match");
    const query = { $or: [{ team1: teamName }, { team2: teamName }] };
    debugLog("getHistoricalMatches", `Executing query: ${JSON.stringify(query)}`);
    
    const matches = await matchesCollection.find(query).toArray();
    debugLog("getHistoricalMatches", `Found ${matches.length} matches for team: ${teamName}`);
    return matches;
  } catch (error) {
    return debugLog("getHistoricalMatches", error, true);
  }
}


async function getTeamStatus(team1, team2) {
  debugLog("getTeamStatus", `Starting query for teams: ${team1} vs ${team2}`);
  try {
    const { client, db } = await connectToDatabase();
    debugLog("getTeamStatus", "MongoDB connection established");
    
    const statusCollection = db.collection("team_status");
    
    debugLog("getTeamStatus", `Looking up team1: ${team1}`);
    const team1Status = await statusCollection.findOne({ Team: team1 });
    debugLog("getTeamStatus", team1Status ? `Found team1 status` : `Team1 status not found!`);
    
    debugLog("getTeamStatus", `Looking up team2: ${team2}`);
    const team2Status = await statusCollection.findOne({ Team: team2 });
    debugLog("getTeamStatus", team2Status ? `Found team2 status` : `Team2 status not found!`);

    if (!team1Status || !team2Status) {
      throw new Error(`One or both teams not found: ${!team1Status ? team1 : ''} ${!team2Status ? team2 : ''}`);
    }

    return { team1Status, team2Status };
  } catch (error) {
    return debugLog("getTeamStatus", error, true);
  }
}

// GET handler
export async function GET(request) {
  const startTime = Date.now();
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  debugLog("API", `Request received: GET ${url.pathname}`);
  debugLog("API", `Query params: ${JSON.stringify(Object.fromEntries(searchParams))}`);
  
  const action = searchParams.get('action');
  const teamName = searchParams.get('teamName');
  const team1 = searchParams.get('team1');
  const team2 = searchParams.get('team2');

  try {
    let result;
    
    if (action === "get_team_member" && teamName) {
      debugLog("API", `Processing get_team_member for ${teamName}`);
      result = await getTeamMembers(teamName);
      debugLog("API", `Completed get_team_member in ${Date.now() - startTime}ms`);
      return NextResponse.json(result);
    }

    if (action === "get_historical_match" && teamName) {
      debugLog("API", `Processing get_historical_match for ${teamName}`);
      result = await getHistoricalMatches(teamName);
      debugLog("API", `Completed get_historical_match in ${Date.now() - startTime}ms`);
      return NextResponse.json(result);
    }

    if (action === "get_team_status" && team1 && team2) {
      debugLog("API", `Processing get_team_status for ${team1} vs ${team2}`);
      result = await getTeamStatus(team1, team2);
      debugLog("API", `Completed get_team_status in ${Date.now() - startTime}ms`);
      return NextResponse.json(result);
    }

    debugLog("API", "Invalid request or missing parameters", true);
    return NextResponse.json({ error: "Invalid request or missing parameters" }, { status: 400 });
  } catch (error) {
    debugLog("API", `Error: ${error.message}`, true);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}