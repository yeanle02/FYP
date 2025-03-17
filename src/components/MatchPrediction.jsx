"use client";

import Image from 'next/image';
import { useTeams } from '@/app/context/TeamContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MatchPrediction() {
  const { teams, selectedTeams, prediction, selectTeam } = useTeams();

  return (
    <div className="bg-orange-500 rounded-lg shadow-lg overflow-hidden">
      {/* Selection Top Bar */}
      <div className="bg-orange-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full justify-center">
          <Select onValueChange={(value) => {
            const team = teams.find(t => t.name === value);
            if (team) selectTeam(team, 'team1');
          }}>
            <SelectTrigger className="w-[200px] bg-orange-500 text-white border-orange-400">
              <SelectValue placeholder="Select Team 1" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.name} value={team.name}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-white font-bold">VS</span>

          <Select onValueChange={(value) => {
            const team = teams.find(t => t.name === value);
            if (team) selectTeam(team, 'team2');
          }}>
            <SelectTrigger className="w-[200px] bg-orange-500 text-white border-orange-400">
              <SelectValue placeholder="Select Team 2" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.name} value={team.name}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6">
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
                        className="rounded-full"
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
      </div>
    </div>
  );
}
