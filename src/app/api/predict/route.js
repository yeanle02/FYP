// src/app/api/predict/route.js
import { spawn } from 'child_process';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req) {
  console.log("API Predict called");
  
  try {
    const requestBody = await req.json();
    const { home_team, away_team, round, venue, year = 2024, maxtemp = 20, mintemp = 10 } = requestBody;
    
    console.log("API parameters:", { 
      home_team, 
      away_team, 
      round, 
      venue, 
      year, 
      maxtemp, 
      mintemp 
    });


    const pythonScriptPath = 'algorithm/predict.py';
  


    const pythonCommand = 'python';

    const args = [
      pythonScriptPath,
      home_team,
      away_team,
      round,
      venue,
      year.toString(),
      maxtemp.toString(),
      mintemp.toString(),
      path.join(process.cwd(), 'algorithm')  
    ];
    
    console.log(`API: Executing command: ${pythonCommand} ${args.join(' ')}`);

    const pyProcess = spawn(pythonCommand, args);
    
    let result = '';
    let error = '';

    pyProcess.stdout.on('data', (data) => {
      const chunk = data.toString();
      console.log(`Python stdout: ${chunk}`);
      result += chunk;
    });

    pyProcess.stderr.on('data', (data) => {
      const chunk = data.toString();
      console.error(`Python stderr: ${chunk}`);
      error += chunk;
    });

    const exitCode = await new Promise((resolve) => {
      pyProcess.on('close', (code) => {
        console.log(`Python exited code ${code}`);
        resolve(code);
      });
    });

    if (exitCode !== 0) {
      console.error("API: Python failed:", exitCode);
      console.error("Error :", error);
      return NextResponse.json({ 
        error: 'Python script failed', 
        stderr: error,
        exitCode: exitCode
      }, { status: 500 });
    }

    console.log("API: successfully");
    console.log("APIresult:", result);

    try {
      const prediction = JSON.parse(result);
      console.log("API: Parsed prediction:", prediction);
      return NextResponse.json(prediction);
    } catch (parseError) {
      console.error("API: Failed to parse output as JSON:", parseError);
      console.error(" Raw output:", result);
      return NextResponse.json({ 
        error: 'Failed to parse Python output', 
        stdout: result 
      }, { status: 500 });
    }

  } catch (err) {
    console.error("API: Unexpected error:", err);
    return NextResponse.json({ 
      error: 'Server error running prediction',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}