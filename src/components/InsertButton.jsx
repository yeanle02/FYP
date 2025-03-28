"use client";

import { useState } from "react";

export function TestButton() {
  const handleInsert = async () => {
    const sampleMatch = {
      gameId: "2018R0101",
      year: 2018,
      round: "R1",
      date: "2018-03-22",
      homeTeam: "Richmond",
      awayTeam: "Carlton",
      homeTeamScoreFT: 17.19,
      awayTeamScoreFT: 15.5,
      venue: "M.C.G.",
      attendance: 90151,
      maxTemp: 28.7,
      minTemp: 10.5,
      rainfall: 0.0,
    };

    const res = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleMatch),
    });

    const data = await res.json();
    console.log("📝 Insert response:", data);
    alert(data.message || "Insert failed");
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleInsert}
      >
        Click Me
      </button>
    </div>
  );
}
