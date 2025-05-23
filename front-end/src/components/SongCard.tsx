import styled from '@emotion/styled';
import { space, layout, typography, color, border, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  danger: '#56203d',
  neutral: '#587b7f',
  white: '#ffffff',
  black: '#000000'
};

// Song Card Container
const CardContainer = styled.div<LayoutProps & SpaceProps & ColorProps & BorderProps>`
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  ${layout}
  ${space}
  ${color}
  ${border}
`;

const CardImage = styled.div<LayoutProps & SpaceProps & { src?: string }>`
  height: 160px;
  background-image: url(${props => props.src || 'https://via.placeholder.com/300'});
  background-size: cover;
  background-position: center;
  ${layout}
  ${space}
`;

const CardContent = styled.div<SpaceProps>`
  padding: 1rem;
  ${space}
`;

const CardTitle = styled.h3<TypographyProps & ColorProps & SpaceProps>`
  margin: 0;
  color: ${colors.primary};
  font-size: 1.2rem;
  font-weight: 600;
  ${typography}
  ${color}
  ${space}
`;

const CardArtist = styled.p<TypographyProps & ColorProps & SpaceProps>`
  margin: 0.5rem 0;
  color: ${colors.neutral};
  font-size: 0.9rem;
  ${typography}
  ${color}
  ${space}
`;

const CardDetails = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  ${space}
  ${flexbox}
`;

const CardGenre = styled.span<ColorProps & SpaceProps & TypographyProps & BorderProps>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${colors.accent};
  color: ${colors.primary};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  ${color}
  ${space}
  ${typography}
  ${border}
`;

const CardYear = styled.span<TypographyProps & ColorProps>`
  color: ${colors.secondary};
  font-size: 0.8rem;
  ${typography}
  ${color}
`;

const CardActions = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  ${space}
  ${flexbox}
`;

const ActionButton = styled.button<ColorProps & SpaceProps & TypographyProps & BorderProps & { variant?: 'primary' | 'danger' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
  flex: 1;
  
  ${props => props.variant === 'danger' ? `
    background-color: ${colors.danger};
    color: ${colors.white};
  ` : `
    background-color: ${colors.primary};
    color: ${colors.white};
  `}
  
  &:hover {
    opacity: 0.9;
  }
  
  ${color}
  ${space}
  ${typography}
  ${border}
`;

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
  imageUrl?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SongCard: React.FC<SongCardProps> = ({
  id,
  title,
  artist,
  genre,
  year,
  imageUrl,
  onEdit,
  onDelete
}) => {
  return (
    <CardContainer width={[1, 1/2, 1/3, 1/4]} m={2}>
      <CardImage src={imageUrl} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardArtist>By {artist}</CardArtist>
        
        <CardDetails>
          <CardGenre>{genre}</CardGenre>
          <CardYear>{year}</CardYear>
        </CardDetails>
        
        <CardActions>
          <ActionButton 
            onClick={() => onEdit(id)}
            variant="primary"
          >
            Edit
          </ActionButton>
          <ActionButton 
            onClick={() => onDelete(id)}
            variant="danger"
          >
            Delete
          </ActionButton>
        </CardActions>
      </CardContent>
    </CardContainer>
  );
};