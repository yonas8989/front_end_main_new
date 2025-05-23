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

// Header Container
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
  ${space}
  ${flexbox}
`;

const Button = styled.button<ColorProps & SpaceProps & TypographyProps & BorderProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  ${color}
  ${space}
  ${typography}
  ${border}
`;

interface HeaderProps {
  isAuthenticated: boolean;
  currentPage?: string;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
  onLogoClick: () => void;
  onNavClick: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  currentPage = 'home',
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
  onLogoClick,
  onNavClick
}) => {
  return (
    <HeaderContainer>
      <Logo onClick={onLogoClick} p={2}>MusicApp</Logo>
      
      <Nav>
        <NavLink 
          onClick={() => onNavClick('home')} 
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
      
      <AuthButtons>
        {isAuthenticated ? (
          <Button 
            onClick={onLogoutClick}
            bg={colors.danger}
            color={colors.white}
            fontSize={1}
          >
            Logout
          </Button>
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
    </HeaderContainer>
  );
};