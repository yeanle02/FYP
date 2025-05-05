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
  
  const { setHomeTeam, setAwayTeam, predictPageHandler } = usePredictionHandler();
  
  const selectMatch = async (match) => {
    setSelectedMatch(match);
    setHomeTeam(match.team1.name);
    setAwayTeam(match.team2.name);
    
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

  return (
    <div className="flex-1 w-full">
      {/* Match Scrollable List */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-4 ring-1 ring-gray-600/50">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Today's Matches
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

          {!selectedMatch && (
            <p className="text-center text-white">Select a match to view prediction.</p>
          )}

          {selectedMatch && prediction.team1Score !== null && (
            <div className="bg-gray-200 p-8 rounded-lg shadow-xl flex flex-col items-center border border-gray-300/50 backdrop-blur-sm relative transition-all duration-300 hover:shadow-2xl hover:border-gray-400/50 hover:bg-gray-100 w-full max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">Predicted Score</h3>
              <div className="grid grid-cols-2 gap-8 place-items-center mb-8 w-full max-w-md mx-auto">
                {[selectedMatch.team1, selectedMatch.team2].map((team, index) => (
                  <div key={team.name} className="flex flex-col items-center justify-center text-center">
                    <div className="w-[80px] h-[80px] flex items-center justify-center mb-4">
                      <Image src={team.logo} alt={team.name} width={60} height={60} 
                        className="object-contain transform transition-transform hover:scale-110 duration-300" />
                    </div>
                    <span className="text-gray-600 font-medium mb-2 text-center">{team.name}</span>
                    <div className={`text-3xl font-bold ${prediction.winningTeam === team.name ? 'text-green-600' : 'text-gray-700'}`}>
                      {index === 0 ? prediction.team1Score : prediction.team2Score}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center w-full">
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
  );
}
