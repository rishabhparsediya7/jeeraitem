import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("test");
  try {
    const { userId, name } = await req.json();
    const reqBody = {
      createdByUserId: userId,
      name: name,
      workArray: [],
      teamArray: [userId],
      timestamp: Date.now(),
    };
    const result = await db.collection("jeerateam").insertOne(reqBody);
    const teamId = result.insertedId;
    if (result.acknowledged)
      return NextResponse.json({ success: true, teamId: teamId });
    return NextResponse.json({ success: false });
  } catch (error) {
    console.log(error);
    throw new Error("could not send request");
  }
}

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("test");
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const response = await db
    .collection("jeerateam")
    .find({ createdByUserId: userId })
    .toArray();
  if (response) {
    return NextResponse.json({ success: true, data: response });
  }

  return NextResponse.json({ success: false });
}
