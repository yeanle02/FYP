"use client";

import { Navbar } from "@/components/Navbar";
import { MatchPrediction } from "@/components/MatchPrediction";

export default function PredictionPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <MatchPrediction />
        </div>
      </div>
    </main>
  );
}
