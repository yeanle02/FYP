"use client";

import Image from 'next/image';
import { useTeams } from '@/app/context/TeamContext';
import { useState } from 'react';

const mockMatches = [
  {
    team1: { name: 'Collingwood', logo: '/teams/Collingwood.png' },
    team2: { name: 'Carlton', logo: '/teams/Carlton.svg' },
    time: '2:30 PM'
  },
  {
    team1: { name: 'Brisbane Lions', logo: '/teams/Brisbane_Lions.png' },
    team2: { name: 'Melbourne', logo: '/teams/Melbournefc.png' },
    time: '4:45 PM'
  },
  {
    team1: { name: 'Sydney', logo: '/teams/Sydney_Swans.png' },
    team2: { name: 'Western Bulldogs', logo: '/teams/Western_Bulldogs.png' },
    time: '7:15 PM'
  }
];

export function MatchPrediction() {
  const { teams, selectedTeams, prediction, selectTeam } = useTeams();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [animatingLogos, setAnimatingLogos] = useState(false);

  const handleMatchSelect = async (match) => {
    if (animatingLogos) return; // Prevent multiple animations
    setSelectedMatch(match);
    setAnimatingLogos(true);

    const team1 = teams.find(t => t.name === match.team1.name);
    const team2 = teams.find(t => t.name === match.team2.name);

    // Wait for flying animation to complete before showing team selection
    setTimeout(() => {
      if (team1) selectTeam(team1, 'team1');
      if (team2) selectTeam(team2, 'team2');
      setTimeout(() => {
        setSelectedMatch(null);
        setAnimatingLogos(false);
      }, 300); // Match fade-in duration
    }, 900); // Slightly before animation ends to make it smoother
  };

  return (
    <div className="bg-orange-200 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
          Current Week - 17 April 2024 (Week 6)
        </h2>
        
        <div className="flex justify-center items-center gap-8 mb-6">
          {/* Team 1 */}
          <div className="text-center relative">
            {selectedTeams.team1 ? (
              <div className="text-center">
                <Image
                  src={selectedTeams.team1.logo}
                  alt={selectedTeams.team1.name}
                  width={100}
                  height={100}
                  className="mb-2 rounded-full animate-fade-in-team"
                />
                <span className="text-red-500 font-semibold animate-fade-in-team">{selectedTeams.team1.name}</span>
              </div>
            ) : (
              <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">Select Team 1</span>
              </div>
            )}
          </div>

          <div className="text-4xl font-bold text-red-500">VS</div>

          {/* Team 2 */}
          <div className="text-center relative">
            {selectedTeams.team2 ? (
              <div className="text-center">
                <Image
                  src={selectedTeams.team2.logo}
                  alt={selectedTeams.team2.name}
                  width={100}
                  height={100}
                  className="mb-2 rounded-full animate-fade-in-team"
                />
                <span className="text-red-500 font-semibold animate-fade-in-team">{selectedTeams.team2.name}</span>
              </div>
            ) : (
              <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">Select Team 2</span>
              </div>
            )}
          </div>
        </div>

        {/* Prediction Box */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Predicted Score
          </h3>
          
          {prediction.team1Score !== null ? (
            <>
              <div className="flex items-center gap-8 mb-6">
                <div className={`text-3xl font-bold ${prediction.team1Score > prediction.team2Score ? 'text-green-600' : 'text-gray-700'}`}>
                  {prediction.team1Score}
                </div>
                <div className="text-2xl text-gray-500">-</div>
                <div className={`text-3xl font-bold ${prediction.team2Score > prediction.team1Score ? 'text-green-600' : 'text-gray-700'}`}>
                  {prediction.team2Score}
                </div>
              </div>
              
              {/* Winner Display */}
              {selectedTeams.team1 && selectedTeams.team2 && (
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Image
                        src={(prediction.team1Score > prediction.team2Score ? selectedTeams.team1 : selectedTeams.team2).logo}
                        alt="Winner"
                        width={72}
                        height={72}
                        className="rounded-full animate-fade-in-team"
                      />
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600 mt-6">
                    {prediction.team1Score > prediction.team2Score ? selectedTeams.team1.name : selectedTeams.team2.name}
                  </span>
                </div>
              )}
            </>
          ) : (
            <span className="text-gray-500">Select both teams to see prediction</span>
          )}
        </div>

        {/* Scrollable Match List */}
        <div className="max-h-[400px] overflow-y-auto space-y-4 p-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50">
          {mockMatches.map((match, index) => (
            <div
              key={index}
              className={`bg-blue-800 p-4 rounded-lg shadow cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
                selectedMatch === match ? 'scale-[1.02] ring-2 ring-blue-400' : ''
              }`}
              onClick={() => handleMatchSelect(match)}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 transform transition-all duration-800 ${
                    selectedMatch === match ? 'animate-fly-to-team1' : ''
                  }`}>
                    <Image
                      src={match.team1.logo}
                      alt={match.team1.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-white text-sm font-semibold">{match.team1.name}</span>
                </div>

                <div className="flex flex-col items-center mx-4">
                  <span className="text-white font-bold text-lg">VS</span>
                  <span className="text-white text-sm mt-1">{match.time}</span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 transform transition-all duration-800 ${
                    selectedMatch === match ? 'animate-fly-to-team2' : ''
                  }`}>
                    <Image
                      src={match.team2.logo}
                      alt={match.team2.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-white text-sm font-semibold">{match.team2.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
