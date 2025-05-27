import { call, put, takeEvery } from "redux-saga/effects";
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

// Helper function to store token in localStorage
function storeToken(token: string) {
  localStorage.setItem("token", token);
}

function* handleLogin(action: PayloadAction<LoginCredentials>) {
  try {
    const response: ApiResponse<{
      user: User;
      token?: string;
    }> = yield call(api.post, "/user/login", action.payload);

    if (response.status === "SUCCESS") {
      if (response.token) {
        storeToken(response.token);
      }
      if (!response.token) {
        throw new Error("Token missing in login response");
      }

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
    yield put(
      loginFailure(error instanceof Error ? error.message : "Login failed")
    );
  }
}

function* handleRegister(action: PayloadAction<RegisterData>) {
  try {
    const response: ApiResponse<{
      user: User;
      token: string;
    }> = yield call(api.post, "/user", action.payload);
    console.log("Raw API response:", JSON.stringify(response, null, 2));

    if (response.status === "SUCCESS") {
      if (response.data.token) {
        storeToken(response.data.token);
      }
      yield put(
        registerSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );
    } else {
      throw new Error(response.message || "Registration failed");
    }
  } catch (error) {
    console.error("Register error:", error);
    yield put(
      registerFailure(
        error instanceof Error ? error.message : "Registration failed"
      )
    );
  }
}

function* handleVerifyOTP(action: PayloadAction<VerifyOTPData>) {
  try {
    const response: ApiResponse<{ verified: boolean }> = yield call(
      api.post,
      "/auth/verify-otp",
      action.payload
    );
    console.log("Raw API response:", JSON.stringify(response, null, 2));

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
    console.log("Raw API response:", JSON.stringify(response, null, 2));

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
    const response: ApiResponse<{}> = yield call(api.post, "/auth/logout");
    console.log("Raw API response:", JSON.stringify(response, null, 2));

    if (response.status === "SUCCESS") {
      localStorage.removeItem("authToken");
      yield put(logoutSuccess());
    } else {
      throw new Error(response.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    yield put(
      logoutFailure(error instanceof Error ? error.message : "Logout failed")
    );
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(registerRequest.type, handleRegister);
  yield takeEvery(verifyOTPRequest.type, handleVerifyOTP);
  yield takeEvery(resetPasswordRequest.type, handleResetPassword);
  yield takeEvery(logoutRequest.type, handleLogout);
}
