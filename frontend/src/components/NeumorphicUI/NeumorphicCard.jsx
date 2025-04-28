// src/components/NeumorphicUI/NeumorphicCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, CardHeader, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Komponent NeumorphicCard implementujący trend UI "Neumorphism i Soft UI" na rok 2025.
 * Tworzy karty z efektem neumorficznym, łączącym głębię skeuomorfizmu z prostotą płaskiego designu.
 */
const NeumorphicCard = ({
  children,
  title,
  subheader,
  avatar,
  action,
  headerProps = {},
  contentProps = {},
  actionsProps = {},
  elevation = 1,
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
        backgroundColor: '#f0f0f3',
        boxShadow: elevation === 0
          ? 'none'
          : `10px 10px 20px rgba(0, 0, 0, 0.1), 
             -10px -10px 20px rgba(255, 255, 255, 0.8)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `12px 12px 24px rgba(0, 0, 0, 0.12), 
                      -12px -12px 24px rgba(255, 255, 255, 0.8)`,
          transform: 'translateY(-5px)',
        },
      };
    } else {
      // Style dla ciemnego motywu
      return {
        backgroundColor: '#2a2a2a',
        boxShadow: elevation === 0
          ? 'none'
          : `10px 10px 20px rgba(0, 0, 0, 0.5), 
             -10px -10px 20px rgba(255, 255, 255, 0.05)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `12px 12px 24px rgba(0, 0, 0, 0.6), 
                      -12px -12px 24px rgba(255, 255, 255, 0.05)`,
          transform: 'translateY(-5px)',
        },
      };
    }
  };

  return (
    <Card
      elevation={0} // Używamy własnych cieni zamiast domyślnych Material UI
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        // Intentional Imperfection - Nieregularne kształty
        clipPath: 'polygon(0% 0%, 97% 0%, 100% 3%, 100% 100%, 3% 100%, 0% 97%)',
        ...getNeumorphicStyles(),
        ...sx,
      }}
      {...props}
    >
      {(title || subheader || avatar || action) && (
        <CardHeader
          title={title}
          subheader={subheader}
          avatar={avatar}
          action={action}
          sx={{
            '& .MuiCardHeader-title': {
              fontWeight: 600,
              fontSize: '1.25rem',
              fontFamily: theme.typography.h4.fontFamily,
            },
            '& .MuiCardHeader-subheader': {
              fontSize: '0.875rem',
              opacity: 0.8,
            },
            ...headerProps.sx,
          }}
          {...headerProps}
        />
      )}
      
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          ...contentProps.sx,
        }}
        {...contentProps}
      >
        {children}
      </CardContent>
      
      {props.children && (
        <CardActions
          sx={{
            padding: '16px',
            ...actionsProps.sx,
          }}
          {...actionsProps}
        >
          {props.children}
        </CardActions>
      )}
    </Card>
  );
};

NeumorphicCard.propTypes = {
  /**
   * Zawartość karty
   */
  children: PropTypes.node,
  /**
   * Tytuł karty
   */
  title: PropTypes.node,
  /**
   * Podtytuł karty
   */
  subheader: PropTypes.node,
  /**
   * Avatar w nagłówku karty
   */
  avatar: PropTypes.node,
  /**
   * Akcja w nagłówku karty
   */
  action: PropTypes.node,
  /**
   * Dodatkowe właściwości dla nagłówka karty
   */
  headerProps: PropTypes.object,
  /**
   * Dodatkowe właściwości dla zawartości karty
   */
  contentProps: PropTypes.object,
  /**
   * Dodatkowe właściwości dla akcji karty
   */
  actionsProps: PropTypes.object,
  /**
   * Poziom wzniesienia karty (0-5)
   */
  elevation: PropTypes.number,
  /**
   * Dodatkowe style dla karty
   */
  sx: PropTypes.object,
};

export default NeumorphicCard;
