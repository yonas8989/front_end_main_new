import styled from "@emotion/styled";
import {
  space,
  layout,
  typography,
  color,
  border,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
  BorderProps,
} from "styled-system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatisticsRequest } from "../features/songStatistics/songStatisticsSlice";
import {
  selectStatistics,
  selectStatisticsLoading,
  selectStatisticsError,
} from "../features/songStatistics/songStatisticsSelectors";

// Enhanced color palette
const colors = {
  primary: "#315659",     // Dark teal
  secondary: "#a78682",   // Muted rose
  accent: "#b3dec1",      // Mint green
  dark: "#56203d",        // Deep purple
  neutral: "#587b7f",     // Slate blue
  lightBg: "#f5f7f7",     // Light background
  textDark: "#2d3748",    // Dark text
  textLight: "#f8f9fa",   // Light text
};

const StatsContainer = styled.div<SpaceProps & LayoutProps>`
  margin: 3rem 0;
  ${space}
  ${layout}
`;

const StatsGrid = styled.div<LayoutProps & SpaceProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  ${layout}
  ${space}
`;

const StatCard = styled.div<ColorProps & SpaceProps & BorderProps>`
  background: linear-gradient(145deg, ${colors.lightBg} 0%, white 100%);
  border: 2px solid ${colors.accent};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
  
  ${color}
  ${space}
  ${border}
`;

const StatTitle = styled.h3<TypographyProps & ColorProps>`
  font-size: 1.25rem;
  color: ${colors.dark};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${colors.secondary};
  ${typography}
  ${color}
`;

const StatValue = styled.p<TypographyProps>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.primary};
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  ${typography}
`;

const StatLabel = styled.p<TypographyProps & ColorProps>`
  color: ${colors.neutral};
  font-weight: 500;
  ${typography}
  ${color}
`;

const StatList = styled.ul<SpaceProps>`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  ${space}
`;

const StatListItem = styled.li<SpaceProps>`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${colors.accent};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(179, 222, 193, 0.1);
  }
  
  span:first-of-type {
    color: ${colors.dark};
    font-weight: 500;
  }
  
  span:last-of-type {
    color: ${colors.primary};
    font-weight: bold;
  }
  
  ${space}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: ${colors.primary};
  background-color: ${colors.lightBg};
  border-radius: 8px;
`;

const ErrorMessage = styled.div<ColorProps>`
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  background: linear-gradient(145deg, #dc3545 0%, #c82333 100%);
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
  ${color}
`;

export const SongStatistics = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectStatistics);
  const loading = useSelector(selectStatisticsLoading);
  const error = useSelector(selectStatisticsError);

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  if (loading) return <LoadingMessage>Loading statistics...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!stats) return <div>No statistics available</div>;

  return (
    <StatsContainer my={5}>
      <StatsGrid>
        <StatCard borderColor={colors.accent}>
          <StatTitle color={colors.dark}>Total Songs</StatTitle>
          <StatValue>{stats.totalSongs}</StatValue>
          <StatLabel color={colors.neutral}>in your library</StatLabel>
        </StatCard>

        <StatCard borderColor={colors.accent}>
          <StatTitle color={colors.dark}>Artists</StatTitle>
          <StatValue>{stats.totalArtists}</StatValue>
          <StatLabel color={colors.neutral}>unique artists</StatLabel>
        </StatCard>

        <StatCard borderColor={colors.accent}>
          <StatTitle color={colors.dark}>Albums</StatTitle>
          <StatValue>{stats.totalAlbums}</StatValue>
          <StatLabel color={colors.neutral}>in collection</StatLabel>
        </StatCard>

        <StatCard borderColor={colors.accent}>
          <StatTitle color={colors.dark}>Genres</StatTitle>
          <StatValue>{stats.totalGenres}</StatValue>
          <StatLabel color={colors.neutral}>music styles</StatLabel>
        </StatCard>
      </StatsGrid>

      <StatsGrid mt={4}>
        <StatCard borderColor={colors.secondary}>
          <StatTitle color={colors.dark}>Songs by Genre</StatTitle>
          <StatList>
            {stats.songsPerGenre.map((genre) => (
              <StatListItem key={genre._id}>
                <span>{genre._id}</span>
                <span>{genre.count}</span>
              </StatListItem>
            ))}
          </StatList>
        </StatCard>

        <StatCard borderColor={colors.secondary}>
          <StatTitle color={colors.dark}>Top Artists</StatTitle>
          <StatList>
            {[...stats.songsAndAlbumsPerArtist]
              .sort((a, b) => b.songs - a.songs)
              .slice(0, 5)
              .map((artist) => (
                <StatListItem key={artist.artist}>
                  <span>{artist.artist}</span>
                  <span>{artist.songs} songs</span>
                </StatListItem>
              ))}
          </StatList>
        </StatCard>

        <StatCard borderColor={colors.secondary}>
          <StatTitle color={colors.dark}>Top Albums</StatTitle>
          <StatList>
            {[...stats.songsPerAlbum]
              .sort((a, b) => b.songs - a.songs)
              .slice(0, 5)
              .map((album) => (
                <StatListItem key={`${album.artist}-${album.album}`}>
                  <span>{album.album}</span>
                  <span>{album.songs} songs</span>
                </StatListItem>
              ))}
          </StatList>
        </StatCard>
      </StatsGrid>
    </StatsContainer>
  );
};