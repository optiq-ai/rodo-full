// src/features/ConsentManagement/ConsentManagement.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Button, Typography, useTheme, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import ConsentManagementList from './components/ConsentManagementList';
import ConsentManagementDetail from './components/ConsentManagementDetail';
import ConsentManagementForm from './components/ConsentManagementForm';

const ConsentManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" component="h1">
          Zarządzanie zgodami
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/consent-management/new')}
        >
          Dodaj nową zgodę
        </Button>
      </Box>

      <Routes>
        <Route path="/" element={<ConsentManagementList />} />
        <Route path="/new" element={<ConsentManagementForm />} />
        <Route path="/:id" element={<ConsentManagementDetail />} />
        <Route path="/:id/edit" element={<ConsentManagementForm />} />
      </Routes>
    </Box>
  );
};

export default ConsentManagement;
