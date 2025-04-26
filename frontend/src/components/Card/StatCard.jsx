// src/components/Card/StatCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary.main', 
  trend = 'neutral', 
  trendValue = 0,
  loading = false,
  onClick
}) => {
  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUpIcon fontSize="small" sx={{ color: 'success.main' }} />;
    } else if (trend === 'down') {
      return <TrendingDownIcon fontSize="small" sx={{ color: 'error.main' }} />;
    } else {
      return <TrendingFlatIcon fontSize="small" sx={{ color: 'text.secondary' }} />;
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') {
      return 'success.main';
    } else if (trend === 'down') {
      return 'error.main';
    } else {
      return 'text.secondary';
    }
  };

  return (
    <StyledCard 
      onClick={onClick} 
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            {title}
          </Typography>
          {icon && (
            <Box 
              sx={{ 
                backgroundColor: `${color}15`, 
                borderRadius: '50%', 
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {React.cloneElement(icon, { sx: { color: color } })}
            </Box>
          )}
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {value}
          </Typography>
        )}
        
        {!loading && trendValue !== 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderTrendIcon()}
            <Typography 
              variant="body2" 
              component="span" 
              sx={{ 
                ml: 0.5, 
                color: getTrendColor(),
                fontWeight: 'medium'
              }}
            >
              {trendValue > 0 ? '+' : ''}{trendValue}%
            </Typography>
            <Typography variant="body2" component="span" sx={{ ml: 0.5, color: 'text.secondary' }}>
              od ostatniego miesiąca
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default StatCard;
