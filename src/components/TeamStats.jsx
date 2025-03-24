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
      <div className="p-4 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shadow-xl ring-1 ring-gray-300/50 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Current Round</h2>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-600">Week 6</div>
          <div className="text-gray-600">17th April 2024</div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shadow-xl ring-1 ring-gray-300/50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Team Rankings</h2>
        <div className="overflow-y-auto max-h-[500px] min-h-[500px] p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200/50">
              <TableHead className="font-bold text-gray-700">Team</TableHead>
              <TableHead className="text-center text-gray-700">P</TableHead>
              <TableHead className="text-center text-gray-700">W</TableHead>
              <TableHead className="text-center text-gray-700">L</TableHead>
              <TableHead className="text-center text-gray-700">D</TableHead>
              <TableHead className="text-center text-gray-700">%</TableHead>
              <TableHead className="text-center text-gray-700">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.name}
                className={index % 2 === 0 ? 'bg-gray-100/30' : 'bg-gray-100/50'}
              >
                <TableCell className="font-medium text-gray-700">{team.name}</TableCell>
                <TableCell className="text-center text-gray-600">{team.stats.wins + team.stats.losses + team.stats.draws}</TableCell>
                <TableCell className="text-center text-gray-600">{team.stats.wins}</TableCell>
                <TableCell className="text-center text-gray-600">{team.stats.losses}</TableCell>
                <TableCell className="text-center text-gray-600">{team.stats.draws}</TableCell>
                <TableCell className="text-center text-gray-600">{team.stats.percentage.toFixed(1)}</TableCell>
                <TableCell className="text-center font-bold text-gray-700">{team.stats.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
