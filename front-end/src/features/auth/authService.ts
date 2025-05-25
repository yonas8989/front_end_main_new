import api from "../../api/apiClient";
import {
  LoginCredentials,
  User,
  RegisterData,
  ResetPasswordData,
} from "../../types/auth";
import { ApiResponse } from "../../types/api";

// Define specific response types for each endpoint
interface LoginResponse extends ApiResponse {
  data: {
    token: string;
    user: User;
  };
}

interface RegisterResponse {
  user: User; // Simplified to match actual API response
}

interface CurrentUserResponse {
  status: string;
  data: {
    user: User;
  };
}

// Auth service interface for type safety
interface AuthService {
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  getCurrentUser: (userId: string) => Promise<User>; // Added userId parameter
  verifyEmail: (token: string) => Promise<void>;
}

const getErrorMessage = (error: any, defaultMessage: string): string => {
  // First check if there's a direct error message from the API
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Then check for specific status codes
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return "Validation error. Please check your input.";
      case 401:
        return "Invalid credentials. Please try again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 409:
        return "This email is already registered. Please use a different email or log in.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return defaultMessage;
    }
  } else if (error.request) {
    return "Network error. Please check your internet connection.";
  }

  return defaultMessage;
};

const authService: AuthService = {
  async login({
    emailOrPhoneNumber,
    password,
    rememberMe,
  }: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<LoginResponse>("/user/login", {
        emailOrPhoneNumber,
        password,
      });
      localStorage.setItem("token", data.data.token);
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      return data.data.user;
    } catch (error: any) {
      const errorMessage = getErrorMessage(
        error,
        error.message || "Login failed. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  async register(userData: RegisterData): Promise<User> {
    try {
      const { data } = await api.post<RegisterResponse>("/user", userData);

      // Directly access the user object from response
      if (data.user) {
        return data.user;
      }

      console.log("API Response:", data);
      throw new Error("User data missing in response");
    } catch (error: any) {
      const errorMessage = getErrorMessage(
        error,
        error.message || "Registration failed. Please try again."
      );
      throw new Error(errorMessage);
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
      const errorMessage = getErrorMessage(
        error,
        "Failed to send password reset email. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  async resetPassword({
    token,
    newPassword,
  }: ResetPasswordData): Promise<void> {
    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(
        error,
        "Password reset failed. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  async getCurrentUser(userId: string): Promise<User> {
    try {
      const { data } = await api.get<CurrentUserResponse>(`/user/${userId}`);
      
      if (data.data && data.data.user) {
        return data.data.user;
      }
      
      throw new Error("User data not found in response");
    } catch (error: any) {
      const errorMessage = getErrorMessage(
        error,
        "Failed to fetch user information. Please try again."
      );
      throw new Error(errorMessage);
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post("/auth/verify-email", { token });
    } catch (error: any) {
      const errorMessage = getErrorMessage(
        error,
        "Email verification failed. Please try again."
      );
      throw new Error(errorMessage);
    }
  },
};

export default authService;