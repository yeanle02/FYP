// "use client";
// import { Navbar } from "@/components/Navbar";
// import { useState } from "react";
// import useTeamMemberHandler from "../hooks/apiHandlers/useTeamMemberHandler";
// import useTeamStatusHandler from "../hooks/apiHandlers/useTeamStatusHandler";
// import usePredictionHandler from "../hooks/apiHandlers/usePredictionHandler";


// export default function TestMongoFunctions() {
//   const { loading: tmLoading, errors: tmErrors, results: tmResults,setTeamName,handleGetTeamMembers } = useTeamMemberHandler();
//   // const { loading: tsLoading, errors: tsErrors, results: tsResults, handleGetTeamStatus } = useTeamStatusHandler();
//   // const { loading: ppLoading, errors: ppErrors, results: ppResults, predictPageHandler } = usePredictionHandler();

//   const [inputTeam, setInputTeam] = useState("Melbourne Demons");
  

//   const handleTeamMemberSelect = async(team) =>{
//     setTeamName(team);
//     console.log("Selected team:", team);

//     handleGetTeamMembers()
//     .then(results => {
//       console.log("Prediction result:", results);
      
//     })
//     .catch(errors => {
//       console.error("Error making prediction:", errors);
//     });
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 ">
//       <Navbar />
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        
//         <div className="space-y-6">
//           <div className="p-4 border border-gray-200 rounded-md">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-lg font-medium">Team Members</h2>
//                   <input
//                     type="text"
//                     value={inputTeam}
//                     onChange={(e) => setInputTeam(e.target.value)}
//                     className="border border-gray-300 rounded px-2 py-1"
//                   />
//               <button
//                 onClick={handleGetTeamMembers}
//                 disabled={tmLoading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition disabled:bg-blue-300"
//               >
//                 {tmLoading ? "Loading..." : "Get Team Members"}
//               </button>
//             </div>
//             </div>
//               {tmErrors && (
//                 <div className="text-red-600">Error: {tmErrors}</div>
//               )}
//               {tmResults && Array.isArray(tmResults) && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {tmResults.map((player, index) => (
//                     <div key={player._id || index} className="border p-3 rounded bg-gray-50">
//                       <p><strong>Name:</strong> {player.Name}</p>
//                       <p><strong>Games:</strong> {player.Games}</p>
//                       <p><strong>Age:</strong> {player.Age}</p>
//                       <p><strong>Position:</strong> {player.Position || "N/A"}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
  
//       </div>
//     </div>
//     </main>
//   );
// }


"use client";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import useTeamMemberHandler from "../hooks/apiHandlers/useTeamMemberHandler";
import useTeamStatusHandler from "../hooks/apiHandlers/useTeamStatusHandler";
import usePredictionHandler from "../hooks/apiHandlers/usePredictionHandler";

export default function TestMongoFunctions() {
  const { loading: tmLoading, errors: tmErrors, results: tmResults, setTeamName, handleGetTeamMembers } = useTeamMemberHandler();
  // const { loading: tsLoading, errors: tsErrors, results: tsResults, handleGetTeamStatus } = useTeamStatusHandler();
  // const { loading: ppLoading, errors: ppErrors, results: ppResults, predictPageHandler } = usePredictionHandler();

  const [inputTeam, setInputTeam] = useState("");
  
  const handleTeamMemberFetch = async () => {
    // Set the dynamic team name from input
    setTeamName(inputTeam);
    console.log("Selected team:", inputTeam);

    handleGetTeamMembers()
      .then(results => {
        console.log("Team members result:", results);
      })
      .catch(errors => {
        console.error("Error fetching team members:", errors);
      });
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-medium">Team Members</h2>
                <input
                  type="text"
                  value={inputTeam}
                  onChange={(e) => setInputTeam(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <button
                  onClick={handleTeamMemberFetch}
                  disabled={tmLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                  {tmLoading ? "Loading..." : "Get Team Members"}
                </button>
              </div>
            </div>
            {tmErrors && (
              <div className="text-red-600">Error: {tmErrors}</div>
            )}
            {tmResults && Array.isArray(tmResults) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tmResults.map((player, index) => (
                  <div key={player._id || index} className="border p-3 rounded bg-gray-50">
                    <p><strong>Name:</strong> {player.Name}</p>
                    <p><strong>Games:</strong> {player.Games}</p>
                    <p><strong>Age:</strong> {player.Age}</p>
                    <p><strong>Position:</strong> {player.Position || "N/A"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}