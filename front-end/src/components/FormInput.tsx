import styled from '@emotion/styled';

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 0.25rem;
`;

// FormInput.tsx
interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;  // Accept both types
  placeholder?: string;
  name?: string;
}

export default function FormInput({
  label,
  type,
  value,
  onChange,
  error,
  name,
  placeholder
}: FormInputProps) {
  const errorMessage = typeof error === 'string' ? error : error ? 'This field is required' : undefined;

  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputField
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </InputContainer>
  );
}