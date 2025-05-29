// src/features/song/songSaga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosError } from "axios";
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
} from "./songSlice";
import { api } from "../../api/apiClient";
import { Song, SongPayload } from "../../types/song";
import { ApiResponse } from "../../types/api";

// Define the expected response structure for fetch songs
interface SongsResponse {
  songs: Song[];
}

function* handleFetchSongs() {
  try {
    const response: ApiResponse<SongsResponse> = yield call(api.get, "/songs");
    console.log("API response:", response);

    if (response.status === "SUCCESS") {
      // Extract the songs array from the response data
      const songs = response.data?.songs || [];
      console.log("Songs data:", songs);
      
      // Dispatch the success action with the songs array
      yield put(fetchSongsSuccess(songs));
    } else {
      throw new Error(response.message || "Failed to fetch songs");
    }
  } catch (error) {
    console.error("Fetch songs error:", error);
    let errorMessage = "Failed to fetch songs";

    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Failed to fetch songs";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchSongsFailure(errorMessage));
  }
}

function* handleAddSong(action: PayloadAction<SongPayload>) {
  try {
    const { title } = action.payload;
    if (!title?.trim()) {
      yield put(addSongFailure("Song title is required"));
      return;
    }

    const response: ApiResponse<Song> = yield call(
      api.post,
      "/songs",
      action.payload
    );

    if (response.status === "SUCCESS") {
      yield put(addSongSuccess(response.data));
    } else {
      throw new Error(response.message || "Failed to add song");
    }
  } catch (error) {
    console.error("Add song error:", error);
    let errorMessage = "Failed to add song";

    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Failed to add song";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(addSongFailure(errorMessage));
  }
}

function* handleEditSong(action: PayloadAction<SongPayload & { id: string }>) {
  try {
    const { id, title } = action.payload;
    if (!title?.trim()) {
      yield put(editSongFailure("Song title is required"));
      return;
    }

    const { id: _, ...updatedSong } = action.payload;
    const response: ApiResponse<Song> = yield call(
      api.put,
      `/songs/${id}`,
      updatedSong
    );

    if (response.status === "SUCCESS") {
      yield put(editSongSuccess(response.data));
    } else {
      throw new Error(response.message || "Failed to edit song");
    }
  } catch (error) {
    console.error("Edit song error:", error);
    let errorMessage = "Failed to edit song";

    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Failed to edit song";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(editSongFailure(errorMessage));
  }
}

function* handleDeleteSong(action: PayloadAction<string>) {
  try {
    const response: ApiResponse<{}> = yield call(
      api.delete,
      `/songs/${action.payload}`
    );

    if (response.status === "SUCCESS") {
      yield put(deleteSongSuccess(action.payload));
    } else {
      throw new Error(response.message || "Failed to delete song");
    }
  } catch (error) {
    console.error("Delete song error:", error);
    let errorMessage = "Failed to delete song";

    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || "Failed to delete song";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(deleteSongFailure(errorMessage));
  }
}

export default function* songSaga() {
  yield takeEvery(fetchSongsRequest.type, handleFetchSongs);
  yield takeEvery(addSongRequest.type, handleAddSong);
  yield takeEvery(editSongRequest.type, handleEditSong);
  yield takeEvery(deleteSongRequest.type, handleDeleteSong);
}