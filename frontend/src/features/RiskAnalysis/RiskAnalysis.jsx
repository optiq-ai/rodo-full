// src/features/RiskAnalysis/RiskAnalysis.jsx
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
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RiskAnalysisList from './components/RiskAnalysisList';
import RiskAnalysisDetail from './components/RiskAnalysisDetail';
import RiskAnalysisForm from './components/RiskAnalysisForm';
import RiskAnalyticsOverview from './components/RiskAnalyticsOverview';
import RiskMitigationPlans from './components/RiskMitigationPlans';

const RiskAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  
  // Sprawdzenie, czy jesteśmy na stronie głównej modułu
  const isMainPage = location.pathname === '/risk-analysis' || location.pathname === '/risk-analysis/';
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
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
                  label="Lista analiz" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<BarChartIcon sx={{ mr: 1 }} />} 
                  label="Analityka ryzyka" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<SecurityIcon sx={{ mr: 1 }} />} 
                  label="Plany ograniczenia ryzyka" 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            {activeTab === 0 && <RiskAnalysisList />}
            {activeTab === 1 && <RiskAnalyticsOverview />}
            {activeTab === 2 && <RiskMitigationPlans />}
          </Box>
        } />
        <Route path="/new" element={<RiskAnalysisForm />} />
        <Route path="/:id" element={<RiskAnalysisDetail />} />
        <Route path="/:id/edit" element={<RiskAnalysisForm />} />
      </Routes>
    </Box>
  );
};

export default RiskAnalysis;
