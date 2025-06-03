import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginCredentials,
  RegisterData,

  User,
} from "../../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// In authSlice.ts
const loadInitialState = (): AuthState => {
  const token = localStorage.getItem("token");
  return {
    user: null, // You might want to load user data too
    token,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginCredentials>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    registerRequest(state, _action: PayloadAction<RegisterData>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.loading = false;
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
      state.token = null;
      state.loading = false;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    // Add client-side logout action
    clientLogout(state) {
      state.user = null;
      state.token = null;
    },
    // In authSlice.ts
    verifyTokenRequest(state) {
      state.loading = true;
    },
    verifyTokenSuccess(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.loading = false;
    },
    verifyTokenFailure(state) {
      state.token = null;
      state.loading = false;
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
  clientLogout,
  verifyTokenFailure,
  verifyTokenRequest,
  verifyTokenSuccess,
} = authSlice.actions;

export default authSlice.reducer;
