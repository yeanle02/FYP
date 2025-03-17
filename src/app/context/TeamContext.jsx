"use client";

import { createContext, useContext, useState } from 'react';
import { teams } from '@/app/data/teams';

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [selectedTeams, setSelectedTeams] = useState({
    team1: null,
    team2: null
  });

  const [prediction, setPrediction] = useState({
    team1Score: null,
    team2Score: null
  });

  const selectTeam = (team, position) => {
    setSelectedTeams(prev => ({
      ...prev,
      [position]: team
    }));

    // Mock prediction logic based on team stats
    if (position === 'team2' && selectedTeams.team1) {
      const team1 = selectedTeams.team1;
      const team2 = team;
      
      // Simple prediction based on win percentage and team percentage
      const team1Rating = (team1.stats.percentage * (team1.stats.wins / (team1.stats.wins + team1.stats.losses)));
      const team2Rating = (team2.stats.percentage * (team2.stats.wins / (team2.stats.wins + team2.stats.losses)));
      
      setPrediction({
        team1Score: Math.round(70 + (team1Rating / 10)),
        team2Score: Math.round(70 + (team2Rating / 10))
      });
    } else if (position === 'team1' && selectedTeams.team2) {
      const team1 = team;
      const team2 = selectedTeams.team2;
      
      const team1Rating = (team1.stats.percentage * (team1.stats.wins / (team1.stats.wins + team1.stats.losses)));
      const team2Rating = (team2.stats.percentage * (team2.stats.wins / (team2.stats.wins + team2.stats.losses)));
      
      setPrediction({
        team1Score: Math.round(70 + (team1Rating / 10)),
        team2Score: Math.round(70 + (team2Rating / 10))
      });
    }
  };

  return (
    <TeamContext.Provider value={{
      teams,
      selectedTeams,
      prediction,
      selectTeam
    }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeams() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
}
