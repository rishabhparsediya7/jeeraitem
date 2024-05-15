import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db.collection("jeera").insertOne({ username, password });
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db.collection("orders").find().toArray();
  return NextResponse.json(result);
}
