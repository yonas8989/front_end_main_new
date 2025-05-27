import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../features/auth/authSlice";
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
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "../features/auth/authSelector";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
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

  // Use selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectAuthError);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Format: +[country code][number]";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be 8+ characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      registerRequest({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof SignupData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
            </div>
            <div style={{ flex: 1 }}>
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
            </div>
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            placeholder="+1234567890"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />
          {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </AuthButton>
        </form>

        <AuthLink>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#a78682" }}>
            Log In
          </Link>
        </AuthLink>
      </AuthContent>
    </AuthContainer>
  );
}
