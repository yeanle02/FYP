"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHeader";
import TeamInfoCard from "@/components/TeamInfoCard";
import useTeamMemberHandler from "../../hooks/apiHandlers/useTeamMemberHandler";
import useTeamLeadersHandler from "../../hooks/apiHandlers/useTeamLeadersHandler";
import { teams } from "@/app/data/teams";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

export default function MemberInfoPage() {
  const searchParams = useSearchParams();
  const teamName = searchParams.get("teamName") || "Unknown Team";

  const { loading: tmLoading, errors: tmErrors, results: tmResults, setTeamName, handleGetTeamMembers } = useTeamMemberHandler();
  const { results:leaderResults, handleGetTeamLeaders } = useTeamLeadersHandler();

 
  useEffect(() => {
    handleGetTeamMembers(teamName);
    handleGetTeamLeaders(teamName);
  }, [teamName]);

  const teamInfo = teams.find((t) => t.name === teamName) || { name: teamName, logo: "/default-logo.png" };

  return (
    <>
      <motion.main className="min-h-screen bg-gray-100 page-enter">
        <Navbar />
        <div className="w-full">
          <TeamHeader teamName={teamInfo.name} homeVenue="SCG" teamLogo={teamInfo.logo} />
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="max-w-8xl mx-auto flex gap-10">
        
            <div className="w-[360px] flex flex-col gap-6">
              <TeamInfoCard
                role="Captain"
                name={leaderResults.Captain}
                imageSrc={`/Captain/${encodeURIComponent(teamName)}/${encodeURIComponent(leaderResults.Captain)}.png`}
                link="#"
              />
              <TeamInfoCard
                role="Coach"
                name={leaderResults.Coach}
                imageSrc={`/Coach/${encodeURIComponent(teamName)}/${encodeURIComponent(leaderResults.Coach)}.png`}
                link="#"
              />
            </div>
          
          <motion.div 
            className="flex-1 pr-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {tmLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-40"
                >
                  <p className="text-gray-600 text-lg">Loading team members...</p>
                </motion.div>
              )}

              {tmErrors && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-40"
                >
                  <p className="text-red-600 text-lg">Error: {tmErrors}</p>
                </motion.div>
              )}

              {tmResults && Array.isArray(tmResults) && (
                <motion.div 
                  className="flex flex-col min-h-screen overflow-x-hidden"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex-1 overflow-y-auto">
                    <motion.div className="grid grid-cols-2 gap-6">
                      {tmResults.map((player, index) => (
                        <motion.div
                          key={player._id || index}
                          className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between h-[180px]"
                          variants={cardVariants}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="text-[26px] text-gray-800 font-semibold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {player.Name}
                          </motion.div>
                      
                          <motion.div 
                            className="mt-auto mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="grid grid-cols-5 text-sm text-gray-400">
                              <span className="text-center">Position</span>
                              <span className="text-center"></span>
                              <span className="text-center">Age</span>
                              <span className="text-center"></span>
                              <span className="text-center">Games</span>
                            </div>
                            <motion.div 
                              className="grid grid-cols-5 text-[20px] text-gray-600 mt-1"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <span className="text-center">{player.Position || "N/A"}</span>
                              <span className="text-center">|</span>
                              <span className="text-center">{player.Age}</span>
                              <span className="text-center">|</span>
                              <span className="text-center">{player.Games}</span>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      </motion.main>
    </>
  );
}