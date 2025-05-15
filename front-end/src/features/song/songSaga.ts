import { call, put, takeEvery } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  editSongSuccess,
  editSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
  fetchSongsRequest,
  addSongRequest,
  editSongRequest,
  deleteSongRequest,
} from "../song/songSlice";
import api from "../../api/apiClient";
import { Song, SongPayload,  } from "../../types/song";
import {ApiResponse} from "../../types/api"

function* handleApiError(
  error: unknown,
  failureAction: (payload: string) => PayloadAction<string>
) {
  let errorMessage = "An unexpected error occurred";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  yield put(failureAction(errorMessage));
}

function* fetchSongs(): Generator<any, void, ApiResponse<Song[]>> {
  try {
    const response = yield call(api.get, "/songs");
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield handleApiError(error, fetchSongsFailure);
  }
}

function* addSong(
  action: PayloadAction<SongPayload>
): Generator<any, void, ApiResponse<Song>> {
  try {
    const { title } = action.payload;
    if (!title || title.trim() === "") {
      yield put(addSongFailure("Song title is required"));
      return;
    }
    const response = yield call(api.post, "/songs", action.payload);
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield handleApiError(error, addSongFailure);
  }
}

function* editSong(
  action: PayloadAction<SongPayload & { id: string }>
): Generator<any, void, ApiResponse<Song>> {
  try {
    const { id, title } = action.payload;
    if (!title || title.trim() === "") {
      yield put(editSongFailure("Song title is required"));
      return;
    }
    const { id: _, ...updatedSong } = action.payload;
    const response = yield call(api.put, `/songs/${id}`, updatedSong);
    yield put(editSongSuccess(response.data));
  } catch (error) {
    yield handleApiError(error, editSongFailure);
  }
}

function* deleteSong(
  action: PayloadAction<string>
): Generator<any, void, ApiResponse<void>> {
  try {
    yield call(api.delete, `/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield handleApiError(error, deleteSongFailure);
  }
}

export default function* songSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongs);
  yield takeEvery(addSongRequest.type, addSong);
  yield takeEvery(editSongRequest.type, editSong);
  yield takeEvery(deleteSongRequest.type, deleteSong);
}
