import clientPromise from "@/lib/db";
import { findById } from "@/lib/groupBy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const email = searchParams.get("email");
  const ticketId = searchParams.get("ticketId");

  const client = await clientPromise;
  const db = client.db("test");
  const result = await db
    .collection("jeera")
    .find({ email: email }, { projection: { _id: 0, tickets: 1 } })
    .toArray();
  if (result[0].tickets === undefined) return NextResponse.json([]);
  const tickets = result[0].tickets;
  if (tickets.length === 0) return NextResponse.json([]);
  const ticket = findById(tickets, ticketId);
  return NextResponse.json(ticket[0]);
}
