// src/features/songStatistics/songStatisticsSelectors.ts
import { RootState } from '../../app/store';

export const selectSongStatisticsState = (state: RootState) => state.songStatistics;

export const selectStatistics = (state: RootState) => state.songStatistics.stats;
export const selectStatisticsLoading = (state: RootState) => state.songStatistics.loading;
export const selectStatisticsError = (state: RootState) => state.songStatistics.error;