import api from "../api/apiClient";
import {
  LoginCredentials,
  User,
  RegisterData,
  ResetPasswordData,
} from "../types/auth";
import { ApiResponse } from "../types/api";

// Custom error for authentication-specific issues
class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AuthError";
  }
}

// Auth service interface for type safety
interface AuthService {
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  getCurrentUser: () => Promise<User>;
  verifyEmail: (token: string) => Promise<void>;
}

const authService: AuthService = {
  async login({ email, password, rememberMe }: LoginCredentials): Promise<User> {
    try {
      const response = await api.post(
        "/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      return response.data.user;
    } catch (error: any) {
      throw new AuthError(
        error.response?.data?.message || "Login failed",
        error.response?.status
      );
    }
  },

  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await api.post(
        "/auth/register",
        userData
      );
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error: any) {
      throw new AuthError(
        error.response?.data?.message || "Registration failed",
        error.response?.status
      );
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      console.warn("Logout request failed:", error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("rememberMe");
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post("/auth/forgot-password", { email });
    } catch (error: any) {
      throw new AuthError(
        error.response?.data?.message || "Failed to send password reset email",
        error.response?.status
      );
    }
  },

  async resetPassword({ token, newPassword }: ResetPasswordData): Promise<void> {
    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
    } catch (error: any) {
      throw new AuthError(
        error.response?.data?.message || "Password reset failed",
        error.response?.status
      );
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error: any) {
      throw new AuthError(
        error.response?.data?.message || "Failed to fetch user",
        error.response?.status
      );
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post("/auth/verify-email", { token });
    } catch (error: any) {
      throw new AuthError(
        error.response?.data?.message || "Email verification failed",
        error.response?.status
      );
    }
  },
};

export default authService;