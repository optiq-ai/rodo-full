// src/components/EmotionalFeedback/EmotionalFeedback.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Fade, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CelebrationIcon from '@mui/icons-material/Celebration';

/**
 * Komponent EmotionalFeedback implementujący trend UI "Design emocjonalny i empatyczny" na rok 2025.
 * Wyświetla emocjonalne komunikaty zwrotne dostosowane do kontekstu działań użytkownika.
 */
const EmotionalFeedback = ({
  type = 'success',
  message = '',
  subMessage = '',
  autoHideDuration = 4000,
  position = 'top-center',
  showIcon = true,
  onClose,
  sx = {},
}) => {
  const theme = useTheme();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) {
          setTimeout(onClose, 300); // Wywołaj onClose po zakończeniu animacji
        }
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onClose]);

  // Określenie ikony na podstawie typu
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon fontSize="large" />;
      case 'error':
        return <ErrorIcon fontSize="large" />;
      case 'warning':
        return <WarningIcon fontSize="large" />;
      case 'info':
        return <InfoIcon fontSize="large" />;
      case 'celebration':
        return <CelebrationIcon fontSize="large" />;
      default:
        return <CheckCircleIcon fontSize="large" />;
    }
  };

  // Określenie kolorów na podstawie typu
  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e3c2f 0%, #2d5c48 100%)' 
            : 'linear-gradient(135deg, #e6f7ed 0%, #c8e6d7 100%)',
          color: theme.palette.mode === 'dark' ? '#4caf50' : '#2e7d32',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#388e3c' : '#a5d6a7'}`,
        };
      case 'error':
        return {
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #3c1e1e 0%, #5c2d2d 100%)' 
            : 'linear-gradient(135deg, #f7e6e6 0%, #e6c8c8 100%)',
          color: theme.palette.mode === 'dark' ? '#f44336' : '#d32f2f',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#e53935' : '#ef9a9a'}`,
        };
      case 'warning':
        return {
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #3c331e 0%, #5c4d2d 100%)' 
            : 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
          color: theme.palette.mode === 'dark' ? '#ff9800' : '#ed6c02',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#fb8c00' : '#ffe082'}`,
        };
      case 'info':
        return {
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e293c 0%, #2d435c 100%)' 
            : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          color: theme.palette.mode === 'dark' ? '#2196f3' : '#0288d1',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#1e88e5' : '#90caf9'}`,
        };
      case 'celebration':
        return {
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #3c1e3c 0%, #5c2d5c 100%)' 
            : 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
          color: theme.palette.mode === 'dark' ? '#ab47bc' : '#8e24aa',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#8e24aa' : '#ce93d8'}`,
        };
      default:
        return {
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1e3c2f 0%, #2d5c48 100%)' 
            : 'linear-gradient(135deg, #e6f7ed 0%, #c8e6d7 100%)',
          color: theme.palette.mode === 'dark' ? '#4caf50' : '#2e7d32',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#388e3c' : '#a5d6a7'}`,
        };
    }
  };

  // Określenie pozycji na ekranie
  const getPositionStyles = () => {
    switch (position) {
      case 'top-center':
        return {
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'top-right':
        return {
          top: '20px',
          right: '20px',
        };
      case 'top-left':
        return {
          top: '20px',
          left: '20px',
        };
      case 'bottom-center':
        return {
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom-right':
        return {
          bottom: '20px',
          right: '20px',
        };
      case 'bottom-left':
        return {
          bottom: '20px',
          left: '20px',
        };
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      default:
        return {
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
    }
  };

  // Emocjonalne wiadomości dostosowane do typu
  const getEmotionalMessage = () => {
    if (message) return message;
    
    switch (type) {
      case 'success':
        return 'Świetna robota! Operacja zakończona sukcesem.';
      case 'error':
        return 'Ups! Coś poszło nie tak. Spróbujmy jeszcze raz.';
      case 'warning':
        return 'Uwaga! Warto zwrócić uwagę na ten element.';
      case 'info':
        return 'Psst! Mam dla Ciebie ważną informację.';
      case 'celebration':
        return 'Brawo! Osiągnąłeś wspaniały wynik!';
      default:
        return 'Operacja zakończona pomyślnie.';
    }
  };

  const colors = getColors();
  const positionStyles = getPositionStyles();
  const emotionalMessage = getEmotionalMessage();

  return (
    <Fade in={show}>
      <Paper
        elevation={4}
        sx={{
          position: 'fixed',
          zIndex: 9999,
          maxWidth: '400px',
          width: 'calc(100% - 40px)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          ...positionStyles,
          ...colors,
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '16px 4px 16px 4px',
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: position === 'center' 
              ? 'translate(-50%, -50%) scale(1.05)' 
              : position === 'top-center' || position === 'bottom-center'
                ? 'translateX(-50%) scale(1.05)'
                : 'scale(1.05)',
            boxShadow: theme.shadows[8],
          },
          ...sx,
        }}
      >
        {showIcon && (
          <Box
            sx={{
              marginRight: '16px',
              color: colors.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // Micro Interactions - Animacja ikony
              animation: 'iconPulse 2s infinite',
              '@keyframes iconPulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            {getIcon()}
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              marginBottom: subMessage ? '4px' : 0,
              color: colors.color,
            }}
          >
            {emotionalMessage}
          </Typography>
          {subMessage && (
            <Typography
              variant="body2"
              sx={{
                color: colors.color,
                opacity: 0.8,
              }}
            >
              {subMessage}
            </Typography>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};

EmotionalFeedback.propTypes = {
  /**
   * Typ komunikatu (success, error, warning, info, celebration)
   */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'celebration']),
  /**
   * Główna wiadomość (jeśli nie podana, użyta zostanie domyślna dla danego typu)
   */
  message: PropTypes.string,
  /**
   * Dodatkowa wiadomość wyświetlana pod główną
   */
  subMessage: PropTypes.string,
  /**
   * Czas w milisekundach, po którym komunikat zostanie automatycznie ukryty (0 = nie ukrywaj)
   */
  autoHideDuration: PropTypes.number,
  /**
   * Pozycja komunikatu na ekranie
   */
  position: PropTypes.oneOf([
    'top-center',
    'top-right',
    'top-left',
    'bottom-center',
    'bottom-right',
    'bottom-left',
    'center',
  ]),
  /**
   * Czy wyświetlać ikonę
   */
  showIcon: PropTypes.bool,
  /**
   * Funkcja wywoływana po zamknięciu komunikatu
   */
  onClose: PropTypes.func,
  /**
   * Dodatkowe style dla komponentu
   */
  sx: PropTypes.object,
};

export default EmotionalFeedback;
