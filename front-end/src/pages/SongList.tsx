// src/features/song/SongList.tsx
import styled from '@emotion/styled';
import { 
  space, 
  layout, 
  typography, 
  color, 
  flexbox, 
  SpaceProps, 
  LayoutProps, 
  TypographyProps, 
  ColorProps, 
  FlexboxProps 
} from 'styled-system';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchSongsRequest , updateFilters, resetFilters} from '../features/song/songSlice';
import {
  selectFilteredSongs,
  selectLoading,
  selectError,
  selectUniqueAlbums,
  selectUniqueArtists,
  selectUniqueGenres,
  selectFilters
} from '../features/song/songSelectors';
import { SongFilterSidebar } from '../components/SongFilterSidebar';
import { SongListComponent } from '../components/SongListComponent';

const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

const PageContainer = styled.div<LayoutProps & SpaceProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  ${layout}
  ${space}
`;

const PageContent = styled.div<FlexboxProps & LayoutProps>`
  display: flex;
  gap: 2rem;
  ${flexbox}
  ${layout}
`;

const MainContent = styled.div<LayoutProps>`
  flex: 1;
  ${layout}
`;

const PageHeader = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  ${space}
  ${flexbox}
`;

const PageTitle = styled.h1<TypographyProps & ColorProps>`
  font-size: 2rem;
  color: ${colors.primary};
  ${typography}
  ${color}
`;

const AddButton = styled(Link)<ColorProps & SpaceProps & TypographyProps>`
  background-color: ${colors.primary};
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.neutral};
  }

  ${color}
  ${space}
  ${typography}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div<ColorProps>`
  color: #dc3545;
  padding: 1rem;
  border: 1px solid #dc3545;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: #f8d7da;
  ${color}
`;

export const SongList = () => {
  const dispatch = useDispatch();
  const filteredSongs = useSelector(selectFilteredSongs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const albums = useSelector(selectUniqueAlbums);
  const artists = useSelector(selectUniqueArtists);
  const genres = useSelector(selectUniqueGenres);
  const currentFilters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleFilterChange = (filterType: keyof typeof currentFilters, value: string | null) => {
    dispatch(updateFilters({ [filterType]: value || '' }));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading songs...</LoadingMessage>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle color={colors.primary}>Song Library</PageTitle>
        <AddButton to="/songs/add" bg={colors.primary} px={4} py={2}>
          Add New Song
        </AddButton>
      </PageHeader>

      <PageContent>
        <SongFilterSidebar 
          albums={albums}
          artists={artists}
          genres={genres}
          selectedAlbum={currentFilters.album}
          selectedArtist={currentFilters.artist}
          selectedGenre={currentFilters.genre}
          onAlbumSelect={(album) => handleFilterChange('album', album)}
          onArtistSelect={(artist) => handleFilterChange('artist', artist)}
          onGenreSelect={(genre) => handleFilterChange('genre', genre)}
          onClearFilters={handleClearFilters}
        />
        <MainContent>
          <SongListComponent songs={filteredSongs || []} />
        </MainContent>
      </PageContent>
    </PageContainer>
  );
};