// src/pages/Login.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/Layout/AuthLayout';
import { loginRequest } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import styled from '@emotion/styled';

// Styled components
const Form = styled.form`
  kidth: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #6d6875;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ffb4a2;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background-color: #ffcdb2;

  &:focus {
    outline: none;
    border-color: #e5989b;
    box-shadow: 0 0 0 2px rgba(181, 131, 141, 0.2);
  }
`;

const SubmitButton = styled.button<{ isLoading: boolean }>`
  width: 100%;
  padding: 0.75rem;
  background-color: #b5838d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #6d6875;
  }

  &:disabled {
    background-color: #ffb4a2;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #6d6875;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(109, 104, 117, 0.1);
  border-radius: 4px;
  font-size: 0.875rem;
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(loginRequest({
        email: formData.email,
        password: formData.password
      }));
    }
  };

  return (
    <AuthLayout title="Login to Your Account">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            aria-invalid={!!validationErrors.email}
            aria-describedby={validationErrors.email ? "email-error" : undefined}
          />
          {validationErrors.email && (
            <small id="email-error" style={{ color: '#6d6875' }}>
              {validationErrors.email}
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            aria-invalid={!!validationErrors.password}
            aria-describedby={validationErrors.password ? "password-error" : undefined}
          />
          {validationErrors.password && (
            <small id="password-error" style={{ color: '#6d6875' }}>
              {validationErrors.password}
            </small>
          )}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton
          type="submit"
          isLoading={loading}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </SubmitButton>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;