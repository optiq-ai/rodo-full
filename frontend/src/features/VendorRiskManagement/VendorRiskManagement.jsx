import React from 'react';
import { Box, Typography, Tabs, Tab, Paper, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VendorList from './components/VendorList';
import VendorRiskAssessment from './components/VendorRiskAssessment';
import VendorStatistics from './components/VendorStatistics';
import VendorAudit from './components/VendorAudit';

// Komponent główny modułu Zarządzania Ryzykiem Dostawców
const VendorRiskManagement = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);
  const [isMainPage, setIsMainPage] = React.useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setIsMainPage(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          pb: 1
        }}>
          Zarządzanie Ryzykiem Dostawców
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Oceniaj i monitoruj ryzyko związane z dostawcami przetwarzającymi dane osobowe.
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root': {
                py: 2,
                fontSize: '1rem',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }
            }}
          >
            <Tab label="Lista Dostawców" />
            <Tab label="Ocena Ryzyka" />
            <Tab label="Statystyki" />
            <Tab label="Audyt Dostawców" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && <VendorList />}
          {activeTab === 1 && <VendorRiskAssessment />}
          {activeTab === 2 && <VendorStatistics />}
          {activeTab === 3 && <VendorAudit />}
        </Box>
      </Box>
    </Container>
  );
};

export default VendorRiskManagement;
