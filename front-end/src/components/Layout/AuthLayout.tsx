// src/components/Layout/AuthLayout.tsx
import React from 'react';
import styled from '@emotion/styled';
import { AuthLayoutProps } from '../../types/layout';

const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #03045e 0%, #023e8a 50%, #0077b6 100%);
`;

const AuthContent = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const AuthHeader = styled.h1`
  color: #03045e;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = 'Welcome' }) => {
  return (
    <AuthContainer>
      <AuthContent>
        <AuthHeader>{title}</AuthHeader>
        {children}
      </AuthContent>
    </AuthContainer>
  );
};

export default AuthLayout;