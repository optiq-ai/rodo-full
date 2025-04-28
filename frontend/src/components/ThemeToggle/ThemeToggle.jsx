// src/components/ThemeToggle/ThemeToggle.jsx
import React from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PropTypes from 'prop-types';

/**
 * Komponent ThemeToggle implementujący przełącznik trybów motywu: jasny, ciemny i niskiego oświetlenia.
 * Część trendu UI "Low light (the new dark mode)" na rok 2025.
 */
const ThemeToggle = ({ onThemeChange, currentTheme = 'light', sx = {} }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (mode) => {
    if (onThemeChange) {
      onThemeChange(mode);
    }
    handleClose();
  };

  // Wybór ikony na podstawie aktualnego motywu
  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'dark':
        return <DarkModeIcon />;
      case 'lowLight':
        return <NightlightIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  // Tekst tooltipa na podstawie aktualnego motywu
  const getTooltipText = () => {
    switch (currentTheme) {
      case 'dark':
        return 'Tryb ciemny';
      case 'lowLight':
        return 'Tryb niskiego oświetlenia';
      default:
        return 'Tryb jasny';
    }
  };

  return (
    <Box sx={sx}>
      <Tooltip title={getTooltipText()}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="zmień motyw"
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'rotate(30deg)',
            },
          }}
        >
          {getThemeIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '12px',
            boxShadow: theme.shadows[4],
            mt: 1.5,
            minWidth: 180,
            background: theme.palette.background.paper,
          },
        }}
      >
        <MenuItem 
          onClick={() => handleThemeChange('light')}
          selected={currentTheme === 'light'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 82, 82, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 82, 82, 0.12)',
            },
          }}
        >
          <LightModeIcon fontSize="small" />
          Tryb jasny
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('dark')}
          selected={currentTheme === 'dark'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 82, 82, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 82, 82, 0.12)',
            },
          }}
        >
          <DarkModeIcon fontSize="small" />
          Tryb ciemny
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('lowLight')}
          selected={currentTheme === 'lowLight'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 82, 82, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 82, 82, 0.12)',
            },
          }}
        >
          <NightlightIcon fontSize="small" />
          Tryb niskiego oświetlenia
        </MenuItem>
      </Menu>
    </Box>
  );
};

ThemeToggle.propTypes = {
  /**
   * Funkcja wywoływana przy zmianie motywu
   */
  onThemeChange: PropTypes.func.isRequired,
  /**
   * Aktualny motyw
   */
  currentTheme: PropTypes.oneOf(['light', 'dark', 'lowLight']),
  /**
   * Dodatkowe style dla kontenera
   */
  sx: PropTypes.object,
};

export default ThemeToggle;
