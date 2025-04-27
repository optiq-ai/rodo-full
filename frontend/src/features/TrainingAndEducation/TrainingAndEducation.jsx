// src/features/TrainingAndEducation/TrainingAndEducation.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import TrainingList from './components/TrainingList';
import TrainingDetail from './components/TrainingDetail';
import TrainingForm from './components/TrainingForm';

const TrainingAndEducation = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Szkolenia i Edukacja
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('new')}
        >
          Dodaj nowe szkolenie
        </Button>
      </Box>
      
      <Routes>
        <Route path="/" element={<TrainingList />} />
        <Route path="/new" element={<TrainingForm />} />
        <Route path="/:id" element={<TrainingDetail />} />
        <Route path="/:id/edit" element={<TrainingForm />} />
      </Routes>
    </Box>
  );
};

export default TrainingAndEducation;
