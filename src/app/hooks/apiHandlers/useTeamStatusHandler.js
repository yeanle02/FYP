import { useState } from "react";

export default function useTeamStatusHandler() {
  // const [team1, setTeam1] = useState("Melbourne Demons");
  // const [team2, setTeam2] = useState("Richmond Tigers");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [results, setResults] = useState([]);

  const handleGetTeamStatus = async (team1, team2) => {
      setLoading(true);
      setErrors(null);
      try {
        console.log(`Fetching team status for: ${team1} vs ${team2}`);
        const res = await fetch(`/api/matches?action=get_team_status&team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`);
        const data = await res.json();
        console.log("Team Status Response:", data);
        
        if (res.ok) {
          setResults(data);
        } else {
          throw new Error(data.error || "Failed to get team status");
        }
      } catch (error) {
        console.error("Team Status Error:", error);
        setErrors(error.message);
      } finally {
        setLoading(false);
      }
    };
    return {
        loading,
        errors,
        results,
        handleGetTeamStatus
    };
}