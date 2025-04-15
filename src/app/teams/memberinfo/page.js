
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
  // 从 URL 查询参数中获取队伍名称
  const searchParams = useSearchParams();
  const teamName = searchParams.get("teamName") || "Unknown Team";

  // 使用钩子处理队伍成员的 API 调用
  const { loading: tmLoading, errors: tmErrors, results: tmResults, setTeamName, handleGetTeamMembers } = useTeamMemberHandler();

  // 页面加载或队伍名称改变时自动调用 API 获取队伍成员数据
  useEffect(() => {
    setTeamName(teamName);
    handleGetTeamMembers();
  }, [teamName]);

  // 从本地 teams 数据中获取队伍信息（logo、名称等）
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
          {/* 队伍头部信息 */}
          <TeamHeader teamName={teamInfo.name} homeVenue="SCG" teamLogo={teamInfo.logo} />
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="max-w-8xl mx-auto flex gap-10">
            {/* 左侧静态信息，例如队长、教练 */}
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
            {/* 右侧显示 API 获取的队伍成员数据，卡片布局参考 MatchHistory */}
            <div className="flex-1 pr-1">
              {tmLoading && <p>Loading team members...</p>}
              {tmErrors && <p className="text-red-600">Error: {tmErrors}</p>}
              {tmResults && Array.isArray(tmResults) && (
                <div className="flex flex-col min-h-screen overflow-x-hidden">
                  <div className="flex-1 overflow-y-auto">
                    {/* 使用 grid 布局，每个卡片采用 MatchHistory 的样式 */}
                    <div className="grid grid-cols-2 gap-6">
                      {tmResults.map((player, index) => (
                        <div
                          key={player._id || index}
                          className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between h-[180px]"
                        >
                          {/* 卡片顶部：显示队员姓名 */}
                          <div className="text-[26px] text-gray-800 font-semibold">
                            {player.Name}
                          </div>
                          {/* 卡片底部：展示 Position, Age, Games */}
                          <div className="mt-auto mb-2">
                            <div className="grid grid-cols-5 text-sm text-gray-400">
                              <span className="text-center">Position</span>
                              <span className="text-center"></span>
                              <span className="text-center">Age</span>
                              <span className="text-center"></span>
                              <span className="text-center">Games</span>
                            </div>
                            <div className="grid grid-cols-5 text-[20px] text-gray-600 mt-1">
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
