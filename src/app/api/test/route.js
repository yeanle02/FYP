// app/api/test/route.js
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  await dbConnect();
  console.log("🚀 Button clicked! Connected to MongoDB.");
  
  return NextResponse.json({ status: "Server function executed!" });
}


// // src/app/api/test/route.js
// import { NextResponse } from "next/server";

// export async function POST() {
//   console.log("test api call");
//   return NextResponse.json({ message: "POST request successful!" });
// }
