// src/features/song/songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, SongPayload, Filters } from '../../types/song';

// src/features/song/songSlice.ts
interface SongState {
  songs: Song[];
  filters: Filters;
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [], // This should store the array directly
  filters: {
    album: '',
    artist: '',
    genre: ''
  },
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addSongRequest(state, _action: PayloadAction<SongPayload>) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    editSongRequest(state, _action: PayloadAction<SongPayload & { id: string }>) {
      state.loading = true;
      state.error = null;
    },
    editSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex((song) => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    editSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSongRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  editSongRequest,
  editSongSuccess,
  editSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateFilters,
  resetFilters,
} = songSlice.actions;

export default songSlice.reducer;