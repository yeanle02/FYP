import React from 'react';

// Static data for now - will be replaced with dynamic data later
const topTeams = [
  { team: 'Collingwood', played: 5, wins: 4, losses: 1, draws: 0, percentage: 125.5, points: 16 },
  { team: 'Carlton', played: 5, wins: 4, losses: 1, draws: 0, percentage: 120.8, points: 16 },
  { team: 'Brisbane Lions', played: 5, wins: 3, losses: 2, draws: 0, percentage: 118.2, points: 12 },
  { team: 'GWS Giants', played: 5, wins: 3, losses: 2, draws: 0, percentage: 115.6, points: 12 },
  { team: 'Melbourne', played: 5, wins: 3, losses: 2, draws: 0, percentage: 112.3, points: 12 },
];

const TeamStats: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Overall Stats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-center">P</th>
              <th className="px-4 py-2 text-center">W</th>
              <th className="px-4 py-2 text-center">L</th>
              <th className="px-4 py-2 text-center">D</th>
              <th className="px-4 py-2 text-center">%</th>
              <th className="px-4 py-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {topTeams.map((team, index) => (
              <tr 
                key={team.team}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2">{team.team}</td>
                <td className="px-4 py-2 text-center">{team.played}</td>
                <td className="px-4 py-2 text-center">{team.wins}</td>
                <td className="px-4 py-2 text-center">{team.losses}</td>
                <td className="px-4 py-2 text-center">{team.draws}</td>
                <td className="px-4 py-2 text-center">{team.percentage.toFixed(1)}</td>
                <td className="px-4 py-2 text-center font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamStats;
