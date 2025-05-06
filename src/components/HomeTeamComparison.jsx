"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import usePredictionHandler from '@/app/hooks/apiHandlers/usePredictionHandler';

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

export function HomeTeamComparison() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null, winningTeam: null, isLoading: false });
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
    <div className="flex-1 w-full">
      {/* Match Scrollable List */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-2 ring-1 ring-gray-600/50 flex flex-col min-h-[420px] h-[calc(100vh-36rem)]">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Today's Matches
        </h2>
        <div ref={matchesContainerRef} className="flex-1 overflow-y-auto px-1 pb-2 custom-scrollbar scroll-smooth">
          <div className="flex flex-col gap-2">
            {placeholderMatches.map((match, idx) => (
              <div
                key={idx}
                onClick={async () => await selectMatch(match)}
                className="group h-28 bg-gradient-to-br from-gray-700 to-gray-600 p-3 rounded-lg cursor-pointer border border-gray-500
                shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:from-gray-600 hover:to-gray-500 transition-all duration-300 
                hover:border-gray-400 hover:shadow-[0_12px_20px_rgba(0,0,0,0.3)] flex items-center w-full"
              >
                <div className="flex items-center justify-center w-full gap-24">
                  <div className="flex flex-col items-center w-40">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300">
                      <Image src={match.team1.logo} width={55} height={55} alt={match.team1.name} 
                        className="rounded-full transform transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center">{match.team1.name}</span>
                  </div>
                  
                  <span className="text-gray-200 font-bold text-2xl group-hover:text-white transition-colors duration-300 w-16 text-center">VS</span>
                  
                  <div className="flex flex-col items-center w-40">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:bg-white transition-all duration-300">
                      <Image src={match.team2.logo} width={55} height={55} alt={match.team2.name} 
                        className="rounded-full transform transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center">{match.team2.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isScrollable && (
          <div className="relative mt-3 pb-1">
            <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
            <div className="text-center bg-gradient-to-t from-gray-800/10 to-transparent pt-1 pb-0.5 px-2 rounded-lg">
              <span className="text-gray-400 text-sm animate-bounce block cursor-default select-none hover:text-gray-300 transition-colors">
                Scroll for more matches ↓
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Match Prediction */}
      <div className="mt-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-4 ring-1 ring-gray-600/50">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Match Prediction</h2>
        <div className="flex justify-center items-center gap-24 mb-6">
          <div className="flex flex-col items-center group">
            <div className={`w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 
              ${selectedMatch && prediction.winningTeam ? (
                selectedMatch.team1.name === prediction.winningTeam
                  ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                  : 'border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)]'
              ) : 'border-gray-600 hover:border-gray-500'} transition-all group-hover:bg-white`}>
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
            </div>
            {selectedMatch && (
              <span className="text-white text-lg mt-3">{selectedMatch.team1.name}</span>
            )}
          </div>

          <span className="text-white text-xl font-bold mt-[-20px]">VS</span>

          <div className="flex flex-col items-center group">
            <div className={`w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 
              ${selectedMatch && prediction.winningTeam ? (
                selectedMatch.team2.name === prediction.winningTeam
                  ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                  : 'border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)]'
              ) : 'border-gray-600 hover:border-gray-500'} transition-all group-hover:bg-white`}>
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
            </div>
            {selectedMatch && (
              <span className="text-white text-lg mt-3">{selectedMatch.team2.name}</span>
            )}
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg p-4 relative">
          {prediction.isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
              </div>
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                  Predicting Outcome
                </span>
                <span className="inline-block animate-bounce ml-1">...</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div className="text-center flex-1">
                {prediction.team1Score !== null ? (
                  <div className={`text-5xl font-bold ${selectedMatch.team1.name === prediction.winningTeam ? 'text-green-600' : 'text-gray-800'}`}>
                    {prediction.team1Score}
                  </div>
                ) : null}
              </div>

              {selectedMatch && !prediction.isLoading && prediction.team1Score !== null && (
                <button
                  onClick={() => {
                    setSelectedMatch(null);
                    setPrediction({ team1Score: null, team2Score: null, winningTeam: null });
                  }}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-1 group"
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

              <div className="text-center flex-1">
                {prediction.team2Score !== null ? (
                  <div className={`text-5xl font-bold ${selectedMatch.team2.name === prediction.winningTeam ? 'text-green-600' : 'text-gray-800'}`}>
                    {prediction.team2Score}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {prediction.team1Score === null && !prediction.isLoading && (
            <div className="text-center mt-2">
              <span className="text-gray-500">
                Select both teams to see prediction
              </span>
            </div>
          )}

          {prediction.team1Score !== null && !prediction.isLoading && (
            <div className="text-center mt-3">
              <span className="text-lg font-semibold text-green-600">
                Winner: {prediction.winningTeam}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
