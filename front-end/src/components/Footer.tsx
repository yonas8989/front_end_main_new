// components/Footer.tsx
import styled from '@emotion/styled';
import { space, layout, typography, color, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, FlexboxProps } from 'styled-system';

// Define theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  success: '#b3dec1',
  danger: '#56203d',
  neutral: '#587b7f'
};

interface FooterProps {
  companyName: string;
  year: number;
  links: Array<{
    title: string;
    url: string;
  }>;
}

const FooterContainer = styled.footer<SpaceProps & ColorProps & LayoutProps>`
  background-color: ${colors.primary};
  color: white;
  padding: 40px 20px;
  ${space}
  ${color}
  ${layout}
`;

const FooterContent = styled.div<LayoutProps & FlexboxProps>`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${layout}
  ${flexbox}
`;

const FooterLinks = styled.div<FlexboxProps & SpaceProps>`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  ${flexbox}
  ${space}
`;

const FooterLink = styled.a<ColorProps & TypographyProps>`
  color: ${colors.success};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
  ${color}
  ${typography}
`;

const CopyrightText = styled.p<TypographyProps>`
  font-size: 0.9rem;
  opacity: 0.8;
  ${typography}
`;

export const Footer: React.FC<FooterProps> = ({
  companyName = "HOMILEND",
  year = new Date().getFullYear(),
  links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Privacy Policy", url: "/privacy" }
  ]
}) => {
  return (
    <FooterContainer bg={colors.primary} py={4}>
      <FooterContent>
        <FooterLinks>
          {links.map((link, index) => (
            <FooterLink 
              key={index} 
              href={link.url} 
              color={colors.success}
              fontSize={2}
            >
              {link.title}
            </FooterLink>
          ))}
        </FooterLinks>
        <CopyrightText fontSize={1}>
          © {year} {companyName}. All rights reserved.
        </CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};