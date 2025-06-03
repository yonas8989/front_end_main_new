/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { space, layout, typography, color, border, flexbox, 
  SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../types/auth';
import { clientLogout } from '../features/auth/authSlice';

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

// Styled Components
const HeaderContainer = styled.header<LayoutProps & SpaceProps & ColorProps & FlexboxProps>`
  background-color: ${colors.primary};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${layout}
  ${space}
  ${color}
  ${flexbox}
`;

const Logo = styled.div<TypographyProps & ColorProps & SpaceProps>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.white};
  cursor: pointer;
  ${typography}
  ${color}
  ${space}
`;

const Nav = styled.nav<SpaceProps>`
  display: flex;
  gap: 1.5rem;
  ${space}
`;

const NavLink = styled.a<TypographyProps & ColorProps & SpaceProps & { active?: boolean }>`
  color: ${props => props.active ? colors.accent : colors.white};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: ${colors.accent};
  }
  
  ${typography}
  ${color}
  ${space}
`;

const AuthButtons = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  gap: 1rem;
  align-items: center;
  ${space}
  ${flexbox}
`;

const Button = styled.button<ColorProps & SpaceProps & TypographyProps & BorderProps & { isLoading?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  ${color}
  ${space}
  ${typography}
  ${border}
`;

const UserInfo = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  ${space}
  ${flexbox}
`;

const Avatar = styled.img<LayoutProps & SpaceProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  ${layout}
  ${space}
`;

const UserName = styled.span<TypographyProps & ColorProps>`
  color: ${colors.white};
  font-weight: 500;
  ${typography}
  ${color}
`;

const ConfirmationDialog = styled.div<LayoutProps & SpaceProps & ColorProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
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

const loadingSpinner = css`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
`;

interface HeaderProps {
  isAuthenticated: boolean;
  currentPage?: string;
  user?: User | null;
  isLoading?: boolean;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onLogoClick: () => void;
  onNavClick: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  currentPage = 'home',
  user,
  isLoading = false,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
  onLogoClick,
  onNavClick
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleLogoutConfirm = () => {
    // Clear client-side auth state immediately
    dispatch(clientLogout());
    setShowLogoutConfirm(false);
    onLogoutClick();
  };

  return (
    <HeaderContainer>
      {/* Logo */}
      <Logo onClick={onLogoClick} p={2}>MusicApp</Logo>
      
      {/* Navigation */}
      <Nav>
        <NavLink 
          onClick={() => onNavClick('')} 
          active={currentPage === 'home'}
          color="white"
          fontSize={2}
        >
          Home
        </NavLink>
        <NavLink 
          onClick={() => onNavClick('songs')} 
          active={currentPage === 'songs'}
          color="white"
          fontSize={2}
        >
          Songs
        </NavLink>
      </Nav>
      
      {/* Auth Section */}
      <AuthButtons>
        {isAuthenticated ? (
          <>
            {user && (
              <UserInfo>
                <Avatar 
                  src={user.avatar || '/default-avatar.png'} 
                  alt={user.firstName} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-avatar.png';
                  }}
                />
                <UserName>{user.firstName} {user.lastName}</UserName>
              </UserInfo>
            )}
            <Button 
              onClick={() => setShowLogoutConfirm(true)}
              bg={colors.danger}
              color={colors.white}
              fontSize={1}
              disabled={isLoading}
              css={isLoading ? loadingSpinner : undefined}
            >
              {isLoading ? '' : 'Logout'}
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={onLoginClick}
              bg="transparent"
              color={colors.white}
              border="1px solid white"
              fontSize={1}
            >
              Login
            </Button>
            <Button 
              onClick={onSignUpClick}
              bg={colors.accent}
              color={colors.primary}
              fontSize={1}
            >
              Sign Up
            </Button>
          </>
        )}
      </AuthButtons>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <>
          <Overlay onClick={() => setShowLogoutConfirm(false)} />
          <ConfirmationDialog>
            <h3>Are you sure you want to logout?</h3>
            <DialogButtons>
              <Button 
                onClick={() => setShowLogoutConfirm(false)}
                bg={colors.neutral}
                color={colors.white}
                fontSize={1}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLogoutConfirm}
                bg={colors.danger}
                color={colors.white}
                fontSize={1}
              >
                Logout
              </Button>
            </DialogButtons>
          </ConfirmationDialog>
        </>
      )}
    </HeaderContainer>
  );
};