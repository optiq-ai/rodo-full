// src/components/KineticTypography/KineticTypography.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Komponent KineticTypography implementujący trend UI "Kinetic Typography" na rok 2025.
 * Tworzy animowany tekst, który przyciąga uwagę i podkreśla ważne informacje.
 */
const KineticTypography = ({
  text,
  variant = 'h4',
  color = 'primary',
  effect = 'wave',
  duration = 2,
  delay = 0,
  loop = true,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    const container = containerRef.current;
    const textElement = textRef.current;
    
    // Funkcja do tworzenia pojedynczych liter w span'ach
    const createLetterSpans = () => {
      const letters = text.split('');
      textElement.innerHTML = '';
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        span.style.transition = `all ${duration / 2}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
        span.style.animationDelay = `${delay + (index * 0.05)}s`;
        
        if (letter === ' ') {
          span.style.width = '0.3em';
        }
        
        textElement.appendChild(span);
      });
    };
    
    // Funkcja do aplikowania efektu fali
    const applyWaveEffect = () => {
      const spans = textElement.querySelectorAll('span');
      
      spans.forEach((span, index) => {
        span.style.animationName = 'waveAnimation';
        span.style.animationDuration = `${duration}s`;
        span.style.animationTimingFunction = 'ease-in-out';
        span.style.animationDelay = `${delay + (index * 0.05)}s`;
        span.style.animationIterationCount = loop ? 'infinite' : '1';
        span.style.animationDirection = 'alternate';
      });
      
      // Dodanie animacji CSS
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes waveAnimation {
          0% { transform: translateY(0); }
          25% { transform: translateY(-10px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Funkcja do aplikowania efektu pulsowania
    const applyPulseEffect = () => {
      const spans = textElement.querySelectorAll('span');
      
      spans.forEach((span, index) => {
        span.style.animationName = 'pulseAnimation';
        span.style.animationDuration = `${duration}s`;
        span.style.animationTimingFunction = 'ease-in-out';
        span.style.animationDelay = `${delay + (index * 0.05)}s`;
        span.style.animationIterationCount = loop ? 'infinite' : '1';
      });
      
      // Dodanie animacji CSS
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes pulseAnimation {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Funkcja do aplikowania efektu rotacji
    const applyRotateEffect = () => {
      const spans = textElement.querySelectorAll('span');
      
      spans.forEach((span, index) => {
        span.style.animationName = 'rotateAnimation';
        span.style.animationDuration = `${duration}s`;
        span.style.animationTimingFunction = 'ease-in-out';
        span.style.animationDelay = `${delay + (index * 0.05)}s`;
        span.style.animationIterationCount = loop ? 'infinite' : '1';
        span.style.transformOrigin = 'center center';
      });
      
      // Dodanie animacji CSS
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes rotateAnimation {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Funkcja do aplikowania efektu blur
    const applyBlurEffect = () => {
      const spans = textElement.querySelectorAll('span');
      
      spans.forEach((span, index) => {
        span.style.animationName = 'blurAnimation';
        span.style.animationDuration = `${duration}s`;
        span.style.animationTimingFunction = 'ease-in-out';
        span.style.animationDelay = `${delay + (index * 0.05)}s`;
        span.style.animationIterationCount = loop ? 'infinite' : '1';
      });
      
      // Dodanie animacji CSS
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes blurAnimation {
          0% { filter: blur(0px); }
          50% { filter: blur(2px); }
          100% { filter: blur(0px); }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Funkcja do aplikowania efektu shuffle
    const applyShuffleEffect = () => {
      const spans = textElement.querySelectorAll('span');
      
      spans.forEach((span, index) => {
        span.style.animationName = 'shuffleAnimation';
        span.style.animationDuration = `${duration}s`;
        span.style.animationTimingFunction = 'ease-in-out';
        span.style.animationDelay = `${delay + (index * 0.05)}s`;
        span.style.animationIterationCount = loop ? 'infinite' : '1';
      });
      
      // Dodanie animacji CSS
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes shuffleAnimation {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Inicjalizacja
    createLetterSpans();
    
    // Aplikowanie wybranego efektu
    switch (effect) {
      case 'wave':
        applyWaveEffect();
        break;
      case 'pulse':
        applyPulseEffect();
        break;
      case 'rotate':
        applyRotateEffect();
        break;
      case 'blur':
        applyBlurEffect();
        break;
      case 'shuffle':
        applyShuffleEffect();
        break;
      default:
        applyWaveEffect();
    }
    
    // Czyszczenie
    return () => {
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent.includes('Animation')) {
          style.remove();
        }
      });
    };
  }, [text, effect, duration, delay, loop]);
  
  return (
    <Box
      ref={containerRef}
      sx={{
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      <Typography
        ref={textRef}
        variant={variant}
        color={color}
        sx={{
          display: 'inline-block',
          fontWeight: 'bold',
          // Intentional Imperfection - Nieregularne kształty
          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.1)',
          // Dodatkowe style dla typografii kinetycznej
          letterSpacing: '0.02em',
          lineHeight: 1.4,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

KineticTypography.propTypes = {
  /**
   * Tekst do animacji
   */
  text: PropTypes.string.isRequired,
  /**
   * Wariant typografii (zgodny z MUI Typography)
   */
  variant: PropTypes.string,
  /**
   * Kolor tekstu
   */
  color: PropTypes.string,
  /**
   * Efekt animacji (wave, pulse, rotate, blur, shuffle)
   */
  effect: PropTypes.oneOf(['wave', 'pulse', 'rotate', 'blur', 'shuffle']),
  /**
   * Czas trwania animacji (w sekundach)
   */
  duration: PropTypes.number,
  /**
   * Opóźnienie animacji (w sekundach)
   */
  delay: PropTypes.number,
  /**
   * Czy animacja ma się zapętlać
   */
  loop: PropTypes.bool,
  /**
   * Dodatkowe style dla kontenera
   */
  sx: PropTypes.object,
};

export default KineticTypography;
