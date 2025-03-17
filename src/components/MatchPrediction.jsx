"use client";

import Image from 'next/image';
import { useTeams } from '@/app/context/TeamContext';

export function MatchPrediction() {
  const { selectedTeams, prediction } = useTeams();

  return (
    <div className="bg-orange-500 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Current Week - 17 April 2024 (Week 6)
      </h2>
      
      <div className="flex justify-center items-center gap-8 mb-6">
        {/* Team 1 */}
        <div className="text-center">
          {selectedTeams.team1 ? (
            <div className="text-center">
              <Image
                src={selectedTeams.team1.logo}
                alt={selectedTeams.team1.name}
                width={100}
                height={100}
                className="mb-2"
              />
              <span className="text-white font-semibold">{selectedTeams.team1.name}</span>
            </div>
          ) : (
            <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">Select Team 1</span>
            </div>
          )}
        </div>

        <div className="text-4xl font-bold text-white">VS</div>

        {/* Team 2 */}
        <div className="text-center">
          {selectedTeams.team2 ? (
            <div className="text-center">
              <Image
                src={selectedTeams.team2.logo}
                alt={selectedTeams.team2.name}
                width={100}
                height={100}
                className="mb-2"
              />
              <span className="text-white font-semibold">{selectedTeams.team2.name}</span>
            </div>
          ) : (
            <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">Select Team 2</span>
            </div>
          )}
        </div>
      </div>

      {/* Prediction Box */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Predicted Score
        </h3>
        
        <div className="flex justify-center items-center gap-4">
          {prediction.team1Score !== null ? (
            <div className="flex items-center gap-8">
              <div className={`text-2xl font-bold ${prediction.team1Score > prediction.team2Score ? 'text-green-600' : 'text-gray-700'}`}>
                {prediction.team1Score}
              </div>
              <div className="text-xl text-gray-500">-</div>
              <div className={`text-2xl font-bold ${prediction.team2Score > prediction.team1Score ? 'text-green-600' : 'text-gray-700'}`}>
                {prediction.team2Score}
              </div>
            </div>
          ) : (
            <span className="text-gray-500">Select both teams to see prediction</span>
          )}
        </div>
      </div>
    </div>
  );
}
