// src/components/HorizontalScroller/HorizontalScroller.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Komponent implementujący trend "Navigation Beyond Up and Down"
const HorizontalScroller = ({ 
  children, 
  height = '100vh', 
  showControls = true,
  snapScroll = true,
  backgroundColor = 'transparent',
  controlsColor = 'primary'
}) => {
  const theme = useTheme();
  const scrollerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Obsługa przewijania w poziomie za pomocą kółka myszy
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleWheel = (e) => {
      // Jeśli wciśnięty jest Shift, nie przejmujemy kontroli
      if (e.shiftKey) return;
      
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
      updateArrowVisibility();
    };

    const updateArrowVisibility = () => {
      if (!scroller) return;
      
      setShowLeftArrow(scroller.scrollLeft > 0);
      setShowRightArrow(scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth);
    };

    scroller.addEventListener('wheel', handleWheel, { passive: false });
    scroller.addEventListener('scroll', updateArrowVisibility);

    return () => {
      scroller.removeEventListener('wheel', handleWheel);
      scroller.removeEventListener('scroll', updateArrowVisibility);
    };
  }, []);

  // Obsługa przewijania za pomocą przeciągania
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - scroller.offsetLeft);
      setScrollLeft(scroller.scrollLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Snap do najbliższej sekcji po zakończeniu przeciągania
      if (snapScroll) {
        const childWidth = scroller.children[0]?.offsetWidth || 0;
        if (childWidth > 0) {
          const currentPosition = scroller.scrollLeft;
          const targetPosition = Math.round(currentPosition / childWidth) * childWidth;
          
          scroller.scrollTo({
            left: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 2; // Mnożnik prędkości przewijania
      scroller.scrollLeft = scrollLeft - walk;
    };

    scroller.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      scroller.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft, snapScroll]);

  // Funkcje do przewijania w lewo i prawo
  const handleScrollLeft = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    const childWidth = scroller.children[0]?.offsetWidth || 0;
    if (childWidth > 0) {
      scroller.scrollBy({
        left: -childWidth,
        behavior: 'smooth'
      });
    } else {
      scroller.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    const childWidth = scroller.children[0]?.offsetWidth || 0;
    if (childWidth > 0) {
      scroller.scrollBy({
        left: childWidth,
        behavior: 'smooth'
      });
    } else {
      scroller.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height,
        width: '100%',
        backgroundColor,
        overflow: 'hidden',
      }}
    >
      {showControls && showLeftArrow && (
        <IconButton
          onClick={handleScrollLeft}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: `${theme.palette[controlsColor].main}20`,
            color: theme.palette[controlsColor].main,
            '&:hover': {
              backgroundColor: `${theme.palette[controlsColor].main}40`,
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      
      {showControls && showRightArrow && (
        <IconButton
          onClick={scrollRight}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: `${theme.palette[controlsColor].main}20`,
            color: theme.palette[controlsColor].main,
            '&:hover': {
              backgroundColor: `${theme.palette[controlsColor].main}40`,
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}
      
      <Box
        ref={scrollerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          height: '100%',
          width: '100%',
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { // Chrome, Safari, Edge
            display: 'none',
          },
          ...(snapScroll && {
            scrollSnapType: 'x mandatory',
            '& > *': {
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
            },
          }),
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HorizontalScroller;
