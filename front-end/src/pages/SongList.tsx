import styled from '@emotion/styled';
import { 
  space, 
  layout, 
  typography, 
  color, 
  flexbox, 
  border, 
  SpaceProps, 
  LayoutProps, 
  TypographyProps, 
  ColorProps, 
  FlexboxProps,
  BorderProps 
} from 'styled-system';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

// Song interface
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
}

// Page Container
const PageContainer = styled.div<LayoutProps & SpaceProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  ${layout}
  ${space}
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

const SongGrid = styled.div<LayoutProps & SpaceProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  ${layout}
  ${space}
`;

const SongCard = styled.div<ColorProps & SpaceProps & BorderProps>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid ${colors.secondary};

  &:hover {
    transform: translateY(-5px);
  }

  ${color}
  ${space}
  ${border}
`;

const SongHeader = styled.div<ColorProps & SpaceProps>`
  background-color: ${colors.primary};
  color: white;
  padding: 1rem;
  ${color}
  ${space}
`;

const SongTitle = styled.h3<TypographyProps>`
  margin: 0;
  font-size: 1.25rem;
  ${typography}
`;

const SongArtist = styled.p<TypographyProps & ColorProps>`
  margin: 0;
  color: ${colors.accent};
  font-size: 0.9rem;
  ${typography}
  ${color}
`;

const SongBody = styled.div<SpaceProps>`
  padding: 1rem;
  ${space}
`;

const SongDetail = styled.p<SpaceProps & FlexboxProps>`
  display: flex;
  margin: 0.5rem 0;
  ${space}
  ${flexbox}
`;

const DetailLabel = styled.span<ColorProps>`
  font-weight: 600;
  color: ${colors.primary};
  margin-right: 0.5rem;
  ${color}
`;

const DetailValue = styled.span<ColorProps>`
  color: ${colors.neutral};
  ${color}
`;

const Actions = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  ${space}
  ${flexbox}
`;

const ActionButton = styled(Link)<ColorProps & SpaceProps>`
  flex: 1;
  text-align: center;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  ${color}
  ${space}
`;

const EditButton = styled(ActionButton)`
  background-color: ${colors.accent};
  color: ${colors.dark};

  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`;

const ViewButton = styled(ActionButton)`
  background-color: ${colors.neutral};
  color: white;

  &:hover {
    background-color: ${colors.primary};
  }
`;

export const SongList = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchSongs = async () => {
      try {
        // Mock data
        const mockSongs: Song[] = [
          {
            id: '1',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
            genre: 'Rock',
            year: 1975
          },
          {
            id: '2',
            title: 'Imagine',
            artist: 'John Lennon',
            album: 'Imagine',
            genre: 'Pop',
            year: 1971
          },
          {
            id: '3',
            title: 'Hotel California',
            artist: 'Eagles',
            album: 'Hotel California',
            genre: 'Rock',
            year: 1976
          }
        ];
        setSongs(mockSongs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle color={colors.primary}>Song Library</PageTitle>
        <AddButton to="/songs/add" bg={colors.primary} px={4} py={2}>
          Add New Song
        </AddButton>
      </PageHeader>

      <SongGrid>
        {songs.map((song) => (
          <SongCard key={song.id} borderColor={colors.secondary}>
            <SongHeader bg={colors.primary} p={3}>
              <SongTitle>{song.title}</SongTitle>
              <SongArtist color={colors.accent}>{song.artist}</SongArtist>
            </SongHeader>
            <SongBody p={3}>
              <SongDetail>
                <DetailLabel color={colors.primary}>Album:</DetailLabel>
                <DetailValue color={colors.neutral}>{song.album}</DetailValue>
              </SongDetail>
              <SongDetail>
                <DetailLabel color={colors.primary}>Genre:</DetailLabel>
                <DetailValue color={colors.neutral}>{song.genre}</DetailValue>
              </SongDetail>
              <SongDetail>
                <DetailLabel color={colors.primary}>Year:</DetailLabel>
                <DetailValue color={colors.neutral}>{song.year}</DetailValue>
              </SongDetail>
              <Actions>
                <ViewButton to={`/songs/${song.id}`} bg={colors.neutral} px={2} py={1}>
                  View
                </ViewButton>
                <EditButton to={`/songs/edit/${song.id}`} bg={colors.accent} px={2} py={1}>
                  Edit
                </EditButton>
              </Actions>
            </SongBody>
          </SongCard>
        ))}
      </SongGrid>
    </PageContainer>
  );
};