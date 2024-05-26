import clientPromise from "@/lib/db";
import { filterWithoutId, groupByTag } from "@/lib/groupBy";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { teamId, userId, heading, content, tag } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  let tickets = [];
  const existingDoc = await db
    .collection("jeerateam")
    .findOne({ _id: new ObjectId(teamId.toString()) });
  if (existingDoc) {
    if (existingDoc.workArray) {
      tickets = existingDoc.workArray;
    }
  }
  const ticketObject = {
    heading: heading,
    content: content,
    tag: tag,
    ticketId:
      existingDoc?._id.toString() + tickets.length.toString().padStart(2, "0"),
    createdBy: userId,
    timeStamp: Date.now(),
  };
  tickets.push(ticketObject);
  const result = await db.collection("jeerateam").updateOne(
    { _id: new ObjectId(teamId.toString()) },
    {
      $set: { workArray: tickets },
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
    const teamId = searchParams.get("teamId");    
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
    const grouped = groupByTag(tickets);
    return NextResponse.json(grouped);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function PUT(req: NextRequest) {
  const { ticketId, ticket, teamId } = await req.json();
  const client = await clientPromise;
  const db = client.db("test");
  const document = await db
    .collection("jeerateam")
    .findOne({ _id: new ObjectId(teamId) });
  let updated = false;
  let tickets;
  if (document === null || document === undefined) {
    return NextResponse.json({ success: false });
  }
  if (document.workArray === undefined) {
    return NextResponse.json({ success: false });
  }
  tickets = document.workArray;
  for (var i = 0; i < tickets.length; i++) {
    if (ticketId == tickets[i].ticketId) {
      tickets[i] = ticket;
      updated = true;
      break;
    }
  }
  const result = await db
    .collection("jeerateam")
    .updateOne({ _id: new ObjectId(teamId) }, { $set: { workArray: tickets } });
  if (updated && result.modifiedCount == 1) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}

export async function DELETE(req: NextRequest) {
  const { teamId, ticketId } = await req.json();
  console.log(teamId, ticketId)
  const client = await clientPromise;
  const db = client.db("test");
  const result = await db
    .collection("jeerateam")
    .find(
      { _id: new ObjectId(teamId) },
      { projection: { _id: 0, workArray: 1 } }
    )
    .toArray();
  console.log(result);
  if (result.length == 0 || result[0].workArray === undefined)
    return NextResponse.json({ success: false });
  const tickets = result[0].workArray;
  if (tickets.length === 0) return NextResponse.json({ success: false });
  const newTickets = filterWithoutId(ticketId, tickets);
  const response = await db
    .collection("jeerateam")
    .updateOne(
      { _id: new ObjectId(teamId) },
      { $set: { workArray: newTickets } }
    );
  if (response.modifiedCount === 1) {
    return NextResponse.json({ succcess: true });
  }
  return NextResponse.json({ success: false });
}
