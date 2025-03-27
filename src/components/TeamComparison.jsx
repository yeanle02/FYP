// "use client";

// import Image from 'next/image';
// import { useState } from 'react';
// import { Radar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// //data
// const placeholderTeams = [
//   {
//     name: "Melbourne Demons",
//     logo: "/globe.svg",  
//     stats: [80, 70, 60, 90, 85],
//     historyPoints: 1200,
//     wins: 10,
//     losses: 5
//   },
//   {
//     name: "Richmond Tigers",
//     logo: "/globe.svg",  
//     stats: [85, 75, 70, 88, 80],
//     historyPoints: 1250,
//     wins: 12,
//     losses: 4
//   },
//   {
//     name: "Carlton Blues",
//     logo: "/globe.svg",  
//     stats: [75, 80, 65, 70, 78],
//     historyPoints: 1100,
//     wins: 8,
//     losses: 7
//   }
// ];

// export function TeamComparison() {
//   const [selectedTeams, setSelectedTeams] = useState({ team1: null, team2: null });
//   const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null });


//   const selectTeam = (team, slot) => {
//     const newSelectedTeams = { ...selectedTeams, [slot]: team };

//     setSelectedTeams(newSelectedTeams);

//     if (newSelectedTeams.team1 && newSelectedTeams.team2) {
//       const team1Score = Math.floor(Math.random() * 100);
//       const team2Score = Math.floor(Math.random() * 100);
//       setPrediction({ team1Score, team2Score });
//     }
//   };

//   const getRadarData = (team) => {
//     if (!team) return {
//       labels: ['Attack', 'Defense', 'Speed', 'Experience', 'Teamwork'],
//       datasets: [{
//         label: 'No Team Selected',
//         data: [0, 0, 0, 0, 0],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//       }],
//     };

//     return {
//       labels: ['Attack', 'Defense', 'Speed', 'Experience', 'Teamwork'],
//       datasets: [{
//         label: team.name,
//         data: team.stats || [50, 50, 50, 50, 50],
//         backgroundColor: 'rgba(34, 197, 94, 0.2)',
//         borderColor: 'rgba(34, 197, 94, 1)',
//       }],
//     };
//   };

//   return (
//     <div className="bg-orange-500 rounded-lg shadow-lg overflow-hidden">
//       <div className="bg-orange-600 p-4 flex items-center justify-between">
//         <div className="flex items-center gap-4 w-full justify-center">
//           <select
//             onChange={(e) => {
//               const team = placeholderTeams.find(t => t.name === e.target.value);
//               selectTeam(team, 'team1');
//             }}
//             className="w-[200px] bg-orange-500 text-white border border-orange-400 rounded px-2 py-1"
//           >
//             <option>Select Team 1</option>
//             {placeholderTeams.map((team) => (
//               <option key={team.name} value={team.name}>{team.name}</option>
//             ))}
//           </select>

//           <span className="text-white font-bold">VS</span>

//           <select
//             onChange={(e) => {
//               const team = placeholderTeams.find(t => t.name === e.target.value);
//               selectTeam(team, 'team2');
//             }}
//             className="w-[200px] bg-orange-500 text-white border border-orange-400 rounded px-2 py-1"
//           >
//             <option>Select Team 2</option>
//             {placeholderTeams.map((team) => (
//               <option key={team.name} value={team.name}>{team.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-white mb-6 text-center">
//           Current Week - 17 April 2024 (Week 6)
//         </h2>

//         <div className="flex justify-center items-start gap-8 mb-6">

//           <div className="text-center flex flex-col items-center w-[300px]">
//             {selectedTeams.team1 ? (
//               <>
//                 <Image
//                   src={selectedTeams.team1.logo}
//                   alt={selectedTeams.team1.name}
//                   width={100}
//                   height={100}
//                   className="mb-2"
//                 />
//                 <span className="text-white font-semibold">{selectedTeams.team1.name}</span>

 
//                 <div className="bg-white rounded-lg shadow mt-4 p-4 w-full">
//                   <Radar data={getRadarData(selectedTeams.team1)} />
//                 </div>

  
//                 <div className="mt-4 text-white text-sm">
//                   <p>History Points: {selectedTeams.team1.historyPoints}</p>
//                   <p>Wins: {selectedTeams.team1.wins}</p>
//                   <p>Losses: {selectedTeams.team1.losses}</p>
//                 </div>
//               </>
//             ) : (
//               <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center mb-2">
//                 <span className="text-white text-sm">Select Team 1</span>
//               </div>
//             )}
//           </div>


//           <div className="text-4xl font-bold text-white self-center">VS</div>


//           <div className="text-center flex flex-col items-center w-[300px]">
//             {selectedTeams.team2 ? (
//               <>
//                 <Image
//                   src={selectedTeams.team2.logo}
//                   alt={selectedTeams.team2.name}
//                   width={100}
//                   height={100}
//                   className="mb-2"
//                 />
//                 <span className="text-white font-semibold">{selectedTeams.team2.name}</span>


//                 <div className="bg-white rounded-lg shadow mt-4 p-4 w-full">
//                   <Radar data={getRadarData(selectedTeams.team2)} />
//                 </div>
//                 <div className="mt-4 text-white text-sm">
//                   <p>History Points: {selectedTeams.team2.historyPoints}</p>
//                   <p>Wins: {selectedTeams.team2.wins}</p>
//                   <p>Losses: {selectedTeams.team2.losses}</p>
//                 </div>
//               </>
//             ) : (
//               <div className="w-[100px] h-[100px] bg-white/20 rounded-full flex items-center justify-center mb-2">
//                 <span className="text-white text-sm">Select Team 2</span>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Predicted Score
//           </h3>

//           {prediction.team1Score !== null ? (
//             <>
//               <div className="flex items-center gap-8 mb-6">
//                 <div className={`text-3xl font-bold ${prediction.team1Score > prediction.team2Score ? 'text-green-600' : 'text-gray-700'}`}>
//                   {prediction.team1Score}
//                 </div>
//                 <div className="text-2xl text-gray-500">-</div>
//                 <div className={`text-3xl font-bold ${prediction.team2Score > prediction.team1Score ? 'text-green-600' : 'text-gray-700'}`}>
//                   {prediction.team2Score}
//                 </div>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="relative w-20 h-20">
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
//                     <Image
//                       src={(prediction.team1Score > prediction.team2Score ? selectedTeams.team1 : selectedTeams.team2).logo}
//                       alt="Winner"
//                       width={72}
//                       height={72}
//                       className="rounded-full"
//                     />
//                   </div>
//                 </div>
//                 <span className="text-lg font-bold text-green-600 mt-6">
//                   {prediction.team1Score > prediction.team2Score
//                     ? selectedTeams.team1.name
//                     : selectedTeams.team2.name}
//                 </span>
//               </div>
//             </>
//           ) : (
//             <span className="text-gray-500">Select both teams to see prediction</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


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
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Navbar } from "@/components/Navbar";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const placeholderTeams = [
  {
    name: "Melbourne Demons",
    logo: "/teams/Melbournefc.png",
    stats: [80, 70, 60, 90, 85],
    historyPoints: 1200,
    wins: 10,
    losses: 5,
    rank: 1,
    movedUp: true
  },
  {
    name: "Richmond Tigers",
    logo: "/teams/Richmond_Tigers.png",
    stats: [85, 75, 70, 88, 80],
    historyPoints: 1250,
    wins: 12,
    losses: 4,
    rank: 2,
    movedUp: false
  },
  {
    name: "Carlton Blues",
    logo: "/teams/Carlton.svg",
    stats: [75, 80, 65, 70, 78],
    historyPoints: 1100,
    wins: 8,
    losses: 7,
    rank: 3,
    movedUp: true
  },
  {
    name: "Sydney Swans",
    logo: "/teams/Sydney_Swans.png",
    stats: [70, 85, 60, 75, 80],
    historyPoints: 1150,
    wins: 9,
    losses: 6,
    rank: 4,
    movedUp: false
  },
  {
    name: "Brisbane Lions",
    logo: "/teams/Brisbane_Lions.png",
    stats: [82, 78, 74, 86, 79],
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

export function TeamComparison() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState({ team1Score: null, team2Score: null });

  const selectMatch = (match) => {
    setSelectedMatch(match);
    const team1Score = Math.floor(Math.random() * 100);
    const team2Score = Math.floor(Math.random() * 100);
    setPrediction({ team1Score, team2Score });
  };

  const getRadarData = (team) => {
    return {
      labels: ['Attack', 'Defense', 'Speed', 'Experience', 'Teamwork'],
      datasets: [
        {
          label: team?.name || 'No Team Selected',
          data: team?.stats || [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(99, 102, 241, 0.3)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)'
        }
      ]
    };
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Leaderboard */}
          <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full xl:w-72 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Leaderboard</h3>
            {placeholderTeams.sort((a, b) => a.rank - b.rank).map((team) => (
              <div key={team.name} className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">#{team.rank}</span>
                  <Image src={team.logo} alt={team.name} width={24} height={24} />
                  <span className="text-gray-200 text-sm">{team.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {team.movedUp ? <ArrowUp size={16} className="text-green-400" /> : <ArrowDown size={16} className="text-red-400" />}
                  <span className="text-gray-300 text-sm">{team.historyPoints}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Section - Match List + Prediction */}
          <div className="flex-1 w-full">
            {/* Match Scrollable List */}
            <div className="overflow-x-auto bg-gray-900 py-6 px-4 rounded-lg">
              <div className="flex gap-4 min-w-full">
                {placeholderMatches.map((match, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectMatch(match)}
                    className="min-w-[300px] bg-gray-800 hover:bg-gray-700 p-4 rounded-lg cursor-pointer shadow-md"
                  >
                    <div className="flex flex-col items-center">
                      <Image src={match.team1.logo} width={40} height={40} alt={match.team1.name} />
                      <span className="text-white text-sm mt-1">{match.team1.name}</span>
                      <span className="text-white font-bold my-2">VS</span>
                      <Image src={match.team2.logo} width={40} height={40} alt={match.team2.name} />
                      <span className="text-white text-sm mt-1">{match.team2.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prediction Panel */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Team Comparison & Prediction
                </h2>

                {selectedMatch ? (
                  <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mb-6">
                    {[selectedMatch.team1, selectedMatch.team2].map((team) => (
                      <div key={team.name} className="text-center flex flex-col items-center w-full lg:w-[300px]">
                        <div className="w-[100px] h-[100px] flex items-center justify-center mb-2">
                          <Image src={team.logo} alt={team.name} width={80} height={80} className="object-contain" />
                        </div>
                        <span className="text-white font-semibold">{team.name}</span>
                        <div className="bg-gray-900 rounded-lg shadow mt-4 p-4 w-full h-[300px]">
                          <Radar
                            data={getRadarData(team)}
                            options={{
                              maintainAspectRatio: false,
                              scales: {
                                r: {
                                  angleLines: { color: '#444' },
                                  grid: { color: '#333' },
                                  pointLabels: { color: '#ccc' },
                                  ticks: { backdropColor: 'transparent', color: '#999' }
                                }
                              },
                              plugins: {
                                legend: { labels: { color: '#ddd' } }
                              }
                            }}
                          />
                        </div>
                        <div className="mt-4 text-white text-sm">
                          <p>History Points: {team.historyPoints}</p>
                          <p>Wins: {team.wins}</p>
                          <p>Losses: {team.losses}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-white">Select a match to view prediction.</p>
                )}

                {selectedMatch && prediction.team1Score !== null && (
                  <div className="bg-gray-700 p-4 rounded-lg shadow flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Predicted Score</h3>
                    <div className="flex items-center gap-8 mb-6">
                      <div className={`text-3xl font-bold ${prediction.team1Score > prediction.team2Score ? 'text-green-400' : 'text-gray-300'}`}>
                        {prediction.team1Score}
                      </div>
                      <div className="text-2xl text-gray-400">-</div>
                      <div className={`text-3xl font-bold ${prediction.team2Score > prediction.team1Score ? 'text-green-400' : 'text-gray-300'}`}>
                        {prediction.team2Score}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-900 rounded-full shadow-lg flex items-center justify-center">
                          <Image
                            src={(prediction.team1Score > prediction.team2Score ? selectedMatch.team1 : selectedMatch.team2).logo}
                            alt="Winner"
                            width={72}
                            height={72}
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-400 mt-6">
                        {prediction.team1Score > prediction.team2Score
                          ? selectedMatch.team1.name
                          : selectedMatch.team2.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
