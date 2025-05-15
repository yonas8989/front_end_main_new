import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Song, Filters } from '../../types/song';



// Use RootState type instead of the store instance
const selectSongsState = (state: RootState) => state.songs;

export const selectAllSongs = createSelector(
  [selectSongsState],
  (songsState): Song[] => songsState.songs
);

export const selectFilters = createSelector(
  [selectSongsState],
  (songsState): Filters => songsState.filters
);

export const selectSongsLoading = createSelector(
  [selectSongsState],
  (songsState): boolean => songsState.loading
);

export const selectSongsError = createSelector(
  [selectSongsState],
  (songsState): string | null => songsState.error
);

export const selectFilteredSongs = createSelector(
  [selectAllSongs, selectFilters],
  (songs, filters): Song[] => {
    if (songs.length === 0) return [];

    const { album = '', genre = '', artist = '' } = filters;
    const lowerAlbum = album.toLowerCase();
    const lowerGenre = genre.toLowerCase();
    const lowerArtist = artist.toLowerCase();

    return songs.filter((song) => {
      const songAlbum = song.album?.toLowerCase() ?? '';
      const songGenre = song.genre?.toLowerCase() ?? '';
      const songArtist = song.artist?.toLowerCase() ?? '';

      return (
        (lowerAlbum === '' || songAlbum.includes(lowerAlbum)) &&
        (lowerGenre === '' || songGenre.includes(lowerGenre)) &&
        (lowerArtist === '' || songArtist.includes(lowerArtist))
      );
    });
  }
);

// Updated selectors using Array.from() with Set
export const selectUniqueAlbums = createSelector(
  [selectAllSongs],
  (songs): string[] => {
    if (songs.length === 0) return [];
    const albums = songs
      .map((song) => song.album?.trim())
      .filter((album): album is string => !!album);
    return Array.from(new Set(albums)).sort();
  }
);

export const selectUniqueGenres = createSelector(
  [selectAllSongs],
  (songs): string[] => {
    if (songs.length === 0) return [];
    const genres = songs
      .map((song) => song.genre?.trim())
      .filter((genre): genre is string => !!genre);
    return Array.from(new Set(genres)).sort();
  }
);

export const selectUniqueArtists = createSelector(
  [selectAllSongs],
  (songs): string[] => {
    if (songs.length === 0) return [];
    const artists = songs
      .map((song) => song.artist?.trim())
      .filter((artist): artist is string => !!artist);
    return Array.from(new Set(artists)).sort();
  }
);

export const selectCurrentFilters = createSelector(
  [selectFilters],
  (filters): Filters => filters
);

export const selectFilteredSongsCount = createSelector(
  [selectFilteredSongs],
  (filteredSongs): number => filteredSongs.length
);

export const selectTotalSongsCount = createSelector(
  [selectAllSongs],
  (songs): number => songs.length
);