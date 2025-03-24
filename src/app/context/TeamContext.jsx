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
    setSelectedTeams(prev => {
      const newTeams = {
        ...prev,
        [position]: team
      };
      
      // If both teams are selected, update prediction
      if (newTeams.team1 && newTeams.team2) {
        const team1Rating = (newTeams.team1.stats.percentage * (newTeams.team1.stats.wins / (newTeams.team1.stats.wins + newTeams.team1.stats.losses)));
        const team2Rating = (newTeams.team2.stats.percentage * (newTeams.team2.stats.wins / (newTeams.team2.stats.wins + newTeams.team2.stats.losses)));
        
        setPrediction({
          team1Score: Math.round(70 + (team1Rating / 10)),
          team2Score: Math.round(70 + (team2Rating / 10))
        });
      }
      
      return newTeams;
    });
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
