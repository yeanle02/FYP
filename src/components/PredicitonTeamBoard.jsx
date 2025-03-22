"use client";

export function Leaderboard() {
  const teams = [
    { position: 1, name: "Sydney Swans", logo: "teams/Sydney_Swans.png", score: 23 },
    { position: 2, name: "Port Adelaide", logo: "teams/Port_Adelaide.png", score: 23 },
    { position: 3, name: "Geelong Cats", logo: "teams/Geelong_Cats.png", score: 23 },
    { position: 4, name: "GWS GIANTS", logo: "teams/GWS_Giants.png", score: 23 },
    { position: 5, name: "Brisbane Lions", logo: "teams/Brisbane_Lions.png", score: 23 },
  ];

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-900 text-white text-lg font-bold flex justify-between items-center px-4 py-2">
        <span>Leaderboard</span>
        <span className="text-xl">➝</span>
      </div>
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Position</th>
            <th className="py-2 px-4 text-left">Team</th>
            <th className="py-2 px-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.position} className="border-b">
              <td className="py-2 px-4">{team.position}</td>
              <td className="py-2 px-4 flex items-center gap-2">
                <img src={team.logo} alt={team.name} className="w-5 h-5" />
                {team.name}
              </td>
              <td className="py-2 px-4 text-right font-bold">{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
