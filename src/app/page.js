"use client";

import { Navbar } from "@/components/Navbar";
import { TeamStats } from "@/components/TeamStats";
import { HomeTeamComparison } from "@/components/HomeTeamComparison";
import { ReadButton } from "@/components/ReadButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
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
    </main>
  );
}
