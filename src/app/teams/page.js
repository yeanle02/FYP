"use client";

import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHeader";
import TeamInfoCard from "@/components/TeamInfoCard";
import MatchHistory from "@/components/MatchHistory";

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <Navbar />
      
    <div className="w-full">
  <TeamHeader teamName="Sydney Swans" homeVenue="SCG" />
</div>


      <div className="container mx-auto px-4 py-4">
        <div className="max-w-8xl mx-auto flex gap-10">
          <div className="w-[360px] flex flex-col gap-6">
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
          <div className="flex-1 pr-1">
            <MatchHistory />
          </div>
        </div>
      </div>
      
    </main>
  );
}
