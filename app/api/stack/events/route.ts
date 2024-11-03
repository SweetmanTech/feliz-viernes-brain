import { NextResponse } from "next/server";
import { stack } from "@/lib/stack";

export async function GET() {
  try {
    // Get latest events from Stack SDK
    const events = await stack.getEvents({
      query: stack.eventsQuery().limit(50).build(),
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
