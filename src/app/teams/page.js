"use client";

import { Navbar } from "@/components/Navbar";
import TeamsList from "@/components/TeamsList";

export default function TeamsPage() {
  return (
    <>
      <main className="min-h-screen metallic-background page-enter">
        <Navbar />
        <div className="flex justify-center mb-6 mt-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-3 rounded-md shadow-lg">
            <h1 className="text-white text-xl font-semibold">Select Teams</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-8xl mx-auto flex gap-10">
            <div className="flex-1 pr-1">
              <TeamsList />
            </div>
          </div>
        </div>
      </main>
      
    </>
  );
}
