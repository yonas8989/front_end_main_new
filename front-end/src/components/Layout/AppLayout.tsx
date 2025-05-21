// src/components/Layout/AppLayout.tsx
import React from 'react';
import styled from '@emotion/styled';
import { AppLayoutProps } from '../../types/layout';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #03045e;
  color: #ffffff;
  padding: 1.5rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 70px;
    padding: 1rem 0.5rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  background-color: #023e8a;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  padding: 2rem;
`;

const AppLayout: React.FC<AppLayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <AppContainer>
      {showSidebar && (
        <Sidebar>
          <h2>App Logo</h2>
          {/* Sidebar navigation items would go here */}
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '0.5rem 0' }}>Dashboard</li>
              <li style={{ padding: '0.5rem 0' }}>Profile</li>
              <li style={{ padding: '0.5rem 0' }}>Settings</li>
            </ul>
          </nav>
        </Sidebar>
      )}
      <MainContent>
        <Header>
          <h1>Application Header</h1>
        </Header>
        <Content>{children}</Content>
      </MainContent>
    </AppContainer>
  );
};

export default AppLayout;