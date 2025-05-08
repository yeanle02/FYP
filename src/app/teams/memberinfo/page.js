
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import TeamHeader from "@/components/TeamHeader";
import TeamInfoCard from "@/components/TeamInfoCard";
import useTeamMemberHandler from "../../hooks/apiHandlers/useTeamMemberHandler";
import useTeamLeadersHandler from "../../hooks/apiHandlers/useTeamLeadersHandler";
import { teams } from "@/app/data/teams";

export default function MemberInfoPage() {

  const searchParams = useSearchParams();
  const teamName = searchParams.get("teamName") || "Unknown Team";


  const { loading: tmLoading, errors: tmErrors, results: tmResults, setTeamName, handleGetTeamMembers } = useTeamMemberHandler();
  const { results:leaderResults, handleGetTeamLeaders } = useTeamLeadersHandler();

 
  useEffect(() => {
    // setTeamName(teamName);
    handleGetTeamMembers(teamName);
    handleGetTeamLeaders(teamName);
  }, [teamName]);



  const teamInfo =
    teams.find((t) => t.name === teamName) || { name: teamName, logo: "/default-logo.png" };

  return (
    <>
      <main className="min-h-screen bg-gray-100 page-enter">
        <Navbar />
        <div className="w-full">
          <TeamHeader teamName={teamInfo.name} homeVenue="SCG" teamLogo={teamInfo.logo} />
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="max-w-8xl mx-auto flex gap-10">
        
            <div className="w-[360px] flex flex-col gap-6">
              <TeamInfoCard
                role="Captain"
                name={leaderResults.Captain}
                imageSrc={`/Captain/${encodeURIComponent(teamName)}/${encodeURIComponent(leaderResults.Captain)}.png`}
                link="#"
              />
              <TeamInfoCard
                role="Coach"
                name={leaderResults.Coach}
                imageSrc={`/Coach/${encodeURIComponent(teamName)}/${encodeURIComponent(leaderResults.Coach)}.png`}
                link="#"
              />
            </div>
          
            <div className="flex-1 pr-1">
              {tmLoading && <p>Loading team members...</p>}
              {tmErrors && <p className="text-red-600">Error: {tmErrors}</p>}
              {tmResults && Array.isArray(tmResults) && (
                <div className="flex flex-col min-h-screen overflow-x-hidden">
                  <div className="flex-1 overflow-y-auto">
            
                    <div className="grid grid-cols-2 gap-6">
                      {tmResults.map((player, index) => (
                        <div
                          key={player._id || index}
                          className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between h-[180px]"
                        >
                        
                          <div className="text-[26px] text-gray-800 font-semibold">
                            {player.Name}
                          </div>
                    
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