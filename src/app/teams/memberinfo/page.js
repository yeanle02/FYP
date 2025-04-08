"use client";

import { useSearchParams } from "next/navigation"; // 用于读取查询参数
import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHeader";
import TeamInfoCard from "@/components/TeamInfoCard";
import MatchHistory from "@/components/MatchHistory";
import { teams } from "@/app/data/teams"; 

export default function Page() {
  const searchParams = useSearchParams();
  const teamName = searchParams.get("teamName") || "Unknown Team";
  const teamInfo = teams.find(t => t.name === teamName) || { name: teamName, logo: "/default-logo.png" };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full">
        <TeamHeader teamName={teamInfo.name} homeVenue="SCG" teamLogo={teamInfo.logo} />
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="max-w-8xl mx-auto flex gap-10">
          <div className="w-[360px] flex flex-col gap-6">
            <TeamInfoCard
              role="Captain"
              name="Callum Mills"
              imageSrc={teamInfo.logo}
              link="#"
            />
            <TeamInfoCard
              role="Coach"
              name="John Longmire"
              imageSrc={teamInfo.logo}
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
