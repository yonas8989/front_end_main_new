import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User } from '../types/auth'; 
import { registerRequest, registerSuccess, registerFailure } from '../features/auth/authSlice';
import { AuthContainer, AuthContent, AuthTitle, AuthButton, AuthLink } from '../components/Layout/AuthStyles';
import FormInput from '../components/FormInput';

// Define the RegisterData interface to match your authSlice
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface SignupData extends RegisterData {
  confirmPassword: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Partial<SignupData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Prepare the registration data without confirmPassword
      const registerData: RegisterData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      // Dispatch registerRequest with the proper payload
      dispatch(registerRequest(registerData));
      
      // Mock API call - replace with actual API call
      const response = await new Promise<{ user: User }>((resolve) => 
        setTimeout(() => resolve({ 
          user: { 
            id: '1', // Assuming User interface has an id
            name: formData.name, 
            email: formData.email,
            // Add any other required user fields
          } 
        }), 1000)
      );

      // Dispatch registerSuccess with the user data
      dispatch(registerSuccess(response.user));
      navigate('/dashboard');
    } catch (error) {
      // Dispatch registerFailure with the error message
      dispatch(registerFailure(error instanceof Error ? error.message : 'Signup failed'));
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Create Account</AuthTitle>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />
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
          <FormInput
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
          />
          <AuthButton type="submit">Sign Up</AuthButton>
        </form>
        <AuthLink>
          Already have an account? <a href="/login">Log in</a>
        </AuthLink>
      </AuthContent>
    </AuthContainer>
  );
}