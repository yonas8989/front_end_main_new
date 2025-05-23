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

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function FormInput({ label, type, value, onChange, error }: FormInputProps) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputField type={type} value={value} onChange={onChange} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
}