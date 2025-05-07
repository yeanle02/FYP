"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamInfoCard({
  role,       // "Captain" or "Coach"
  name,       // e.g. "Harris Andrews"
  imageSrc,   // e.g. "/Captain/Brisbane_Lions/Harris Andrews.png"
}) {
  return (
    <motion.div 
      className="bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition
                duration-300 px-4 py-6 flex items-center gap-4 h-[180px] w-[370px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Left: Role + Avatar */}
      <motion.div 
        className="flex flex-col items-center w-[120px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {role}
        </motion.div>
        <motion.div 
          className="w-[92px] h-[92px] relative rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Image
            src={imageSrc}
            alt={`${role} – ${name}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Right: Name */}
      <motion.div 
        className="pl-4 flex-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-xl font-semibold text-white">{name}</div>
      </motion.div>
    </motion.div>
  );
}
