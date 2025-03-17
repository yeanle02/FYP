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
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Overall Stats
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">P</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">W</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">L</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">D</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">%</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topTeams.map((team, index) => (
              <tr 
                key={team.team}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-xs font-medium">{team.team.slice(0, 2)}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{team.team}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.played}</td>
                <td className="px-4 py-3 text-center text-sm text-green-600 font-medium">{team.wins}</td>
                <td className="px-4 py-3 text-center text-sm text-red-600 font-medium">{team.losses}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">{team.draws}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-900">{team.percentage.toFixed(1)}%</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {team.points}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamStats;
