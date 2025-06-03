// src/sagas/rootSaga.js
import { all } from "redux-saga/effects";
import songSaga from "../features/song/songSaga";
import authSaga from "../features/auth/authSaga";
import songStatisticsSaga from "../features/songStatistics/songStatisticsSaga";

// Combine all sagas here
export default function* rootSaga() {
  yield all([
    songSaga(), // Add more sagas here if you need
    authSaga(),
    songStatisticsSaga(),
  ]);
}
