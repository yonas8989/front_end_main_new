import styled from '@emotion/styled';
import { space, layout, typography, color, border, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

// Reuse styled components from AddSongPage
const FormContainer = styled.div<LayoutProps & SpaceProps>`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  ${layout}
  ${space}
`;

const FormTitle = styled.h1<TypographyProps & ColorProps & SpaceProps>`
  font-size: 2.5rem;
  color: ${colors.primary};
  margin-bottom: 2rem;
  text-align: center;
  ${typography}
  ${color}
  ${space}
`;

const Form = styled.form<SpaceProps>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${space}
`;

const FormGroup = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${space}
  ${flexbox}
`;

const Label = styled.label<TypographyProps & ColorProps>`
  font-size: 1.1rem;
  color: ${colors.primary};
  ${typography}
  ${color}
`;

const Input = styled.input<SpaceProps & BorderProps & ColorProps>`
  padding: 0.75rem;
  border: 2px solid ${colors.secondary};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  ${space}
  ${border}
  ${color}
`;

const TextArea = styled.textarea<SpaceProps & BorderProps & ColorProps>`
  padding: 0.75rem;
  border: 2px solid ${colors.secondary};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  ${space}
  ${border}
  ${color}
`;

const ButtonGroup = styled.div<SpaceProps & FlexboxProps>`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  ${space}
  ${flexbox}
`;

const SubmitButton = styled.button<ColorProps & SpaceProps & TypographyProps>`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;

  &:hover {
    background-color: ${colors.neutral};
  }

  ${color}
  ${space}
  ${typography}
`;

const CancelButton = styled.button<ColorProps & SpaceProps & TypographyProps>`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;

  &:hover {
    background-color: ${colors.dark};
  }

  ${color}
  ${space}
  ${typography}
`;

const DeleteButton = styled.button<ColorProps & SpaceProps & TypographyProps>`
  background-color: ${colors.dark};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;

  &:hover {
    background-color: #3a1629;
  }

  ${color}
  ${space}
  ${typography}
`;

export const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    lyrics: ''
  });

  useEffect(() => {
    // TODO: Fetch song data by ID
    const fetchSong = async () => {
      // Mock data - replace with actual API call
      const mockSong = {
        title: 'Sample Song',
        artist: 'Sample Artist',
        album: 'Sample Album',
        genre: 'Pop',
        year: '2022',
        lyrics: 'Sample lyrics...'
      };
      setFormData(mockSong);
    };

    fetchSong();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update song logic
    console.log('Song updated:', formData);
    navigate('/songs');
  };

  const handleDelete = () => {
    // TODO: Delete song logic
    console.log('Song deleted:', id);
    navigate('/songs');
  };

  return (
    <FormContainer>
      <FormTitle color={colors.primary} mb={4}>Edit Song</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label color={colors.primary}>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            borderColor={colors.secondary}
            p={2}
          />
        </FormGroup>

        <FormGroup>
          <Label color={colors.primary}>Artist</Label>
          <Input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
            borderColor={colors.secondary}
            p={2}
          />
        </FormGroup>

        <FormGroup>
          <Label color={colors.primary}>Album</Label>
          <Input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            borderColor={colors.secondary}
            p={2}
          />
        </FormGroup>

        <FormGroup>
          <Label color={colors.primary}>Genre</Label>
          <Input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            borderColor={colors.secondary}
            p={2}
          />
        </FormGroup>

        <FormGroup>
          <Label color={colors.primary}>Year</Label>
          <Input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            borderColor={colors.secondary}
            p={2}
          />
        </FormGroup>

        <FormGroup>
          <Label color={colors.primary}>Lyrics</Label>
          <TextArea
            name="lyrics"
            value={formData.lyrics}
            onChange={handleChange}
            borderColor={colors.secondary}
            p={2}
          />
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" bg={colors.primary} px={4} py={2}>
            Save Changes
          </SubmitButton>
          <DeleteButton type="button" bg={colors.dark} px={4} py={2} onClick={handleDelete}>
            Delete Song
          </DeleteButton>
          <CancelButton type="button" bg={colors.secondary} px={4} py={2} onClick={() => navigate('/songs')}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};