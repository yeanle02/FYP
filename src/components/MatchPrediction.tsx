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
    <div className="bg-orange-100 rounded-lg shadow-lg p-6 w-full">
      {/* Current Week Display */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold font-['Arial']">
          Current Week – 17 April 2024 (Week 6)
        </h2>
      </div>

      {/* Team Selection Area */}
      <div className="flex justify-center items-center space-x-12 mb-8">
        {/* Team A */}
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mb-2">
            {selectedTeams.teamA ? (
              <img 
                src={`/team-logos/${selectedTeams.teamA}.png`} 
                alt="Team A Logo" 
                className="w-24 h-24 object-contain"
              />
            ) : (
              <div className="text-gray-400">Select Team A</div>
            )}
          </div>
          <h3 className="text-lg font-semibold">Team A</h3>
        </div>

        {/* VS Text */}
        <div className="text-2xl font-bold">VS</div>

        {/* Team B */}
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mb-2">
            {selectedTeams.teamB ? (
              <img 
                src={`/team-logos/${selectedTeams.teamB}.png`} 
                alt="Team B Logo" 
                className="w-24 h-24 object-contain"
              />
            ) : (
              <div className="text-gray-400">Select Team B</div>
            )}
          </div>
          <h3 className="text-lg font-semibold">Team B</h3>
        </div>
      </div>

      {/* Prediction Box */}
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-center text-xl font-semibold mb-4">Predicted Score</h3>
        <div className="flex justify-between items-center">
          <div className={`text-center ${predictedScore.winningTeam === 'teamA' ? 'text-green-600 font-bold' : ''}`}>
            <p className="text-2xl">{predictedScore.teamA}</p>
            <p>Team A</p>
          </div>
          <div className="text-xl font-bold">-</div>
          <div className={`text-center ${predictedScore.winningTeam === 'teamB' ? 'text-green-600 font-bold' : ''}`}>
            <p className="text-2xl">{predictedScore.teamB}</p>
            <p>Team B</p>
          </div>
        </div>
        <p className="text-center mt-4 text-sm text-gray-600">
          {predictedScore.winningTeam === 'teamA' ? 'Team A' : 'Team B'} is predicted to win
        </p>
      </div>
    </div>
  );
};

export default MatchPrediction;
