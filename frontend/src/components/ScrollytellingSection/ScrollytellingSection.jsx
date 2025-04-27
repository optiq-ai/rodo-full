// src/components/ScrollytellingSection/ScrollytellingSection.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Komponent implementujący trend "Scrollytelling"
const ScrollytellingSection = ({ 
  children, 
  backgroundColor = 'transparent',
  textColor = 'inherit',
  height = '100vh',
  alignItems = 'center',
  justifyContent = 'center',
  parallaxEffect = true,
  fadeIn = true,
  id
}) => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Sprawdzenie, czy sekcja jest widoczna
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Obliczenie procentu widoczności sekcji
        const visibilityPercent = 1 - (Math.max(0, rect.top) / windowHeight);
        
        // Zastosowanie efektu paralaksy
        if (parallaxEffect) {
          const parallaxElements = section.querySelectorAll('[data-parallax]');
          parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.2;
            const yPos = -(rect.top * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
        }
        
        // Zastosowanie efektu fade-in
        if (fadeIn) {
          const fadeElements = section.querySelectorAll('[data-fade]');
          fadeElements.forEach(el => {
            const delay = parseFloat(el.dataset.fadeDelay) || 0;
            const threshold = parseFloat(el.dataset.fadeThreshold) || 0.2;
            
            if (visibilityPercent > threshold) {
              el.style.opacity = Math.min(1, (visibilityPercent - threshold) / (1 - threshold));
              el.style.transform = `translateY(${Math.max(0, 1 - visibilityPercent) * 30}px)`;
            } else {
              el.style.opacity = 0;
              el.style.transform = 'translateY(30px)';
            }
          });
        }
        
        // Dodanie klasy 'in-view' do sekcji
        section.classList.add('in-view');
      } else {
        // Usunięcie klasy 'in-view' z sekcji
        section.classList.remove('in-view');
      }
    };
    
    // Wywołanie handleScroll przy pierwszym renderowaniu
    handleScroll();
    
    // Dodanie nasłuchiwacza zdarzeń
    window.addEventListener('scroll', handleScroll);
    
    // Usunięcie nasłuchiwacza przy odmontowaniu komponentu
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [parallaxEffect, fadeIn]);
  
  return (
    <Box
      ref={sectionRef}
      id={id}
      sx={{
        height,
        width: '100%',
        display: 'flex',
        alignItems,
        justifyContent,
        backgroundColor,
        color: textColor,
        position: 'relative',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        transition: 'background-color 0.5s ease',
        '&.in-view': {
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
};

// Komponent do elementów z efektem paralaksy
export const ParallaxElement = ({ children, speed = 0.2, ...props }) => {
  return (
    <Box data-parallax={speed} {...props}>
      {children}
    </Box>
  );
};

// Komponent do elementów z efektem fade-in
export const FadeElement = ({ children, delay = 0, threshold = 0.2, ...props }) => {
  return (
    <Box 
      data-fade="true" 
      data-fade-delay={delay} 
      data-fade-threshold={threshold} 
      sx={{ 
        opacity: 0, 
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ScrollytellingSection;
