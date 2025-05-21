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
import { api } from "../../api/apiClient";
import { Song, SongPayload } from "../../types/song";

function* handleApiError(
  error: unknown,
  failureAction: (payload: string) => PayloadAction<string>
) {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'An unexpected error occurred';
  
  yield put(failureAction(errorMessage));
}

function* fetchSongs() {
  try {
    const songs: Song[] = yield call(api.get, "/songs");
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield handleApiError(error, fetchSongsFailure);
  }
}

function* addSong(action: PayloadAction<SongPayload>) {
  try {
    const { title } = action.payload;
    if (!title?.trim()) {
      yield put(addSongFailure("Song title is required"));
      return;
    }
    
    const newSong: Song = yield call(api.post, "/songs", action.payload);
    yield put(addSongSuccess(newSong));
  } catch (error) {
    yield handleApiError(error, addSongFailure);
  }
}

function* editSong(action: PayloadAction<SongPayload & { id: string }>) {
  try {
    const { id, title } = action.payload;
    if (!title?.trim()) {
      yield put(editSongFailure("Song title is required"));
      return;
    }
    
    const { id: _, ...updatedSong } = action.payload;
    const song: Song = yield call(api.put, `/songs/${id}`, updatedSong);
    yield put(editSongSuccess(song));
  } catch (error) {
    yield handleApiError(error, editSongFailure);
  }
}

function* deleteSong(action: PayloadAction<string>) {
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