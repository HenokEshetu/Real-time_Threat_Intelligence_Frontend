import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { PaletteOutlined } from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import useAttributes from '../../../../utils/hooks/useAttributes';

// Styled component for the popover container
const PopoverContainer = styled('div')({
  width: 300,
  padding: 0,
});

interface SearchScopeElementProps {
  name: string;
  disabled?: boolean;
  searchScope: Record<string, string[]>;
  setSearchScope: (scope: Record<string, string[]>) => void;
  availableRelationFilterTypes?: Record<string, string[]>;
}

const SearchScopeElement: React.FC<SearchScopeElementProps> = ({
  name,
  disabled = false,
  searchScope,
  setSearchScope,
  availableRelationFilterTypes,
}) => {
  // State for managing the popover anchor element
  const [anchorElSearchScope, setAnchorElSearchScope] = useState<HTMLElement | null>(null);

  // Get entity types from attributes hook
  const { stixCoreObjectTypes: entityTypes } = useAttributes();

  // Add User and Group types if this is a contextEntityId filter
  const enhancedEntityTypes = name === 'contextEntityId' 
    ? [...entityTypes, 'User', 'Group'] 
    : entityTypes;

  // Filter and prepare entity types for display
  const entitiesTypes = enhancedEntityTypes
    .filter((type) => (
      !availableRelationFilterTypes?.[name] 
      || availableRelationFilterTypes[name].includes(type)
    ))
    .map((type) => ({
      label: type, // Simplified - removed translation
      value: type,
      type,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Handler for opening the search scope popover
  const handleOpenSearchScope = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSearchScope(event.currentTarget);
  };

  // Handler for closing the popover
  const handleCloseSearchScope = () => {
    setAnchorElSearchScope(null);
  };

  // Toggle a specific entity type in the search scope
  const handleToggleSearchScope = (key: string, value: string) => {
    setSearchScope({
      ...searchScope,
      [key]: (searchScope[key] || []).includes(value)
        ? searchScope[key].filter((n) => n !== value)
        : [...(searchScope[key] || []), value],
    });
  };

  // Determine button color based on selection state
  const buttonColor = disabled 
    ? undefined 
    : searchScope[name]?.length > 0 ? 'secondary' : 'primary';

  return (
    <InputAdornment position="end" style={{ position: 'absolute', right: 5 }}>
      {/* Button to open the scope selector */}
      <IconButton 
        disabled={disabled} 
        onClick={handleOpenSearchScope} 
        size="small" 
        edge="end"
      >
        <PaletteOutlined fontSize="small" color={buttonColor} />
      </IconButton>

      {/* Popover containing the entity type selector */}
      <Popover
        open={Boolean(anchorElSearchScope)}
        anchorEl={anchorElSearchScope}
        onClose={handleCloseSearchScope}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        elevation={8}
      >
        <PopoverContainer>
          <MenuList dense>
            {entitiesTypes.map((entityType) => (
              <MenuItem
                key={entityType.value}
                value={entityType.value}
                dense
                onClick={() => handleToggleSearchScope(name, entityType.value)}
              >
                <Checkbox
                  size="small"
                  checked={(searchScope[name] || []).includes(entityType.value)}
                />
                <ListItemText primary={entityType.label} />
              </MenuItem>
            ))}
          </MenuList>
        </PopoverContainer>
      </Popover>
    </InputAdornment>
  );
};

export default SearchScopeElement;