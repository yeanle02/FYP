"use client";

import { Navbar } from "@/components/Navbar";
import TeamsList from "@/components/TeamsList";

export default function TeamsPage() {
  return (
    <>
      <main className="min-h-screen metallic-background page-enter">
        <Navbar />
        <div className="flex flex-col items-center mb-0 mt-6">
          <h1 className="text-4xl font-bold text-gray-800 relative group cursor-default">
            Select Teams
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </h1>
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
