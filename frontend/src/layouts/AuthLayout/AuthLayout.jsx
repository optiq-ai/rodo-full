// src/layouts/AuthLayout/AuthLayout.jsx
import React from 'react';
import { Box, Container, Paper, Typography, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 4, 
              color: 'primary.main',
              fontWeight: 'bold'
            }}
          >
            RODO App
          </Typography>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
