// app/api/matches/route.js
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// Debug function
const debugLog = (stage, data, isError = false) => {
  const prefix = isError ? "🚨 ERROR" : "🔍 DEBUG";
  console.log(`${prefix} ${stage}:`, data);
  return data;
};

async function getTeamMembers(teamName) {
  debugLog("getTeamMembers", `Starting query for team: ${teamName}`);
  try {
    const { db } = await connectToDatabase();
    debugLog("getTeamMembers", "MongoDB connection established");

    const players = await db
      .collection('team_player')
      .find({ Team: teamName })
      .toArray();

    debugLog("getTeamMembers", `Found ${players.length} players`);
    return players;
  } catch (error) {
    return debugLog("getTeamMembers", error, true);
  }
}

async function getHistoricalMatches(teamName) {
  debugLog("getHistoricalMatches", `Starting query for team: ${teamName}`);
  try {
    const { db } = await connectToDatabase();
    debugLog("getHistoricalMatches", "MongoDB connection established");

    const matches = await db
      .collection('match')
      .find({ $or: [{ team1: teamName }, { team2: teamName }] })
      .toArray();

    debugLog("getHistoricalMatches", `Found ${matches.length} matches`);
    return matches;
  } catch (error) {
    return debugLog("getHistoricalMatches", error, true);
  }
}

async function getTeamStatus(team1, team2) {
  debugLog("getTeamStatus", `Starting query for teams: ${team1} vs ${team2}`);
  try {
    const { db } = await connectToDatabase();
    debugLog("getTeamStatus", "MongoDB connection established");

    const col = db.collection("team_status");
    const team1Status = await col.findOne({ Team: team1 });
    const team2Status = await col.findOne({ Team: team2 });

    if (!team1Status || !team2Status) {
      throw new Error(
        `One or both teams not found: ${!team1Status ? team1 : ''} ${!team2Status ? team2 : ''}`
      );
    }

    debugLog("getTeamStatus", `Found statuses for both teams`);
    return { team1Status, team2Status };
  } catch (error) {
    return debugLog("getTeamStatus", error, true);
  }
}

async function getCaptainCoach(teamName) {
  debugLog("getCaptainCoach", `Starting query for team: ${teamName}`);
  try {
    const { db } = await connectToDatabase();
    debugLog("getCaptainCoach", "MongoDB connection established");

    const doc = await db
      .collection("team_status")
      .findOne(
        { Team: teamName },
        { projection: { _id: 0, Captain: 1, Coach: 1 } }
      );

    if (!doc) {
      throw new Error(`Team not found: ${teamName}`);
    }

    debugLog("getCaptainCoach", `Found Captain & Coach`);
    return doc;
  } catch (error) {
    return debugLog("getCaptainCoach", error, true);
  }
}

async function getLeaderBoard() {
  debugLog("getLeaderBoard", "Starting leaderboard query");
  try {
    const { db } = await connectToDatabase();
    debugLog("getLeaderBoard", "MongoDB connection established");

    const docs = await db.collection("team_status").find({}).toArray();
    debugLog("getLeaderBoard", `Found ${docs.length} teams`);

    // remap each record:
    return docs.map(
      ({ Team, points, wins, losses, rank }) => ({
        name: Team,
        historyPoints: points ,
        wins,
        losses,
        rank,
      })
    );
  } catch (error) {
    return debugLog("getLeaderBoard", error, true);
  }
}

async function getTeamRanking() {
  debugLog("getTeamRanking", "Starting query for team rankings");
  try {
    const { db } = await connectToDatabase();
    debugLog("getTeamRanking", "MongoDB connection established");

    
    const docs = await db
      .collection("team_status")
      .find({})
      .toArray();
    debugLog("getTeamRanking", `Found ${docs.length} ranking records`);

    
    return docs.map(doc => ({
      name: doc.Team,  
      K: doc.K,            
      G: doc.G,           
      FF: doc.FF,          
      FA: doc.FA,          
      CL: doc.CL,          
      CG: doc.CG           
    }));
  } catch (error) {
    return debugLog("getTeamRanking", error, true);
  }
}

export async function getTeamPoint(team1, team2) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("history_match");

    // Fetch all records where team_name is either team1 or team2
    const matches = await collection
      .find({ team_name: { $in: [team1, team2] } })
      .sort({ round: 1 }) // Optional: sorts by round
      .toArray();

    const roundsData = {};

    matches.forEach(match => {
      const { round, team_name, score } = match;

      if (!roundsData[round]) {
        roundsData[round] = {};
      }

      roundsData[round][team_name] = score;
    });

    return {
      success: true,
      data: roundsData
    };

  } catch (error) {
    console.error('Error fetching team points:', error);
    return {
      success: false,
      error: 'Failed to fetch team points'
    };
  }
}


// GET handler
export async function GET(request) {
  const startTime = Date.now();
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  debugLog("API", `Request received: GET ${url.pathname}`);
  debugLog("API", `Query params: ${JSON.stringify(params)}`);

  const action = url.searchParams.get("action");
  const teamName = url.searchParams.get("teamName");
  const team1 = url.searchParams.get("team1");
  const team2 = url.searchParams.get("team2");

  try {
    let result;

    if (action === "get_team_member" && teamName) {
      debugLog("API", `Processing get_team_member for ${teamName}`);
      result = await getTeamMembers(teamName);

    } else if (action === "get_historical_match" && teamName) {
      debugLog("API", `Processing get_historical_match for ${teamName}`);
      result = await getHistoricalMatches(teamName);

    } else if (action === "get_team_status" && team1 && team2) {
      debugLog("API", `Processing get_team_status for ${team1} vs ${team2}`);
      result = await getTeamStatus(team1, team2);

    } else if (action === "get_captain_coach" && teamName) {
      debugLog("API", `Processing get_captain_coach for ${teamName}`);
      result = await getCaptainCoach(teamName);

    } else if (action === "get_leader_board") {
      debugLog("API", `Processing get_leader_board`);
      result = await getLeaderBoard();

    } else if (action === "get_team_ranking") {
      debugLog("API", `Processing get_team_ranking`);
      result = await getTeamRanking();

    } else if (action === "get_team_points" && team1 && team2) {
      debugLog("API", `Processing get_team_points for ${team1} vs ${team2}`);
      result = await getTeamPoint(team1, team2);
    }
    else {
      debugLog("API", "Invalid request or missing parameters", true);
      return NextResponse.json(
        { error: "Invalid request or missing parameters" },
        { status: 400 }
      );
    }

    debugLog(
      "API",
      `Completed ${action} in ${Date.now() - startTime}ms`
    );
    return NextResponse.json(result);
  } catch (error) {
    debugLog("API", `Error: ${error.message}`, true);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}