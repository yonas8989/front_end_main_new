// src/types/auth.ts
import { ApiResponse } from './api'; // Import from shared location

export interface LoginCredentials {
  emailOrPhoneNumber: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  [key: string]: any;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}
export interface VerifyOTPData {
  emailOrPhoneNumber: string;  // The email or phone number used during registration
  otp: string;                // The one-time password received by the user
}
// Remove the local ApiResponse definition