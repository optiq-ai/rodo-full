// src/components/BlurryBackground/BlurryBackground.jsx
import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Komponent BlurryBackground implementujący trend UI "Blur and Grainy Effects" na rok 2025.
 * Dodaje efekty rozmycia i ziarnistości do tła, tworząc głębię i teksturę.
 */
const BlurryBackground = ({ 
  children, 
  blurIntensity = 10, 
  grainOpacity = 0.05,
  blurColor = 'rgba(255, 82, 82, 0.15)',
  animated = true,
  sx = {} 
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        ...sx
      }}
    >
      {/* Warstwa z efektem rozmycia */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          filter: `blur(${blurIntensity}px)`,
          opacity: 0.7,
          zIndex: -1,
          background: `radial-gradient(circle at 30% 30%, ${blurColor}, transparent 70%)`,
          // Animacja dla efektu rozmycia
          animation: animated ? 'blurMove 15s ease-in-out infinite alternate' : 'none',
          '@keyframes blurMove': {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '50%': {
              transform: 'translate(5%, 5%)',
            },
            '100%': {
              transform: 'translate(-5%, -5%)',
            },
          },
        }}
      />

      {/* Warstwa z efektem ziarnistości */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: grainOpacity,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          // Animacja dla efektu ziarnistości
          animation: animated ? 'grainMove 8s steps(10) infinite' : 'none',
          '@keyframes grainMove': {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '10%': {
              transform: 'translate(-5%, -5%)',
            },
            '20%': {
              transform: 'translate(10%, 5%)',
            },
            '30%': {
              transform: 'translate(5%, 10%)',
            },
            '40%': {
              transform: 'translate(-10%, -10%)',
            },
            '50%': {
              transform: 'translate(10%, 10%)',
            },
            '60%': {
              transform: 'translate(-5%, 5%)',
            },
            '70%': {
              transform: 'translate(5%, -10%)',
            },
            '80%': {
              transform: 'translate(-10%, 5%)',
            },
            '90%': {
              transform: 'translate(10%, -5%)',
            },
            '100%': {
              transform: 'translate(0, 0)',
            },
          },
        }}
      />

      {/* Zawartość komponentu */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

BlurryBackground.propTypes = {
  /**
   * Zawartość komponentu
   */
  children: PropTypes.node.isRequired,
  /**
   * Intensywność efektu rozmycia (w pikselach)
   */
  blurIntensity: PropTypes.number,
  /**
   * Przezroczystość efektu ziarnistości (0-1)
   */
  grainOpacity: PropTypes.number,
  /**
   * Kolor efektu rozmycia
   */
  blurColor: PropTypes.string,
  /**
   * Czy efekty mają być animowane
   */
  animated: PropTypes.bool,
  /**
   * Dodatkowe style dla kontenera
   */
  sx: PropTypes.object,
};

export default BlurryBackground;
