"use client";

import { Navbar } from "@/components/Navbar";
import { TeamStats } from "@/components/TeamStats";
import { HomeTeamComparison } from "@/components/HomeTeamComparison";
import { ReadButton } from "@/components/ReadButton";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-100 bg-clip-text text-transparent text-reveal loading-dots">
              Loading AFL Game Ranking System Home Page...
            </h2>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-500 ${isLoading ? 'blur-load' : ''}`}>
        <Navbar />
        <ReadButton />
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Team Stats */}
            <div className="lg:col-span-1">
              <TeamStats />
            </div>

            {/* Main Section - Today's Matches */}
            <div className="lg:col-span-2">
              <HomeTeamComparison />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
