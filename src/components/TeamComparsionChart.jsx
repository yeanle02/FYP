import { useState, useEffect, useRef } from 'react';

export default function TeamComparisonChart({ team1, team2, pointsData, predictionValue }) {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Team 1:", team1);
  console.log("Team 2:", team2);
  console.log("Points data:", pointsData);
  console.log("Prediction value:", predictionValue);

  useEffect(() => {
    console.log("Prediction value received:", predictionValue);
  }, [predictionValue]);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const loadPlotly = async () => {
      try {
        setIsLoading(true);
        console.log("Starting to load Plotly...");
        
        // Dynamic import Plotly - make sure we're accessing the default export correctly
        const PlotlyModule = await import('plotly.js-dist');
        const Plotly = PlotlyModule.default || PlotlyModule;
        
        console.log("Plotly loaded:", !!Plotly);
        
        if (!chartRef.current) {
          console.error("Chart container ref is null");
          setError("Chart container not found");
          setIsLoading(false);
          return;
        }
        
        if (!pointsData) {
          console.error("Missing pointsData");
          setError("Missing data");
          setIsLoading(false);
          return;
        }
        
        console.log("Processing data for chart...");
        
        // Extract the actual data from the response object
        const actualData = pointsData.data || {};
        console.log("Actual points data:", actualData);
        
        // Check if the actualData is empty or has invalid structure
        if (!actualData || typeof actualData !== 'object' || Object.keys(actualData).length === 0) {
          console.error("Invalid or empty data structure:", actualData);
          setError("No valid data found");
          setIsLoading(false);
          return;
        }
        
        // Process data from the actual data object, not the response wrapper
        const rounds = Object.keys(actualData)
          .filter(key => key.startsWith('R')) // Only include keys that start with 'R'
          .sort((a, b) => {
            return parseInt(a.slice(1)) - parseInt(b.slice(1));
          });
        
        console.log("Filtered rounds:", rounds);
        
        if (rounds.length === 0) {
          // Try alternative approach - maybe the data is not structured with 'R' prefixes
          const allKeys = Object.keys(actualData);
          console.log("All available keys in data:", allKeys);
          
          if (allKeys.length > 0) {
            // Use whatever keys are available, assuming they represent rounds
            const alternativeRounds = allKeys.sort();
            console.log("Using alternative rounds:", alternativeRounds);
            
            // Continue with these alternative rounds
            // ... rest of your code using alternativeRounds instead of rounds
          } else {
            console.error("No rounds found in data");
            setError("No rounds found in data. Please check the data format.");
            setIsLoading(false);
            return;
          }
        }
        
        // Calculate next round (for prediction)
        const lastRoundNumber = Math.max(...rounds.map(r => parseInt(r.slice(1)) || 0));
        const nextRound = `R${lastRoundNumber + 1}`;
        console.log("Last round:", lastRoundNumber, "Next round:", nextRound);
        
        // Get scores from the actual data
    const getScores = (team) => {
        return rounds.map(r => {
            const score = actualData[r]?.[team];
            console.log(`Score for ${team} in ${r}:`, score);
            return score !== undefined ? Number(score) : 0;
        });
      };

    const team1Scores = getScores(team1);
    const team2Scores = getScores(team2);

        console.log(`${team1} scores:`, team1Scores);
        console.log(`${team2} scores:`, team2Scores);

        // Create base plot data
    const data = [
      {
        x: rounds,
        y: team1Scores,
        type: 'scatter',
        mode: 'lines+markers',
        name: team1,
        line: { color: 'rgba(99, 102, 241, 1)' },
        marker: { size: 8 },
      },
      {
        x: rounds,
        y: team2Scores,
        type: 'scatter',
        mode: 'lines+markers',
        name: team2,
        line: { color: 'rgba(239, 68, 68, 1)' },
        marker: { size: 8 },
          }
    ];

        // Add prediction lines if available
    if (predictionValue) {
          console.log("Processing prediction data:", JSON.stringify(predictionValue));
          
          // Structure the prediction data properly
          const formattedPrediction = {
            team1: predictionValue.team1Score || predictionValue.team1 || predictionValue.homeTeamPredictedScore || predictionValue.home_score,
            team2: predictionValue.team2Score || predictionValue.team2 || predictionValue.awayTeamPredictedScore || predictionValue.away_score
          };
          
          console.log("Formatted prediction:", formattedPrediction);
          
      const lastRound = rounds[rounds.length - 1];
          const lastT1Score = team1Scores[team1Scores.length - 1];
          const lastT2Score = team2Scores[team2Scores.length - 1];
          
          console.log("Last round data:", {
            round: lastRound,
            team1Score: lastT1Score,
            team2Score: lastT2Score
          });
          
          // Make sure we have prediction values that can be converted to numbers
          const team1Prediction = formattedPrediction.team1 !== undefined ? 
            parseFloat(formattedPrediction.team1) : null;
          const team2Prediction = formattedPrediction.team2 !== undefined ? 
            parseFloat(formattedPrediction.team2) : null;
            
          console.log("Parsed prediction values:", {
            team1: team1Prediction,
            team2: team2Prediction
          });
          
          // Add prediction line for team 1
          if (team1Prediction !== null && !isNaN(team1Prediction)) {
            const team1PredData = {
          x: [lastRound, nextRound],
              y: [lastT1Score, team1Prediction],
          type: 'scatter',
          mode: 'lines',
          name: `${team1} Prediction`,
              line: { color: 'rgba(99, 102, 241, 0.7)', dash: 'dash' },
            };
            console.log("Adding team1 prediction trace:", team1PredData);
            data.push(team1PredData);
          } else {
            console.warn(`Invalid prediction value for ${team1}:`, formattedPrediction.team1);
          }
          
          // Add prediction line for team 2
          if (team2Prediction !== null && !isNaN(team2Prediction)) {
            const team2PredData = {
          x: [lastRound, nextRound],
              y: [lastT2Score, team2Prediction],
          type: 'scatter',
          mode: 'lines',
          name: `${team2} Prediction`,
              line: { color: 'rgba(239, 68, 68, 0.7)', dash: 'dash' },
            };
            console.log("Adding team2 prediction trace:", team2PredData);
            data.push(team2PredData);
          } else {
            console.warn(`Invalid prediction value for ${team2}:`, formattedPrediction.team2);
          }
          
          // Add confidence intervals if available
          if (predictionValue.confidenceInterval) {
            console.log("Processing confidence intervals:", 
              JSON.stringify(predictionValue.confidenceInterval));
            
      const ci = predictionValue.confidenceInterval;
            
            if (ci.team1 && ci.team1.lower !== undefined && ci.team1.upper !== undefined) {
              data.push({
            x: [nextRound, nextRound],
                y: [Number(ci.team1.lower), Number(ci.team1.upper)],
            type: 'scatter',
            mode: 'lines',
            name: `${team1} Confidence`,
                line: { color: 'rgba(99, 102, 241, 0.3)', width: 10 },
            showlegend: true,
              });
            }
            
            if (ci.team2 && ci.team2.lower !== undefined && ci.team2.upper !== undefined) {
              data.push({
            x: [nextRound, nextRound],
                y: [Number(ci.team2.lower), Number(ci.team2.upper)],
            type: 'scatter',
            mode: 'lines',
            name: `${team2} Confidence`,
                line: { color: 'rgba(239, 68, 68, 0.3)', width: 10 },
            showlegend: true,
              });
      }
          }
        } else {
          console.log("No prediction data available");
    }

        // Layout
    const layout = {
      title: {
        text: `${team1} vs ${team2} Performance Comparison`,
        font: {
          size: 18,
          color: '#e5e7eb'
        }
      },
      xaxis: {
        title: {
          text: 'Round Number',
          font: {
            size: 14,
            color: '#e5e7eb'
          }
        },
        tickvals: predictionValue ? [...rounds, nextRound] : rounds,
        tickangle: 0,
        gridcolor: '#374151',
        linecolor: '#4B5563'
      },
      yaxis: {
        title: {
          text: 'Score Points',
          font: {
            size: 14,
            color: '#e5e7eb'
          }
        },
        gridcolor: '#374151',
        zerolinecolor: '#4B5563'
      },
      legend: {
        orientation: 'h',
        y: -0.2,
        x: 0.5,
        xanchor: 'center',
        font: {
          color: '#e5e7eb',
          size: 12
        },
        bgcolor: '#1f2937',
        bordercolor: '#374151',
        borderwidth: 1
      },
      paper_bgcolor: '#111827',
      plot_bgcolor: '#1f2937',
      font: { color: '#e5e7eb' },
      autosize: true,
      height: 450,
      margin: { l: 70, r: 40, b: 120, t: 80, pad: 4 },
      hovermode: 'closest',
      hoverlabel: {
        bgcolor: '#374151',
        font: {
          color: '#e5e7eb'
        }
      }
    };
        
        console.log("Final plot data:", JSON.stringify(data));
        console.log("Final layout:", JSON.stringify(layout));
        
        // Create the plot with error handling
        try {
          Plotly.newPlot(chartRef.current, data, layout)
            .then(() => {
              console.log("Plot successfully rendered");
              setIsLoading(false);
            })
            .catch(err => {
              console.error("Error in newPlot promise:", err);
              setError(`Plot rendering failed: ${err.message}`);
              setIsLoading(false);
            });
        } catch (plotErr) {
          console.error("Exception during newPlot call:", plotErr);
          setError(`Plot exception: ${plotErr.message}`);
          setIsLoading(false);
        }
        
      } catch (err) {
        console.error("Error in loadPlotly:", err);
        setError(`Failed to create chart: ${err.message}`);
        setIsLoading(false);
      }
    };
    
    // Call the function and handle any uncaught errors
    loadPlotly().catch(err => {
      console.error("Uncaught error in loadPlotly:", err);
      setError(`Uncaught error: ${err.message}`);
      setIsLoading(false);
    });
    
    // Cleanup
    return () => {
      try {
        if (chartRef.current && window.Plotly) {
          window.Plotly.purge(chartRef.current);
        }
      } catch (err) {
        console.error("Error during cleanup:", err);
      }
    };
  }, [pointsData, team1, team2, predictionValue]);

  if (error) {
    return (
      <div className="text-white p-4 bg-red-900 rounded">
        <h3 className="font-bold">Chart Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-700 rounded">
      {isLoading && (
        <div className="text-white p-4 text-center">
          Loading chart... 
        </div>
      )}
      <div 
        ref={chartRef} 
        className="w-full h-[450px]" 
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}