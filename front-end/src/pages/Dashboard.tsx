// src/pages/Dashboard.tsx
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AppLayout>
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <p>This is your dashboard content.</p>
    </AppLayout>
  );
};

export default DashboardPage;