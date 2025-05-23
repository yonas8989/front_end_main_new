// src/components/Layout/AppLayout.tsx
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AppLayoutProps } from "../../types/layout";
import {
  FaBars,
  FaMusic,
  FaCompactDisc,
  FaUser,
  FaFilter,
  FaList,
} from "react-icons/fa";

// Type assertion approach
const MusicIcon = FaMusic as React.ComponentType;
const DiscIcon = FaCompactDisc as React.ComponentType;
const UserIcon = FaUser as React.ComponentType;
const FilterIcon = FaFilter as React.ComponentType;
const ListIcon = FaList as React.ComponentType;
const BarsIcon = FaBars as React.ComponentType;

// Styled components with proper typing
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = styled.div<SidebarProps>`
  width: ${(props) => (props.isOpen ? "250px" : "0")};
  background-color: #6d6875;
  color: #ffcdb2;
  padding: ${(props) => (props.isOpen ? "1.5rem" : "0")};
  transition: all 0.3s ease;
  overflow: hidden;
  position: fixed;
  height: 100vh;
  z-index: 100;

  @media (min-width: 769px) {
    position: relative;
    width: 250px;
    padding: 1.5rem;
  }
`;

interface MainContentProps {
  theme?: {
    sidebarWidth: string;
  };
}

const MainContent = styled.div<MainContentProps>`
  flex: 1;
  background-color: #ffcdb2;
  margin-left: ${(props) => props.theme?.sidebarWidth || "0"};
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  background-color: #b5838d;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(109, 104, 117, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  padding: 2rem;
  background-color: #ffcdb2;
  min-height: calc(100vh - 60px);
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarItem = styled.li`
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #b5838d;
    color: white;
  }

  svg {
    min-width: 24px;
  }
`;

const FilterSection = styled.div`
  margin-top: 1.5rem;
`;

const FilterTitle = styled.h3`
  color: #ffb4a2;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppContainer>
      {showSidebar && (
        <Sidebar isOpen={sidebarOpen}>
          <h2
            style={{
              color: "#ffb4a2",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <MusicIcon /> {sidebarOpen && "Music App"}
          </h2>
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <SidebarItem>
                <DiscIcon /> {sidebarOpen && "Dashboard"}
              </SidebarItem>

              <FilterSection>
                <FilterTitle>{sidebarOpen && "Filters"}</FilterTitle>
                <SidebarItem>
                  <FilterIcon /> {sidebarOpen && "By Album"}
                </SidebarItem>
                <SidebarItem>
                  <UserIcon /> {sidebarOpen && "By Artist"}
                </SidebarItem>
                <SidebarItem>
                  <MusicIcon /> {sidebarOpen && "By Genre"}
                </SidebarItem>
                <SidebarItem>
                  <FilterIcon /> {sidebarOpen && "By Year"}
                </SidebarItem>
                <SidebarItem>
                  <ListIcon /> {sidebarOpen && "By Playlist"}
                </SidebarItem>
              </FilterSection>
            </ul>
          </nav>
        </Sidebar>
      )}
      <MainContent
        theme={{ sidebarWidth: showSidebar && !isMobile ? "250px" : "0" }}
      >
        <Header>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {isMobile && (
              <ToggleButton onClick={toggleSidebar}>
                <BarsIcon />
              </ToggleButton>
            )}
            <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Music Dashboard</h1>
          </div>
        </Header>
        <Content>{children}</Content>
      </MainContent>
    </AppContainer>
  );
};

export default AppLayout;
