import type { Lead } from "@/lib/api";

interface StatsCardsProps {
  leads: Lead[];
  total: number;
}

export default function StatsCards({
  leads,
  total,
}: StatsCardsProps) {
  const pending = leads.filter(
    (lead) =>
      lead.follow_up_status === "PENDING"
  ).length;

  const contacted = leads.filter(
    (lead) =>
      lead.follow_up_status === "CONTACTED"
  ).length;

  const completed = leads.filter(
    (lead) =>
      lead.follow_up_status === "COMPLETED"
  ).length;

  const stats = [
    {
      label: "Total",
      value: total,
    },
    {
      label: "Pending",
      value: pending,
    },
    {
      label: "Contacted",
      value: contacted,
    },
    {
      label: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border bg-white p-5"
        >
          <p className="text-sm text-gray-500">
            {stat.label}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}