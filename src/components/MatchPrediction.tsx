import React, { useState } from 'react';

const MatchPrediction: React.FC = () => {
  const [selectedTeams, setSelectedTeams] = useState({
    teamA: null,
    teamB: null
  });

  const [predictedScore, setPredictedScore] = useState({
    teamA: 85,
    teamB: 78,
    winningTeam: 'teamA'
  });

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-8 w-full">
      {/* Current Week Display */}
      <div className="text-center mb-10">
        <div className="inline-block bg-white px-6 py-3 rounded-full shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">
            Current Week – 17 April 2024
            <span className="ml-2 text-red-600">(Week 6)</span>
          </h2>
        </div>
      </div>

      {/* Team Selection Area */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16 mb-10">
        {/* Team A */}
        <div className="text-center transform transition-all duration-300 hover:scale-105">
          <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center mb-4 cursor-pointer border-4 border-transparent hover:border-red-500">
            {selectedTeams.teamA ? (
              <img 
                src={`/team-logos/${selectedTeams.teamA}.png`} 
                alt="Team A Logo" 
                className="w-32 h-32 object-contain"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Select Team</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800">Team A</h3>
        </div>

        {/* VS Display */}
        <div className="flex flex-col items-center">
          <div className="bg-red-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
            VS
          </div>
          <div className="mt-4 text-sm text-gray-600">Round 6</div>
        </div>

        {/* Team B */}
        <div className="text-center transform transition-all duration-300 hover:scale-105">
          <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center mb-4 cursor-pointer border-4 border-transparent hover:border-red-500">
            {selectedTeams.teamB ? (
              <img 
                src={`/team-logos/${selectedTeams.teamB}.png`} 
                alt="Team B Logo" 
                className="w-32 h-32 object-contain"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Select Team</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800">Team B</h3>
        </div>
      </div>

      {/* Prediction Box */}
      <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <h3 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Predicted Score
        </h3>
        <div className="flex justify-between items-center">
          <div className={`text-center p-4 rounded-lg ${
            predictedScore.winningTeam === 'teamA' 
              ? 'bg-green-50 ring-2 ring-green-500' 
              : 'bg-gray-50'
          }`}>
            <p className="text-4xl font-bold mb-2">{predictedScore.teamA}</p>
            <p className="font-medium text-gray-600">Team A</p>
          </div>
          
          <div className="text-2xl font-bold text-gray-400 mx-8">VS</div>
          
          <div className={`text-center p-4 rounded-lg ${
            predictedScore.winningTeam === 'teamB' 
              ? 'bg-green-50 ring-2 ring-green-500' 
              : 'bg-gray-50'
          }`}>
            <p className="text-4xl font-bold mb-2">{predictedScore.teamB}</p>
            <p className="font-medium text-gray-600">Team B</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-blue-800 font-medium">
              {predictedScore.winningTeam === 'teamA' ? 'Team A' : 'Team B'} is predicted to win
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
