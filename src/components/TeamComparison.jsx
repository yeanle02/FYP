"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
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
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null, winningTeam: null });
  const [isScrollable, setIsScrollable] = useState(false);
  const matchesContainerRef = useRef(null);

  useEffect(() => {
    const checkScrollable = () => {
      if (matchesContainerRef.current) {
        const { scrollHeight, clientHeight } = matchesContainerRef.current;
        setIsScrollable(scrollHeight > clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);
  
  const { loading, errors, results, handleGetTeamStatus } = useTeamStatusHandler();

  const { loading:prLoading, errors:prErrors, results:prResults, setHomeTeam, setAwayTeam, predictPageHandler } = usePredictionHandler();
  
  const selectMatch = async (match) => {
    setSelectedMatch(match);

    handleGetTeamStatus(match.team1.name, match.team2.name);
    
    setHomeTeam(match.team1.name);
    setAwayTeam(match.team2.name);
    console.log("Selected match:", match.team1.name, "vs", match.team2.name);

    try {
      const result = await predictPageHandler(match.team1.name, match.team2.name);
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
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col xl:flex-row gap-6 overflow-hidden">
          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-lg shadow-xl ring-1 ring-gray-600/50 w-full xl:w-72 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Leaderboard</h3>
            {placeholderTeams.sort((a, b) => a.rank - b.rank).map((team) => (
              <div key={team.name} className="flex justify-between items-center py-2 px-3 bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200 rounded mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">#{team.rank}</span>
                  <Image src={team.logo} alt={team.name} width={24} height={24} />
                  <span className="text-gray-200 text-sm">{team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {team.movedUp ? <ArrowUp size={16} className="text-green-400" /> : <ArrowDown size={16} className="text-red-400" />}
                  <span className="text-gray-300 text-sm">{team.historyPoints}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Section - Match List + Prediction */}
          <div className="flex-1 w-full">
            {/* Match Scrollable List */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-4 ring-1 ring-gray-600/50">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Select A Match
              </h2>
              <div ref={matchesContainerRef} className="max-h-[calc(100vh-620px)] min-h-[180px] overflow-y-auto px-2 pb-4 custom-scrollbar scroll-smooth">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {placeholderMatches.map((match, idx) => (
                    <div
                      key={idx}
                      onClick={async () => await selectMatch(match)}
                      className="group bg-gradient-to-br from-gray-700 to-gray-600 p-3 rounded-lg cursor-pointer border-t-2 border-gray-500
                    shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:from-gray-600 hover:to-gray-500 transition-all duration-300 
                    hover:border-gray-400 hover:shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:bg-white transition-all duration-300 mx-auto">
                          <Image src={match.team1.logo} width={50} height={50} alt={match.team1.name} 
                            className="rounded-full transform transition-transform group-hover:scale-110 duration-300" />
                        </div>
                        <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center block">{match.team1.name}</span>
                        <span className="text-gray-200 font-bold text-lg group-hover:text-white transition-colors duration-300 text-center block my-2">VS</span>
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:bg-white transition-all duration-300 mx-auto">
                          <Image src={match.team2.logo} width={50} height={50} alt={match.team2.name} 
                            className="rounded-full transform transition-transform group-hover:scale-110 duration-300" />
                        </div>
                        <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center block">{match.team2.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {isScrollable && (
                <div className="relative mt-6 pb-2">
                  <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                  <div className="text-center bg-gradient-to-t from-gray-800/10 to-transparent pt-2 pb-1 px-4 rounded-lg">
                    <span className="text-gray-400 text-sm animate-bounce block cursor-default select-none hover:text-gray-300 transition-colors">
                      Scroll for more matches ↓
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Prediction Panel */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-6 ring-1 ring-gray-600/50 mt-6">
              <div className="max-w-4xl mx-auto">
                <div className="relative mb-6">
                  <h2 className="text-2xl font-bold text-white text-center">
                    Team Comparison & Prediction
                  </h2>
                  {selectedMatch && (
                    <button
                      onClick={() => {
                        setSelectedMatch(null);
                        setPrediction({ team1Score: null, team2Score: null, winningTeam: null });
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span>Reset</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4 transform rotate-0 group-hover:rotate-180 transition-transform duration-300"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                  )}
                </div>

                {selectedMatch ? (
                  <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mb-6">
                    {[selectedMatch.team1, selectedMatch.team2].map((team, index) => (
                      <div key={team.name} className="text-center flex flex-col items-center w-full lg:w-[280px]">
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
                  <div className="bg-gray-200 p-6 rounded-lg shadow-xl flex flex-col items-center border border-gray-300/50 backdrop-blur-sm relative transition-all duration-300 hover:shadow-2xl hover:border-gray-400/50 hover:bg-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Predicted Score</h3>
                    <div className="flex items-center gap-12 mb-6">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-600 font-medium mb-2 whitespace-nowrap">{selectedMatch.team1.name}</span>
                        <div className={`text-3xl font-bold ${prediction.winningTeam === selectedMatch.team1.name ? 'text-green-600' : 'text-gray-700'}`}>
                          {prediction.team1Score}
                        </div>
                      </div>
                      <div className="text-2xl text-gray-500">-</div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-600 font-medium mb-2 whitespace-nowrap">{selectedMatch.team2.name}</span>
                        <div className={`text-3xl font-bold ${prediction.winningTeam === selectedMatch.team2.name ? 'text-green-600' : 'text-gray-700'}`}>
                          {prediction.team2Score}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                          <Image
                            src={(selectedMatch.team1.name === prediction.winningTeam ? selectedMatch.team1 : selectedMatch.team2).logo}
                            alt="Winner"
                            width={72}
                            height={72}
                            className="rounded-full animate-fade-in-team"
                          />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600 mt-6 transition-all duration-300 hover:text-green-500">
                    {prediction.winningTeam}
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
