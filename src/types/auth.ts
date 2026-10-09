// ============================================================
// AUTHENTICATION TYPES
// TypeScript interfaces for users, login responses, and auth forms.
// ============================================================
// User information shown in the dashboard/header.
export interface User {
  id?: string;
  fullName?: string;
  email: string;
  gender?: string;
}

// Possible response shapes returned by the login API.
export interface LoginResponse {
  accessToken?: string;
  access_token?: string;
  token?: string;
  user?: User;
  data?: {
    user?: User;
    accessToken?: string;
    access_token?: string;
    token?: string;
  };
  message?: string;
  error?: string;
}

// Data sent by the Signup form.
export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  gender: string;
}

// Data sent by the Login form.
export interface LoginPayload {
  email: string;
  password: string;
}
