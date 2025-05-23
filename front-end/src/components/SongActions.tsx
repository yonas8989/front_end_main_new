import styled from '@emotion/styled';
import { space, layout, typography, color, border, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  success: '#b3dec1',
  danger: '#56203d',
  neutral: '#587b7f'
};

interface SongActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ActionButton = styled.button<ColorProps & SpaceProps & BorderProps>`
  padding: 6px 12px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  ${color}
  ${space}
  ${border}
`;

const EditButton = styled(ActionButton)`
  background-color: ${colors.primary};
  color: white;
`;

const DeleteButton = styled(ActionButton)`
  background-color: ${colors.danger};
  color: white;
`;

const ViewButton = styled(ActionButton)`
  background-color: ${colors.neutral};
  color: white;
`;

export const SongActions: React.FC<SongActionsProps> = ({ onEdit, onDelete, onView }) => {
  return (
    <div style={{ display: 'flex' }}>
      <ViewButton onClick={onView} bg={colors.neutral} px={3} py={2}>
        View
      </ViewButton>
      <EditButton onClick={onEdit} bg={colors.primary} px={3} py={2}>
        Edit
      </EditButton>
      <DeleteButton onClick={onDelete} bg={colors.danger} px={3} py={2}>
        Delete
      </DeleteButton>
    </div>
  );
};