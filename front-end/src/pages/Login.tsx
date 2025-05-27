import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../features/auth/authSlice';
import {
  AuthContainer,
  AuthContent,
  AuthTitle,
  AuthButton,
  AuthLink,
  AuthError,
  ErrorText,
} from '../components/Layout/AuthStyles';
import FormInput from '../components/FormInput';
import { RootState } from '../app/store';
import { selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../features/auth/authSelector';

interface LoginCredentials {
  emailOrPhoneNumber: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginCredentials>({
    emailOrPhoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux using selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectAuthError);

  // Redirect to home if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true }); // Prevent back navigation to login
    }
  }, [isAuthenticated, navigate]);

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};
    
    if (!formData.emailOrPhoneNumber.trim()) {
      newErrors.emailOrPhoneNumber = 'Email or phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Dispatch login action (Redux Saga will handle the API call)
    dispatch(loginRequest(formData));
  };

  // Update form state and clear errors on typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof LoginCredentials]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Login</AuthTitle>
        
        {serverError && <AuthError>{serverError}</AuthError>}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email or Phone Number"
            name="emailOrPhoneNumber"
            type="text"
            value={formData.emailOrPhoneNumber}
            onChange={handleChange}
            error={errors.emailOrPhoneNumber}
          />
          {errors.emailOrPhoneNumber && <ErrorText>{errors.emailOrPhoneNumber}</ErrorText>}

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          <AuthButton type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </AuthButton>
        </form>

        <AuthLink>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#a78682' }}>
            Sign up
          </Link>
        </AuthLink>
      </AuthContent>
    </AuthContainer>
  );
}