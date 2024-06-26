import clientPromise from "@/lib/db";
import { filterWithoutId, groupByTag } from "@/lib/groupBy";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, heading, content, tag, userId, teamId } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  let tickets = [];
  const existingDoc = await db.collection("jeera").findOne({ email: email });
  if (existingDoc) {
    if (existingDoc.tickets) {
      tickets = existingDoc.tickets;
    }
  }
  const ticketObject = {
    heading: heading,
    content: content,
    tag: tag,
    ticketId:
      existingDoc?._id.toString() + tickets.length.toString().padStart(2, "0"),
  };
  tickets.push(ticketObject);
  const result = await db.collection("jeera").updateOne(
    { email: email },
    {
      $set: { tickets: tickets },
    }
  );

  if (result.modifiedCount == 1) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const client = await clientPromise;
    const db = client.db("test");
    const result = await db
      .collection("jeera")
      .find({ email: email }, { projection: { _id: 0, tickets: 1 } })
      .toArray();
    if (result[0].tickets === undefined) return NextResponse.json([]);
    const tickets = result[0].tickets;
    if (tickets.length === 0) return NextResponse.json([]);
    const grouped = groupByTag(tickets);
    return NextResponse.json(grouped);
  } catch (error) {}
}

export async function PUT(req: NextRequest) {
  const { email, tagTo, ticketId, ticket } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const document = await db.collection("jeera").findOne({ email: email });
  let updated = false;
  let tickets;
  if (document === null || document === undefined) {
    return NextResponse.json({ success: false });
  }
  if (document.tickets === undefined) {
    return NextResponse.json({ success: false });
  }
  tickets = document.tickets;
  for (var i = 0; i < tickets.length; i++) {
    if (ticketId == tickets[i].ticketId) {
      tickets[i] = ticket;
      updated = true;
      break;
    }
  }
  const result = await db
    .collection("jeera")
    .updateOne({ email: email }, { $set: { tickets: tickets } });
  if (updated && result.modifiedCount == 1) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}

export async function DELETE(req: NextRequest) {
  const { email, ticketId } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db
    .collection("jeera")
    .find({ email: email }, { projection: { _id: 0, tickets: 1 } })
    .toArray();
  if (result[0].tickets === undefined)
    return NextResponse.json({ success: false });
  const tickets = result[0].tickets;
  if (tickets.length === 0) return NextResponse.json({ success: false });
  const newTickets = filterWithoutId(ticketId, tickets);
  const response = await db
    .collection("jeera")
    .updateOne({ email: email }, { $set: { tickets: newTickets } });
  if (response.modifiedCount === 1) {
    return NextResponse.json({ succcess: true });
  }
  return NextResponse.json({ success: false });
}
