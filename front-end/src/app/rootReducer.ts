// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'; // Import your song slice reducer
import songSlice from '../features/song/songSlice'
// Combine your slices (add more as needed)
const rootReducer = combineReducers({
  songs: songSlice, // Add more slices if you have more features
  auth: authSlice, // Assuming you have an auth slice as well
});

export default rootReducer;
