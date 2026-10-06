"use client";

interface LeadFiltersProps {
  search: string;
  status: string;
  event: string;
  events: string[];

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onEventChange: (
    value: string
  ) => void;
}

export default function LeadFilters({
  search,
  status,
  event,
  events,
  onSearchChange,
  onStatusChange,
  onEventChange,
}: LeadFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_180px_220px]">
      <input
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        placeholder="Search leads..."
        className="rounded-lg border px-4 py-2.5 outline-none focus:border-black"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-black"
        >
        <option value="" className="text-gray-900">
            All statuses
        </option>

        <option
            value="PENDING"
            className="text-gray-900"
        >
            Pending
        </option>

        <option
            value="CONTACTED"
            className="text-gray-900"
        >
            Contacted
        </option>

        <option
            value="COMPLETED"
            className="text-gray-900"
        >
            Completed
        </option>
      </select>

      <select
        value={event}
        onChange={(e) => onEventChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-black"
        >
        <option value="" className="text-gray-900">
            All events
        </option>

        {events.map((eventName) => (
            <option
            key={eventName}
            value={eventName}
            className="text-gray-900"
            >
            {eventName}
            </option>
        ))}
        </select>
    </div>
  );
}