// src/types/song.ts
import { ApiResponse } from './api'; // Import from shared location

export interface Song {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
}

export interface SongPayload {
  id?: string;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
}

export interface Filters {
  album: string;
  genre: string;
  artist: string;
}

// Remove the local ApiResponse definition