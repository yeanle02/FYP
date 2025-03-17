'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import TeamStats from '@/components/TeamStats';
import MatchPrediction from '@/components/MatchPrediction';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Team Stats */}
          <div className="lg:w-1/3">
            <TeamStats />
          </div>

          {/* Right Side - Match Prediction */}
          <div className="lg:w-2/3">
            <MatchPrediction />
          </div>
        </div>
      </div>
    </main>
  );
}
