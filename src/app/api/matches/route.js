import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Match from "@/models/Match";

export async function GET() {
  await connect();

  try {
    const matches = await Match.find({}).limit(5); 
    console.log("Match data:", matches);
    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
    await connect();
  
    try {
      const body = await req.json();
      console.log(body)
      const match = await Match.create(body);
      console.log("Match inserted:", match);
      return NextResponse.json({ message: "Match inserted", match });
    } catch (error) {
      console.error("insertion error:", error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }
  }