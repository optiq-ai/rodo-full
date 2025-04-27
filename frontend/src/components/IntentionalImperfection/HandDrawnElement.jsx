// src/components/IntentionalImperfection/HandDrawnElement.jsx
import React from 'react';
import { Box } from '@mui/material';

// Komponent implementujący trend "Intentional Imperfection"
const HandDrawnElement = ({ 
  children, 
  variant = 'border', 
  color = 'primary.main',
  thickness = 2,
  roughness = 0.8,
  rotation = 0,
  padding = 2,
  ...props 
}) => {
  // Generowanie losowych punktów dla efektu ręcznie rysowanej linii
  const generateRandomPoints = (width, height, roughness) => {
    const points = [];
    const steps = Math.floor(Math.max(width, height) / 5);
    
    // Górna linia
    for (let i = 0; i <= steps; i++) {
      const x = (width * i) / steps;
      const y = (Math.random() - 0.5) * roughness * 10;
      points.push(`${x},${y}`);
    }
    
    // Prawa linia
    for (let i = 0; i <= steps; i++) {
      const x = width + (Math.random() - 0.5) * roughness * 10;
      const y = (height * i) / steps;
      points.push(`${x},${y}`);
    }
    
    // Dolna linia
    for (let i = steps; i >= 0; i--) {
      const x = (width * i) / steps;
      const y = height + (Math.random() - 0.5) * roughness * 10;
      points.push(`${x},${y}`);
    }
    
    // Lewa linia
    for (let i = steps; i >= 0; i--) {
      const x = (Math.random() - 0.5) * roughness * 10;
      const y = (height * i) / steps;
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  };

  // Generowanie losowych punktów dla efektu ręcznie rysowanego podkreślenia
  const generateRandomUnderline = (width, roughness) => {
    const points = [];
    const steps = Math.floor(width / 5);
    
    for (let i = 0; i <= steps; i++) {
      const x = (width * i) / steps;
      const y = (Math.random() - 0.5) * roughness * 5;
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  };

  // Generowanie losowych punktów dla efektu ręcznie rysowanego tła
  const generateRandomBackground = (width, height, roughness, count = 5) => {
    const paths = [];
    
    for (let i = 0; i < count; i++) {
      const points = [];
      const steps = 10 + Math.floor(Math.random() * 10);
      
      // Losowy punkt startowy
      let x = Math.random() * width;
      let y = Math.random() * height;
      points.push(`M${x},${y}`);
      
      // Losowe punkty
      for (let j = 0; j < steps; j++) {
        x += (Math.random() - 0.5) * width * 0.2;
        y += (Math.random() - 0.5) * height * 0.2;
        points.push(`L${x},${y}`);
      }
      
      paths.push(points.join(' '));
    }
    
    return paths;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        padding: padding,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
        ...props.sx
      }}
      {...props}
    >
      {variant === 'border' && (
        <Box
          component="svg"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'visible',
          }}
        >
          <Box
            component="polygon"
            points={generateRandomPoints(100, 100, roughness)}
            sx={{
              fill: 'transparent',
              stroke: color,
              strokeWidth: thickness,
              vectorEffect: 'non-scaling-stroke',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      )}
      
      {variant === 'underline' && (
        <Box
          component="svg"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: thickness * 2,
            zIndex: 0,
            overflow: 'visible',
          }}
        >
          <Box
            component="polyline"
            points={generateRandomUnderline(100, roughness)}
            sx={{
              fill: 'transparent',
              stroke: color,
              strokeWidth: thickness,
              vectorEffect: 'non-scaling-stroke',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      )}
      
      {variant === 'background' && (
        <Box
          component="svg"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'visible',
            opacity: 0.1,
          }}
        >
          {generateRandomBackground(100, 100, roughness).map((path, index) => (
            <Box
              key={index}
              component="path"
              d={path}
              sx={{
                fill: 'transparent',
                stroke: color,
                strokeWidth: thickness * 0.5,
                vectorEffect: 'non-scaling-stroke',
              }}
            />
          ))}
        </Box>
      )}
      
      {children}
    </Box>
  );
};

export default HandDrawnElement;
