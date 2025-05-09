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
        <div className="flex justify-center mb-6 mt-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-2 rounded-md shadow-lg">
            <h1 className="text-white text-xl font-semibold">Home Dashboard</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-1">
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
