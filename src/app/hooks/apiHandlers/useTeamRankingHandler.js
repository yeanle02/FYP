import { useState } from "react";

export default function useTeamRankingHandler() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [rankings, setRankings] = useState([]);

  const handleGetTeamRanking = async () => {
    setLoading(true);
    setErrors(null);
    try {
      console.log("Fetching team rankings…");

      const res = await fetch(`/api/matches?action=get_team_ranking`);
      const data = await res.json();
      console.log("Team Ranking Response:", data);

      if (res.ok) {
        setRankings(data);
      } else {
        throw new Error(data.error || "Failed to fetch team ranking");
      }
    } catch (error) {
      console.error("Team Ranking Error:", error);
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    rankings,
    handleGetTeamRanking,
  };
}
