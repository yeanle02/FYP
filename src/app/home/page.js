"use client";

import { Navbar } from "@/components/Navbar";
import { TeamStats } from "@/components/TeamStats";
import { HomeTeamComparison } from "@/components/HomeTeamComparison";
import { ReadButton } from "@/components/ReadButton";

export default function Home() {
  return (
    <main className="min-h-screen metallic-background relative">
      <div className="transition-all duration-500">
        <Navbar />
        <ReadButton />
        <div className="flex flex-col items-center mb-0 mt-6">
          <h1 className="text-4xl font-bold text-gray-800 relative group cursor-default">
            Home Dashboard
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </h1>
          <div className="mt-2 text-gray-500 text-sm tracking-wider animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            AFL Team Analytics & Insights
          </div>
        </div>
        <div className="container mx-auto px-4 py-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Team Stats */}
            <div className="lg:col-span-1">
              <TeamStats />
            </div>

            {/* Main Section - Today's Matches */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <HomeTeamComparison />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
