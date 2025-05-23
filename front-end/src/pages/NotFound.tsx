import styled from '@emotion/styled';
import { space, layout, typography, color, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, FlexboxProps } from 'styled-system';
import { Link } from 'react-router-dom';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

// NotFound Container
const NotFoundContainer = styled.div<LayoutProps & SpaceProps & FlexboxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  ${layout}
  ${space}
  ${flexbox}
`;

const NotFoundTitle = styled.h1<TypographyProps & ColorProps>`
  font-size: 6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${colors.dark};
  ${typography}
  ${color}
`;

const NotFoundSubtitle = styled.h2<TypographyProps & SpaceProps>`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${colors.primary};
  ${typography}
  ${space}
`;

const NotFoundText = styled.p<TypographyProps & SpaceProps>`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: ${colors.neutral};
  ${typography}
  ${space}
`;

const HomeLink = styled(Link)<ColorProps & SpaceProps & TypographyProps>`
  display: inline-block;
  background-color: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.neutral};
  }

  ${color}
  ${space}
  ${typography}
`;

export const NotFound: React.FC = () => {
  return (
    <NotFoundContainer p={4}>
      <NotFoundTitle color={colors.dark} fontSize={[5, 6, 7]}>404</NotFoundTitle>
      <NotFoundSubtitle color={colors.primary} fontSize={[3, 4]}>Page Not Found</NotFoundSubtitle>
      <NotFoundText color={colors.neutral} fontSize={2}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </NotFoundText>
      <HomeLink 
        to="/" 
        bg={colors.primary} 
        color="white" 
        px={4} 
        py={3}
        fontSize={2}
      >
        Return to Home
      </HomeLink>
    </NotFoundContainer>
  );
};