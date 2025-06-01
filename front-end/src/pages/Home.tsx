import styled from "@emotion/styled";
import {
  space,
  layout,
  typography,
  color,
  border,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
  BorderProps,
} from "styled-system";
import { Link } from "react-router-dom";
import { SongStatistics } from "../components/SongStatistics";
// Theme colors
const colors = {
  primary: "#315659",
  secondary: "#a78682",
  accent: "#b3dec1",
  dark: "#56203d",
  neutral: "#587b7f",
};

// Page Container
const PageContainer = styled.div<LayoutProps & SpaceProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  ${layout}
  ${space}
`;

const HeroSection = styled.section<ColorProps & SpaceProps & LayoutProps>`
  background-color: ${colors.primary};
  color: white;
  padding: 4rem 2rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 3rem;
  ${color}
  ${space}
  ${layout}
`;

const HeroTitle = styled.h1<TypographyProps>`
  font-size: 3rem;
  margin-bottom: 1rem;
  ${typography}
`;

const HeroSubtitle = styled.p<TypographyProps & SpaceProps>`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  ${typography}
  ${space}
`;

const CtaButton = styled(Link)<ColorProps & SpaceProps & TypographyProps>`
  display: inline-block;
  background-color: ${colors.accent};
  color: ${colors.dark};
  text-decoration: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }

  ${color}
  ${space}
  ${typography}
`;

const FeaturesSection = styled.section<SpaceProps>`
  margin-bottom: 3rem;
  ${space}
`;

const SectionTitle = styled.h2<TypographyProps & ColorProps & SpaceProps>`
  font-size: 2rem;
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  ${typography}
  ${color}
  ${space}
`;

const FeaturesGrid = styled.div<LayoutProps & SpaceProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  ${layout}
  ${space}
`;

const FeatureCard = styled.div<ColorProps & SpaceProps & BorderProps>`
  background-color: white;
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  ${color}
  ${space}
  ${border}
`;

const FeatureIcon = styled.div<ColorProps & SpaceProps>`
  background-color: ${colors.primary};
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  ${color}
  ${space}
`;

const FeatureTitle = styled.h3<TypographyProps & ColorProps>`
  font-size: 1.5rem;
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 1rem;
  ${typography}
  ${color}
`;

const FeatureDescription = styled.p<TypographyProps & ColorProps>`
  color: ${colors.neutral};
  text-align: center;
  ${typography}
  ${color}
`;

const CallToAction = styled.section<ColorProps & SpaceProps>`
  background-color: ${colors.accent};
  padding: 3rem 2rem;
  border-radius: 8px;
  text-align: center;
  ${color}
  ${space}
`;

export const Home = () => {
  return (
    <PageContainer>
      <HeroSection bg={colors.primary} py={5} px={4}>
        <HeroTitle fontSize={[4, 5, 6]}>Welcome to SongBase</HeroTitle>
        <HeroSubtitle fontSize={[2, 3]} mb={4}>
          Your personal music library manager. Organize, discover, and enjoy
          your favorite songs.
        </HeroSubtitle>
        <CtaButton
          to="/songs"
          bg={colors.accent}
          color={colors.dark}
          px={4}
          py={3}
        >
          Browse Songs
        </CtaButton>
      </HeroSection>

      <SongStatistics />

      <FeaturesSection>
        <SectionTitle color={colors.primary} mb={4}>
          Features
        </SectionTitle>
        <FeaturesGrid>
          <FeatureCard borderColor={colors.secondary}>
            <FeatureIcon bg={colors.primary} mb={3}>
              🎵
            </FeatureIcon>
            <FeatureTitle color={colors.primary}>Song Management</FeatureTitle>
            <FeatureDescription color={colors.neutral}>
              Easily add, edit, and organize your music collection with our
              intuitive interface.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard borderColor={colors.secondary}>
            <FeatureIcon bg={colors.primary} mb={3}>
              🔍
            </FeatureIcon>
            <FeatureTitle color={colors.primary}>Powerful Search</FeatureTitle>
            <FeatureDescription color={colors.neutral}>
              Quickly find songs by title, artist, album, or genre with our
              advanced search.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard borderColor={colors.secondary}>
            <FeatureIcon bg={colors.primary} mb={3}>
              📱
            </FeatureIcon>
            <FeatureTitle color={colors.primary}>
              Responsive Design
            </FeatureTitle>
            <FeatureDescription color={colors.neutral}>
              Access your music library from any device, anywhere, with our
              fully responsive design.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <CallToAction bg={colors.accent} py={4}>
        <SectionTitle color={colors.dark} mb={3}>
          Ready to get started?
        </SectionTitle>
        <CtaButton to="/signup" bg={colors.primary} color="white" px={4} py={3}>
          Sign Up Now
        </CtaButton>
      </CallToAction>
    </PageContainer>
  );
};
