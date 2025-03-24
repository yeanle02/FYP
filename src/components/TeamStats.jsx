"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { teams } from "@/app/data/teams";

export function TeamStats() {
  return (
    <div>
      <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl ring-1 ring-gray-600/50 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-100 text-center">Current Round</h2>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-200">Week 6</div>
          <div className="text-gray-300">17th April 2024</div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl ring-1 ring-gray-600/50">
        <h2 className="text-2xl font-bold mb-4 text-gray-100 text-center">Team Rankings</h2>
        <div className="overflow-y-auto max-h-[500px] min-h-[500px] p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              <TableHead className="font-bold text-gray-200">Team</TableHead>
              <TableHead className="text-center text-gray-200">P</TableHead>
              <TableHead className="text-center text-gray-200">W</TableHead>
              <TableHead className="text-center text-gray-200">L</TableHead>
              <TableHead className="text-center text-gray-200">D</TableHead>
              <TableHead className="text-center text-gray-200">%</TableHead>
              <TableHead className="text-center text-gray-200">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.name}
                className={index % 2 === 0 ? 'bg-gray-700/20' : 'bg-gray-700/30'}
              >
                <TableCell className="font-medium text-gray-200">{team.name}</TableCell>
                <TableCell className="text-center text-gray-300">{team.stats.wins + team.stats.losses + team.stats.draws}</TableCell>
                <TableCell className="text-center text-gray-300">{team.stats.wins}</TableCell>
                <TableCell className="text-center text-gray-300">{team.stats.losses}</TableCell>
                <TableCell className="text-center text-gray-300">{team.stats.draws}</TableCell>
                <TableCell className="text-center text-gray-300">{team.stats.percentage.toFixed(1)}</TableCell>
                <TableCell className="text-center font-bold text-gray-200">{team.stats.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
