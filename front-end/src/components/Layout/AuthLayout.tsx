
import React from 'react';
import styled from '@emotion/styled';
import { AuthLayoutProps } from '../../types/layout';

const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #6d6875 0%, #b5838d 50%, #e5989b 100%);
`;

const AuthContent = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #ffcdb2;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(109, 104, 117, 0.3);
`;

const AuthHeader = styled.h1`
  color: #6d6875;
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