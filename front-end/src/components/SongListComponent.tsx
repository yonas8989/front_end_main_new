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
import { Link } from 'react-router-dom';
import { Song } from '../types/song';
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

const SongGrid = styled.div<LayoutProps & SpaceProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  flex: 1;
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

interface SongListComponentProps {
  songs: Song[];
}

export const SongListComponent = ({ songs }: SongListComponentProps) => {
    console.log('Rendering SongListComponent with songs:', songs);
  return (
    <SongGrid>
      {songs.map((song) => (
        <SongCard key={song._id} borderColor={colors.secondary}>
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
              <DetailValue color={colors.neutral}>{song.releaseYear}</DetailValue>
            </SongDetail>
            <Actions>
              <ViewButton to={`/songs/${song._id}`} bg={colors.neutral} px={2} py={1}>
                View
              </ViewButton>
              <EditButton to={`/songs/edit/${song._id}`} bg={colors.accent} px={2} py={1}>
                Edit
              </EditButton>
            </Actions>
          </SongBody>
        </SongCard>
      ))}
    </SongGrid>
  );
};