// src/features/statistics/statisticsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongStats } from '../../types/song';

interface StatisticsState {
  stats: SongStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  stats: null,
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchStatisticsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(state, action: PayloadAction<SongStats>) {
      state.stats = action.payload;
      state.loading = false;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;