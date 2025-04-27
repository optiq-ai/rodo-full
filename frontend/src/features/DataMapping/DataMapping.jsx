import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DataMappingList from './components/DataMappingList';
import DataFlowDiagram from './components/DataFlowDiagram';
import DataInventory from './components/DataInventory';
import DataProcessingActivities from './components/DataProcessingActivities';

// Komponent główny modułu Mapowania Danych
const DataMapping = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isMainPage, setIsMainPage] = useState(true);

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
          Mapowanie Danych
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Zarządzaj przepływem danych osobowych w organizacji, twórz mapy danych i inwentaryzuj zasoby.
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
            <Tab label="Lista Mapowań" />
            <Tab label="Diagram Przepływu Danych" />
            <Tab label="Inwentaryzacja Danych" />
            <Tab label="Czynności Przetwarzania" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && <DataMappingList />}
          {activeTab === 1 && <DataFlowDiagram />}
          {activeTab === 2 && <DataInventory />}
          {activeTab === 3 && <DataProcessingActivities />}
        </Box>
      </Box>
    </Container>
  );
};

export default DataMapping;
