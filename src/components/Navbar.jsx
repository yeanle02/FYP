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
    team1: { name: 'Sydney', logo: '/teams/Sydney_Swans.png' },
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
    team2: { name: 'Sydney', logo: '/teams/Sydney_Swans.png' },
    time: '5:15 PM'
  }
];

export function Navbar() {
  const { teams, selectTeam } = useTeams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleMatchSelect = async (match) => {
    const team1 = teams.find(t => t.name === match.team1.name);
    const team2 = teams.find(t => t.name === match.team2.name);
    
    if (team1) selectTeam(team1, 'team1');
    if (team2) selectTeam(team2, 'team2');
    setShowDropdown(false);
    setSearchTerm('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matches = mockMatches.filter(match => 
          match.team1.name.toLowerCase().includes(term) ||
          match.team2.name.toLowerCase().includes(term)
        );
        setSearchResults(matches);
        setShowDropdown(matches.length > 0);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <nav className="bg-blue-950 shadow-lg py-2">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center">
          {/* AFL Logo */}
          <div className="flex-shrink-0">
            <Image src="/afl_logo.png" alt="AFL Logo" width={90} height={90} className="h-12 w-auto" />
          </div>

          {/* Sliding Team Logos */}
          <div className="flex-1 max-w-3xl ml-8 logo-scroll-container h-12">
            <div className="logos-wrapper">
              <div className="logos-slide">
                {[...teams, ...teams].map((team, index) => (
                  <div
                    key={`${team.name}-${index}`}
                    className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity px-3"
                    onClick={() => selectTeam(team, 'team1')}
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
            
            {/* Search Bar */}
            <div className="w-72 ml-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for a team..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                
                {/* Search Results Dropdown */}
                {showDropdown && (
                  <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto z-50">
                    {searchResults.map((match, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleMatchSelect(match)}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={match.team1.logo}
                            alt={match.team1.name}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                          <span>{match.team1.name}</span>
                        </div>
                        <span className="mx-2">vs</span>
                        <div className="flex items-center gap-2">
                          <Image
                            src={match.team2.logo}
                            alt={match.team2.name}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                          <span>{match.team2.name}</span>
                        </div>
                        <span className="ml-auto text-sm text-gray-500">{match.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
