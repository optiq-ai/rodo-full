// src/features/RodoRegisters/RodoRegisters.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import RegistersList from './components/RegistersList';
import RegisterDetail from './components/RegisterDetail';
import RegisterForm from './components/RegisterForm';

const RodoRegisters = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ListAltIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Rejestry czynności przetwarzania
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('new')}
        >
          Dodaj nowy rejestr
        </Button>
      </Box>
      
      <Routes>
        <Route path="/" element={<RegistersList />} />
        <Route path="/new" element={<RegisterForm />} />
        <Route path="/:id" element={<RegisterDetail />} />
        <Route path="/:id/edit" element={<RegisterForm />} />
      </Routes>
    </Box>
  );
};

export default RodoRegisters;
