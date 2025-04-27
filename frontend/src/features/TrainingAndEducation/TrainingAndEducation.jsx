// src/features/TrainingAndEducation/TrainingAndEducation.jsx
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
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrainingList from './components/TrainingList';
import TrainingDetail from './components/TrainingDetail';
import TrainingForm from './components/TrainingForm';
import TrainingStatistics from './components/TrainingStatistics';
import TrainingMaterials from './components/TrainingMaterials';

const TrainingAndEducation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  
  // Sprawdzenie, czy jesteśmy na stronie głównej modułu
  const isMainPage = location.pathname === '/training' || location.pathname === '/training/';
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Szkolenia i edukacja
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
                  label="Lista szkoleń" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<BarChartIcon sx={{ mr: 1 }} />} 
                  label="Statystyki i analityka" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<MenuBookIcon sx={{ mr: 1 }} />} 
                  label="Materiały szkoleniowe" 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            {activeTab === 0 && <TrainingList />}
            {activeTab === 1 && <TrainingStatistics />}
            {activeTab === 2 && <TrainingMaterials />}
          </Box>
        } />
        <Route path="/new" element={<TrainingForm />} />
        <Route path="/:id" element={<TrainingDetail />} />
        <Route path="/:id/edit" element={<TrainingForm />} />
      </Routes>
    </Box>
  );
};

export default TrainingAndEducation;
