// src/features/auth/authSelector.ts
import { RootState } from '../../app/store';

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;