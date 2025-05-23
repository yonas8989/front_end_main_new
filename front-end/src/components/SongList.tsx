import styled from '@emotion/styled';
import { space, layout, typography, color, border, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';

import {SongActions}  from './SongActions';



// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  success: '#b3dec1',
  danger: '#56203d',
  neutral: '#587b7f'
};

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
}

interface SongListProps {
  songs: Song[];
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
  onView: (song: Song) => void;
}

const ListContainer = styled.div<SpaceProps & LayoutProps>`
  width: 100%;
  ${space}
  ${layout}
`;

const ListHeader = styled.div<SpaceProps & ColorProps & BorderProps>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  padding: 12px 16px;
  background-color: ${colors.primary};
  color: white;
  font-weight: bold;
  border-radius: 4px 4px 0 0;
  ${space}
  ${color}
  ${border}
`;

const ListItem = styled.div<SpaceProps & ColorProps & BorderProps & FlexboxProps>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.secondary};
  align-items: center;
  
  &:nth-of-type(even) {
    background-color: ${colors.success}20;
  }
  
  &:hover {
    background-color: ${colors.success}40;
  }
  
  ${space}
  ${color}
  ${border}
  ${flexbox}
`;

const Cell = styled.div<SpaceProps & TypographyProps>`
  ${space}
  ${typography}
`;

const ActionsCell = styled.div<SpaceProps>`
  display: flex;
  justify-content: flex-end;
  ${space}
`;

export const SongList: React.FC<SongListProps> = ({ songs, onEdit, onDelete, onView }) => {
  return (
    <ListContainer my={4}>
      <ListHeader bg={colors.primary} p={3} borderRadius={2}>
        <Cell>Title</Cell>
        <Cell>Artist</Cell>
        <Cell>Album</Cell>
        <Cell>Year</Cell>
        <Cell>Genre</Cell>
        <Cell>Actions</Cell>
      </ListHeader>
      
      {songs.map((song) => (
        <ListItem key={song.id} p={3} borderColor={colors.secondary}>
          <Cell>{song.title}</Cell>
          <Cell>{song.artist}</Cell>
          <Cell>{song.album}</Cell>
          <Cell>{song.year}</Cell>
          <Cell>{song.genre}</Cell>
          <ActionsCell>
            <SongActions
              onEdit={() => onEdit(song)}
              onDelete={() => onDelete(song)}
              onView={() => onView(song)}
            />
          </ActionsCell>
        </ListItem>
      ))}
    </ListContainer>
  );
};