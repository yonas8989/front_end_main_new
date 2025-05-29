import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editSongRequest } from '../features/song/songSlice';
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


export const EditSong = () => {
  const { id } = useParams(); // Get song ID from route
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs, error } = useSelector((state: RootState) => state.songs);
  const song = songs.find((s) => s.id === id);

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

  const genres = [
    'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic',
    'Jazz', 'Classical', 'Country', 'Blues',
    'Reggae', 'Metal', 'Folk', 'Alternative', 'Indie', 'Other'
  ];

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album || '',
        genre: song.genre,
        duration: song.duration.toString(),
        releaseYear: song.releaseYear.toString(),
        fileUrl: song.fileUrl,
        coverImageUrl: song.coverImageUrl || ''
      });
    }
  }, [song]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (localError) setLocalError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Basic validation
    if (!formData.title.trim()) return setLocalError('Title is required');
    if (!formData.artist.trim()) return setLocalError('Artist is required');
    if (!formData.genre) return setLocalError('Genre is required');
    if (!formData.duration || isNaN(parseInt(formData.duration))) return setLocalError('Valid duration required');
    if (!formData.releaseYear || isNaN(parseInt(formData.releaseYear))) return setLocalError('Valid release year required');
    if (!formData.fileUrl) return setLocalError('File URL required');

    try {
      dispatch(editSongRequest({
        id,
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        genre: formData.genre,
        duration: parseInt(formData.duration),
        releaseYear: parseInt(formData.releaseYear),
        fileUrl: formData.fileUrl,
        coverImageUrl: formData.coverImageUrl
      }));
      navigate('/songs');
    } catch (err) {
      console.error('Failed to update song', err);
      setLocalError('Failed to update song');
    }
  };

  if (!song) return <p>Song not found.</p>;

  return (
    <FormContainer>
      <h1>Edit Song</h1>
      <Form onSubmit={handleSubmit}>
        {(error || localError) && <ErrorMessage>{error || localError}</ErrorMessage>}

        <FormColumns>
          <FormColumn>
            <FormGroup>
              <label>Title</label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label>Artist</label>
              <Input name="artist" value={formData.artist} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label>Album</label>
              <Input name="album" value={formData.album} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Genre</label>
              <Select name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </Select>
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <label>Duration (seconds)</label>
              <Input name="duration" type="number" value={formData.duration} onChange={handleChange} min="1" required />
            </FormGroup>
            <FormGroup>
              <label>Release Year</label>
              <Input name="releaseYear" type="number" value={formData.releaseYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} required />
            </FormGroup>
            <FormGroup>
              <label>File URL</label>
              <Input name="fileUrl" type="url" value={formData.fileUrl} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label>Cover Image URL</label>
              <Input name="coverImageUrl" type="url" value={formData.coverImageUrl} onChange={handleChange} />
            </FormGroup>
          </FormColumn>
        </FormColumns>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button type="submit" style={{ background: colors.primary, color: 'white' }}>
            Save Changes
          </Button>
          <Button type="button" style={{ background: colors.secondary, color: 'white' }} onClick={() => navigate('/songs')}>
            Cancel
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};
