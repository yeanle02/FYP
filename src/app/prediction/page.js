"use client";

import { Navbar } from "@/components/Navbar";
import { TeamComparison } from "@/components/TeamComparison";

export default function PredictionPage() {
  return (
    <main className="min-h-screen metallic-background">
      <Navbar />
      <div className="flex flex-col items-center mb-3 mt-3">
        <h1 className="text-4xl font-bold text-gray-800 relative group cursor-default">
          AFL Team Comparison
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
        </h1>
      </div>
      <div className="container mx-auto py-1 px-4">
        <div className="max-w-7xl mx-auto">
          <TeamComparison />
        </div>
      </div>
    </main>
  );
}
