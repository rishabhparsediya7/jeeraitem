import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("test");
  const { searchParams } = new URL(req.url);
  const teamId = new ObjectId(searchParams.get("teamId")?.toString());
  const userId = new ObjectId(searchParams.get("userId")?.toString());

  const response = await db
    .collection("jeerateam")
    .findOne({ _id: teamId, id: userId });
  if (response) return NextResponse.json({ success: true });
  return NextResponse.json({ success: false });
}
