"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHeader";
import TeamInfoCard from "@/components/TeamInfoCard";
import MatchHistory from "@/components/MatchHistory";
import { teams } from "@/app/data/teams";
import { ArrowLeft } from "lucide-react";

export default function MemberInfoPage() {
  const searchParams = useSearchParams();
  const teamName = searchParams.get("teamName") || "Unknown Team";
  const teamInfo =
    teams.find((t) => t.name === teamName) || { name: teamName, logo: "/default-logo.png" };

  return (
    <>
      <main className="min-h-screen bg-gray-100 page-enter">
        <Navbar />
        <div className="w-full relative">
          {/* 返回按钮 */}
          <Link
            href="/teams"
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-8 h-8" />
            <span className="text-xl font-semibold">Back</span>
          </Link>
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

    </>
  );
}
