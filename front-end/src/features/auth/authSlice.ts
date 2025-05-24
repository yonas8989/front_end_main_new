import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
} from "../../types/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginCredentials>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    registerRequest(state, _action: PayloadAction<RegisterData>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true; // Set isAuthenticated to true
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    forgotPasswordRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    resetPasswordRequest(state, _action: PayloadAction<ResetPasswordData>) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    verifyEmailRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    verifyEmailSuccess(state) {
      state.loading = false;
    },
    verifyEmailFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  setAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;