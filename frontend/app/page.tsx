"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  deleteLead,
  getLeads,
  type Lead,
} from "@/lib/api";

import LeadFilters from "@/components/leads/LeadFilters";
import LeadTable from "@/components/leads/LeadTable";
import StatsCards from "@/components/leads/StatsCards";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>(
    []
  );

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [event, setEvent] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadLeads() {
    try {
      setLoading(true);
      setError("");

      const response = await getLeads({
        search,
        status,
        event,
        page,
        page_size: 10,
      });

      setLeads(response.data);
      setTotal(response.pagination.total);
      setTotalPages(
        response.pagination.total_pages
      );
    } catch {
      setError(
        "Unable to load leads."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, [
    search,
    status,
    event,
    page,
  ]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteLead(id);

      await loadLeads();
    } catch {
      setError(
        "Unable to delete lead."
      );
    }
  }

  const events = Array.from(
    new Set(
      leads.map(
        (lead) => lead.event
      )
    )
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatus(value: string) {
    setStatus(value);
    setPage(1);
  }

  function handleEvent(value: string) {
    setEvent(value);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Event Lead Manager
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage people you've met at business events.
            </p>
          </div>

          <Link
            href="/leads/new"
            className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Add Lead
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <StatsCards
            leads={leads}
            total={total}
          />
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-xl border bg-white p-4">
          <LeadFilters
            search={search}
            status={status}
            event={event}
            events={events}
            onSearchChange={
              handleSearch
            }
            onStatusChange={
              handleStatus
            }
            onEventChange={
              handleEvent
            }
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Leads */}
        <div className="mt-6">
          {loading ? (
            <div className="rounded-xl border bg-white p-12 text-center">
              Loading leads...
            </div>
          ) : (
            <LeadTable
              leads={leads}
              onDelete={
                handleDelete
              }
            />
          )}
        </div>

        {/* Pagination */}
        {!loading &&
          totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Page {page} of{" "}
                {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        current - 1
                    )
                  }
                  className="rounded-lg border bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  disabled={
                    page === totalPages
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1
                    )
                  }
                  className="rounded-lg border bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
      </div>
    </main>
  );
}