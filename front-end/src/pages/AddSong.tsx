import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSongRequest } from '../features/song/songSlice';
import { RootState } from '../app/store';

// Theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  accent: '#b3dec1',
  dark: '#56203d',
  neutral: '#587b7f'
};

// Basic form styling
const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormColumns = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.accent};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.accent};
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 0.25rem;
  font-size: 0.875rem;
`;

export const AddSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.songs);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    releaseYear: '',
    fileUrl: '',
    coverImageUrl: ''
  });
  const [localError, setLocalError] = useState('');

  // Common music genres for the dropdown
  const genres = [
    'Pop',
    'Rock',
    'Hip-Hop',
    'R&B',
    'Electronic',
    'Jazz',
    'Classical',
    'Country',
    'Blues',
    'Reggae',
    'Metal',
    'Folk',
    'Alternative',
    'Indie',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (localError) setLocalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(''); // Clear previous errors

    // Basic validation
    if (!formData.title.trim()) {
      setLocalError('Title is required');
      return;
    }
    if (!formData.artist.trim()) {
      setLocalError('Artist is required');
      return;
    }
    if (!formData.genre) {
      setLocalError('Genre is required');
      return;
    }
    if (!formData.duration || isNaN(parseInt(formData.duration))) {
      setLocalError('Valid duration is required');
      return;
    }
    if (!formData.releaseYear || isNaN(parseInt(formData.releaseYear))) {
      setLocalError('Valid release year is required');
      return;
    }
    if (!formData.fileUrl) {
      setLocalError('File URL is required');
      return;
    }

    try {
      const result = await dispatch(addSongRequest({
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        genre: formData.genre,
        duration: parseInt(formData.duration),
        releaseYear: parseInt(formData.releaseYear),
        fileUrl: formData.fileUrl,
        coverImageUrl: formData.coverImageUrl
      }));
    } catch (err) {
      console.error('Error submitting form:', err);
      setLocalError('Failed to add song. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h1>Add New Song</h1>
      <Form onSubmit={handleSubmit}>
        {(error || localError) && (
          <ErrorMessage>
            {error || localError}
          </ErrorMessage>
        )}
        
        <FormColumns>
          <FormColumn>
            <FormGroup>
              <label>Title</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Artist</label>
              <Input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Album</label>
              <Input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Genre</label>
              <Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <label>Duration (seconds)</label>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Release Year</label>
              <Input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>File URL</label>
              <Input
                type="url"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Cover Image URL</label>
              <Input
                type="url"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
              />
            </FormGroup>
          </FormColumn>
        </FormColumns>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button 
            type="submit" 
            style={{ background: colors.primary, color: 'white' }}
          >
            Add Song
          </Button>
          <Button 
            type="button" 
            style={{ background: colors.secondary, color: 'white' }}
            onClick={() => navigate('/songs')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};