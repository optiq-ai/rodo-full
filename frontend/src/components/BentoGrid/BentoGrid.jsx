// src/components/BentoGrid/BentoGrid.jsx
import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Komponent BentoGrid implementujący trend UI "Bento Grids" na rok 2025.
 * Tworzy modułowy układ przypominający japońskie pudełka bento,
 * pozwalający na lepszą organizację i wyróżnienie różnych sekcji danych.
 */
const BentoGrid = ({ items, gap = 16, minHeight = 200 }) => {
  const theme = useTheme();

  // Funkcja określająca wielkość elementu na podstawie jego priorytetu
  const getGridSpan = (priority) => {
    switch (priority) {
      case 'high':
        return { xs: 12, sm: 12, md: 8, lg: 8 };
      case 'medium':
        return { xs: 12, sm: 6, md: 4, lg: 4 };
      case 'low':
        return { xs: 12, sm: 6, md: 4, lg: 4 };
      default:
        return { xs: 12, sm: 6, md: 4, lg: 4 };
    }
  };

  // Funkcja określająca wysokość elementu na podstawie jego zawartości
  const getItemHeight = (content) => {
    if (content && content.length > 200) {
      return minHeight * 2;
    }
    return minHeight;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(12, 1fr)',
          lg: 'repeat(12, 1fr)',
        },
        gap: `${gap}px`,
        width: '100%',
        my: 3,
      }}
    >
      {items.map((item, index) => {
        const gridSpan = getGridSpan(item.priority);
        const itemHeight = getItemHeight(item.content);

        return (
          <Box
            key={item.id || index}
            sx={{
              gridColumn: {
                xs: 'span 1',
                sm: `span ${gridSpan.sm}`,
                md: `span ${gridSpan.md}`,
                lg: `span ${gridSpan.lg}`,
              },
              minHeight: itemHeight,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[10],
              },
            }}
          >
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                // Implementacja trendu "Intentional Imperfection" z nieregularnymi kształtami
                borderRadius: item.priority === 'high' ? '16px 4px 16px 4px' : '8px 16px 8px 16px',
                // Implementacja trendu "Bright and Bold Designs" z gradientami
                background: item.priority === 'high' 
                  ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
                  : item.priority === 'medium'
                    ? `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`
                    : 'white',
                color: item.priority === 'high' || item.priority === 'medium' ? 'white' : 'inherit',
                position: 'relative',
                // Dodanie efektu "ziarnistości" dla elementów o niskim priorytecie
                '&::before': item.priority === 'low' ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.05,
                  pointerEvents: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                } : {},
              }}
            >
              <Box sx={{ p: 3, flexGrow: 1 }}>
                {item.icon && (
                  <Box sx={{ mb: 2, color: item.priority === 'high' || item.priority === 'medium' ? 'white' : theme.palette.primary.main }}>
                    {item.icon}
                  </Box>
                )}
                <Typography 
                  variant="h6" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    // Implementacja trendu "Text-Heavy Sites" z większą typografią
                    fontSize: item.priority === 'high' ? '1.5rem' : '1.25rem',
                  }}
                >
                  {item.title}
                </Typography>
                {item.subtitle && (
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom
                    sx={{ 
                      opacity: 0.9,
                      mb: 2,
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                )}
                {item.content && (
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {item.content}
                  </Typography>
                )}
              </Box>
              {item.action && (
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                  {item.action}
                </Box>
              )}
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};

BentoGrid.propTypes = {
  /**
   * Tablica elementów do wyświetlenia w siatce Bento.
   * Każdy element powinien zawierać: id, title, content, priority (high/medium/low), icon (opcjonalnie), action (opcjonalnie)
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      content: PropTypes.string,
      priority: PropTypes.oneOf(['high', 'medium', 'low']),
      icon: PropTypes.node,
      action: PropTypes.node,
    })
  ).isRequired,
  /**
   * Odstęp między elementami siatki (w pikselach)
   */
  gap: PropTypes.number,
  /**
   * Minimalna wysokość elementu (w pikselach)
   */
  minHeight: PropTypes.number,
};

export default BentoGrid;
