import { useState } from "react";

export default function useTeamMemberHandler() {
    const [teamName, setTeamName] = useState("Melbourne Demons");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [results, setResults] = useState([]);

    const handleGetTeamMembers = async () => {
        setLoading(true);
        setErrors(null);
        try {
        //   console.log(`Fetching team members for: ${teamName}`);
          const res = await fetch(`/api/matches?action=get_team_member&teamName=${encodeURIComponent(teamName)}`);
          const data = await res.json();
          console.log("Team Members Response:", data);
          
          if (res.ok) {
            setResults(data);
          } else {
            throw new Error(data.error || "Failed to get team members");
          }
        } catch (error) {
          console.error("Team Members Error:", error);
          setErrors(error.message);
        } finally {
          setLoading(false);
        }
      };

    return {
        loading,
        errors,
        results,
        setTeamName,
        handleGetTeamMembers
    };
}


