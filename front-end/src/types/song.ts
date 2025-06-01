// src/types/song.ts
import { ApiResponse } from './api';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre: string;
  duration: number;
  releaseYear: number;
  fileUrl: string;
  coverImageUrl?: string;
}

export interface SongPayload {
  id?: string;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  duration?: number;
  releaseYear?: number;
  fileUrl?: string;
  coverImageUrl?: string;
}

export interface Filters {
  album: string;
  genre: string;
  artist: string;
}

export interface GenreStat {
  _id: string;
  count: number;
}

export interface ArtistStat {
  artist: string;
  songs: number;
  albums: string[];
  albumsCount: number;
}

export interface AlbumStat {
  artist: string;
  album: string;
  songs: number;
}

export interface SongStats {
  songsPerGenre: GenreStat[];
  songsAndAlbumsPerArtist: ArtistStat[];
  songsPerAlbum: AlbumStat[];
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}