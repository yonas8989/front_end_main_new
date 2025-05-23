// components/FilterSidebar.tsx
import styled from '@emotion/styled';
import { space, layout, typography, color, border, flexbox, SpaceProps, LayoutProps, TypographyProps, ColorProps, BorderProps, FlexboxProps } from 'styled-system';

// Define theme colors
const colors = {
  primary: '#315659',
  secondary: '#a78682',
  success: '#b3dec1',
  danger: '#56203d',
  neutral: '#587b7f'
};

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    genre: FilterOption[];
    year: FilterOption[];
  };
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string) => void;
}

// Sidebar Container
const SidebarContainer = styled.div<LayoutProps & SpaceProps & ColorProps & { isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 280px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  padding: 20px;
  overflow-y: auto;
  ${layout}
  ${space}
  ${color}
`;

const SidebarHeader = styled.div<SpaceProps & TypographyProps & ColorProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.secondary};
  margin-bottom: 20px;
  ${space}
  ${typography}
  ${color}
`;

const CloseButton = styled.button<ColorProps & SpaceProps>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${colors.danger};
  ${color}
  ${space}
`;

const FilterSection = styled.div<SpaceProps>`
  margin-bottom: 24px;
  ${space}
`;

const FilterTitle = styled.h3<TypographyProps & ColorProps>`
  margin-bottom: 12px;
  color: ${colors.primary};
  ${typography}
  ${color}
`;

const FilterOption = styled.label<SpaceProps & FlexboxProps>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  ${space}
  ${flexbox}
`;

const CheckboxInput = styled.input<SpaceProps>`
  margin-right: 8px;
  accent-color: ${colors.primary};
  ${space}
`;

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onFilterChange
}) => {
  return (
    <SidebarContainer isOpen={isOpen} bg="white" p={3}>
      <SidebarHeader>
        <h2 color={colors.primary} >Filters</h2>
        <CloseButton onClick={onClose} color={colors.danger} px={2}>
          &times;
        </CloseButton>
      </SidebarHeader>

      <FilterSection>
        <FilterTitle color={colors.primary} fontSize={2}>Genre</FilterTitle>
        {filters.genre.map(option => (
          <FilterOption key={option.id}>
            <CheckboxInput
              type="checkbox"
              checked={selectedFilters.genre?.includes(option.value)}
              onChange={() => onFilterChange('genre', option.value)}
              mr={2}
            />
            {option.label}
          </FilterOption>
        ))}
      </FilterSection>

      <FilterSection>
        <FilterTitle color={colors.primary} fontSize={2}>Year</FilterTitle>
        {filters.year.map(option => (
          <FilterOption key={option.id}>
            <CheckboxInput
              type="checkbox"
              checked={selectedFilters.year?.includes(option.value)}
              onChange={() => onFilterChange('year', option.value)}
              mr={2}
            />
            {option.label}
          </FilterOption>
        ))}
      </FilterSection>
    </SidebarContainer>
  );
};