export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  user?: { email: string };
  error?: string;
}
