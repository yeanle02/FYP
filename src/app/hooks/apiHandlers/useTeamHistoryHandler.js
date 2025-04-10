import { useState } from "react";

export default function useTeamHistoryHandler() {
    const [team1, setTeam1] = useState("Melbourne Demons");
    const [team2, setTeam2] = useState("Richmond Tigers");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [results, setResults] = useState([]);

    const handleGetHistoricalMatches = async () => {
        setLoading(true);
        setErrors(null);
        try {
          console.log(`Fetching historical matches for: ${teamName}`);
          const res = await fetch(`/api/matches?action=get_historical_match&teamName=${encodeURIComponent(teamName)}`);
          const data = await res.json();
          console.log("Historical Matches Response:", data);
          
          if (res.ok) {
            setResults(data);
          } else {
            throw new Error(data.error || "Failed to get historical matches");
          }
        } catch (error) {
          console.error("Historical Matches Error:", error);
          setErrors(error.message);
        } finally {
          setLoading(false);
        }
      };
    return {
        team1,
        team2,
        setTeam1,
        setTeam2,
        handleGetHistoricalMatches    
    };
}
