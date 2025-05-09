"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import usePredictionHandler from '@/app/hooks/apiHandlers/usePredictionHandler';
import { motion, AnimatePresence } from 'framer-motion';

const placeholderTeams = [
  {
    name: "Melbourne Demons",
    logo: "/teams/Melbourne_Demons.png"
  },
  {
    name: "Richmond Tigers",
    logo: "/teams/Richmond_Tigers.png"
  },
  {
    name: "Carlton Blues",
    logo: "/teams/Carlton.svg"
  },
  {
    name: "Sydney Swans",
    logo: "/teams/Sydney_Swans.png"
  },
  {
    name: "Brisbane Lions",
    logo: "/teams/Brisbane_Lions.png"
  }
];

const placeholderMatches = [
  { team1: placeholderTeams[0], team2: placeholderTeams[1] },
  { team1: placeholderTeams[2], team2: placeholderTeams[3] },
  { team1: placeholderTeams[1], team2: placeholderTeams[4] },
  { team1: placeholderTeams[3], team2: placeholderTeams[0] },
  { team1: placeholderTeams[4], team2: placeholderTeams[2] }
];

export function HomeTeamComparison() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null, winningTeam: null, match_confidence: null, isLoading: false });
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
  
  const { setHomeTeam, setAwayTeam, predictPageHandler } = usePredictionHandler();
  
  const selectMatch = async (match) => {
    setSelectedMatch(match);
    setHomeTeam(match.team1.name);
    setAwayTeam(match.team2.name);
    setPrediction(prev => ({ ...prev, isLoading: true }));
    
    const startTime = Date.now();
    
    try {
      const result = await predictPageHandler(match.team1.name, match.team2.name);
      
      // Ensure loading shows for at least 2 seconds
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);
      
      setTimeout(() => {
        if (result && !result.error) {
          setPrediction({
            team1Score: result.home_score,
            team2Score: result.away_score,
            winningTeam: result.winning_team,
            match_confidence: result.match_confidence,
            isLoading: false
          });
        }
      }, remainingTime);
      
    } catch (error) {
      console.error("Error during prediction:", error);
      setPrediction(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <motion.div 
      className="flex-1 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Match Scrollable List */}
      <motion.div 
        className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-2 ring-1 ring-gray-600/50 flex flex-col min-h-[420px] h-[calc(100vh-36rem)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex items-center justify-center">
            Today's Matches
            <div className="absolute right-0 group">
              <button
                className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-1"
                aria-label="View match information"
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
                        Match Information Guide
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">• Click on any match to see the predicted outcome</p>
                        <p className="text-gray-700">• The match prediction uses advanced machine learning to forecast results</p>
                        <p className="text-gray-700">• Each match displays team logos and names for easy identification</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.h2>
        <div ref={matchesContainerRef} className="flex-1 overflow-y-auto px-1 pb-2 custom-scrollbar scroll-smooth">
          <div className="flex flex-col gap-2">
            {placeholderMatches.map((match, idx) => (
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
                  <div className="flex flex-col items-center w-40">
                    <motion.div 
                      className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Image src={match.team1.logo} width={55} height={55} alt={match.team1.name} 
                        className="rounded-full transform transition-transform group-hover:scale-110 duration-300" />
                    </motion.div>
                    <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center">{match.team1.name}</span>
                  </div>
                  
                  <span className="text-gray-200 font-bold text-2xl group-hover:text-white transition-colors duration-300 w-16 text-center">VS</span>
                  
                  <div className="flex flex-col items-center w-40">
                    <motion.div 
                      className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Image src={match.team2.logo} width={55} height={55} alt={match.team2.name} 
                        className="rounded-full transform transition-transform group-hover:scale-110 duration-300" />
                    </motion.div>
                    <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center">{match.team2.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {isScrollable && (
          <div className="relative mt-3 pb-1">
            <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
            <motion.div 
              className="text-center bg-gradient-to-t from-gray-800/10 to-transparent pt-1 pb-0.5 px-2 rounded-lg"
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

      {/* Match Prediction */}
      <motion.div 
        className="mt-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-4 ring-1 ring-gray-600/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative flex items-center justify-center">
            Match Prediction
            <div className="absolute right-0 group">
              <button
                className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-1"
                aria-label="View prediction information"
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
                        Prediction Information Guide
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">• Predicted scores are based on historical performance data</p>
                        <p className="text-gray-700">• The winning team is highlighted in green</p>
                        <p className="text-gray-700">• Confidence score indicates prediction reliability percentage</p>
                        <p className="text-gray-700">• Higher confidence scores suggest more reliable predictions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.h2>
        <motion.div 
          className="flex justify-center items-center gap-24 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key="team1"
              className="flex flex-col items-center group"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 
                  ${selectedMatch && prediction.winningTeam ? (
                    selectedMatch.team1.name === prediction.winningTeam
                      ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                      : 'border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)]'
                  ) : 'border-gray-600 hover:border-gray-500'} transition-all group-hover:bg-white`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {selectedMatch ? (
                  <Image 
                    src={selectedMatch.team1.logo} 
                    alt={selectedMatch.team1.name} 
                    width={80} 
                    height={80} 
                  />
                ) : (
                  <span className="text-gray-400 text-lg">Select Team 1</span>
                )}
              </motion.div>
              {selectedMatch && (
                <motion.span 
                  className="text-white text-lg mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedMatch.team1.name}
                </motion.span>
              )}
            </motion.div>

            <motion.span 
              key="vs"
              className="text-white text-xl font-bold mt-[-20px]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              VS
            </motion.span>

            <motion.div 
              key="team2"
              className="flex flex-col items-center group"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 
                  ${selectedMatch && prediction.winningTeam ? (
                    selectedMatch.team2.name === prediction.winningTeam
                      ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                      : 'border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)]'
                  ) : 'border-gray-600 hover:border-gray-500'} transition-all group-hover:bg-white`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {selectedMatch ? (
                  <Image 
                    src={selectedMatch.team2.logo} 
                    alt={selectedMatch.team2.name} 
                    width={80} 
                    height={80} 
                  />
                ) : (
                  <span className="text-gray-400 text-lg">Select Team 2</span>
                )}
              </motion.div>
              {selectedMatch && (
                <motion.span 
                  className="text-white text-lg mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedMatch.team2.name}
                </motion.span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="bg-gray-200 rounded-lg p-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {prediction.isLoading ? (
              <motion.div 
                key="loading"
                className="flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
                </div>
                <div className="relative">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                    Predicting Outcome
                  </span>
                  <span className="inline-block animate-bounce ml-1">...</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="scores"
                className="flex justify-between items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center flex-1">
                  {prediction.team1Score !== null && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={`text-5xl font-bold ${selectedMatch.team1.name === prediction.winningTeam ? 'text-green-600' : 'text-gray-800'}`}
                    >
                      {prediction.team1Score}
                    </motion.div>
                  )}
                </div>

                {selectedMatch && !prediction.isLoading && prediction.team1Score !== null && (
                  <motion.button
                    onClick={() => {
                      setSelectedMatch(null);
                      setPrediction({ team1Score: null, team2Score: null, winningTeam: null, match_confidence: null });
                    }}
                    className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-1 group"
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

                <div className="text-center flex-1">
                  {prediction.team2Score !== null && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={`text-5xl font-bold ${selectedMatch.team2.name === prediction.winningTeam ? 'text-green-600' : 'text-gray-800'}`}
                    >
                      {prediction.team2Score}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {prediction.team1Score === null && !prediction.isLoading && (
            <motion.div 
              className="text-center mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-gray-500">
                Select both teams to see prediction
              </span>
            </motion.div>
          )}

          {prediction.team1Score !== null && !prediction.isLoading && (
            <motion.div 
              className="text-center mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col items-center space-y-3">
                <span className="text-lg font-bold text-green-600">
                  Winner: {prediction.winningTeam}
                </span>
                {prediction.match_confidence !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        Prediction Confidence
                      </span>
                      <div className="relative w-48 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.match_confidence}%` }}
                          transition={{ 
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.5
                          }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                            animate={{
                              x: ["0%", "200%"]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        </motion.div>
                      </div>
                      <motion.span
                        className="text-lg font-bold text-blue-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 1
                        }}
                      >
                        {prediction.match_confidence.toFixed(2)}%
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
