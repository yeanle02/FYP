"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Home, LineChart, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTeams } from "@/app/context/TeamContext";
import { useState, useEffect } from 'react';

// Import mockMatches data
const mockMatches = [
  {
    team1: { name: 'Collingwood', logo: '/teams/Collingwood.png' },
    team2: { name: 'Carlton', logo: '/teams/Carlton.svg' },
    time: '2:30 PM'
  },
  {
    team1: { name: 'Brisbane Lions', logo: '/teams/Brisbane_Lions.png' },
    team2: { name: 'Melbourne', logo: '/teams/Melbournefc.png' },
    time: '4:45 PM'
  },
  {
    team1: { name: 'Sydney Swans', logo: '/teams/Sydney_Swans.png' },
    team2: { name: 'Western Bulldogs', logo: '/teams/Western_Bulldogs.png' },
    time: '7:15 PM'
  },
  {
    team1: { name: 'Western Bulldogs', logo: '/teams/Western_Bulldogs.png' },
    team2: { name: 'Collingwood', logo: '/teams/Collingwood.png' },
    time: '1:45 PM'
  },
  {
    team1: { name: 'Carlton', logo: '/teams/Carlton.svg' },
    team2: { name: 'Brisbane Lions', logo: '/teams/Brisbane_Lions.png' },
    time: '3:30 PM'
  },
  {
    team1: { name: 'Melbourne', logo: '/teams/Melbournefc.png' },
    team2: { name: 'Sydney Swans', logo: '/teams/Sydney_Swans.png' },
    time: '5:15 PM'
  }
];

export function Navbar() {
  const { teams } = useTeams();
  const pathname = usePathname();

  return (
    <nav className="bg-blue-950 shadow-lg py-1">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center">
          {/* AFL Logo and Title */}
          <div className="flex items-center gap-4">
            <Image src="/afl_logo.png" alt="AFL Logo" width={90} height={90} className="h-12 w-auto" />
            <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] hover:scale-105 hover:from-blue-300 hover:to-blue-100 transition-all duration-300">
              No Gambling Pls
            </h1>
          </div>

          {/* Sliding Team Logos */}
          <div className="flex-1 max-w-3xl ml-8 logo-scroll-container h-12">
            <div className="logos-wrapper">
              <div className="logos-slide">
                {[...teams, ...teams].map((team, index) => (
                  <div
                    key={`${team.name}-${index}`}
                    className="flex-shrink-0 px-3"
                    title={team.name}
                  >
                    <Image
                      src={team.logo}
                      alt={`${team.name} logo`}
                      width={40}
                      height={40}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation and Search */}
          <div className="flex items-center justify-end flex-1">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-4 ml-8">
              <Link href="/">
                <Button 
                  variant={pathname === "/" ? "default" : "secondary"} 
                  size="default"
                  className={`flex items-center gap-3 px-6 py-2.5 text-base font-medium transition-all duration-300 ${
                    pathname === "/" ? "shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75" : "hover:shadow-lg hover:shadow-gray-500/50"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>
              </Link>
              <Link href="/prediction">
                <Button 
                  variant={pathname === "/prediction" ? "default" : "secondary"} 
                  size="default"
                  className={`flex items-center gap-3 px-6 py-2.5 text-base font-medium transition-all duration-300 ${
                    pathname === "/prediction" ? "shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75" : "hover:shadow-lg hover:shadow-gray-500/50"
                  }`}
                >
                  <LineChart className="h-5 w-5" />
                  Prediction
                </Button>
              </Link>
              <Link href="/teams">
                <Button 
                  variant={pathname === "/teams" ? "default" : "secondary"} 
                  size="default"
                  className={`flex items-center gap-3 px-6 py-2.5 text-base font-medium transition-all duration-300 ${
                    pathname === "/teams" ? "shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75" : "hover:shadow-lg hover:shadow-gray-500/50"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Teams
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
