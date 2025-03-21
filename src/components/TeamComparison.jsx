"use client";

import Image from 'next/image';
import { useState } from 'react';
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

//data
const placeholderTeams = [
  {
    name: "Melbourne Demons",
    logo: "/globe.svg",  
    stats: [80, 70, 60, 90, 85],
    historyPoints: 1200,
    wins: 10,
    losses: 5
  },
  {
    name: "Richmond Tigers",
    logo: "/globe.svg",  
    stats: [85, 75, 70, 88, 80],
    historyPoints: 1250,
    wins: 12,
    losses: 4
  },
  {
    name: "Carlton Blues",
    logo: "/globe.svg",  
    stats: [75, 80, 65, 70, 78],
    historyPoints: 1100,
    wins: 8,
    losses: 7
  }
];

export function TeamComparison() {
  const [selectedTeams, setSelectedTeams] = useState({ team1: null, team2: null });
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null });


  const selectTeam = (team, slot) => {
    const newSelectedTeams = { ...selectedTeams, [slot]: team };

    setSelectedTeams(newSelectedTeams);

    if (newSelectedTeams.team1 && newSelectedTeams.team2) {
      const team1Score = Math.floor(Math.random() * 100);
      const team2Score = Math.floor(Math.random() * 100);
      setPrediction({ team1Score, team2Score });
    }
  };

  const getRadarData = (team) => {
    if (!team) return {
      labels: ['Attack', 'Defense', 'Speed', 'Experience', 'Teamwork'],
      datasets: [{
        label: 'No Team Selected',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }],
    };

    return {
      labels: ['Attack', 'Defense', 'Speed', 'Experience', 'Teamwork'],
      datasets: [{
        label: team.name,
        data: team.stats || [50, 50, 50, 50, 50],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
      }],
    };
  };

  return (
    <div className="bg-orange-500 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-orange-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full justify-center">
          <select
            onChange={(e) => {
              const team = placeholderTeams.find(t => t.name === e.target.value);
              selectTeam(team, 'team1');
            }}
            className="w-[200px] bg-orange-500 text-white border border-orange-400 rounded px-2 py-1"
          >
            <option>Select Team 1</option>
            {placeholderTeams.map((team) => (
              <option key={team.name} value={team.name}>{team.name}</option>
            ))}
          </select>

          <span className="text-white font-bold">VS</span>

          <select
            onChange={(e) => {
              const team = placeholderTeams.find(t => t.name === e.target.value);
              selectTeam(team, 'team2');
            }}
            className="w-[200px] bg-orange-500 text-white border border-orange-400 rounded px-2 py-1"
          >
            <option>Select Team 2</option>
            {placeholderTeams.map((team) => (
              <option key={team.name} value={team.name}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Current Week - 17 April 2024 (Week 6)
        </h2>

        <div className="flex justify-center items-start gap-8 mb-6">

          <div className="text-center flex flex-col items-center w-[300px]">
            {selectedTeams.team1 ? (
              <>
                <Image
                  src={selectedTeams.team1.logo}
                  alt={selectedTeams.team1.name}
                  width={100}
                  height={100}
                  className="mb-2"
                />
                <span className="text-white font-semibold">{selectedTeams.team1.name}</span>

 
                <div className="bg-white rounded-lg shadow mt-4 p-4 w-full">
                  <Radar data={getRadarData(selectedTeams.team1)} />
                </div>

  
                <div className="mt-4 text-white text-sm">
                  <p>History Points: {selectedTeams.team1.historyPoints}</p>
                  <p>Wins: {selectedTeams.team1.wins}</p>
                  <p>Losses: {selectedTeams.team1.losses}</p>
                </div>
              </>
            ) : (
              <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-sm">Select Team 1</span>
              </div>
            )}
          </div>


          <div className="text-4xl font-bold text-white self-center">VS</div>


          <div className="text-center flex flex-col items-center w-[300px]">
            {selectedTeams.team2 ? (
              <>
                <Image
                  src={selectedTeams.team2.logo}
                  alt={selectedTeams.team2.name}
                  width={100}
                  height={100}
                  className="mb-2"
                />
                <span className="text-white font-semibold">{selectedTeams.team2.name}</span>


                <div className="bg-white rounded-lg shadow mt-4 p-4 w-full">
                  <Radar data={getRadarData(selectedTeams.team2)} />
                </div>
                <div className="mt-4 text-white text-sm">
                  <p>History Points: {selectedTeams.team2.historyPoints}</p>
                  <p>Wins: {selectedTeams.team2.wins}</p>
                  <p>Losses: {selectedTeams.team2.losses}</p>
                </div>
              </>
            ) : (
              <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-sm">Select Team 2</span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
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
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Image
                      src={(prediction.team1Score > prediction.team2Score ? selectedTeams.team1 : selectedTeams.team2).logo}
                      alt="Winner"
                      width={72}
                      height={72}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600 mt-6">
                  {prediction.team1Score > prediction.team2Score
                    ? selectedTeams.team1.name
                    : selectedTeams.team2.name}
                </span>
              </div>
            </>
          ) : (
            <span className="text-gray-500">Select both teams to see prediction</span>
          )}
        </div>
      </div>
    </div>
  );
}
