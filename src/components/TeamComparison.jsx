"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { ArrowUp, ArrowDown, Trophy, Clock, ChevronDown, Users, RefreshCw, BarChart3 } from 'lucide-react';
import useTeamStatusHandler from '@/app/hooks/apiHandlers/useTeamStatusHandler';
import usePredictionHandler from '@/app/hooks/apiHandlers/usePredictionHandler';
import useStatusListHandler from '@/app/hooks/apiHandlers/useStatusListHandler';
import useTeamPointsHandler from '@/app/hooks/apiHandlers/useTeamPointHandler';
import TeamComparisonChart from './TeamComparsionChart';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Your existing placeholderTeams array

const placeholderTeams = [
  {
    name: "Melbourne Demons",
    logo: "/teams/Melbournefc.png",
    movedUp: true
  },
  {
    name: "Richmond Tigers",
    logo: "/teams/Richmond_Tigers.png",
    movedUp: false
  },
  {
    name: "Carlton Blues",
    logo: "/teams/Carlton.svg",
    movedUp: true
  },
  {
    name: "Sydney Swans",
    logo: "/teams/Sydney_Swans.png",
    movedUp: false
  },
  {
    name: "Brisbane Lions",
    logo: "/teams/Brisbane_Lions.png",
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
  // Your existing state and hooks
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null, winningTeam: null });
  const [isScrollable, setIsScrollable] = useState(false);
  const matchesContainerRef = useRef(null);
  // const [showPerformanceChart, setShowPerformanceChart] = useState(false);



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
  const { loading: prLoading, errors: prErrors, results: prResults, setHomeTeam, setAwayTeam, predictPageHandler } = usePredictionHandler();
  const { results:leaderBoardResults, handleGetLeaderBoards } = useStatusListHandler();
  const { loading: tpLoading, errors: tpErrors, pointsData, fetchTeamPoints } = useTeamPointsHandler();

  useEffect(() => {
    handleGetLeaderBoards();
  }, []);
  
  const selectMatch = async (match) => {
    setSelectedMatch(match);
    handleGetTeamStatus(match.team1.name, match.team2.name);
      setHomeTeam(match.team1.name);
      setAwayTeam(match.team2.name);
    await fetchTeamPoints(match.team1.name, match.team2.name);
      
    try {
      const result = await predictPageHandler(match.team1.name, match.team2.name);
      if (result && !result.error) {
        setPrediction({
          team1Score: result.home_score, 
          team2Score: result.away_score,
          winningTeam: result.winning_team
        });
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  const getRadarData = (team, index = null) => {
    if (results && selectedMatch && index !== null) {
      const teamData = index === 0 ? results.team1Status : results.team2Status;
      
      return {
        labels: ['Attack', 'Defense', 'Speed', 'Teamwork', 'Hustle'],
        datasets: [{
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
        }]
      };
    } 
    
    return {
      labels: ['Attack', 'Defense', 'Speed', 'Teamwork', 'Hustle'],
      datasets: [{
          label: team?.name || 'No Team Selected',
          data: [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(99, 102, 241, 0.3)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)'
      }]
    };
  };

  const renderMatchCard = (match, idx) => (
    <motion.div
      key={idx}
      onClick={async () => await selectMatch(match)}
      className="group h-28 bg-gradient-to-br from-gray-700 to-gray-600 p-3 rounded-lg cursor-pointer border border-gray-500
        shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:from-gray-600 hover:to-gray-500 transition-all duration-300 
        hover:border-gray-400 hover:shadow-[0_12px_20px_rgba(0,0,0,0.3)] flex items-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.1 }}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-center w-full gap-24">
        {/* Team 1 */}
        <div className="flex flex-col items-center w-40">
          <motion.div 
            className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image 
              src={match.team1.logo} 
              width={55} 
              height={55} 
              alt={match.team1.name} 
              className="rounded-full transform transition-transform group-hover:scale-110 duration-300" 
            />
          </motion.div>
          <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center">
            {match.team1.name}
          </span>
        </div>

        {/* VS */}
        <span className="text-gray-200 font-bold text-2xl group-hover:text-white transition-colors duration-300 w-16 text-center">
          VS
        </span>

        {/* Team 2 */}
        <div className="flex flex-col items-center w-40">
          <motion.div 
            className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image 
              src={match.team2.logo} 
              width={55} 
              height={55} 
              alt={match.team2.name} 
              className="rounded-full transform transition-transform group-hover:scale-110 duration-300" 
            />
          </motion.div>
          <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center">
            {match.team2.name}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center mb-8">AFL Team Comparison</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Leaderboard - Left Sidebar */}
          <div className="lg:col-span-3">
          {/* Leaderboard */}
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-lg shadow-xl ring-1 ring-gray-600/50 w-full xl:w-72 h-fit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Leaderboard</h3>
              {leaderBoardResults.sort((a, b) => b.historyPoints - a.historyPoints).slice(0, 8).map((team, index) => {
                let logoPath = `/teams/${team.name.replace(/\s+/g, '_')}.png`;
                
                // Handle special cases
                if (team.name === "Melbourne Demons") {
                  logoPath = "/teams/Melbournefc.png";
                } else if (team.name === "Gold Coast Suns") {
                  logoPath = "/teams/Gold_Coast_Suns.svg";
                }

                return(
                  <div key={team.name} className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded mb-2">
                <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{index + 1}</span>
                      <Image src={logoPath}
                        alt={team.name}
                        width={24}
                        height={24}
                      />
                  <span className="text-gray-200 text-sm">{team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                      {/* {team.movedUp ? <ArrowUp size={16} className="text-green-400" /> : <ArrowDown size={16} className="text-red-400" />} */}
                  <span className="text-gray-300 text-sm">{team.historyPoints}</span>
                </div>
              </div>
                );
              })}
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {/* Upcoming Matches */}
            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-4 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Today's Matches</h2>
              
              <div 
                ref={matchesContainerRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto custom-scrollbar"
              >
                {/* Match Cards */}
                  {placeholderMatches.map((match, idx) => (
                    <div
                      key={idx}
                    onClick={async () => await selectMatch(match)}
                    className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      {/* Team 1 */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2">
                          <Image src={match.team1.logo} width={40} height={40} alt={match.team1.name} />
                          </div>
                        <span className="text-gray-200 text-sm font-medium">{match.team1.name.split(' ')[0]}</span>
                        </div>
                        
                      {/* VS */}
                      <div className="flex flex-col items-center px-2">
                        <span className="text-gray-300 font-bold text-lg">VS</span>
                        <span className="text-gray-400 text-xs mt-1">7:30 PM</span>
                      </div>
                      
                      {/* Team 2 */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2">
                          <Image src={match.team2.logo} width={40} height={40} alt={match.team2.name} />
                          </div>
                        <span className="text-gray-200 text-sm font-medium">{match.team2.name.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            
            {/* Team Comparison Section */}
            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Team Comparison & Prediction</h2>
                <button 
                  onClick={() => setSelectedMatch(null)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 text-sm transition"
                >
                  <RefreshCw size={16} />
                  Reset
                </button>
              </div>
              
              {selectedMatch ? (
                <>
                  {/* Selected Match Comparison */}
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Team 1 Stats */}
                    <div className="lg:col-span-3 bg-gray-700/50 rounded-xl p-4">
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                          <Image src={selectedMatch.team1.logo} width={48} height={48} alt={selectedMatch.team1.name} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{selectedMatch.team1.name}</h3>
                      </div>
                      
                      {/* Radar Chart */}
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                        {!loading && results && (
                          <Radar 
                            data={getRadarData(selectedMatch.team1, 0)} 
                            options={{
                              scales: {
                                r: {
                                  min: 0,
                                  max: 10,
                                  ticks: {  backdropColor: 'transparent', 
                                    color: '#999',
                                    max: 10,
                                    min: 0,
                                    stepSize: 2,
                                    font: {
                                      size: 18, 
                                      weight: 'bold'
                                    } },
                                  pointLabels: { color: 'rgba(255, 255, 255, 0.9)' },
                                  grid: { color: 'rgba(255, 255, 255, 0.2)' },
                                }
                              },
                              plugins: {
                                legend: { display: false }
                              }
                            }}
                          />
                        )}
                      </div>
                      
                      {/* Stats Display */}
                      <div className="bg-gray-800/60 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Performance Stats (1-10):</h4>
                        {results && results.team1Status ? (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Attack:</span>
                              <span className="text-white font-medium">{results.team1Status.attack_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Defense:</span>
                              <span className="text-white font-medium">{results.team1Status.defend_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Speed:</span>
                              <span className="text-white font-medium">{results.team1Status.speed_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Teamwork:</span>
                              <span className="text-white font-medium">{results.team1Status.teamwork_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Hustle:</span>
                              <span className="text-white font-medium">{results.team1Status.hustle_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Points:</span>
                              <span className="text-white font-medium">
                                {results.team1Status.points}
                    </span>
                  </div>
                </div>
                        ) : (
                          <div className="text-gray-400 text-center">Loading stats...</div>
              )}
            </div>
                    </div>
                    
                    {/* Prediction Center */}
                    <div className="lg:col-span-1 flex flex-col items-center justify-center">
                      <div className="bg-gradient-to-b from-gray-600 to-gray-700 p-4 rounded-full h-24 w-24 flex items-center justify-center shadow-lg border border-gray-500">
                        <div className="text-center">
                          <div className="text-gray-300 text-xs mb-1">Prediction</div>
                          <div className="flex items-center gap-2">
                            <span className={`${prediction.winningTeam === selectedMatch.team1.name ? 'text-green-400' : 'text-gray-300'} font-bold text-xl`}>
                              {prediction.team1Score || '—'}
                            </span>
                            <span className="text-gray-400">-</span>
                            <span className={`${prediction.winningTeam === selectedMatch.team2.name ? 'text-green-400' : 'text-gray-300'} text-xl`}>
                              {prediction.team2Score || '—'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col items-center">
                        <div className="text-gray-300 text-sm mb-1">Winner</div>
                        <div className="text-green-400 font-semibold">
                          {prediction.winningTeam ? prediction.winningTeam.split(' ')[0] : '—'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Team 2 Stats */}
                    <div className="lg:col-span-3 bg-gray-700/50 rounded-xl p-4">
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                          <Image src={selectedMatch.team2.logo} width={48} height={48} alt={selectedMatch.team2.name} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{selectedMatch.team2.name}</h3>
                      </div>
                      
                      {/* Radar Chart */}
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                        {!loading && results && (
                          <Radar 
                            data={getRadarData(selectedMatch.team2, 1)} 
                            options={{
                              scales: {
                                r: {
                                  min: 0,
                                  max: 10,
                                  ticks: { backdropColor: 'transparent', 
                                    color: '#999',
                                    max: 10,
                                    min: 0,
                                    stepSize: 2,
                                    font: {
                                      size: 18,
                                      weight: 'bold' 
                                    }},
                                  pointLabels: { color: 'rgba(255, 255, 255, 0.9)' },
                                  grid: { color: 'rgba(255, 255, 255, 0.2)' },
                                }
                              },
                              plugins: {
                                legend: { display: false }
                              }
                            }}
                          />
                  )}
                </div>

                      {/* Stats Display */}
                      <div className="bg-gray-800/60 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Performance Stats (1-10):</h4>
                        {results && results.team2Status ? (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Attack:</span>
                              <span className="text-white font-medium">{results.team2Status.attack_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Defense:</span>
                              <span className="text-white font-medium">{results.team2Status.defend_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Speed:</span>
                              <span className="text-white font-medium">{results.team2Status.speed_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Teamwork:</span>
                              <span className="text-white font-medium">{results.team2Status.teamwork_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Hustle:</span>
                              <span className="text-white font-medium">{results.team2Status.hustle_norm.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Points:</span>
                              <span className="text-white font-medium">
                                {results.team2Status.points}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-center">Loading stats...</div>
                        )}
                      </div>
                    </div>
                    </div>
                    
                  {/* Performance History Chart */}
                  <motion.div 
                    className="bg-gray-900 rounded-lg shadow p-4 mt-6 w-full overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-4 text-white">Performance History</h2>
                    <div className="w-full" style={{ height: "calc(min(500px, 65vh))" }}>
                      {tpLoading ? (
                        <div className="flex justify-center items-center h-full text-white">Loading performance data...</div>
                      ) : tpErrors ? (
                        <div className="flex justify-center items-center h-full text-red-500">Error loading performance data</div>
                      ) : (
                        <div className="w-full h-full">
                          <TeamComparisonChart 
                            team1={selectedMatch.team1.name}
                            team2={selectedMatch.team2.name}
                            pointsData={pointsData}
                            predictionValue={prediction}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                  <BarChart3 size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">Select a match to view team comparison and prediction</p>
                              </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

