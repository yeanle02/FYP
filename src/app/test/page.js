"use client";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import useTeamMemberHandler from "../hooks/apiHandlers/useTeamMemberHandler";
import useTeamStatusHandler from "../hooks/apiHandlers/useTeamStatusHandler";
import usePredictionHandler from "../hooks/apiHandlers/usePredictionHandler";


export default function TestMongoFunctions() {
  const [teamName, setTeamName] = useState("Melbourne Demons");
  const [team1, setTeam1] = useState("Melbourne Demons");
  const [team2, setTeam2] = useState("Richmond Tigers");
  
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({
    teamMembers: false,
    historicalMatches: false,
    teamStatus: false
  });
  const [errors, setErrors] = useState({});

  const { loading: tmLoading, errors: tmErrors, results: tmResults, handleGetTeamMembers } = useTeamMemberHandler();
  const { loading: tsLoading, errors: tsErrors, results: tsResults, handleGetTeamStatus } = useTeamStatusHandler();
  const { loading:ppLoading, errors: ppErrors, results: ppResults, predictPageHandler } = usePredictionHandler();
  

  const handleGetHistoricalMatches = async () => {
    setLoading(prev => ({ ...prev, historicalMatches: true }));
    setErrors(prev => ({ ...prev, historicalMatches: null }));
    try {
      console.log(`Fetching historical matches for: ${teamName}`);
      const res = await fetch(`/api/matches?action=get_historical_match&teamName=${encodeURIComponent(teamName)}`);
      const data = await res.json();
      console.log("Historical Matches Response:", data);
      
      if (res.ok) {
        setResults(prev => ({ ...prev, historicalMatches: data }));
      } else {
        throw new Error(data.error || "Failed to get historical matches");
      }
    } catch (error) {
      console.error("Historical Matches Error:", error);
      setErrors(prev => ({ ...prev, historicalMatches: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, historicalMatches: false }));
    }
  };


  // const TestPredictPage = async () => {
  //   console.log("Frontend  prediction ");
    
  //   try {
    
  //     const requestData = {
  //       home_team: "Richmond",
  //       away_team: "Adelaide",
  //       round:"R1", 
  //       venue:"M.C.G.",
  //       year:2024, 
  //       maxtemp:28.7, 
  //       mintemp:14
  //     };
      
  //     console.log("Frontend payload:", requestData);
      
  //     const res = await fetch("/api/predict", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(requestData)
  //     });
  

  //     const result = await res.json();
      
  //     console.log("Frontend result");
  //     console.log(result);
      
   
  //     if (result.error) {
  //       console.error(" Frontend error:", result.error);
  //       if (result.stderr) {
  //         console.error("   Python stderr output:", result.stderr);
  //       }
  //     } else {
  //       console.log("Front: values:", {
  //         homeTeamPredictedScore: result.home_score,
  //         awayTeamPredictedScore: result.away_score,
  //         winningTeam: result.winning_team
  //       });
  //     }
      
  //     return result;
  //   } catch (error) {
  //     console.error("Frontend: Error ", error);
  //     return null;
  //   }
  // };

  const renderResults = (key) => {
    if (errors[key]) {
      return (
        <div className="mt-2 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {errors[key]}
        </div>
      );
    }
    
    if (!results[key]) return null;
    
    return (
      <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded max-h-64 overflow-auto">
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(results[key], null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 ">
      <Navbar />
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
    
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team 1</label>
              <input
                type="text"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team 2</label>
              <input
                type="text"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">Team Members</h2>
              <button
                onClick={handleGetTeamMembers}
                disabled={tmLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {tmLoading ? "Loading..." : "Get Team Members"}
              </button>
            </div>
            {renderResults(tmResults)}
          </div>
          
          {/* <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">Historical Matches</h2>
              <button
                onClick={handleGetHistoricalMatches}
                disabled={loading.historicalMatches}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition disabled:bg-green-300"
              >
                {loading.historicalMatches ? "Loading..." : "Get Historical Matches"}
              </button>
            </div>
            {renderResults("historicalMatches")}
          </div>
           */}
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">Team Status Comparison</h2>
              <button
                onClick={handleGetTeamStatus}
                disabled={tsLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition disabled:bg-purple-300"
              >
                {tsLoading ? "Loading..." : "Get Team Status"}
              </button>
            </div>
            {renderResults(tsResults)}
          </div>

          <button
            onClick={predictPageHandler}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Get Prediction
          </button>
          {renderResults(ppResults)}
        </div>
      </div>
    </div>
    </main>
  );
}