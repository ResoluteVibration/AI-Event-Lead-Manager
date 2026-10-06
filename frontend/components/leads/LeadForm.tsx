"use client";

import { useState } from "react";
import type {
  LeadCreateData,
//   LeadUpdateData,
} from "@/lib/api";

interface LeadFormProps {
  initialData?: Partial<LeadCreateData>;
  submitLabel?: string;
  loading?: boolean;
  onSubmit: (
    data: LeadCreateData
  ) => Promise<void>;
}

export default function LeadForm({
  initialData,
  submitLabel = "Save Lead",
  loading = false,
  onSubmit,
}: LeadFormProps) {
  const [name, setName] = useState(
    initialData?.name ?? ""
  );

  const [company, setCompany] = useState(
    initialData?.company ?? ""
  );

  const [email, setEmail] = useState(
    initialData?.email ?? ""
  );

  const [event, setEvent] = useState(
    initialData?.event ?? ""
  );

  const [notes, setNotes] = useState(
    initialData?.notes ?? ""
  );

  const [status, setStatus] = useState<
    "PENDING" | "CONTACTED" | "COMPLETED"
  >(
    initialData?.follow_up_status ??
      "PENDING"
  );

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!company.trim()) {
      setError("Company is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!event.trim()) {
      setError("Event is required.");
      return;
    }

    if (!notes.trim()) {
      setError("Interaction notes are required.");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        event: event.trim(),
        notes: notes.trim(),
        follow_up_status: status,
      });
    } catch {
      setError(
        "Unable to save the lead. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6"
    >
      <div className="grid gap-6 md:grid-cols-2">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="John Smith"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-medium"
          >
            Company
          </label>

          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            placeholder="Acme Corp"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="john@acme.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black"
          />
        </div>

        {/* Event */}
        <div>
          <label
            htmlFor="event"
            className="mb-2 block text-sm font-medium"
          >
            Event
          </label>

          <input
            id="event"
            type="text"
            value={event}
            onChange={(e) =>
              setEvent(e.target.value)
            }
            placeholder="Tech Summit"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium"
          >
            Follow-up Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "PENDING"
                  | "CONTACTED"
                  | "COMPLETED"
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-black"
          >
            <option value="PENDING">
              Pending
            </option>

            <option value="CONTACTED">
              Contacted
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium"
          >
            Interaction Notes
          </label>

          <textarea
            id="notes"
            rows={6}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="What did you discuss with this lead?"
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black"
          />
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}