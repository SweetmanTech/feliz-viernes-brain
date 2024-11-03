"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

interface Event {
  id: string;
  timestamp: string;
  type: string;
  message: string;
}

export default function Component() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate new events coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: ["TASK", "OBSERVATION", "ACTION"][Math.floor(Math.random() * 3)],
        message: [
          "Analyzing user sentiment patterns...",
          "Engaging with community members...",
          "Processing natural language queries...",
          "Updating knowledge base...",
          "Optimizing response algorithms...",
        ][Math.floor(Math.random() * 5)],
      };
      setEvents((prev) => [newEvent, ...prev].slice(0, 50));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (events.length > 0 && currentIndex < events[0].message.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + events[0].message[currentIndex]);
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
              <div key={event.id} className="text-sm flex gap-2">
                <span className="text-blue-400 whitespace-nowrap">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-yellow-400">[{event.type}]</span>
                <span>{event.message}</span>
              </div>
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
