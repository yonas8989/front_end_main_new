
export interface LoginCredentials {
  emailOrPhoneNumber: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  isEmailOrPhoneNumberChanged: boolean;
  isPasswordChanged: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  avatar?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  [key: string]: any;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}
