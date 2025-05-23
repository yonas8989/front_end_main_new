import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User } from '../types/auth';
import { loginRequest, loginSuccess, loginFailure } from '../features/auth/authSlice';
import { AuthContainer, AuthContent, AuthTitle, AuthButton, AuthLink } from '../components/Layout/AuthStyles';
import FormInput from '../components/FormInput';

interface LoginCredentials {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Dispatch loginRequest with credentials payload
      dispatch(loginRequest(formData));
      
      // Mock API call - replace with actual API call
      const response = await new Promise<{ user: User }>((resolve) => 
        setTimeout(() => resolve({ 
          user: { 
            id: '1', // Assuming User interface has an id
            name: 'Test User', 
            email: formData.email,
            // Add any other required user fields
          } 
        }), 1000)
      );

      // Dispatch loginSuccess with user data
      dispatch(loginSuccess(response.user));
      navigate('/dashboard');
    } catch (error) {
      // Dispatch loginFailure with error message
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Login</AuthTitle>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />
          <AuthButton type="submit">Login</AuthButton>
        </form>
        <AuthLink>
          Don't have an account? <a href="/signup">Sign up</a>
        </AuthLink>
      </AuthContent>
    </AuthContainer>
  );
}