// src/features/song/songSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Song, Filters } from '../../types/song';

// Basic selectors with proper type safety
export const selectSongState = (state: RootState) => state.songs;

export const selectSongs = (state: RootState): Song[] => state.songs.songs || [];
export const selectFilters = (state: RootState): Filters => state.songs.filters || {
  album: '',
  artist: '',
  genre: ''
};
export const selectLoading = (state: RootState): boolean => state.songs.loading;
export const selectError = (state: RootState): string | null => state.songs.error;

export const selectFilteredSongs = createSelector(
  [selectSongs, selectFilters],
  (songs: Song[], filters: Filters): Song[] => {
    if (!Array.isArray(songs)) {
      console.error('Songs is not an array:', songs);
      return [];
    }

    return songs.filter((song) => {
      const matchesAlbum = !filters.album || 
        (song.album && song.album.toLowerCase().includes(filters.album.toLowerCase()));
      const matchesGenre = !filters.genre || 
        song.genre.toLowerCase().includes(filters.genre.toLowerCase());
      const matchesArtist = !filters.artist || 
        song.artist.toLowerCase().includes(filters.artist.toLowerCase());

      return matchesAlbum && matchesGenre && matchesArtist;
    });
  }
);

// Selector to get a song by ID
// src/features/song/songSelectors.ts
export const selectSongById = (id: string) =>
  createSelector([selectSongs], (songs: Song[]) => 
    songs.find((song) => song._id === id)  // Changed id to _id
);

// Selector to get unique genres
export const selectUniqueGenres = createSelector([selectSongs], (songs: Song[]) => {
  if (!Array.isArray(songs)) return [];
  const genres = songs.map((song) => song.genre);
  return Array.from(new Set(genres)).sort();
});

// Selector to get unique artists
export const selectUniqueArtists = createSelector([selectSongs], (songs: Song[]) => {
  if (!Array.isArray(songs)) return [];
  const artists = songs.map((song) => song.artist);
  return Array.from(new Set(artists)).sort();
});

// Selector to get unique albums
export const selectUniqueAlbums = createSelector([selectSongs], (songs: Song[]) => {
  if (!Array.isArray(songs)) return [];
  const albums = songs
    .map((song) => song.album || '')
    .filter(album => album.trim() !== '');
  return Array.from(new Set(albums)).sort();
});