// src/components/AccessibilityFeatures/AccessibilityFeatures.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Fab, 
  Menu, 
  MenuItem, 
  Typography, 
  Slider, 
  Switch, 
  FormControlLabel,
  Divider,
  Tooltip,
  useTheme
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import ContrastIcon from '@mui/icons-material/Contrast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';
import PropTypes from 'prop-types';

/**
 * Komponent AccessibilityFeatures implementujący trend UI "Dostępność i inkluzywny design" na rok 2025.
 * Zapewnia funkcje dostępności zgodne z WCAG 2.2 i European Accessibility Act.
 */
const AccessibilityFeatures = ({
  onFontSizeChange,
  onContrastChange,
  onReduceMotionChange,
  onScreenReaderChange,
  initialSettings = {
    fontSize: 1,
    highContrast: false,
    reduceMotion: false,
    screenReader: false
  },
  sx = {}
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [settings, setSettings] = useState(initialSettings);
  
  // Efekt dla zmiany rozmiaru czcionki
  useEffect(() => {
    if (onFontSizeChange) {
      onFontSizeChange(settings.fontSize);
    }
  }, [settings.fontSize, onFontSizeChange]);
  
  // Efekt dla zmiany kontrastu
  useEffect(() => {
    if (onContrastChange) {
      onContrastChange(settings.highContrast);
    }
  }, [settings.highContrast, onContrastChange]);
  
  // Efekt dla zmiany redukcji ruchu
  useEffect(() => {
    if (onReduceMotionChange) {
      onReduceMotionChange(settings.reduceMotion);
    }
  }, [settings.reduceMotion, onReduceMotionChange]);
  
  // Efekt dla zmiany czytnika ekranowego
  useEffect(() => {
    if (onScreenReaderChange) {
      onScreenReaderChange(settings.screenReader);
    }
  }, [settings.screenReader, onScreenReaderChange]);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleFontSizeChange = (event, newValue) => {
    setSettings(prev => ({ ...prev, fontSize: newValue }));
  };
  
  const handleContrastChange = (event) => {
    setSettings(prev => ({ ...prev, highContrast: event.target.checked }));
  };
  
  const handleReduceMotionChange = (event) => {
    setSettings(prev => ({ ...prev, reduceMotion: event.target.checked }));
  };
  
  const handleScreenReaderChange = (event) => {
    setSettings(prev => ({ ...prev, screenReader: event.target.checked }));
  };
  
  return (
    <Box sx={sx}>
      <Tooltip title="Ustawienia dostępności" placement="left">
        <Fab
          color="primary"
          aria-label="dostępność"
          size="medium"
          onClick={handleClick}
          sx={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            // Micro Interactions - Subtelne animacje
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <AccessibilityNewIcon />
        </Fab>
      </Tooltip>
      
      <Menu
        id="accessibility-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            width: 300,
            padding: 2,
            borderRadius: '16px',
            // Intentional Imperfection - Nieregularne kształty
            clipPath: 'polygon(0% 0%, 97% 0%, 100% 3%, 100% 100%, 3% 100%, 0% 97%)',
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Ustawienia dostępności
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TextIncreaseIcon sx={{ mr: 1 }} /> Rozmiar tekstu
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
            <TextDecreaseIcon sx={{ mr: 1, opacity: 0.7 }} />
            <Slider
              value={settings.fontSize}
              onChange={handleFontSizeChange}
              aria-labelledby="font-size-slider"
              step={0.1}
              marks
              min={0.8}
              max={1.5}
              valueLabelDisplay="auto"
              valueLabelFormat={value => `${Math.round(value * 100)}%`}
              sx={{
                mx: 2,
                color: theme.palette.primary.main,
              }}
            />
            <TextIncreaseIcon sx={{ ml: 1, opacity: 0.7 }} />
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.highContrast}
                onChange={handleContrastChange}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ContrastIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Wysoki kontrast</Typography>
              </Box>
            }
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.reduceMotion}
                onChange={handleReduceMotionChange}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VisibilityIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Ogranicz animacje</Typography>
              </Box>
            }
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.screenReader}
                onChange={handleScreenReaderChange}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HearingIcon sx={{ mr: 1 }} />
                <Typography variant="body2">Wsparcie czytnika ekranu</Typography>
              </Box>
            }
          />
        </Box>
        
        <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>
          Zgodne z WCAG 2.2 i European Accessibility Act
        </Typography>
      </Menu>
    </Box>
  );
};

AccessibilityFeatures.propTypes = {
  /**
   * Funkcja wywoływana przy zmianie rozmiaru czcionki
   * @param {number} fontSize - Mnożnik rozmiaru czcionki (np. 1.2 = 120%)
   */
  onFontSizeChange: PropTypes.func,
  /**
   * Funkcja wywoływana przy zmianie kontrastu
   * @param {boolean} highContrast - Czy włączony wysoki kontrast
   */
  onContrastChange: PropTypes.func,
  /**
   * Funkcja wywoływana przy zmianie redukcji ruchu
   * @param {boolean} reduceMotion - Czy włączona redukcja ruchu
   */
  onReduceMotionChange: PropTypes.func,
  /**
   * Funkcja wywoływana przy zmianie wsparcia czytnika ekranowego
   * @param {boolean} screenReader - Czy włączone wsparcie czytnika ekranowego
   */
  onScreenReaderChange: PropTypes.func,
  /**
   * Początkowe ustawienia dostępności
   */
  initialSettings: PropTypes.shape({
    fontSize: PropTypes.number,
    highContrast: PropTypes.bool,
    reduceMotion: PropTypes.bool,
    screenReader: PropTypes.bool
  }),
  /**
   * Dodatkowe style dla komponentu
   */
  sx: PropTypes.object,
};

export default AccessibilityFeatures;
