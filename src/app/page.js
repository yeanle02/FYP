"use client";

import { Navbar } from "@/components/Navbar";
import { TeamStats } from "@/components/TeamStats";
import { MatchPrediction } from "@/components/MatchPrediction";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Team Stats */}
          <div className="lg:col-span-1">
            <TeamStats />
          </div>

          {/* Main Section - Match Prediction */}
          <div className="lg:col-span-2">
            <MatchPrediction />
          </div>
        </div>
      </div>
    </main>
  );
}
