"use client";

import { Navbar } from "@/components/Navbar";
import TeamHeader from "./TeamHeader";
import TeamInfoCard from "./TeamInfoCard";
import MatchHistory from "./MatchHistory";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <TeamHeader teamName="Sydney Swans" homeVenue="SCG" />
      </div>

      <div className="container mx-auto px-4 flex gap-8">
        <div className="w-[360px] flex flex-col gap-6" style={{ marginLeft: "160px" }}>
          <TeamInfoCard
            role="Captain"
            name="Callum Mills"
            imageSrc="/teams/Sydney_Swans.png"
            link="#"
          />
          <TeamInfoCard
            role="Coach"
            name="John Longmire"
            imageSrc="/teams/sydney-coach.png"
            link="#"
          />
        </div>
        <div className="flex-1 pr-3">
          <MatchHistory />
        </div>
      </div>
    </main>
  );
}
