interface Event {
  id: string;
  timestamp: string;
  type: string;
  metadata: {
    content?: string;
  };
}

export async function getLatestEvents(): Promise<{ events: Event[] }> {
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
