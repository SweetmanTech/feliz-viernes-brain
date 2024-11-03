import { EventType } from "@/components/Event/Event";

export async function getLatestEvents(): Promise<{ events: EventType[] }> {
  try {
    const response = await fetch("/api/stack/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching latest events:", error);
    return { events: [] };
  }
}
