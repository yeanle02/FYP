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
    <nav className="bg-blue-950 py-2 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
      {/* AFL Logo */}
      <div className="flex-shrink-0">
        <Image src="/afl_logo.png" alt="AFL Logo" width={90} height={90} className="h-12 w-30" />
      </div>

      {/* Infinite Sliding Team Logos */}
      <div className="flex-1 mx-4 overflow-hidden whitespace-nowrap">
        <div className="animate-infinite-scroll inline-flex space-x-4 px-2">
          {/* Original set of logos */}
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
          {/* Duplicated set of logos for seamless scrolling */}
          {teams.map((team) => (
            <div
              key={`${team.name}-duplicate`}
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
      <div className="flex items-center space-x-4 ml-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button 
              variant={pathname === "/" ? "default" : "secondary"} 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/prediction">
            <Button 
              variant={pathname === "/prediction" ? "default" : "secondary"} 
              size="sm" 
              className="flex items-center gap-2"
            >
              <LineChart className="h-4 w-4" />
              Prediction
            </Button>
          </Link>
          <Link href="/teams">
            <Button 
              variant={pathname === "/teams" ? "default" : "secondary"} 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Teams
            </Button>
          </Link>
        </div>
      </div>
      </div>
    </nav>
  );
}
