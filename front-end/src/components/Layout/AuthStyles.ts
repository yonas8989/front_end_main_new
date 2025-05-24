import styled from '@emotion/styled';

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #315659 0%, #587b7f 50%, #a78682 100%);
`;

export const AuthContent = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #b3dec1;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(49, 86, 89, 0.3);
`;

export const AuthTitle = styled.h1`
  color: #56203d;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #56203d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a1629;
  }
`;

export const AuthLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #315659;

  a {
    color: #a78682;
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

export const AuthError = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #56203d;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;