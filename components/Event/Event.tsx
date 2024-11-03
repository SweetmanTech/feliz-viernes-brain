export interface EventType {
  id: string;
  timestamp: string;
  event: string;
  metadata: {
    content?: string;
    uniqueId?: string;
    highLevelPlans?: string[];
    finalThoughts?: string;
  };
}

const Event = ({ event }: { event: EventType }) => (
  <div key={event.metadata.uniqueId} className="text-sm flex flex-col gap-1">
    <div className="flex gap-2">
      <span className="text-blue-400 whitespace-nowrap">
        {new Date(event.timestamp).toLocaleTimeString()}
      </span>
      <span className="text-yellow-400">[{event.event}]</span>
      <span>{event.event}</span>
    </div>

    <div className="ml-4 text-gray-400">
      {event.metadata.highLevelPlans && (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">High Level Plans:</span>
          <p className="list-disc list-inside pl-2">
            {event.metadata.highLevelPlans}
          </p>
        </div>
      )}
      {event.metadata.finalThoughts && (
        <div className="mt-1">
          <span className="font-semibold">Final Thoughts:</span>
          <p>{event.metadata.finalThoughts}</p>
        </div>
      )}
    </div>
    {event.metadata.content && (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Post Text:</span>
        <p className="list-disc list-inside pl-2">{event.metadata.content}</p>
      </div>
    )}
  </div>
);

export default Event;
