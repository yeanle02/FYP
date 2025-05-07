"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTeamRankingHandler from "@/app/hooks/apiHandlers/useTeamRankingHandler";

export function TeamStats() {
  const {
    loading,
    errors,
    rankings,            // [{ name, K, G, FF, FA, CL, CG }, …]
    handleGetTeamRanking
  } = useTeamRankingHandler();

  useEffect(() => {
    handleGetTeamRanking();
  }, []);

  return (
    <div>
      <motion.div 
        className="bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg p-2 mb-4 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-1">Current Round</h2>
        <p className="text-gray-700 text-center">
          Round 23<br />
          20th August 2022
        </p>
      </motion.div>

      <div className="p-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg shadow-md">
        <div className="relative flex items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700 w-full text-center">
            Team Rankings
          </h2>
          <div className="absolute right-0 group/tooltip">
            <button
              className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="View abbreviation meanings"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-6 h-6 text-black"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-72 p-4 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10">
              <div className="text-sm text-gray-600 space-y-3">
                <p className="font-medium border-b border-gray-200 pb-2">
                  This table displays key performance statistics for each team, showing their effectiveness in different aspects of the game.
                </p>
                <p><span className="font-semibold">K:</span> Kicks - Number of times a player kicks the ball</p>
                <p><span className="font-semibold">G:</span> Goals - Number of goals scored</p>
                <p><span className="font-semibold">FF:</span> Free Kicks For - Free kicks awarded to the team</p>
                <p><span className="font-semibold">FA:</span> Free Kicks Against - Free kicks awarded against the team</p>
                <p><span className="font-semibold">CL:</span> Clearances - Number of times the team clears the ball from defense</p>
                <p><span className="font-semibold">CG:</span> Center Goal - Goals scored from the center of the field</p>
              </div>
              <div className="absolute right-0 top-0 transform -translate-y-2 translate-x-1/2">
                <div className="w-3 h-3 bg-white transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          {loading && <p className="text-center py-4">Loading rankings…</p>}
          {errors && (
            <p className="text-center text-red-600 py-4">
              Error: {errors}
            </p>
          )}

          {!loading && !errors && (
            <div className="overflow-y-auto max-h-[460px] min-h-[460px] p-2 custom-scrollbar scroll-smooth transition-[filter] duration-300 group-hover/tooltip:blur-md filter-none">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-300 to-gray-200 border-b border-gray-300/20">
                    <TableHead className="font-bold text-gray-700 px-1">
                      Team
                    </TableHead>
                    <TableHead className="text-center text-gray-700 px-1">K</TableHead>
                    <TableHead className="text-center text-gray-700 px-1">G</TableHead>
                    <TableHead className="text-center text-gray-700 px-1">
                      FF
                    </TableHead>
                    <TableHead className="text-center text-gray-700 px-1">
                      FA
                    </TableHead>
                    <TableHead className="text-center text-gray-700 px-1">
                      CL
                    </TableHead>
                    <TableHead className="text-center text-gray-700 px-1">
                      CG
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.map((team, idx) => (
                    <TableRow
                      key={team.name}
                      className="bg-gradient-to-r from-gray-300 to-gray-200 border-b border-gray-300/20"
                    >
                      <TableCell className="font-medium text-gray-700 px-1">
                        {team.name}
                      </TableCell>
                      <TableCell className="text-center text-gray-600 px-1">
                        {team.K}
                      </TableCell>
                      <TableCell className="text-center text-gray-600 px-1">
                        {team.G}
                      </TableCell>
                      <TableCell className="text-center text-gray-600 px-1">
                        {team.FF}
                      </TableCell>
                      <TableCell className="text-center text-gray-600 px-1">
                        {team.FA}
                      </TableCell>
                      <TableCell className="text-center text-gray-600 px-1">
                        {team.CL}
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-700 px-1">
                        {team.CG}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="text-center py-3">
            <span className="text-gray-600 text-sm animate-bounce inline-block bg-gradient-to-r from-gray-300 to-gray-200 px-4 py-1 rounded-full">
              Scroll for more rankings ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
