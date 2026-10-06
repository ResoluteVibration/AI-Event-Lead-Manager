import Link from "next/link";

import type { Lead } from "@/lib/api";
import LeadStatusBadge from "./LeadStatusBadge";

interface LeadTableProps {
  leads: Lead[];
  onDelete: (id: number) => void;
}

export default function LeadTable({
  leads,
  onDelete,
}: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <h3 className="text-lg font-semibold">
          No leads found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-12 text-center text-gray-900">      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-900">
          <thead className="border-b bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">
                Name
              </th>

              <th className="px-6 py-4 font-medium">
                Company
              </th>

              <th className="px-6 py-4 font-medium">
                Event
              </th>

              <th className="px-6 py-4 font-medium">
                Email
              </th>

              <th className="px-6 py-4 font-medium">
                Status
              </th>

              <th className="px-6 py-4 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {lead.name}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {lead.company}
                </td>

                <td className="px-6 py-4">
                  {lead.event}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {lead.email}
                </td>

                <td className="px-6 py-4">
                  <LeadStatusBadge
                    status={lead.follow_up_status}
                  />
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => onDelete(lead.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}