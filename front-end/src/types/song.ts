
export interface Song {
  _id: string;  // Changed from id to _id
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
  _id?: string;  // Changed from id to _id
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