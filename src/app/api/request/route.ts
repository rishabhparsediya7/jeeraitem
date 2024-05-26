import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const member = await db.collection("jeera").findOne({ email: email });

  if (!member) {
    return NextResponse.json(
      { message: "Member does not exist" },
      { status: 400 }
    );
  }
  let requests = [];
  if (member) {
    if (member.requests) {
      requests = member.requests;
    }
  }
  const teamRequest = {};
  requests.push(teamRequest);
  const result = await db.collection("jeera").updateOne(
    { email: email },
    {
      $set: { requests: requests },
    }
  );

  if (result.modifiedCount == 1) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
