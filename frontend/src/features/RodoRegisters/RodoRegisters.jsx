// src/features/RodoRegisters/RodoRegisters.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Tabs, 
  Tab, 
  Divider 
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import RegistersList from './components/RegistersList';
import RegisterDetail from './components/RegisterDetail';
import RegisterForm from './components/RegisterForm';
import RegisterStatistics from './components/RegisterStatistics';
import RegisterAudit from './components/RegisterAudit';

const RodoRegisters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  
  // Sprawdzenie, czy jesteśmy na stronie głównej modułu
  const isMainPage = location.pathname === '/registers' || location.pathname === '/registers/';
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
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
                  label="Lista rejestrów" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<BarChartIcon sx={{ mr: 1 }} />} 
                  label="Statystyki i analityka" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<SecurityIcon sx={{ mr: 1 }} />} 
                  label="Audyty rejestrów" 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            {activeTab === 0 && <RegistersList />}
            {activeTab === 1 && <RegisterStatistics />}
            {activeTab === 2 && <RegisterAudit />}
          </Box>
        } />
        <Route path="/new" element={<RegisterForm />} />
        <Route path="/:id" element={<RegisterDetail />} />
        <Route path="/:id/edit" element={<RegisterForm />} />
      </Routes>
    </Box>
  );
};

export default RodoRegisters;
