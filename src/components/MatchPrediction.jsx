{/* Team 1 */}
<div className="text-center relative"></div>
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
  },
  {
    team1: { name: 'Western Bulldogs', logo: '/teams/Western_Bulldogs.png' },
    team2: { name: 'Collingwood', logo: '/teams/Collingwood.png' },
    time: '1:45 PM'
  },
  {
    team1: { name: 'Carlton', logo: '/teams/Carlton.svg' },
    team2: { name: 'Brisbane Lions', logo: '/teams/Brisbane_Lions.png' },
    time: '3:30 PM'
  },
  {
    team1: { name: 'Melbourne', logo: '/teams/Melbournefc.png' },
    team2: { name: 'Sydney', logo: '/teams/Sydney_Swans.png' },
    time: '5:15 PM'
  }
];

export function MatchPrediction() {
  const { teams, selectedTeams, prediction, selectTeam, resetPrediction } = useTeams();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [animatingLogos, setAnimatingLogos] = useState(false);

  const handleMatchSelect = async (match) => {
    if (animatingLogos) return;
    setSelectedMatch(match);
    setAnimatingLogos(true);

    const team1 = teams.find(t => t.name === match.team1.name);
    const team2 = teams.find(t => t.name === match.team2.name);

    setTimeout(() => {
      if (team1) selectTeam(team1, 'team1');
      if (team2) selectTeam(team2, 'team2');
      setTimeout(() => {
        setSelectedMatch(null);
        setAnimatingLogos(false);
      }, 300);
    }, 1000);
  };

  const handle3DHover = (e, matchElement) => {
    if (!matchElement) return;
    const rect = matchElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    matchElement.style.setProperty('--rotateX', `${rotateX}deg`);
    matchElement.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Prediction Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden ring-1 ring-gray-700/50">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-100 mb-2 text-center">
              Match Prediction
            </h2>
            <p className="text-gray-300 text-sm mb-6 text-center">
              Current Week - 17 April 2024 (Week 6)
            </p>
            
            <div className="flex justify-center items-center gap-8 mb-6">
              {/* Team 1 */}
              <div className="text-center relative">
                {selectedTeams.team1 ? (
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                        <Image
                          src={selectedTeams.team1.logo}
                          alt={selectedTeams.team1.name}
                          width={80}
                          height={80}
                          className="mb-2 rounded-full animate-fade-in-team mx-auto"
                        />
                      </div>
                    </div>
                    <span className="text-gray-300 font-semibold animate-fade-in-team block text-center mt-2">
                      {selectedTeams.team1.name}
                    </span>
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-700/20 rounded-full flex items-center justify-center hover:bg-gray-700/30 transition-colors duration-300">
                    <span className="text-gray-400 text-sm">Select Team 1</span>
                  </div>
                )}
              </div>

              <div className="text-4xl font-bold text-gray-200">VS</div>

              {/* Team 2 */}
              <div className="text-center relative">
                {selectedTeams.team2 ? (
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                        <Image
                          src={selectedTeams.team2.logo}
                          alt={selectedTeams.team2.name}
                          width={80}
                          height={80}
                          className="mb-2 rounded-full animate-fade-in-team mx-auto"
                        />
                      </div>
                    </div>
                    <span className="text-gray-300 font-semibold animate-fade-in-team block text-center mt-2">
                      {selectedTeams.team2.name}
                    </span>
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-700/20 rounded-full flex items-center justify-center hover:bg-gray-700/30 transition-colors duration-300">
                    <span className="text-gray-400 text-sm">Select Team 2</span>
                  </div>
                )}
              </div>
            </div>

            {/* Prediction Box */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-xl flex flex-col items-center border border-gray-300/50 backdrop-blur-sm relative transition-all duration-300 hover:shadow-2xl hover:border-gray-400/50 hover:bg-gray-100">
              <button
                onClick={resetPrediction}
                className="absolute top-2 right-2 px-3 py-1 text-sm bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Reset
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Predicted Score
              </h3>
              
              {prediction.team1Score !== null ? (
                <>
                  <div className="flex items-center gap-8 mb-6 transition-all duration-300">
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
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                          <Image
                            src={(prediction.team1Score > prediction.team2Score ? selectedTeams.team1 : selectedTeams.team2).logo}
                            alt="Winner"
                            width={72}
                            height={72}
                            className="rounded-full animate-fade-in-team"
                          />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600 mt-6 transition-all duration-300 hover:text-green-500">
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
      </div>

      {/* Match List Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-8 ring-1 ring-gray-600/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
            Today's Matches
          </h2>
          <div className="max-h-[500px] overflow-y-auto space-y-4 p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {mockMatches.map((match, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-700 to-gray-600 p-4 rounded-lg cursor-pointer match-box-3d 
                  border-t-2 border-gray-500 shadow-[0_10px_20px_rgba(0,0,0,0.3)]
                  hover:from-gray-600 hover:to-gray-500 transition-all duration-300 
                  hover:border-gray-400
                  ${selectedMatch === match ? 'animate-fly-up' : 'animate-box-appear'}
                `}
                style={{
                  boxShadow: selectedMatch === match ? '0 20px 30px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleMatchSelect(match)}
                onMouseMove={(e) => handle3DHover(e, e.currentTarget)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--rotateX', '0deg');
                  e.currentTarget.style.setProperty('--rotateY', '0deg');
                }}
              >
                <div className="flex items-center justify-between relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/10 before:rounded-lg before:pointer-events-none">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:bg-white transition-all duration-300">
                      <Image
                        src={match.team1.logo}
                        alt={match.team1.name}
                        width={50}
                        height={50}
                        className="rounded-full transform transition-transform group-hover:scale-110 duration-300"
                      />
                    </div>
                    <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center w-full">
                      {match.team1.name}
                    </span>
                  </div>

                  <div className="flex flex-col items-center mx-4">
                    <span className="text-gray-200 font-bold text-lg group-hover:text-white transition-colors duration-300">VS</span>
                    <span className="text-gray-300 text-sm mt-1 group-hover:text-white transition-colors duration-300">
                      {match.time}
                    </span>
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:bg-white transition-all duration-300">
                      <Image
                        src={match.team2.logo}
                        alt={match.team2.name}
                        width={50}
                        height={50}
                        className="rounded-full transform transition-transform group-hover:scale-110 duration-300"
                      />
                    </div>
                    <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center w-full">
                      {match.team2.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
