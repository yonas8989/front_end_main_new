// src/pages/Dashboard.tsx
import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styled from '@emotion/styled';

const DashboardContainer = styled.div`
  background-color: #ffcdb2;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(109, 104, 117, 0.1);
`;

const WelcomeMessage = styled.h2`
  color: #6d6875;
  margin-bottom: 1.5rem;
`;

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AppLayout>
      <DashboardContainer>
        <WelcomeMessage>Welcome, {user?.name || "Music Lover"}!</WelcomeMessage>
        <p style={{ color: '#6d6875' }}>Browse your music collection using the filters in the sidebar.</p>
      </DashboardContainer>
    </AppLayout>
  );
};

export default DashboardPage;