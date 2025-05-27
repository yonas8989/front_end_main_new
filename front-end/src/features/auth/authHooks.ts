import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { 
  loginRequest, 
  logoutRequest, 
  registerRequest, 
  verifyOTPRequest, 
  resetPasswordRequest 
} from './authSlice';
import { LoginCredentials, RegisterData, ResetPasswordData, VerifyOTPData } from '../../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state: RootState) => state.auth);

  return {
    user,
    token,
    loading,
    error,
    login: (credentials: LoginCredentials) => dispatch(loginRequest(credentials)),
    logout: () => dispatch(logoutRequest()),
    register: (data: RegisterData) => dispatch(registerRequest(data)),
    verifyOTP: (data: VerifyOTPData) => dispatch(verifyOTPRequest(data)),
    resetPassword: (data: ResetPasswordData) => dispatch(resetPasswordRequest(data)),
  };
};