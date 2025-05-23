import styled from '@emotion/styled';

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #6d6875 0%, #b5838d 50%, #e5989b 100%);
`;

export const AuthContent = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #ffcdb2;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(109, 104, 117, 0.3);
`;

export const AuthTitle = styled.h1`
  color: #6d6875;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6d6875;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a5560;
  }
`;

export const AuthLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #6d6875;

  a {
    color: #b5838d;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorText = styled.p`
  color: #d62828;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;