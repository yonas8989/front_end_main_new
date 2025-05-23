import styled from '@emotion/styled';
import { space, layout, typography, color, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, FlexboxProps } from 'styled-system';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

// Hero Container
const HeroContainer = styled.section<LayoutProps & SpaceProps & ColorProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.neutral} 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  ${layout}
  ${space}
  ${color}
`;

const HeroTitle = styled.h1<TypographyProps>`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  ${typography}
`;

const HeroSubtitle = styled.p<TypographyProps & SpaceProps>`
  font-size: 1.5rem;
  max-width: 800px;
  margin-bottom: 2rem;
  ${typography}
  ${space}
`;

const CtaButton = styled.button<ColorProps & SpaceProps & TypographyProps>`
  background-color: ${colors.accent};
  color: ${colors.dark};
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }

  ${color}
  ${space}
  ${typography}
`;

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick
}) => {
  return (
    <HeroContainer py={[4, 5, 6]}>
      <HeroTitle fontSize={[4, 5, 6]}>{title}</HeroTitle>
      <HeroSubtitle fontSize={[2, 3]} mb={4}>{subtitle}</HeroSubtitle>
      <CtaButton 
        onClick={onCtaClick}
        bg={colors.accent}
        color={colors.dark}
        px={4}
        py={3}
        fontSize={2}
      >
        {ctaText}
      </CtaButton>
    </HeroContainer>
  );
};