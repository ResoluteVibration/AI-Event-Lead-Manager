import type { Lead } from "@/lib/api";

interface LeadStatusBadgeProps {
  status: Lead["follow_up_status"];
}

export default function LeadStatusBadge({
  status,
}: LeadStatusBadgeProps) {
  const styles = {
    PENDING:
      "bg-yellow-100 text-yellow-800",
    CONTACTED:
      "bg-blue-100 text-blue-800",
    COMPLETED:
      "bg-green-100 text-green-800",
  };

  const labels = {
    PENDING: "Pending",
    CONTACTED: "Contacted",
    COMPLETED: "Completed",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}