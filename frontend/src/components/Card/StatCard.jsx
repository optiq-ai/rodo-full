// src/components/Card/StatCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const IconContainer = styled(Box)(({ theme, color }) => ({
  backgroundColor: alpha(color, 0.15),
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(5px)',
  boxShadow: `0 4px 12px ${alpha(color, 0.2)}`,
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
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {title}
          </Typography>
          {icon && (
            <IconContainer color={color}>
              {React.cloneElement(icon, { sx: { color: color, fontSize: '1.5rem' } })}
            </IconContainer>
          )}
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={28} sx={{ color: color }} />
          </Box>
        ) : (
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 1.5,
              background: `linear-gradient(45deg, ${color}, ${alpha(color, 0.7)})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 2px 4px ${alpha(color, 0.2)}`
            }}
          >
            {value}
          </Typography>
        )}
        
        {!loading && trendValue !== 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 1, 
              borderRadius: 1,
              background: alpha(getTrendColor(), 0.05),
            }}
          >
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
