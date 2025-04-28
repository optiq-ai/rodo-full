// src/components/EmptyState/EmptyState.jsx
import React from 'react';
import { Box, Typography, Button, useTheme, alpha } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

const EmptyState = ({ 
  title = 'Brak danych', 
  description = 'Nie znaleziono żadnych danych do wyświetlenia.', 
  actionLabel = 'Dodaj nowy',
  actionIcon = 'add',
  onAction,
  imageSrc = 'https://cdn-icons-png.flaticon.com/512/6897/6897039.png',
  variant = 'default' // 'default', 'search', 'error', 'loading'
}) => {
  const theme = useTheme();
  
  // Dostosowanie zawartości w zależności od wariantu
  let content = {
    title,
    description,
    actionLabel,
    icon: actionIcon === 'add' ? <AddCircleOutlineIcon /> : <RefreshIcon />
  };
  
  if (variant === 'search') {
    content = {
      title: 'Brak wyników wyszukiwania',
      description: 'Spróbuj zmienić kryteria wyszukiwania lub użyj innych filtrów.',
      actionLabel: 'Wyczyść filtry',
      icon: <RefreshIcon />
    };
  } else if (variant === 'error') {
    content = {
      title: 'Wystąpił błąd',
      description: 'Nie udało się załadować danych. Spróbuj ponownie później.',
      actionLabel: 'Spróbuj ponownie',
      icon: <RefreshIcon />
    };
  } else if (variant === 'loading') {
    content = {
      title: 'Ładowanie danych',
      description: 'Proszę czekać, trwa ładowanie danych...',
      actionLabel: '',
      icon: null
    };
  }
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '300px',
      textAlign: 'center',
      p: 4,
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      borderRadius: theme.shape.borderRadius,
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
      border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
      m: 2
    }}>
      <img 
        src={imageSrc} 
        alt="Ilustracja" 
        style={{ width: '120px', marginBottom: '24px', opacity: 0.7 }} 
      />
      <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        {content.title}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '600px', mb: 3, color: 'text.secondary' }}>
        {content.description}
      </Typography>
      {content.actionLabel && onAction && (
        <Button 
          variant="contained" 
          color="primary"
          startIcon={content.icon}
          onClick={onAction}
          sx={{ mt: 2 }}
        >
          {content.actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
