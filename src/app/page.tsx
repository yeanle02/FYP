'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import TeamStats from '@/components/TeamStats';
import MatchPrediction from '@/components/MatchPrediction';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AFL Game Prediction</h1>
          <p className="text-gray-600">Make data-driven predictions for AFL games</p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Team Stats */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <TeamStats />
            
            {/* Additional Stats Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>
                <span className="text-sm text-gray-500">Last Updated: Today</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">Total Games</p>
                  <p className="text-2xl font-bold text-blue-800">45</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-green-800">86%</p>
                </div>
              </div>
            </div>
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
