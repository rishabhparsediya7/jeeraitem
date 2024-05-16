import clientPromise from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("getting a rquest");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db.collection("jeera").find({ userId: id });
  console.log(result);
  return NextResponse.json(result);
}
