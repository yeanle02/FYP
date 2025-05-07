"use client";

import { useEffect } from "react";
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
<<<<<<< HEAD
      <div className="p-4 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shadow-xl border border-gray-500 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Current Round</h2>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-600">Round 23</div>
          <div className="text-gray-600">20th August 2022</div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shadow-xl border border-gray-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Team Rankings</h2>
=======
      {/* …Current Round panel unchanged… */}

      <div className="p-4 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shadow-xl ring-1 ring-gray-300/50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          Team Rankings
        </h2>
>>>>>>> teampage
        <div className="relative">
          {loading && <p className="text-center py-4">Loading rankings…</p>}
          {errors && (
            <p className="text-center text-red-600 py-4">
              Error: {errors}
            </p>
          )}

          {!loading && !errors && (
            <div className="overflow-y-auto max-h-[500px] min-h-[500px] p-2 custom-scrollbar scroll-smooth">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-200/50">
                    <TableHead className="font-bold text-gray-700">
                      Team
                    </TableHead>
                    <TableHead className="text-center text-gray-700">K</TableHead>
                    <TableHead className="text-center text-gray-700">G</TableHead>
                    <TableHead className="text-center text-gray-700">
                      FF
                    </TableHead>
                    <TableHead className="text-center text-gray-700">
                      FA
                    </TableHead>
                    <TableHead className="text-center text-gray-700">
                      CL
                    </TableHead>
                    <TableHead className="text-center text-gray-700">
                      CG
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.map((team, idx) => (
                    <TableRow
                      key={team.name}
                      className={
                        idx % 2 === 0
                          ? "bg-gray-100/30"
                          : "bg-gray-100/50"
                      }
                    >
                      <TableCell className="font-medium text-gray-700">
                        {team.name}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {team.K}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {team.G}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {team.FF}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {team.FA}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {team.CL}
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-700">
                        {team.CG}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none" />
          <div className="text-center mt-2">
            <span className="text-gray-500 text-sm animate-bounce block">
              Scroll for more rankings ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
