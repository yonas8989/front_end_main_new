// src/pages/Signup.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerRequest,
} from "../features/auth/authSlice"; // Removed registerSuccess, registerFailure as saga handles
import {
  AuthContainer,
  AuthContent,
  AuthTitle,
  AuthButton,
  AuthLink,
  AuthError,
  ErrorText,
} from "../components/Layout/AuthStyles";
import FormInput from "../components/FormInput";
import { RootState } from "../app/store";
// authService import is no longer needed here as the saga handles the direct call

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
}

interface SignupData extends RegisterData {
  confirmPassword: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select auth state from Redux store
  const { error: serverError, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Redirect to home page on successful registration
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validate = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // This regex matches international phone numbers starting with a plus sign,
    // followed by 1 to 14 digits. Adjust if your validation rules differ.
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid international phone number (e.g., +1234567890)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const registerData: RegisterData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      // No need to send confirmPassword to the backend, it's for client-side validation
      // But it's part of RegisterData for type safety if your backend expects it.
      // If not, you can omit it here for the payload sent to the service.
      confirmPassword: formData.confirmPassword,
    };

    // Dispatch the registerRequest action.
    // The Redux Saga (authSaga.ts) will intercept this action,
    // make the actual API call using authService.register,
    // and then dispatch either registerSuccess or registerFailure.
    dispatch(registerRequest(registerData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the specific field as the user types
    if (errors[name as keyof SignupData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <AuthContainer>
      <AuthContent>
        <AuthTitle>Create Account</AuthTitle>

        {serverError && <AuthError>{serverError}</AuthError>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <FormInput
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "firstName" },
                  })
                }
              />
              {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
            </div>
            <div style={{ flex: 1 }}>
              <FormInput
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "lastName" },
                  })
                }
              />
              {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleChange({ ...e, target: { ...e.target, name: "email" } })
              }
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="+1234567890"
              value={formData.phoneNumber}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "phoneNumber" },
                })
              }
            />
            {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "password" },
                })
              }
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <FormInput
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: { ...e.target, name: "confirmPassword" },
                })
              }
            />
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword}</ErrorText>
            )}
          </div>

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </AuthButton>
        </form>

        <AuthLink>
          Already have an account?
          <Link to="/login" style={{ marginLeft: "8px", color: "#a78682" }}>
            Log In
          </Link>
        </AuthLink>
      </AuthContent>
    </AuthContainer>
  );
}