"use client";

import { Navbar } from "@/components/Navbar";
import { TeamComparison } from "@/components/TeamComparison";

export default function PredictionPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="max-w-7xl mx-auto">
          <TeamComparison />
        </div>
      </div>
    </main>
  );
}
