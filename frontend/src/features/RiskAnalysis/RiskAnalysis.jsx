// src/features/RiskAnalysis/RiskAnalysis.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import RiskAnalysisList from './components/RiskAnalysisList';
import RiskAnalysisDetail from './components/RiskAnalysisDetail';
import RiskAnalysisForm from './components/RiskAnalysisForm';

const RiskAnalysis = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AssessmentIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Analiza Ryzyka
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('new')}
        >
          Dodaj nową analizę
        </Button>
      </Box>
      
      <Routes>
        <Route path="/" element={<RiskAnalysisList />} />
        <Route path="/new" element={<RiskAnalysisForm />} />
        <Route path="/:id" element={<RiskAnalysisDetail />} />
        <Route path="/:id/edit" element={<RiskAnalysisForm />} />
      </Routes>
    </Box>
  );
};

export default RiskAnalysis;
