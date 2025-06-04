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
import { Link, LinkProps } from 'react-router-dom';
import { Song } from '../types/song';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSongRequest } from '../features/song/songSlice';

const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

// Base ActionButton with proper typing
type ActionButtonProps = SpaceProps & ColorProps & {
  as?: React.ElementType;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & Partial<LinkProps>;

const ActionButton = styled.button<ActionButtonProps>`
  flex: 1;
  text-align: center;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
  ${color}
  ${space}
`;

// EditButton that can be used as both button and Link
const EditButton = styled(ActionButton)`
  background-color: ${colors.accent};
  color: ${colors.dark};

  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`;

// DeleteButton (only used as button)
const DeleteButton = styled(ActionButton)`
  background-color: ${colors.dark};
  color: white;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

// Confirmation Dialog Components
const ConfirmationDialog = styled.div<LayoutProps & SpaceProps & ColorProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  text-align: center;
  ${layout}
  ${space}
  ${color}
`;

const DialogButtons = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  ${space}
  ${flexbox}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Button = styled.button<ColorProps & SpaceProps & TypographyProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  ${color}
  ${space}
  ${typography}
`;

// Song List Components
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

interface SongListComponentProps {
  songs: Song[];
  loading?: boolean;
}

export const SongListComponent = ({ songs, loading = false }: SongListComponentProps) => {
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [songToDelete, setSongToDelete] = useState<string | null>(null);

  const handleDeleteClick = (songId: string) => {
    setSongToDelete(songId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (songToDelete) {
      dispatch(deleteSongRequest(songToDelete));
    }
    setShowDeleteConfirm(false);
    setSongToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSongToDelete(null);
  };

  if (loading) {
    return <div>Loading songs...</div>;
  }

  return (
    <>
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
                <DeleteButton 
                  onClick={() => handleDeleteClick(song._id)} 
                  bg={colors.dark} 
                  px={2} 
                  py={1}
                  disabled={loading}
                >
                  Delete
                </DeleteButton>
                <EditButton 
                  as={Link}
                  to={`/songs/edit/${song._id}`}
                  bg={colors.accent}
                  px={2}
                  py={1}
                >
                  Edit
                </EditButton>
              </Actions>
            </SongBody>
          </SongCard>
        ))}
      </SongGrid>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <>
          <Overlay onClick={handleDeleteCancel} />
          <ConfirmationDialog>
            <h3>Are you sure you want to delete this song?</h3>
            <p>This action cannot be undone.</p>
            <DialogButtons>
              <Button 
                onClick={handleDeleteCancel}
                bg={colors.neutral}
                color={colors.dark}
                fontSize={1}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteConfirm}
                bg={colors.dark}
                color={colors.accent}
                fontSize={1}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogButtons>
          </ConfirmationDialog>
        </>
      )}
    </>
  );
};