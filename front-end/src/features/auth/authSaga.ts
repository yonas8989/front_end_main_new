import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  verifyOTPSuccess,
  verifyOTPFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  logoutSuccess,
  logoutFailure,
  loginRequest,
  registerRequest,
  verifyOTPRequest,
  resetPasswordRequest,
  logoutRequest,
  clientLogout,
} from "./authSlice";
import { api } from "../../api/apiClient";
import {
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  VerifyOTPData,
  User,
} from "../../types/auth";
import { ApiResponse } from "../../types/api";

// Token management functions
function storeToken(token: string) {
  localStorage.setItem("token", token);
}

function clearToken() {
  localStorage.removeItem("token");
}

function* handleLogin(action: PayloadAction<LoginCredentials>) {
  try {
    const response: ApiResponse<{
      user: User;
      token?: string;
    }> = yield call(api.post, "/user/login", action.payload);

    if (response.status === "SUCCESS") {
      if (!response.token) {
        throw new Error("Token missing in login response");
      }
      
      storeToken(response.token);
      yield put(
        loginSuccess({
          user: response.data.user,
          token: response.token,
        })
      );
    } else {
      throw new Error(response.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    let errorMessage = "Login failed";
    
    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Invalid login credentials";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(loginFailure(errorMessage));
  }
}

function* handleRegister(action: PayloadAction<RegisterData>) {
  try {
    const response: ApiResponse<{ user: User }> = yield call(api.post, "/user", action.payload);

    if (response.status === "SUCCESS") {
      yield put(
        registerSuccess({
          user: response.data.user,
        })
      );
    } else {
      throw new Error(response.message || "Registration failed");
    }
  } catch (error) {
    console.error("Register error:", error);
    let errorMessage = "Registration failed";
    
    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Registration failed";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(registerFailure(errorMessage));
  }
}

function* handleVerifyOTP(action: PayloadAction<VerifyOTPData>) {
  try {
    const response: ApiResponse<{ verified: boolean }> = yield call(
      api.post,
      "/auth/verify-otp",
      action.payload
    );

    if (response.status === "SUCCESS") {
      yield put(verifyOTPSuccess(response.data.verified));
    } else {
      throw new Error(response.message || "OTP verification failed");
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    yield put(
      verifyOTPFailure(
        error instanceof Error ? error.message : "OTP verification failed"
      )
    );
  }
}

function* handleResetPassword(action: PayloadAction<ResetPasswordData>) {
  try {
    const response: ApiResponse<{}> = yield call(
      api.post,
      "/auth/reset-password",
      action.payload
    );

    if (response.status === "SUCCESS") {
      yield put(resetPasswordSuccess());
    } else {
      throw new Error(response.message || "Password reset failed");
    }
  } catch (error) {
    console.error("Reset password error:", error);
    yield put(
      resetPasswordFailure(
        error instanceof Error ? error.message : "Password reset failed"
      )
    );
  }
}

function* handleLogout() {
  try {
    const token = localStorage.getItem("token");
    
    // Only call backend logout if we have a token
    if (token) {
      const response: ApiResponse<{}> = yield call(api.post, "/auth/logout");
      
      if (response.status !== "SUCCESS") {
        throw new Error(response.message || "Logout failed");
      }
    }
    
    // Clear token and update state regardless of backend result
    clearToken();
    yield put(logoutSuccess());
    
  } catch (error) {
    console.error("Logout error:", error);
    let errorMessage = "Logout failed";
    
    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Logout failed";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Still clear token even if backend logout failed
    clearToken();
    yield put(logoutFailure(errorMessage));
  }
}

// Client-side only logout handler
function* handleClientLogout() {
  clearToken();
  yield put(logoutSuccess());
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(registerRequest.type, handleRegister);
  yield takeEvery(verifyOTPRequest.type, handleVerifyOTP);
  yield takeEvery(resetPasswordRequest.type, handleResetPassword);
  yield takeEvery(logoutRequest.type, handleLogout);
  yield takeEvery(clientLogout.type, handleClientLogout);
}