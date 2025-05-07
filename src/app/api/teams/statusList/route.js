// src/app/api/teams/statusList/route.js
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('fyp');

  // 从 team_status 集合按 total_points 降序取前 10 条
  const topTen = await db
    .collection('team_status')
    .find({})
    .sort({ total_points: -1 })
    .limit(10)
    .toArray();

  // 返回给前端
  return NextResponse.json(topTen);
}
