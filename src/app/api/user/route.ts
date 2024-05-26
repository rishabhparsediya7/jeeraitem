import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { userId, teamId, inTeam } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const response1 = await db
    .collection("jeera")
    .findOne({ id: userId }, { projection: { _id: 0, teams: 1 } });
  let teamArray = [];
  if (response1?.teams !== undefined) {
    teamArray = response1.teams;
  }
  teamArray.push(teamId);
  const response = await db
    .collection("jeera")
    .updateOne({ id: userId }, { $set: { inTeam: inTeam, teams: teamArray } });
  if (response.modifiedCount === 1) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db.collection("jeera").find({ userId: id });
  return NextResponse.json(result);
}
