import { LoginPayload, RegisterPayload, AuthApiResponse } from "../model/types";

export const authService = {
  /**
   * Send login credentials to BFF authentication route
   */
  async login(payload: LoginPayload): Promise<AuthApiResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return {
      ...data,
      success: res.ok && Boolean(data.success),
    };
  },

  /**
   * Send registration payload to BFF register route
   */
  async register(payload: RegisterPayload): Promise<AuthApiResponse> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return {
      ...data,
      success: res.ok && Boolean(data.success),
    };
  },
};
