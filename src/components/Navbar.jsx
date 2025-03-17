"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { Search, Home, LineChart, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTeams } from "@/app/context/TeamContext";

export function Navbar() {
  const { teams, selectTeam } = useTeams();
  const pathname = usePathname();
  return (
    <nav className="bg-blue-900 px-4 py-2 flex items-center justify-between shadow-lg">
      {/* AFL Logo */}
      <div className="flex-shrink-0">
        <Image src="/next.svg" alt="AFL Logo" width={80} height={40} className="h-10 w-auto" />
      </div>

      {/* Scrollable Team Logos */}
      <div className="flex-1 mx-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-2">
          {teams.map((team) => (
            <div
              key={team.name}
              className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={team.logo}
                alt={`${team.name} logo`}
                width={40}
                height={40}
                className="h-8 w-8"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button 
              variant={pathname === "/" ? "default" : "destructive"} 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/prediction">
            <Button 
              variant={pathname === "/prediction" ? "default" : "destructive"} 
              size="sm" 
              className="flex items-center gap-2"
            >
              <LineChart className="h-4 w-4" />
              Prediction
            </Button>
          </Link>
          <Link href="/teams">
            <Button 
              variant={pathname === "/teams" ? "default" : "destructive"} 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Teams
            </Button>
          </Link>
        </div>
        <Select onValueChange={(value) => {
          const team = teams.find(t => t.name === value);
          if (team) selectTeam(team, 'team1');
        }}>
          <SelectTrigger className="w-[180px] bg-blue-800 text-white border-blue-700">
            <SelectValue placeholder="Select Team 1" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.name} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => {
          const team = teams.find(t => t.name === value);
          if (team) selectTeam(team, 'team2');
        }}>
          <SelectTrigger className="w-[180px] bg-blue-800 text-white border-blue-700">
            <SelectValue placeholder="Select Team 2" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.name} value={team.name}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search teams..."
            className="w-[200px] bg-blue-800 text-white placeholder:text-gray-300 border-blue-700"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
        </div>
      </div>
    </nav>
  );
}
