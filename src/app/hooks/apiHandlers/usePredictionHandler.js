import { useState } from "react";

export default function usePredictionHandler() {
    const [home_team,setHomeTeam] = useState("");
    const [away_team,setAwayTeam] = useState("");
 

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [results, setResults] = useState([]);


    const predictPageHandler = async (homeTeam, awayTeam) => {
        setLoading(true);
        setErrors(null);
        console.log("Frontend  prediction ");
        
        try {
        
          const requestData = {
            home_team: homeTeam,
            away_team: awayTeam,
            round:"R23", 
            venue:"M.C.G.",
            year:2022, 
            maxtemp:28.7, 
            mintemp:14
          };
          
          console.log("Frontend payload:", requestData);
          
          const res = await fetch("/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
          });
      
    
          const result = await res.json();
          
          console.log("Frontend result");
          console.log(result);
          
       
          if (result.error) {
            console.error(" Frontend error:", result.error);
            if (result.stderr) {
              console.error("   Python stderr output:", result.stderr);
            }
          } else {
            console.log("Front: values:", {
              homeTeamPredictedScore: result.home_score,
              awayTeamPredictedScore: result.away_score,
              winningTeam: result.winning_team
              // ,confidence: result.confidence
            });
          }
          setLoading(false);
          return result;
        } catch (error) {
          setLoading(false);
          console.error("Frontend: Error ", error);
          return null;
        }
      };
      return{
        loading,
        errors,
        results,
        setHomeTeam,
        setAwayTeam,
        predictPageHandler
      };
    

}