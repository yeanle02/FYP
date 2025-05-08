import { useState } from "react";

export default function useTeamPointsHandler() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [pointsData, setPointsData] = useState([]);

  const fetchTeamPoints = async (team1, team2) => {
    setLoading(true);
    setErrors(null);
    try {
      console.log(`Fetching team points for: ${team1} vs ${team2}`);
      const res = await fetch(`/api/matches?action=get_team_points&team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`);
      const data = await res.json();
      console.log("Team Points Response:", data);
      
      if (res.ok) {
        setPointsData(data);
      } else {
        throw new Error(data.error || "Failed to get team points");
      }
    } catch (error) {
      console.error("Team Points Error:", error);
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    pointsData,
    fetchTeamPoints
  };
}