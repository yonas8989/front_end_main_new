// src/sagas/authSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
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
} from '../redux/authSlice';
import authService from '../services/authService';
import { LoginCredentials, User, RegisterData, ResetPasswordData } from '../types/auth';

function* handleLogin(action: PayloadAction<LoginCredentials>): Generator<any, void, User> {
  try {
    const user = yield call(authService.login, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

function* handleRegister(action: PayloadAction<RegisterData>): Generator<any, void, User> {
  try {
    const user = yield call(authService.register, action.payload);
    yield put(registerSuccess(user));
  } catch (error) {
    yield put(registerFailure((error as Error).message));
  }
}

function* handleLogout(): Generator<any, void, void> {
  try {
    yield call(authService.logout);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure((error as Error).message));
  }
}

function* handleForgotPassword(action: PayloadAction<string>): Generator<any, void, void> {
  try {
    yield call(authService.forgotPassword, action.payload);
    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFailure((error as Error).message));
  }
}

function* handleResetPassword(action: PayloadAction<ResetPasswordData>): Generator<any, void, void> {
  try {
    yield call(authService.resetPassword, action.payload);
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(resetPasswordFailure((error as Error).message));
  }
}

function* handleVerifyEmail(action: PayloadAction<string>): Generator<any, void, void> {
  try {
    yield call(authService.verifyEmail, action.payload);
    yield put(verifyEmailSuccess());
  } catch (error) {
    yield put(verifyEmailFailure((error as Error).message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
  yield takeLatest(resetPasswordRequest.type, handleResetPassword);
  yield takeLatest(verifyEmailRequest.type, handleVerifyEmail);
}