// src/app/api/teams/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teamName = searchParams.get("teamName");
  if (!teamName) {
    return NextResponse.json({ error: "Missing teamName" }, { status: 400 });
  }
  try {
    const client = await clientPromise;
    const db = client.db("fyp");

    // 字段名要和你 Mongo 集合里一模一样（大写 T）
    const status = await db
      .collection("team_status")
      .findOne({ Team: teamName });
    if (!status) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const { Captain, Coach } = status;
    return NextResponse.json({
      captainName: Captain,
      coachName:   Coach,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
