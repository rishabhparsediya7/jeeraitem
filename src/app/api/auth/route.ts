import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db
    .collection("jeera")
    .insertOne({ name, email, password });
  console.log(result);
  return NextResponse.json(result);
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db.collection("jeera").find().toArray();
  return NextResponse.json(result);
}
