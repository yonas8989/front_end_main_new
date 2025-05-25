import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../features/auth/authSlice';
import { AuthContainer, AuthContent, AuthTitle, AuthButton, AuthLink } from '../components/Layout/AuthStyles';
import FormInput from '../components/FormInput';

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

  const validate = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};
    if (!formData.emailOrPhoneNumber) newErrors.emailOrPhoneNumber = 'Email or phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginRequest(formData));

    try {
      const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      // Construct user object based on your Redux store's expected structure
      const user = {
        id: data.data.user._id,
        name: `${data.data.user.firstName} ${data.data.user.lastName}`,
        email: data.data.user.email,
        role: data.data.user.role,
        token: data.token,
        session: data.session,
      };

      dispatch(loginSuccess(user));
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Login</AuthTitle>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email or Phone"
            type="text"
            value={formData.emailOrPhoneNumber}
            onChange={(e) => setFormData({ ...formData, emailOrPhoneNumber: e.target.value })}
            error={errors.emailOrPhoneNumber}
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
