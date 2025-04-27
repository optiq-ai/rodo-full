// src/components/CustomCursor/CustomCursor.jsx
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Komponent implementujący trend "Cursor Alternatives"
const CustomCursor = () => {
  const theme = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Pokaż kursor po załadowaniu
    setTimeout(() => {
      setHidden(false);
    }, 1000);

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleLinkHover = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.role === 'button'
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleLinkHover);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Główny kursor */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: theme.palette.primary.main,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
          transition: 'transform 0.1s ease, width 0.2s, height 0.2s, opacity 0.2s',
          opacity: 0.7,
          mixBlendMode: 'difference',
          ...(clicked && {
            transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
            width: '24px',
            height: '24px',
            opacity: 0.5,
          }),
          ...(hovered && {
            width: '24px',
            height: '24px',
            transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
            backgroundColor: theme.palette.secondary.main,
            opacity: 0.8,
          }),
        }}
      />
      
      {/* Zewnętrzny pierścień */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate(${position.x - 18}px, ${position.y - 18}px)`,
          transition: 'transform 0.15s ease, width 0.3s, height 0.3s, opacity 0.3s',
          opacity: 0.3,
          ...(clicked && {
            width: '48px',
            height: '48px',
            transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
            opacity: 0.2,
          }),
          ...(hovered && {
            width: '48px',
            height: '48px',
            transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
            borderColor: theme.palette.secondary.main,
            opacity: 0.4,
          }),
        }}
      />
    </>
  );
};

export default CustomCursor;
