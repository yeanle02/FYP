"use client";

import Image from "next/image";
import Link from "next/link";
import { teams } from "@/app/data/teams"; 
import { motion } from "framer-motion";

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

const MotionLink = motion(Link);

export default function TeamsList() {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gray-200 py-8 px-12 w-full max-w-screen-2xl mx-auto rounded-2xl h-[80vh] overflow-y-scroll relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <div className="flex-1 overflow-y-auto">
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {teams.map((team, index) => (
                <MotionLink
                  key={index}
                  href={`/teams/memberinfo?teamName=${encodeURIComponent(team.name)}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-3 flex flex-col items-center justify-center h-[180px] cursor-pointer"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Logo */}
                  <motion.div 
                    className="w-36 h-36 relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Image
                      src={team.logo}
                      alt={team.name}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  {/* Name */}
                  <motion.p 
                    className="mt-4 text-[28px] text-gray-800 font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {team.name}
                  </motion.p>
                </MotionLink>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
