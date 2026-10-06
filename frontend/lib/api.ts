const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "";

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  event: string;
  notes: string;
  follow_up_status:
    | "PENDING"
    | "CONTACTED"
    | "COMPLETED";
  created_at: string;
  updated_at: string;
}

export interface LeadListResponse {
  data: Lead[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}

export interface LeadCreateData {
  name: string;
  company: string;
  email: string;
  event: string;
  notes: string;
  follow_up_status?:
    | "PENDING"
    | "CONTACTED"
    | "COMPLETED";
}

export interface LeadUpdateData {
  name?: string;
  company?: string;
  email?: string;
  event?: string;
  notes?: string;
  follow_up_status?:
    | "PENDING"
    | "CONTACTED"
    | "COMPLETED";
}

export async function getLeads(
  params: {
    search?: string;
    status?: string;
    event?: string;
    page?: number;
    page_size?: number;
  } = {}
): Promise<LeadListResponse> {
  const query = new URLSearchParams();

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.status) {
    query.set("status", params.status);
  }

  if (params.event) {
    query.set("event", params.event);
  }

  if (params.page) {
    query.set("page", String(params.page));
  }

  if (params.page_size) {
    query.set("page_size", String(params.page_size));
  }

  const response = await fetch(
    `${API_URL}/api/leads?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

export async function getLead(
  id: number
): Promise<Lead> {
  const response = await fetch(
    `${API_URL}/api/leads/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lead");
  }

  return response.json();
}

export async function createLead(
  data: LeadCreateData
): Promise<Lead> {
  const response = await fetch(
    `${API_URL}/api/leads`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return response.json();
}

export async function updateLead(
  id: number,
  data: LeadUpdateData
): Promise<Lead> {
  const response = await fetch(
    `${API_URL}/api/leads/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  return response.json();
}

export async function deleteLead(
  id: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/leads/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }
}

export interface AIResponse {
  result: string;
}

export async function generateLeadSummary(
  lead: Lead
): Promise<string> {
  const response = await fetch(
    `${API_URL}/api/ai/summarize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        event: lead.event,
        notes: lead.notes,
        follow_up_status: lead.follow_up_status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to generate AI summary.");
  }

  const data: AIResponse = await response.json();

  return data.result;
}

export async function generateLeadFollowUp(
  lead: Lead
): Promise<string> {
  const response = await fetch(
    `${API_URL}/api/ai/follow-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        event: lead.event,
        notes: lead.notes,
        follow_up_status: lead.follow_up_status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to generate follow-up.");
  }

  const data: AIResponse = await response.json();

  return data.result;
}