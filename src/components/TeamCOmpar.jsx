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
import { ArrowUp, ArrowDown } from 'lucide-react';
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
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col xl:flex-row gap-6 overflow-hidden">
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

          {/* Main Section - Match List + Prediction */}
          <div className="flex-1 w-full">
            {/* Match List */}
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-2 ring-1 ring-gray-600/50 flex flex-col min-h-[420px] h-[calc(100vh-36rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-2xl font-bold text-white mb-2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Today's Matches
              </motion.h2>

              <div ref={matchesContainerRef} className="flex-1 overflow-y-auto px-1 pb-2 custom-scrollbar scroll-smooth">
                <div className="flex flex-col gap-2">
                  {placeholderMatches.map((match, idx) => renderMatchCard(match, idx))}
                </div>
              </div>

              {isScrollable && (
                <div className="relative mt-6 pb-2">
                  <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none" />
                  <motion.div
                    className="text-center bg-gradient-to-t from-gray-800/10 to-transparent pt-2 pb-1 px-4 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-gray-400 text-sm animate-bounce block cursor-default select-none hover:text-gray-300 transition-colors">
                      Scroll for more matches ↓
                    </span>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Prediction Panel */}
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-4 ring-1 ring-gray-600/50 mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="relative mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-white text-center">
                    Team Comparison & Prediction
                  </h2>
                  {selectedMatch && (
                    <motion.button
                      onClick={() => {
                        setSelectedMatch(null);
                        setPrediction({ team1Score: null, team2Score: null, winningTeam: null });
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
                    </motion.button>
                  )}
                </motion.div>

                <AnimatePresence mode="wait">
                  {selectedMatch ? (
                    <motion.div
                      key="comparison"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col space-y-6"
                    >
                      <div className="flex flex-col lg:flex-row justify-center items-start gap-6">
                        {[selectedMatch.team1, selectedMatch.team2].map((team, index) => (
                          <motion.div 
                            key={team.name} 
                            className="text-center flex flex-col items-center"
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <motion.div 
                              className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <Image 
                                src={team.logo} 
                                width={55} 
                                height={55} 
                                alt={team.name} 
                                className="rounded-full transform transition-transform group-hover:scale-110 duration-300" 
                              />
                            </motion.div>
                            <span className="text-white font-semibold">{team.name}</span>
                          
                            {/* Status loading indicator */}
                            {loading && (
                              <motion.div 
                                className="bg-gray-900 rounded-lg shadow mt-4 p-4 w-full h-[300px] flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <p className="text-white">Loading team stats...</p>
                              </motion.div>
                            )}
                            
                            {/* Error message */}
                            {errors && (
                              <motion.div 
                                className="bg-gray-900 rounded-lg shadow mt-4 p-4 w-full h-[300px] flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <p className="text-red-400">Error: {errors}</p>
                              </motion.div>
                            )}
                            
                            {/* Radar chart with data */}
                            {!loading && !errors && (
                              <motion.div 
                                className="mt-4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                              >
                                <div key={`radar-${team.name}`} className="bg-gray-900 rounded-lg shadow p-4 w-full h-[300px] relative">
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
                              </motion.div>
                            )}
                            
                            {/* Stats Display */}
                            {results && !loading && (
                              <motion.div 
                                className="mt-4 text-white text-sm"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                              >
                                <div className="mt-2 p-2 bg-gray-700 rounded">
                                  <p className="font-bold">Performance Stats (1-10):</p>
                                  <p>Attack: {index === 0 ? results.team1Status.attack_norm : results.team2Status.attack_norm}</p>
                                  <p>Defense: {index === 0 ? results.team1Status.defend_norm : results.team2Status.defend_norm}</p>
                                  <p>Speed: {index === 0 ? results.team1Status.speed_norm : results.team2Status.speed_norm}</p>
                                  <p>Teamwork: {index === 0 ? results.team1Status.teamwork_norm : results.team2Status.teamwork_norm}</p>
                                  <p>Hustle: {index === 0 ? results.team1Status.hustle_norm : results.team2Status.hustle_norm}</p>
                                  <p>Points: {index === 0 ? results.team1Status.points : results.team2Status.points}</p>
                                  <p>Win: {index === 0 ? results.team1Status.win : results.team2Status.win}</p>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      
                      {prediction.team1Score !== null && (
                        <motion.div
                          className="bg-gray-200 p-6 rounded-lg shadow-xl flex flex-col items-center border border-gray-300/50 backdrop-blur-sm relative transition-all duration-300 hover:shadow-2xl hover:border-gray-400/50 hover:bg-gray-100"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {/* Predicted Scores */}
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">Predicted Score</h3>
                          <div className="flex items-center gap-12 mb-6">
                            <motion.div 
                              className="flex flex-col items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                            >
                              <span className="text-gray-600 font-medium mb-2 whitespace-nowrap">{selectedMatch.team1.name}</span>
                              <div className={`text-3xl font-bold ${prediction.winningTeam === selectedMatch.team1.name ? 'text-green-600' : 'text-gray-700'}`}>
                                {prediction.team1Score}
                              </div>
                            </motion.div>
                            <div className="text-2xl text-gray-500">-</div>
                            <motion.div 
                              className="flex flex-col items-center"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                            >
                              <span className="text-gray-600 font-medium mb-2 whitespace-nowrap">{selectedMatch.team2.name}</span>
                              <div className={`text-3xl font-bold ${prediction.winningTeam === selectedMatch.team2.name ? 'text-green-600' : 'text-gray-700'}`}>
                                {prediction.team2Score}
                              </div>
                            </motion.div>
                          </div>

                          {/* Winner Image */}
                          <motion.div 
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="relative w-20 h-20">
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-full shadow-lg flex items-center justify-center">
                                <Image
                                  src={(selectedMatch.team1.name === prediction.winningTeam ? selectedMatch.team1 : selectedMatch.team2).logo}
                                  alt="Winner"
                                  width={72}
                                  height={72}
                                  className="rounded-full"
                                />
                              </div>
                            </div>
                            <span className="text-lg font-bold text-green-600 mt-6">
                              {prediction.winningTeam}
                            </span>
                          </motion.div>

                          {/* Always-visible Performance Chart */}
                          <motion.div 
                            className="bg-gray-900 rounded-lg shadow p-4 mt-6 w-full"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h2 className="text-xl font-bold mb-4 text-white">Performance History</h2>
                            <div className="h-96 w-full">
                              {tpLoading ? (
                                <div className="flex justify-center items-center h-full text-white">Loading performance data...</div>
                              ) : tpErrors ? (
                                <div className="flex justify-center items-center h-full text-red-500">Error loading performance data</div>
                              ) : (
                                <TeamComparisonChart 
                                  team1={selectedMatch.team1.name}
                                  team2={selectedMatch.team2.name}
                                  pointsData={pointsData}
                                  predictionValue={prediction}
                                />
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                  
                    </motion.div>
                  ) : (
                    <motion.p
                      key="placeholder"
                      className="text-center text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Select a match to view comparison and prediction.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

