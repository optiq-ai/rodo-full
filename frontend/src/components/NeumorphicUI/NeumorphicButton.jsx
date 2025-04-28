// src/components/NeumorphicUI/NeumorphicButton.jsx
import React from 'react';
import { Button, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Komponent NeumorphicButton implementujący trend UI "Neumorphism i Soft UI" na rok 2025.
 * Tworzy przyciski z efektem neumorficznym, łączącym głębię skeuomorfizmu z prostotą płaskiego designu.
 */
const NeumorphicButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode !== 'dark' && theme.palette.mode !== 'lowLight';
  
  // Bazowe style neumorficzne zależne od trybu (jasny/ciemny)
  const getNeumorphicStyles = () => {
    if (isLightMode) {
      // Style dla jasnego motywu
      return {
        backgroundColor: variant === 'contained' ? theme.palette[color].main : '#f0f0f3',
        color: variant === 'contained' ? theme.palette[color].contrastText : theme.palette[color].main,
        boxShadow: variant === 'contained'
          ? `5px 5px 10px rgba(0, 0, 0, 0.1), 
             -5px -5px 10px rgba(255, 255, 255, 0.8),
             inset 0 0 0 rgba(0, 0, 0, 0),
             inset 0 0 0 rgba(255, 255, 255, 0)`
          : `5px 5px 10px rgba(0, 0, 0, 0.1), 
             -5px -5px 10px rgba(255, 255, 255, 0.8)`,
        '&:hover': {
          backgroundColor: variant === 'contained' 
            ? theme.palette[color].dark 
            : '#e6e6e9',
          boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.1), 
                      -3px -3px 6px rgba(255, 255, 255, 0.8)`,
        },
        '&:active': {
          boxShadow: variant === 'contained'
            ? `inset 2px 2px 5px rgba(0, 0, 0, 0.15), 
               inset -2px -2px 5px rgba(255, 255, 255, 0.1)`
            : `inset 2px 2px 5px rgba(0, 0, 0, 0.15), 
               inset -2px -2px 5px rgba(255, 255, 255, 0.1)`,
          transform: 'scale(0.98)',
        },
      };
    } else {
      // Style dla ciemnego motywu
      return {
        backgroundColor: variant === 'contained' ? theme.palette[color].main : '#2a2a2a',
        color: variant === 'contained' ? theme.palette[color].contrastText : theme.palette[color].main,
        boxShadow: variant === 'contained'
          ? `5px 5px 10px rgba(0, 0, 0, 0.5), 
             -5px -5px 10px rgba(255, 255, 255, 0.05),
             inset 0 0 0 rgba(0, 0, 0, 0),
             inset 0 0 0 rgba(255, 255, 255, 0)`
          : `5px 5px 10px rgba(0, 0, 0, 0.5), 
             -5px -5px 10px rgba(255, 255, 255, 0.05)`,
        '&:hover': {
          backgroundColor: variant === 'contained' 
            ? theme.palette[color].dark 
            : '#333333',
          boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.5), 
                      -3px -3px 6px rgba(255, 255, 255, 0.05)`,
        },
        '&:active': {
          boxShadow: variant === 'contained'
            ? `inset 2px 2px 5px rgba(0, 0, 0, 0.5), 
               inset -2px -2px 5px rgba(255, 255, 255, 0.025)`
            : `inset 2px 2px 5px rgba(0, 0, 0, 0.5), 
               inset -2px -2px 5px rgba(255, 255, 255, 0.025)`,
          transform: 'scale(0.98)',
        },
      };
    }
  };

  // Style dla różnych rozmiarów przycisków
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        };
      case 'large':
        return {
          padding: '12px 24px',
          fontSize: '1rem',
        };
      default: // medium
        return {
          padding: '8px 20px',
          fontSize: '0.875rem',
        };
    }
  };

  // Style dla stanu wyłączonego
  const getDisabledStyles = () => {
    if (disabled) {
      return {
        backgroundColor: isLightMode ? '#e0e0e0' : '#3a3a3a',
        color: isLightMode ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
        boxShadow: 'none',
        cursor: 'not-allowed',
        '&:hover': {
          backgroundColor: isLightMode ? '#e0e0e0' : '#3a3a3a',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          transform: 'none',
        },
      };
    }
    return {};
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        borderRadius: '12px',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        border: 'none',
        ...getSizeStyles(),
        ...getNeumorphicStyles(),
        ...getDisabledStyles(),
        // Intentional Imperfection - Nieregularne kształty
        clipPath: 'polygon(0% 0%, 97% 0%, 100% 10%, 100% 100%, 3% 100%, 0% 90%)',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

NeumorphicButton.propTypes = {
  /**
   * Zawartość przycisku
   */
  children: PropTypes.node.isRequired,
  /**
   * Wariant przycisku
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  /**
   * Kolor przycisku
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning']),
  /**
   * Rozmiar przycisku
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Czy przycisk jest wyłączony
   */
  disabled: PropTypes.bool,
  /**
   * Czy przycisk ma zajmować całą szerokość kontenera
   */
  fullWidth: PropTypes.bool,
  /**
   * Ikona na początku przycisku
   */
  startIcon: PropTypes.node,
  /**
   * Ikona na końcu przycisku
   */
  endIcon: PropTypes.node,
  /**
   * Funkcja wywoływana po kliknięciu przycisku
   */
  onClick: PropTypes.func,
  /**
   * Dodatkowe style dla przycisku
   */
  sx: PropTypes.object,
};

export default NeumorphicButton;
