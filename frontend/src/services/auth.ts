export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

const TOKEN_KEY = "silent_sos_token";
const USER_KEY = "silent_sos_user";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const result = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem(TOKEN_KEY, result.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.data.user));

    return result.data.user;
  },

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const result = await request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    localStorage.setItem(TOKEN_KEY, result.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.data.user));

    return result.data.user;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser(): User | null {
    const data = localStorage.getItem(USER_KEY);

    if (!data) return null;

    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  },
};