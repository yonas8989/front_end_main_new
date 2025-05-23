// components/ConfirmationModal.tsx
import styled from '@emotion/styled';
import { space, layout, typography, color, border, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';

// Define type for component props
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

// Define type for button props extending styled-system props
type ButtonProps = SpaceProps & TypographyProps & ColorProps & BorderProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Define theme colors
const colors = {
  primary: '#315659',     // Dark teal
  secondary: '#a78682',   // Muted rose
  success: '#b3dec1',     // Mint green
  danger: '#56203d',      // Dark maroon
  neutral: '#587b7f'      // Grayish teal
};

// Modal Backdrop
const Backdrop = styled.div<LayoutProps & FlexboxProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  ${layout}
  ${flexbox}
`;

// Modal Container
const ModalContainer = styled.div<SpaceProps & LayoutProps & BorderProps & ColorProps>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  ${space}
  ${layout}
  ${border}
  ${color}
`;

// Modal Header
const ModalHeader = styled.div<SpaceProps & TypographyProps & ColorProps>`
  border-bottom: 1px solid ${colors.secondary};
  padding: 16px;
  font-weight: bold;
  ${space}
  ${typography}
  ${color}
`;

// Modal Body
const ModalBody = styled.div<SpaceProps & TypographyProps>`
  padding: 16px;
  ${space}
  ${typography}
`;

// Modal Footer
const ModalFooter = styled.div<SpaceProps & FlexboxProps>`
  border-top: 1px solid ${colors.secondary};
  padding: 16px;
  justify-content: flex-end;
  gap: 8px;
  ${space}
  ${flexbox}
`;

// Base Button Component
const Button = styled.button<ButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }

  ${space}
  ${typography}
  ${color}
  ${border}
`;

// Primary Button Variant
const PrimaryButton = styled(Button)`
  background-color: ${colors.primary};
  color: white;
`;

// Danger Button Variant
const DangerButton = styled(Button)`
  background-color: ${colors.danger};
  color: white;
`;

// Neutral Button Variant
const NeutralButton = styled(Button)`
  background-color: ${colors.neutral};
  color: white;
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to perform this action?" 
}) => {
  if (!isOpen) return null;

  return (
    <Backdrop>
      <ModalContainer>
        <ModalHeader color={colors.primary} fontSize={2}>
          {title}
        </ModalHeader>
        
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        
        <ModalFooter>
          <NeutralButton onClick={onClose} mr={2}>
            Cancel
          </NeutralButton>
          <DangerButton onClick={onConfirm}>
            Confirm
          </DangerButton>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

export default ConfirmationModal;