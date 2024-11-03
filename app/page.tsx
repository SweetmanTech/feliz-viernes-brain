"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { getLatestEvents } from "@/lib/stack/events";
import type { EventType } from "@/components/Event/Event";
import Event from "@/components/Event";

export default function Component() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch events initially and poll for updates
  useEffect(() => {
    // Initial fetch
    const fetchEvents = async () => {
      const latestEvents = await getLatestEvents();
      console.log("latestEvents", latestEvents.events);
      setEvents(latestEvents.events);
    };

    // Fetch immediately
    fetchEvents();

    // Set up polling interval
    const interval = setInterval(fetchEvents, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const text = events?.[0]?.metadata?.content || "sleeping";
    if (events.length > 0 && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, events]);

  // Reset typewriter when new event comes in
  useEffect(() => {
    setCurrentText("");
    setCurrentIndex(0);
  }, [events.length]);

  return (
    <div className="min-h-[600px] bg-black text-green-400 font-mono p-4 rounded-lg border border-green-900">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green-900">
        <Terminal className="h-5 w-5" />
        <h1 className="text-lg font-bold">Feliz Viernes Status Terminal</h1>
        <div className="ml-auto flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-black/50 p-4 rounded border border-green-900">
          <h2 className="text-sm font-bold mb-2">CURRENT_STATE</h2>
          <div className="flex items-start gap-2">
            <span className="text-blue-400">{">"}</span>
            <p className="text-sm">
              {events.length > 0 ? currentText : "Awaiting new events..."}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>

        <div className="bg-black/50 p-4 rounded border border-green-900">
          <h2 className="text-sm font-bold mb-2">EVENT_LOG</h2>
          <div className="space-y-2">
            {events.map((event) => (
              <Event key={event.metadata.uniqueId} event={event} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-green-600">
          <span className="animate-pulse">{">"}</span>
          <span>System operational - Press any key to interact</span>
        </div>
      </div>
    </div>
  );
}
