
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHeader";
import TeamInfoCard from "@/components/TeamInfoCard";
import useTeamMemberHandler from "../../hooks/apiHandlers/useTeamMemberHandler";
import { teams } from "@/app/data/teams";
import { ArrowLeft } from "lucide-react";

export default function MemberInfoPage() {

  const searchParams = useSearchParams();
  const teamName = searchParams.get("teamName") || "Unknown Team";


  const { loading: tmLoading, errors: tmErrors, results: tmResults, setTeamName, handleGetTeamMembers } = useTeamMemberHandler();

 
  useEffect(() => {
    // setTeamName(teamName);
    handleGetTeamMembers(teamName);
  }, [teamName]);



  const teamInfo =
    teams.find((t) => t.name === teamName) || { name: teamName, logo: "/default-logo.png" };

    return (
      <>
        <main className="flex flex-col h-screen  overflow-hidden bg-gray-100">
          {/* 1. 头部：Navbar + TeamHeader */}
          <div className="relative z-10 flex-none h-[40vh] flex flex-col overflow-hidden">
          <div>
            <Navbar />
            <div className="w-full relative">
              <Link
                href="/teams"
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="w-8 h-8" />
                <span className="text-xl font-semibold">Back</span>
              </Link>
              <TeamHeader
                teamName={teamInfo.name}
                homeVenue="SCG"
                teamLogo={teamInfo.logo}
              />
            </div>
          </div>
          </div>
  
          {/* 2. 内容区：撑满剩余高度，左右两列 */}
          <div className="flex flex-1 overflow-hidden ">
            {/* 左侧 column, 固定宽度 */}
            <aside className="w-[360px] flex-shrink-0 overflow-hidden bg-white p-4">
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
            </aside>
  
            {/* 右侧 column, 自带滚动条 */}
            <section className="flex-1 overflow-y-auto p-6">
              {tmLoading && <p>Loading team members...</p>}
              {tmErrors && <p className="text-red-600">Error: {tmErrors}</p>}
              {tmResults && Array.isArray(tmResults) && (
                <div className="grid grid-cols-2 gap-6">
                  {tmResults.map((player, i) => (
                    <div
                      key={player._id ?? i}
                      className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between h-[180px]"
                    >
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {player.Name}
                      </h2>
                      <div>
                        <div className="grid grid-cols-5 text-sm text-gray-400">
                          <span className="text-center">Position</span>
                          <span className="text-center"></span>
                          <span className="text-center">Age</span>
                          <span className="text-center"></span>
                          <span className="text-center">Games</span>
                        </div>
                        <div className="grid grid-cols-5 text-lg text-gray-600 mt-1">
                          <span className="text-center">{player.Position || "N/A"}</span>
                          <span className="text-center">|</span>
                          <span className="text-center">{player.Age}</span>
                          <span className="text-center">|</span>
                          <span className="text-center">{player.Games}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </>
    );
  }