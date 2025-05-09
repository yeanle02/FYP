import Image from 'next/image';
import { useTeams } from '@/app/context/TeamContext';
import { useState } from 'react';
import usePredictionHandler from '@/app/hooks/apiHandlers/usePredictionHandler';
import { motion, AnimatePresence } from 'framer-motion';

const mockMatches = [
  {
    team1: { name: 'Collingwood', logo: '/teams/Collingwood_Magpies.png' },
    team2: { name: 'Carlton', logo: '/teams/Carlton.svg' },
    time: '2:30 PM'
  },
  {
    team1: { name: 'Brisbane Lions', logo: '/teams/Brisbane_Lions.png' },
    team2: { name: 'Melbourne', logo: '/teams/Melbourne_Demons.png' },
    time: '4:45 PM'
  },
  {
    team1: { name: 'Sydney Swans', logo: '/teams/Sydney_Swans.png' },
    team2: { name: 'Western Bulldogs', logo: '/teams/Western_Bulldogs.png' },
    time: '7:15 PM'
  },
  {
    team1: { name: 'Western Bulldogs', logo: '/teams/Western_Bulldogs.png' },
    team2: { name: 'Collingwood', logo: '/teams/Collingwood_Magpies.png' },
    time: '1:45 PM'
  },
  {
    team1: { name: 'Carlton', logo: '/teams/Carlton.svg' },
    team2: { name: 'Brisbane Lions', logo: '/teams/Brisbane_Lions.png' },
    time: '3:30 PM'
  },
  {
    team1: { name: 'Melbourne', logo: '/teams/Melbourne_Demons.png' },
    team2: { name: 'Sydney Swans', logo: '/teams/Sydney_Swans.png' },
    time: '5:15 PM'
  }
];

export function MatchPrediction() {
  const { teams, selectedTeams, prediction, selectTeam, resetPrediction } = useTeams();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [animatingLogos, setAnimatingLogos] = useState(false);

  const {
    loading,
    errors,
    results,
    setHomeTeam,
    setAwayTeam,
    predictPageHandler
  } = usePredictionHandler();

  const handleMatchSelect = async (match) => {
    if (animatingLogos) return;
    setSelectedMatch(match);
    setAnimatingLogos(true);

    const team1 = teams.find(t => t.name === match.team1.name);
    const team2 = teams.find(t => t.name === match.team2.name);

    setHomeTeam(team1.name);
    setAwayTeam(team2.name);

    setTimeout(() => {
      if (team1) selectTeam(team1, 'team1');
      if (team2) selectTeam(team2, 'team2');

      predictPageHandler()
      .then(({ home_score, away_score, winning_team, match_confidence }) => {
        setPrediction({
          team1Score: home_score,
          team2Score: away_score,
          match_confidence: match_confidence
        });
        console.log("Home Score:", home_score);
        console.log("Away Score:", away_score);
        console.log("Winning Team:", winning_team);
        console.log("Match Confidence:", match_confidence);
      })
      .catch(errors => {
        console.error("Error making prediction:", errors);
      });
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
    <motion.div 
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Prediction Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden ring-1 ring-gray-700/50">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-2xl font-bold text-gray-100 mb-2 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Match Prediction
            </motion.h2>
            
            <motion.div 
              className="flex justify-center items-center gap-8 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Team 1 */}
              <motion.div 
                className="text-center relative"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedTeams.team1 ? (
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Image
                          src={selectedTeams.team1.logo}
                          alt={selectedTeams.team1.name}
                          width={80}
                          height={80}
                          className="mb-2 rounded-full animate-fade-in-team mx-auto"
                        />
                      </motion.div>
                    </div>
                    <motion.span 
                      className="text-gray-300 font-semibold animate-fade-in-team block text-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedTeams.team1.name}
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-[100px] h-[100px] bg-gray-700/20 rounded-full flex items-center justify-center hover:bg-gray-700/30 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <span className="text-gray-400 text-sm">Select Team 1</span>
                  </motion.div>
                )}
              </motion.div>

              <motion.div 
                className="text-4xl font-bold text-gray-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                VS
              </motion.div>

              {/* Team 2 */}
              <motion.div 
                className="text-center relative"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedTeams.team2 ? (
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Image
                          src={selectedTeams.team2.logo}
                          alt={selectedTeams.team2.name}
                          width={80}
                          height={80}
                          className="mb-2 rounded-full animate-fade-in-team mx-auto"
                        />
                      </motion.div>
                    </div>
                    <motion.span 
                      className="text-gray-300 font-semibold animate-fade-in-team block text-center mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedTeams.team2.name}
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-[100px] h-[100px] bg-gray-700/20 rounded-full flex items-center justify-center hover:bg-gray-700/30 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <span className="text-gray-400 text-sm">Select Team 2</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Prediction Box */}
            <motion.div 
              className="bg-gray-200 p-6 rounded-lg shadow-xl flex flex-col items-center border border-gray-300/50 backdrop-blur-sm relative transition-all duration-300 hover:shadow-2xl hover:border-gray-400/50 hover:bg-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={resetPrediction}
                className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-600 text-gray-200 rounded-md hover:bg-red-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Predicted Score
              </h3>
              
              <AnimatePresence mode="wait">
                {prediction.team1Score !== null ? (
                  <motion.div
                    key="prediction"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div className="flex items-center gap-8 mb-6 transition-all duration-300">
                      <motion.div
                        className={`text-3xl font-bold ${prediction.team1Score > prediction.team2Score ? 'text-green-600' : 'text-gray-700'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        {prediction.team1Score}
                      </motion.div>
                      <div className="text-2xl text-gray-500">-</div>
                      <motion.div
                        className={`text-3xl font-bold ${prediction.team2Score > prediction.team1Score ? 'text-green-600' : 'text-gray-700'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        {prediction.team2Score}
                      </motion.div>
                    </motion.div>
                    
                    {/* Confidence Display */}
                    {prediction.match_confidence !== undefined && (
                      <motion.div
                        className="mb-4 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-gray-600 font-medium">Prediction Confidence</span>
                          <div className="relative w-48 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${prediction.match_confidence}%` }}
                              transition={{ 
                                duration: 1,
                                ease: "easeOut",
                                delay: 0.5
                              }}
                            >
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                animate={{
                                  x: ["0%", "200%"]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              />
                            </motion.div>
                          </div>
                          <motion.span
                            className="text-lg font-bold text-blue-600"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 1
                            }}
                          >
                            {prediction.match_confidence.toFixed(2)}%
                          </motion.span>
                        </div>
                      </motion.div>
                    )}

                    {/* Winner/Draw Display */}
                    {selectedTeams.team1 && selectedTeams.team2 && (
                      <motion.div 
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {prediction.team1Score === prediction.team2Score ? (
                          // Draw Display
                          <motion.div 
                            className="flex gap-4 items-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          >
                            <div className="relative w-16 h-16">
                              <motion.div
                                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-200 rounded-full shadow-lg flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                              >
                                <Image
                                  src={selectedTeams.team1.logo}
                                  alt="Team 1"
                                  width={60}
                                  height={60}
                                  className="rounded-full"
                                />
                              </motion.div>
                            </div>
                            <div className="relative w-16 h-16">
                              <motion.div
                                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-200 rounded-full shadow-lg flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                              >
                                <Image
                                  src={selectedTeams.team2.logo}
                                  alt="Team 2"
                                  width={60}
                                  height={60}
                                  className="rounded-full"
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        ) : (
                          // Winner Display
                          <motion.div 
                            className="relative w-20 h-20"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          >
                            <motion.div
                              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-full shadow-lg flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <Image
                                src={(prediction.team1Score > prediction.team2Score ? selectedTeams.team1 : selectedTeams.team2).logo}
                                alt="Winner"
                                width={72}
                                height={72}
                                className="rounded-full"
                              />
                            </motion.div>
                          </motion.div>
                        )}
                        <motion.span 
                          className="text-lg font-bold text-green-600 mt-6 transition-all duration-300 hover:text-green-500"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {prediction.team1Score === prediction.team2Score 
                            ? "Draw" 
                            : (prediction.team1Score > prediction.team2Score ? selectedTeams.team1.name : selectedTeams.team2.name)
                          }
                        </motion.span>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.span
                    key="placeholder"
                    className="text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Select both teams to see prediction
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Match List Section */}
      <motion.div 
        className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl p-6 ring-1 ring-gray-600/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="w-full">
          <motion.h2 
            className="text-2xl font-bold text-gray-100 mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Today's Matches
          </motion.h2>
          <div className="relative">
            <div className="max-h-[calc(100vh-620px)] min-h-[250px] overflow-y-auto space-y-2 p-2 custom-scrollbar scroll-smooth">
              {mockMatches.map((match, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`group bg-gradient-to-br from-gray-700 to-gray-600 py-2.5 px-3 rounded-lg cursor-pointer match-box-3d 
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
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/10 before:rounded-lg before:pointer-events-none">
                      <div className="flex flex-col items-center flex-1">
                        <motion.div 
                          className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:bg-white transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Image
                            src={match.team1.logo}
                            alt={match.team1.name}
                            width={50}
                            height={50}
                            className="rounded-full transform transition-transform group-hover:scale-110 duration-300"
                          />
                        </motion.div>
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
                        <motion.div 
                          className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 shadow-lg group-hover:bg-white transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Image
                            src={match.team2.logo}
                            alt={match.team2.name}
                            width={50}
                            height={50}
                            className="rounded-full transform transition-transform group-hover:scale-110 duration-300"
                          />
                        </motion.div>
                        <span className="text-gray-200 text-sm font-semibold group-hover:text-white transition-colors duration-300 text-center w-full">
                          {match.team2.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
            <div className="text-center mt-2">
              <motion.span 
                className="text-gray-400 text-sm block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Scroll for more matches ↓
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
