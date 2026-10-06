"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  deleteLead,
  getLead,
  updateLead,
  generateLeadSummary,
  generateLeadFollowUp,
  type Lead,
  type LeadUpdateData,
} from "@/lib/api";

import LeadForm from "@/components/leads/LeadForm";
import LeadStatusBadge from "@/components/leads/LeadStatusBadge";

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const [aiFollowUp, setAiFollowUp] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  useEffect(() => {
    async function loadLead() {
      try {
        setLoading(true);
        setError("");

        const data = await getLead(id);
        setLead(data);
      } catch {
        setError("Unable to load lead.");
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      loadLead();
    }
  }, [id]);

  async function handleUpdate(data: LeadUpdateData) {
    setSaving(true);
    setError("");

    try {
      const updated = await updateLead(id, data);
      setLead(updated);
      setEditing(false);
    } catch {
      setError("Unable to update lead.");
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerateSummary() {
    if (!lead) return;

    setAiLoading(true);
    setAiError("");

    try {
      const summary = await generateLeadSummary(lead);
      setAiSummary(summary);
    } catch {
      setAiError("Unable to generate AI summary. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleGenerateFollowUp() {
    if (!lead) return;

    setFollowUpLoading(true);
    setAiError("");

    try {
        const followUp = await generateLeadFollowUp(lead);
        setAiFollowUp(followUp);
    } catch {
        setAiError(
        "Unable to generate follow-up. Please try again."
        );
    } finally {
        setFollowUpLoading(false);
    }
}

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteLead(id);
      router.push("/");
    } catch {
      setError("Unable to delete lead.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        Loading lead...
      </main>
    );
  }

  if (!lead) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-red-600">
            {error || "Lead not found."}
          </p>

          <Link
            href="/"
            className="mt-4 inline-block text-sm underline"
          >
            Return to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to leads
        </Link>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {editing ? (
          <div className="mt-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Lead
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Update this lead's information.
              </p>
            </div>

            <LeadForm
              initialData={{
                name: lead.name,
                company: lead.company,
                email: lead.email,
                event: lead.event,
                notes: lead.notes,
                follow_up_status: lead.follow_up_status,
              }}
              submitLabel="Save Changes"
              loading={saving}
              onSubmit={(data) =>
                handleUpdate(data as LeadUpdateData)
              }
            />
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {lead.name}
                  </h1>

                  <LeadStatusBadge
                    status={lead.follow_up_status}
                  />
                </div>

                <p className="mt-2 text-gray-700">
                  {lead.company}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email
                </p>

                <p className="mt-2 break-all text-sm text-gray-900">
                  {lead.email}
                </p>
              </div>

              <div className="rounded-xl border bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Event
                </p>

                <p className="mt-2 text-sm text-gray-900">
                  {lead.event}
                </p>
              </div>

              <div className="rounded-xl border bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <div className="mt-2">
                  <LeadStatusBadge
                    status={lead.follow_up_status}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Interaction Notes
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-700">
                {lead.notes}
              </p>
            </div>

            <div className="mt-6 rounded-xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                AI Assistance
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Use Gemini to analyze this lead interaction.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={aiLoading}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {aiLoading
                    ? "Generating..."
                    : "Generate Summary"}
                </button>

                <button
                    type="button"
                    onClick={handleGenerateFollowUp}
                    disabled={followUpLoading}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    {followUpLoading
                        ? "Drafting..."
                        : "Draft Follow-up"}
                </button>
              </div>

              {aiError && (
                <p className="mt-4 text-sm text-red-600">
                  {aiError}
                </p>
              )}

              {aiFollowUp && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                        AI-Generated Follow-up
                    </h3>

                    <button
                        type="button"
                        onClick={() =>
                        navigator.clipboard.writeText(aiFollowUp)
                        }
                        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Copy
                    </button>
                    </div>

                    <div className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    {aiFollowUp}
                    </div>
                </div>
                )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}