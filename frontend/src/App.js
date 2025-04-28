// src/App.js - Modyfikacja do testowania komponentu demonstracyjnego
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme, { createThemeWithMode } from './config/theme';

// Import komponentów
import RodoRegisters from './features/RodoRegisters';
import RiskAnalysis from './features/RiskAnalysis';
import TrainingAndEducation from './features/TrainingAndEducation';
import ConsentManagement from './features/ConsentManagement';
import DataMapping from './features/DataMapping';
import VendorRiskManagement from './features/VendorRiskManagement';

// Import komponentu demonstracyjnego ulepszeń UI/UX 2025
import UIEnhancementsDemo from './components/UIEnhancementsDemo';

// Import komponentów efektów
import CustomCursor from './components/CustomCursor';
import SoundEffects from './components/SoundEffects';
import ScrollytellingSection from './components/ScrollytellingSection';
import HorizontalScroller from './components/HorizontalScroller';
import MicroInteractions from './components/MicroInteractions';
import AntiUsabilityInteractions from './components/AntiUsability';

function App() {
  const [currentThemeMode, setCurrentThemeMode] = useState('light');
  const currentTheme = React.useMemo(() => createThemeWithMode(currentThemeMode), [currentThemeMode]);

  const handleThemeChange = (mode) => {
    setCurrentThemeMode(mode);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <CustomCursor />
      <SoundEffects />
      <MicroInteractions />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                RODO App
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Rejestry RODO
              </Button>
              <Button color="inherit" component={Link} to="/risk-analysis">
                Analiza Ryzyka
              </Button>
              <Button color="inherit" component={Link} to="/training">
                Szkolenia
              </Button>
              <Button color="inherit" component={Link} to="/consent">
                Zgody
              </Button>
              <Button color="inherit" component={Link} to="/data-mapping">
                Mapowanie Danych
              </Button>
              <Button color="inherit" component={Link} to="/vendor-risk">
                Ryzyko Dostawców
              </Button>
              <Button color="inherit" component={Link} to="/ui-demo">
                Demo UI 2025
              </Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<RodoRegisters />} />
              <Route path="/risk-analysis" element={<RiskAnalysis />} />
              <Route path="/training" element={<TrainingAndEducation />} />
              <Route path="/consent" element={<ConsentManagement />} />
              <Route path="/data-mapping" element={<DataMapping />} />
              <Route path="/vendor-risk" element={<VendorRiskManagement />} />
              <Route path="/ui-demo" element={<UIEnhancementsDemo />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
