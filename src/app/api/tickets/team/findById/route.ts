import clientPromise from "@/lib/db";
import { findById } from "@/lib/groupBy";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const teamId = searchParams.get("teamId");
  const ticketId = searchParams.get("ticketId");

  const client = await clientPromise;
  const db = client.db("test");
  const result = await db
    .collection("jeerateam")
    .find(
      { _id: new ObjectId(teamId?.toString()) },
      { projection: { _id: 0, workArray: 1 } }
    )
    .toArray();
  if (result[0].workArray === undefined) return NextResponse.json([]);
  const tickets = result[0].workArray;
  if (tickets.length === 0) return NextResponse.json([]);
  const ticket = findById(tickets, ticketId);
  return NextResponse.json(ticket[0]);
}
