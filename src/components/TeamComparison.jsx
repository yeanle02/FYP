"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { ArrowUp, ArrowDown } from 'lucide-react';
import useTeamStatusHandler from '@/app/hooks/apiHandlers/useTeamStatusHandler';
import usePredictionHandler from '@/app/hooks/apiHandlers/usePredictionHandler';
import useStatusListHandler from '@/app/hooks/apiHandlers/useStatusListHandler';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const placeholderTeams = [
  {
    name: "Melbourne Demons",
    logo: "/teams/Melbournefc.png",
    historyPoints: 1200,
    wins: 10,
    losses: 5,
    rank: 1,
    movedUp: true
  },
  {
    name: "Richmond Tigers",
    logo: "/teams/Richmond_Tigers.png",
    historyPoints: 1250,
    wins: 12,
    losses: 4,
    rank: 2,
    movedUp: false
  },
  {
    name: "Carlton Blues",
    logo: "/teams/Carlton.svg",
    historyPoints: 1100,
    wins: 8,
    losses: 7,
    rank: 3,
    movedUp: true
  },
  {
    name: "Sydney Swans",
    logo: "/teams/Sydney_Swans.png",
    historyPoints: 1150,
    wins: 9,
    losses: 6,
    rank: 4,
    movedUp: false
  },
  {
    name: "Brisbane Lions",
    logo: "/teams/Brisbane_Lions.png",
    historyPoints: 1220,
    wins: 11,
    losses: 5,
    rank: 5,
    movedUp: false
  }
];

const placeholderMatches = [
  { team1: placeholderTeams[0], team2: placeholderTeams[1] },
  { team1: placeholderTeams[2], team2: placeholderTeams[3] },
  { team1: placeholderTeams[1], team2: placeholderTeams[4] },
  { team1: placeholderTeams[3], team2: placeholderTeams[0] },
  { team1: placeholderTeams[4], team2: placeholderTeams[2] }
];

export function TeamComparison() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null });
  
  const { loading, errors, results, handleGetTeamStatus } = useTeamStatusHandler();

  const { loading:prLoading, errors:prErrors, results:prResults, setHomeTeam, setAwayTeam, predictPageHandler } = usePredictionHandler();
  const { results:leaderBoardResults, handleGetLeaderBoards } = useStatusListHandler();
 
  useEffect(() => {
    handleGetLeaderBoards();
  }, []);

  const selectMatch = (match) => {
    setSelectedMatch(match);

    handleGetTeamStatus(match.team1.name, match.team2.name);
    
    setHomeTeam(match.team1.name);
    setAwayTeam(match.team2.name);

    try {
      const result = predictPageHandler();
      if (result && !result.error) {
        // Update prediction with real data from the API
        setPrediction({
          team1Score: result.home_score, 
          team2Score: result.away_score,
          winningTeam: result.winning_team
        });
        console.log("Prediction successful:", result);
      } else {
        console.error("Prediction error:", result?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };


  const getRadarData = (team, index = null) => {
    // If we have results from database and match is selected
    if (results && selectedMatch && index !== null) {
      const teamData = index === 0 ? results.team1Status : results.team2Status;
      
      return {
        labels: ['Attack', 'Defense', 'Speed', 'Teamwork', 'Hustle'],
        datasets: [
          {
            label: teamData.Team || team?.name || 'No Team Selected',
            data: [
              teamData.attack_norm || 0, 
              teamData.defend_norm || 0, 
              teamData.speed_norm || 0, 
              teamData.teamwork_norm || 0, 
              teamData.hustle_norm || 0
            ],
            backgroundColor: index === 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(239, 68, 68, 0.3)',
            borderColor: index === 0 ? 'rgba(99, 102, 241, 1)' : 'rgba(239, 68, 68, 1)',
            borderWidth: 2,
            pointBackgroundColor: index === 0 ? 'rgba(99, 102, 241, 1)' : 'rgba(239, 68, 68, 1)'
          }
        ]
      };
    } 
    
    // Fallback to placeholders if no data available
    return {
      labels: ['Attack', 'Defense', 'Speed', 'Teamwork', 'Hustle'],
      datasets: [
        {
          label: team?.name || 'No Team Selected',
          data: [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(99, 102, 241, 0.3)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)'
        }
      ]
    };
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Leaderboard */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full xl:w-72 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Leaderboard</h3>
            {leaderBoardResults.sort((a, b) => a.rank - b.rank).slice(0, 8).map((team) => (
              <div key={team.name} className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">#{team.rank}</span>
                  <Image src={team.logo} alt={team.name} width={24} height={24} />
                  <span className="text-gray-200 text-sm">{team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {/* {team.movedUp ? <ArrowUp size={16} className="text-green-400" /> : <ArrowDown size={16} className="text-red-400" />} */}
                  <span className="text-gray-300 text-sm">{team.historyPoints}</span>
                </div>
              </div>
            ))}
          </div>


{/* Leaderboard —— 用后端数据替代硬编码
          <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full xl:w-72 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Leaderboard
            </h3>
            {lbLoading && (
              <p className="text-center text-white">Loading leaderboard…</p>
            )}
            {lbError && (
              <p className="text-center text-red-400">Error: {lbError}</p>
            )}
            {!lbLoading && !lbError && (
              // lbResults 已经是 total_points 排序好的前十条
              lbResults.map((doc, idx) => {
                const rank = idx + 1;
                const name = doc.Team;
                const pts  = doc.total_points;
                // 如果你没有 logo 字段，这里先硬编码一个默认图
                const logo = `/teams/${name.replace(/\s+/g, '_')}.png`;
                // movedUp 你可以后面再自己实现
                const movedUp = false;
                return (
                  <div
                    key={name}
                    className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">#{rank}</span>
                      <Image src={logo} alt={name} width={24} height={24} />
                      <span className="text-gray-200 text-sm">{name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {movedUp 
                        ? <ArrowUp   size={16} className="text-green-400" /> 
                        : <ArrowDown size={16} className="text-red-400"   />}
                      <span className="text-gray-300 text-sm">{pts}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div> */}



          {/* Main Section - Match List + Prediction */}
          <div className="flex-1 w-full">
            {/* Match Scrollable List */}
            <div className="overflow-x-auto bg-gray-900 py-6 px-4 rounded-lg">
              <div className="flex gap-4 min-w-full">
                {placeholderMatches.map((match, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectMatch(match)}
                    className="min-w-[300px] bg-gray-800 hover:bg-gray-700 p-4 rounded-lg cursor-pointer shadow-md"
                  >
                    <div className="flex flex-col items-center">
                      <Image src={match.team1.logo} width={40} height={40} alt={match.team1.name} />
                      <span className="text-white text-sm mt-1">{match.team1.name}</span>
                      <span className="text-white font-bold my-2">VS</span>
                      <Image src={match.team2.logo} width={40} height={40} alt={match.team2.name} />
                      <span className="text-white text-sm mt-1">{match.team2.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prediction Panel */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Team Comparison & Prediction
                </h2>

                {selectedMatch ? (
                  <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mb-6">
                    {[selectedMatch.team1, selectedMatch.team2].map((team, index) => (
                      <div key={team.name} className="text-center flex flex-col items-center w-full lg:w-[300px]">
                        <div className="w-[100px] h-[100px] flex items-center justify-center mb-2">
                          <Image src={team.logo} alt={team.name} width={80} height={80} className="object-contain" />
                        </div>
                        <span className="text-white font-semibold">{team.name}</span>
                        
                        {/* Status loading indicator */}
                        {loading && (
                          <div className="bg-gray-900 rounded-lg shadow mt-4 p-4 w-full h-[300px] flex items-center justify-center">
                            <p className="text-white">Loading team stats...</p>
                          </div>
                        )}
                        
                        {/* Error message */}
                        {errors && (
                          <div className="bg-gray-900 rounded-lg shadow mt-4 p-4 w-full h-[300px] flex items-center justify-center">
                            <p className="text-red-400">Error: {errors}</p>
                          </div>
                        )}
                        
                        {/* Radar chart with data */}
                        {!loading && !errors && (
                          <div className="bg-gray-900 rounded-lg shadow mt-4 p-4 w-full h-[300px]">
                            <Radar
                              data={getRadarData(team, index)}
                              options={{
                                maintainAspectRatio: false,
                                scales: {
                                  r: {
                                    angleLines: { color: '#444' },
                                    grid: { color: '#333' },
                                    pointLabels: { color: '#ccc' },
                                    ticks: { 
                                      backdropColor: 'transparent', 
                                      color: '#999',
                                      max: 10,
                                      min: 0,
                                      stepSize: 2
                                    }
                                  }
                                },
                                plugins: {
                                  legend: { labels: { color: '#ddd' } }
                                }
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="mt-4 text-white text-sm">
                          <p>History Points: {team.historyPoints}</p>
                          <p>Wins: {team.wins}</p>
                          <p>Losses: {team.losses}</p>
                          
                          {/* Show normalized stats*/}
                          {results && !loading && (
                            <div className="mt-2 p-2 bg-gray-700 rounded">
                              <p className="font-bold">Performance Stats (1-10):</p>
                              <p>Attack: {index === 0 ? results.team1Status.attack_norm : results.team2Status.attack_norm}</p>
                              <p>Defense: {index === 0 ? results.team1Status.defend_norm : results.team2Status.defend_norm}</p>
                              <p>Speed: {index === 0 ? results.team1Status.speed_norm : results.team2Status.speed_norm}</p>
                              <p>Teamwork: {index === 0 ? results.team1Status.teamwork_norm : results.team2Status.teamwork_norm}</p>
                              <p>Hustle: {index === 0 ? results.team1Status.hustle_norm : results.team2Status.hustle_norm}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-white">Select a match to view comparison and prediction.</p>
                )}

                {selectedMatch && prediction.team1Score !== null && (
                  <div className="bg-gray-700 p-4 rounded-lg shadow flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Predicted Score</h3>
                    <div className="flex items-center gap-8 mb-6">
                      <div className={`text-3xl font-bold ${prediction.team1Score > prediction.team2Score ? 'text-green-400' : 'text-gray-300'}`}>
                        {prediction.team1Score}
                      </div>
                      <div className="text-2xl text-gray-400">-</div>
                      <div className={`text-3xl font-bold ${prediction.team2Score > prediction.team1Score ? 'text-green-400' : 'text-gray-300'}`}>
                        {prediction.team2Score}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-900 rounded-full shadow-lg flex items-center justify-center">
                          <Image
                            src={(prediction.team1Score > prediction.team2Score ? selectedMatch.team1 : selectedMatch.team2).logo}
                            alt="Winner"
                            width={72}
                            height={72}
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-400 mt-6">
                        {prediction.team1Score > prediction.team2Score
                          ? selectedMatch.team1.name
                          : selectedMatch.team2.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}