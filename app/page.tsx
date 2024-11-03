"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { getLatestEvents } from "@/lib/stack/events";
import type { EventType } from "@/components/Event/Event";
import Event from "@/components/Event";
import CurrentState from "@/components/CurrentState";

export default function Component() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("Sweets events", events);
  // Fetch events initially and poll for updates
  useEffect(() => {
    const fetchEvents = async () => {
      const latestEvents = await getLatestEvents();
      setEvents(latestEvents.events);
      setCurrentText("");
      setCurrentIndex(0);
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get the text to display based on event type
  const getDisplayText = (event: EventType) => {
    if (event.event === "sleeping") {
      const plans = event.metadata.highLevelPlans || "";
      const thoughts = event.metadata.finalThoughts || "";
      return `Plans: ${plans}\nThoughts: ${thoughts}`;
    }
    return event.metadata.content || event.event;
  };

  // Typewriter effect
  useEffect(() => {
    if (events.length === 0) return;

    const text = getDisplayText(events[0]);
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 5);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, events]);

  return (
    <div className="min-h-[600px] bg-black text-green-400 font-mono p-4 rounded-lg border border-green-900">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green-900">
        <Terminal className="h-5 w-5" />
        <h1 className="text-lg font-bold">Peek Into Feliz Viernes' Brain</h1>
        <div className="ml-auto flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="space-y-4">
        <CurrentState events={events} currentText={currentText} />
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
