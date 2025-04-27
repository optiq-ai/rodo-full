// src/features/ConsentManagement/ConsentManagement.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Tabs, 
  Tab, 
  Divider,
  useTheme, 
  alpha 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate, useLocation } from 'react-router-dom';

import ConsentManagementList from './components/ConsentManagementList';
import ConsentManagementDetail from './components/ConsentManagementDetail';
import ConsentManagementForm from './components/ConsentManagementForm';
import ConsentStatistics from './components/ConsentStatistics';
import ConsentTemplates from './components/ConsentTemplates';

const ConsentManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Sprawdzenie, czy jesteśmy na stronie głównej modułu
  const isMainPage = location.pathname === '/consent-management' || location.pathname === '/consent-management/';
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
        <Route path="/" element={
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    minHeight: '48px',
                    textTransform: 'none',
                    fontWeight: 500
                  }
                }}
              >
                <Tab 
                  icon={<ListAltIcon sx={{ mr: 1 }} />} 
                  label="Lista zgód" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<BarChartIcon sx={{ mr: 1 }} />} 
                  label="Statystyki i analityka" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<DescriptionIcon sx={{ mr: 1 }} />} 
                  label="Szablony zgód" 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            {activeTab === 0 && <ConsentManagementList />}
            {activeTab === 1 && <ConsentStatistics />}
            {activeTab === 2 && <ConsentTemplates />}
          </Box>
        } />
        <Route path="/new" element={<ConsentManagementForm />} />
        <Route path="/:id" element={<ConsentManagementDetail />} />
        <Route path="/:id/edit" element={<ConsentManagementForm />} />
      </Routes>
    </Box>
  );
};

export default ConsentManagement;
