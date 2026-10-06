"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LeadForm from "@/components/leads/LeadForm";
import {
  createLead,
  type LeadCreateData,
} from "@/lib/api";

export default function NewLeadPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleCreate(data: LeadCreateData) {
    setLoading(true);

    try {
      const lead = await createLead(data);

      router.push(`/leads/${lead.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8">
          <button
            onClick={() =>
              router.back()
            }
            className="mb-4 text-sm text-gray-500 hover:text-black"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold">
            Add Lead
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a person you met at a business event.
          </p>
        </div>

        <LeadForm
          submitLabel="Create Lead"
          loading={loading}
          onSubmit={handleCreate}
        />
      </div>
    </main>
  );
}