import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import songSlice from '../features/song/songSlice';
import songStatisticsSlice from '../features/songStatistics/songStatisticsSlice'; // Import the new slice

const rootReducer = combineReducers({
  auth: authSlice,
  songs: songSlice,
  songStatistics: songStatisticsSlice, // Add the new statistics reducer
});

export default rootReducer;