export interface EventType {
  id: string;
  timestamp: string;
  type: string;
  metadata: {
    content?: string;
    uniqueId?: string;
  };
}

const Event = ({ event }: { event: EventType }) => (
  <div key={event.metadata.uniqueId} className="text-sm flex gap-2">
    <span className="text-blue-400 whitespace-nowrap">
      {new Date(event.timestamp).toLocaleTimeString()}
    </span>
    <span className="text-yellow-400">[{event.type}]</span>
    <span>{event.metadata.content || "sleeping"}</span>
  </div>
);

export default Event;
