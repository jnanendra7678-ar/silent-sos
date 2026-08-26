import { authService } from "./auth";

const API_URL = "http://localhost:5000/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authService.getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship?: string;
}

export interface SOSAlert {
  id: string;
  message?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  resolvedAt?: string;
}

export interface Location {
  id?: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  createdAt?: string;
}

export const api = {
  async getContacts(): Promise<Contact[]> {
    const result = await request<{ success: boolean; data: Contact[] }>(
      "/contacts"
    );

    return result.data;
  },

  async addContact(contact: {
    name: string;
    phone: string;
    email?: string;
    relationship?: string;
  }): Promise<Contact> {
    const result = await request<{ success: boolean; data: Contact }>(
      "/contacts",
      {
        method: "POST",
        body: JSON.stringify(contact),
      }
    );

    return result.data;
  },

  async deleteContact(id: string): Promise<void> {
    await request(`/contacts/${id}`, {
      method: "DELETE",
    });
  },

  async createSOS(location?: {
    latitude?: number;
    longitude?: number;
    accuracy?: number;
    message?: string;
  }): Promise<SOSAlert> {
    const result = await request<{ success: boolean; data: SOSAlert }>("/sos", {
      method: "POST",
      body: JSON.stringify(location || {}),
    });

    return result.data;
  },

  async getActiveSOS(): Promise<SOSAlert | null> {
    const result = await request<{
      success: boolean;
      data: SOSAlert | null;
    }>("/sos/active");

    return result.data;
  },

  async getSOSHistory(): Promise<SOSAlert[]> {
    const result = await request<{
      success: boolean;
      data: SOSAlert[];
    }>("/sos");

    return result.data;
  },

  async resolveSOS(id: string): Promise<SOSAlert> {
    const result = await request<{ success: boolean; data: SOSAlert }>(
      `/sos/${id}/resolve`,
      {
        method: "PATCH",
      }
    );

    return result.data;
  },

  async sendLocation(location: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    sosId?: string;
  }): Promise<Location> {
    const result = await request<{ success: boolean; data: Location }>(
      "/location",
      {
        method: "POST",
        body: JSON.stringify(location),
      }
    );

    return result.data;
  },

  async getLatestLocation(): Promise<Location | null> {
    const result = await request<{
      success: boolean;
      data: Location | null;
    }>("/location/latest");

    return result.data;
  },
};