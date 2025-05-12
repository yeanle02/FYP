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
    logo: "/teams/Melbourne_Demons.png",
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
  const comparisonContainerRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  const handleScrollClick = () => {
    if (comparisonContainerRef.current) {
      comparisonContainerRef.current.scrollTo({
        top: comparisonContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };



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

  const isLoading = loading || prLoading;

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
          winningTeam: result.winning_team,
          match_confidence: result.match_confidence
        });
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  const getRadarData = (team, index = null) => {
    if (results && selectedMatch && index !== null) {
      const teamData = index === 0 ? results.team1Status : results.team2Status;
      if (!teamData) {
        // Return default data if teamData is undefined
        return {
          labels: ['Attack', 'Defense', 'Speed', 'Teamwork', 'Hustle'],
          datasets: [{
            label: team?.name || 'No Team Selected',
            data: [0, 0, 0, 0, 0],
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
    // Default fallback
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
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Leaderboard - Left Sidebar */}
          <div className="lg:col-span-3">
          {/* Leaderboard */}
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-lg shadow-xl ring-1 ring-gray-600/50 w-full xl:w-72 h-fit mb-6 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
            <div className="relative flex items-center justify-center mb-4">
              <h3 className="text-xl font-semibold text-white text-center">Leaderboard</h3>
              <div className="absolute right-0 group">
                <button
                  className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-1"
                  aria-label="View leaderboard information"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-6 h-6 text-white"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                    />
                  </svg>
                </button>
                <div 
                  className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                >
                  <div>
                    <div className="absolute right-0 top-0 transform -translate-y-2 translate-x-1/2">
                      <div className="w-3 h-3 bg-gradient-to-br from-white to-gray-50 transform rotate-45 shadow-lg pointer-events-none"></div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-600">
                        <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                          Leaderboard Information
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-700">• Shows top 8 teams ranked by performance</p>
                          <p className="text-gray-700">• Points are calculated from historical match data</p>
                          <p className="text-gray-700">• Higher points indicate better overall performance</p>
                          <p className="text-gray-700">• Rankings update after each match</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {leaderBoardResults.sort((a, b) => b.historyPoints - a.historyPoints).slice(0, 8).map((team, index) => {
                let logoPath = `/teams/${team.name.replace(/\s+/g, '_')}.png`;
                
                // Handle special cases
                if (team.name === "Melbourne Demons") {
                  logoPath = "/teams/Melbourne_Demons.png";
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
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl border border-gray-700 p-4 mb-6">
              <div className="relative flex items-center justify-center w-full mb-4">
                <h2 className="text-xl font-bold text-white text-center">Today's Matches</h2>
                <div className="absolute right-0 group">
                  <button
                    className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-1"
                    aria-label="View matches information"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-6 h-6 text-white"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                    />
                    </svg>
                  </button>
                  <div 
                    className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    <div>
                      <div className="absolute right-0 top-0 transform -translate-y-2 translate-x-1/2">
                        <div className="w-3 h-3 bg-gradient-to-br from-white to-gray-50 transform rotate-45 shadow-lg pointer-events-none"></div>
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-600">
                          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                            Match Selection Guide
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-700">• Click any match to view detailed comparison</p>
                            <p className="text-gray-700">• View team logos and scheduled times</p>
                            <p className="text-gray-700">• Scrollable list shows all today's matches</p>
                            <p className="text-gray-700">• Selected match will show prediction below</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
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
            <div 
              ref={comparisonContainerRef}
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl border border-gray-700 p-6 max-h-[80vh] overflow-y-auto custom-scrollbar scroll-smooth relative"
              onScroll={(e) => {
                const element = e.currentTarget;
                setShowScrollIndicator(
                  element.scrollHeight > element.clientHeight &&
                  element.scrollTop < element.scrollHeight - element.clientHeight
                );
              }}
            >
              <div className="flex flex-col items-center mb-6 relative">
                <button 
                  onClick={() => setSelectedMatch(null)}
                  className="absolute top-0 left-0 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Reset
                </button>
                <div className="absolute top-0 right-0">
                  <div className="group">
                    <button
                      className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-1"
                      aria-label="View comparison information"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-6 h-6 text-white"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                        />
                      </svg>
                    </button>
                    <div 
                      className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    >
                      <div>
                        <div className="absolute right-0 top-0 transform -translate-y-2 translate-x-1/2">
                          <div className="w-3 h-3 bg-gradient-to-br from-white to-gray-50 transform rotate-45 shadow-lg pointer-events-none"></div>
                        </div>
                        <div className="p-4">
                          <div className="text-sm text-gray-600">
                            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                              Team Comparison Guide
                            </h3>
                            <div className="space-y-2">
                              <p className="text-gray-700">• Radar charts show team strengths in 5 key areas</p>
                              <p className="text-gray-700">• Performance stats are normalized on a 1-10 scale</p>
                              <p className="text-gray-700">• Predicted scores based on machine learning</p>
                              <p className="text-gray-700">• Winner prediction shown with score comparison</p>
                              <p className="text-gray-700">• Reset button clears current comparison</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white text-center mt-2">Team Comparison & Prediction</h2>
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
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center mb-4 relative">
                        <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${isLoading ? 'blur-sm pointer-events-none opacity-60' : ''}`}>
                          {results && (
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
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                          </div>
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
                    <div className="lg:col-span-1 flex flex-col items-center justify-center relative">
                      <div className={`transition-all duration-300 w-full h-full flex flex-col items-center justify-center ${isLoading ? 'blur-sm pointer-events-none opacity-60' : ''}`}> 
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
                        {typeof prediction.match_confidence === 'number' && (
                          <div className="mt-4 w-full flex flex-col items-center">
                            <span className="text-blue-400 text-sm mb-1">Confidence</span>
                            <div className="relative w-32 h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner">
                              <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-full transition-all duration-700"
                                style={{ width: `${prediction.match_confidence}%` }}
                              />
                            </div>
                            <span className="text-blue-500 font-semibold mt-1">{prediction.match_confidence.toFixed(2)}%</span>
                          </div>
                        )}
                      </div>
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                      )}
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
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center mb-4 relative">
                        <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${isLoading ? 'blur-sm pointer-events-none opacity-60' : ''}`}>
                          {results && (
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
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                          </div>
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
                    <div className="relative flex items-center justify-center w-full mb-4">
                      <h2 className="text-xl font-bold text-white text-center">Performance History</h2>
                      <div className="ml-3 group">
                        <button
                          className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-1"
                          aria-label="View history information"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2} 
                            stroke="currentColor" 
                            className="w-6 h-6 text-white"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                            />
                          </svg>
                        </button>
                        <div 
                          className="absolute mt-2 w-80 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        >
                          <div>
                            <div className="absolute right-full top-0 transform translate-x-2 -translate-y-2">
                              <div className="w-3 h-3 bg-gradient-to-br from-white to-gray-50 transform rotate-45 shadow-lg pointer-events-none"></div>
                            </div>
                            <div className="p-4">
                              <div className="text-sm text-gray-600">
                                <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                                  Performance History Guide
                                </h3>
                                <div className="space-y-2">
                                  <p className="text-gray-700">• Chart shows historical performance trends</p>
                                  <p className="text-gray-700">• Compare team performance over time</p>
                                  <p className="text-gray-700">• Data points show match results</p>
                                  <p className="text-gray-700">• Hover over points for detailed information</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
              {showScrollIndicator && (
                <div 
                  className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
                  onClick={handleScrollClick}
                >
                  <div className="p-2 bg-blue-500 rounded-full shadow-lg animate-[bounce_1s_infinite]">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
