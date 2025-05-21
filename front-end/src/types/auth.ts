// src/types/auth.ts
import { ApiResponse } from './api'; // Import from shared location

export interface LoginCredentials {
  email: string;
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

// Remove the local ApiResponse definition