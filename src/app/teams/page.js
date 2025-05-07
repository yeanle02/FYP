"use client";

import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHomeHeader";
import TeamsList from "@/components/TeamsList";

export default function TeamsPage() {
  return (
    <>
      <main className="min-h-screen metallic-background page-enter">
        <Navbar />
        <div className="w-full">
          <TeamHeader title="Select Teams" />
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
