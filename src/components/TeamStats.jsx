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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Team Rankings</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold">Team</TableHead>
              <TableHead className="text-center">P</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">%</TableHead>
              <TableHead className="text-center">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.name}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-center">{team.stats.wins + team.stats.losses + team.stats.draws}</TableCell>
                <TableCell className="text-center">{team.stats.wins}</TableCell>
                <TableCell className="text-center">{team.stats.losses}</TableCell>
                <TableCell className="text-center">{team.stats.draws}</TableCell>
                <TableCell className="text-center">{team.stats.percentage.toFixed(1)}</TableCell>
                <TableCell className="text-center font-bold">{team.stats.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
