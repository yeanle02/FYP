"use client";

import { Navbar } from "@/components/Navbar";
import { TeamComparison } from "@/components/TeamComparison";

export default function PredictionPage() {
  return (
    <main className="min-h-screen metallic-background">
      <Navbar />
      <div className="flex justify-center mb-6 mt-4">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-2 rounded-md shadow-lg">
          <h1 className="text-white text-xl font-semibold">AFL Team Comparison</h1>
        </div>
      </div>
      <div className="container mx-auto py-1 px-4">
        <div className="max-w-7xl mx-auto">
          <TeamComparison />
        </div>
      </div>
    </main>
  );
}
