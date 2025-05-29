import styled from '@emotion/styled';
import { space, layout, typography, color, SpaceProps, LayoutProps, TypographyProps, ColorProps } from 'styled-system';

const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

const SidebarContainer = styled.div<LayoutProps & SpaceProps>`
  width: 250px;
  padding: 1rem;
  background-color: #f5f5f5;
  border-right: 1px solid ${colors.secondary};
  ${layout}
  ${space}
`;

const FilterSection = styled.div<SpaceProps>`
  margin-bottom: 1.5rem;
  ${space}
`;

const FilterTitle = styled.h3<TypographyProps & ColorProps>`
  margin-bottom: 0.75rem;
  color: ${colors.primary};
  font-size: 1.1rem;
  ${typography}
  ${color}
`;

const FilterList = styled.ul<SpaceProps>`
  list-style: none;
  padding: 0;
  margin: 0;
  ${space}
`;

const FilterItem = styled.li<SpaceProps>`
  margin-bottom: 0.5rem;
  ${space}
`;

const FilterButton = styled.button<ColorProps & SpaceProps>`
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.accent};
  }

  &.active {
    background-color: ${colors.primary};
    color: white;
  }

  ${color}
  ${space}
`;

const ClearFiltersButton = styled.button<ColorProps & SpaceProps>`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.dark};
  }

  ${color}
  ${space}
`;

interface SongFilterSidebarProps {
  albums: string[];
  artists: string[];
  genres: string[];
  
  selectedAlbum: string | null;
  selectedArtist: string | null;
  selectedGenre: string | null;
  onAlbumSelect: (album: string | null) => void;
  onArtistSelect: (artist: string | null) => void;
  onGenreSelect: (genre: string | null) => void;
  onClearFilters: () => void;
}

export const SongFilterSidebar = ({
  albums,
  artists,
  genres,
  selectedAlbum,
  selectedArtist,
  selectedGenre,
  onAlbumSelect,
  onArtistSelect,
  onGenreSelect,
  onClearFilters,
}: SongFilterSidebarProps) => {
  return (
    <SidebarContainer>
      <FilterSection>
        <FilterTitle color={colors.primary}>Filter by Album</FilterTitle>
        <FilterList>
          <FilterItem>
            <FilterButton
              onClick={() => onAlbumSelect(null)}
              className={!selectedAlbum ? 'active' : ''}
              py={1}
              px={2}
            >
              All Albums
            </FilterButton>
          </FilterItem>
          {albums.map((album) => (
            <FilterItem key={`album-${album}`}>
              <FilterButton
                onClick={() => onAlbumSelect(album)}
                className={selectedAlbum === album ? 'active' : ''}
                py={1}
                px={2}
              >
                {album}
              </FilterButton>
            </FilterItem>
          ))}
        </FilterList>
      </FilterSection>

      <FilterSection>
        <FilterTitle color={colors.primary}>Filter by Artist</FilterTitle>
        <FilterList>
          <FilterItem>
            <FilterButton
              onClick={() => onArtistSelect(null)}
              className={!selectedArtist ? 'active' : ''}
              py={1}
              px={2}
            >
              All Artists
            </FilterButton>
          </FilterItem>
          {artists.map((artist) => (
            <FilterItem key={`artist-${artist}`}>
              <FilterButton
                onClick={() => onArtistSelect(artist)}
                className={selectedArtist === artist ? 'active' : ''}
                py={1}
                px={2}
              >
                {artist}
              </FilterButton>
            </FilterItem>
          ))}
        </FilterList>
      </FilterSection>

      <FilterSection>
        <FilterTitle color={colors.primary}>Filter by Genre</FilterTitle>
        <FilterList>
          <FilterItem>
            <FilterButton
              onClick={() => onGenreSelect(null)}
              className={!selectedGenre ? 'active' : ''}
              py={1}
              px={2}
            >
              All Genres
            </FilterButton>
          </FilterItem>
          {genres.map((genre) => (
            <FilterItem key={`genre-${genre}`}>
              <FilterButton
                onClick={() => onGenreSelect(genre)}
                className={selectedGenre === genre ? 'active' : ''}
                py={1}
                px={2}
              >
                {genre}
              </FilterButton>
            </FilterItem>
          ))}
        </FilterList>
      </FilterSection>

      <ClearFiltersButton 
        onClick={onClearFilters}
        bg={colors.secondary}
        py={1}
        px={2}
      >
        Clear All Filters
      </ClearFiltersButton>
    </SidebarContainer>
  );
};