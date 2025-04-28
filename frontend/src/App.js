// src/App.js - Dodanie brakujących sekcji do górnego menu i poprawa skalowania
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, CssBaseline, Menu, MenuItem, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme, { createThemeWithMode } from './config/theme';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';

// Import komponentów
import RodoRegisters from './features/RodoRegisters';
import RiskAnalysis from './features/RiskAnalysis';
import TrainingAndEducation from './features/TrainingAndEducation';
import ConsentManagement from './features/ConsentManagement';
import DataMapping from './features/DataMapping';
import VendorRiskManagement from './features/VendorRiskManagement';

// Import komponentów efektów
import CustomCursor from './components/CustomCursor';
import SoundEffects from './components/SoundEffects';
import MicroInteractions from './components/MicroInteractions';

// Komponent placeholder dla brakujących sekcji
const PlaceholderComponent = ({ title }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '60vh',
    textAlign: 'center',
    p: 3,
    backgroundColor: 'rgba(78, 205, 196, 0.05)',
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(78, 205, 196, 0.1)',
    border: '1px dashed rgba(78, 205, 196, 0.3)'
  }}>
    <img 
      src="https://cdn-icons-png.flaticon.com/512/6897/6897039.png" 
      alt="Ilustracja" 
      style={{ width: '120px', marginBottom: '24px', opacity: 0.7 }} 
    />
    <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ maxWidth: '600px', mb: 3, color: 'text.secondary' }}>
      Ta sekcja jest w trakcie rozwoju. Wkrótce pojawią się tutaj nowe funkcjonalności i dane.
    </Typography>
    <Button 
      variant="contained" 
      color="primary"
      sx={{ mt: 2 }}
    >
      Odśwież
    </Button>
  </Box>
);

function App() {
  const [currentThemeMode, setCurrentThemeMode] = useState('light');
  const currentTheme = React.useMemo(() => createThemeWithMode(currentThemeMode), [currentThemeMode]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);

  const handleThemeChange = (mode) => {
    setCurrentThemeMode(mode);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const isMoreMenuOpen = Boolean(moreMenuAnchorEl);

  // Wszystkie sekcje nawigacji
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Dokumentacja', path: '/documentation' },
    { label: 'Rejestry RODO', path: '/' },
    { label: 'Analiza Ryzyka', path: '/risk-analysis' },
    { label: 'Incydenty', path: '/incidents' },
    { label: 'Wnioski Podmiotów', path: '/subject-requests' },
    { label: 'Szkolenia', path: '/training' },
    { label: 'Raporty', path: '/reports' },
    { label: 'Ustawienia', path: '/settings' },
    { label: 'Zarządzanie Zgodami', path: '/consent' },
    { label: 'Mapowanie Danych', path: '/data-mapping' },
    { label: 'Ryzyko Dostawców', path: '/vendor-risk' }
  ];

  // Główne elementy nawigacji (zawsze widoczne na dużych ekranach)
  const mainNavItems = isMobile ? [] : navigationItems.slice(0, 6);
  
  // Elementy w menu "Więcej" (na dużych ekranach) lub w menu mobilnym (na małych ekranach)
  const moreNavItems = isMobile ? navigationItems : navigationItems.slice(6);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {navigationItems.map((item, index) => (
        <MenuItem 
          key={index} 
          component={Link} 
          to={item.path}
          onClick={handleMobileMenuClose}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );

  const renderMoreMenu = (
    <Menu
      anchorEl={moreMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMoreMenuOpen}
      onClose={handleMoreMenuClose}
    >
      {moreNavItems.map((item, index) => (
        <MenuItem 
          key={index} 
          component={Link} 
          to={item.path}
          onClick={handleMoreMenuClose}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <CustomCursor />
      <SoundEffects />
      <MicroInteractions />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ 
              flexWrap: 'wrap',
              minHeight: { xs: '64px', sm: '64px' },
              px: { xs: 1, sm: 2, md: 3 }
            }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  flexGrow: { xs: 1, md: 0 },
                  mr: { md: 4 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
              >
                RODO App
              </Typography>
              
              {/* Mobilny przycisk menu */}
              {isMobile && (
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              {/* Główne elementy nawigacji (widoczne na dużych ekranach) */}
              {!isMobile && (
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  flexGrow: 1,
                  '& > *': { mx: 0.5 }
                }}>
                  {mainNavItems.map((item, index) => (
                    <Button 
                      key={index} 
                      color="inherit" 
                      component={Link} 
                      to={item.path}
                      sx={{ 
                        fontSize: '0.875rem',
                        px: { md: 1.5, lg: 2 },
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}
              
              {/* Przycisk "Więcej" dla dodatkowych elementów (widoczny na dużych ekranach) */}
              {!isMobile && (
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="więcej opcji"
                  onClick={handleMoreMenuOpen}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMoreMenu}
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<RodoRegisters />} />
              <Route path="/risk-analysis" element={<RiskAnalysis />} />
              <Route path="/training" element={<TrainingAndEducation />} />
              <Route path="/consent" element={<ConsentManagement />} />
              <Route path="/data-mapping" element={<DataMapping />} />
              <Route path="/vendor-risk" element={<VendorRiskManagement />} />
              
              {/* Nowe trasy dla brakujących sekcji */}
              <Route path="/dashboard" element={<PlaceholderComponent title="Dashboard" />} />
              <Route path="/documentation" element={<PlaceholderComponent title="Dokumentacja" />} />
              <Route path="/incidents" element={<PlaceholderComponent title="Incydenty" />} />
              <Route path="/subject-requests" element={<PlaceholderComponent title="Wnioski Podmiotów" />} />
              <Route path="/reports" element={<PlaceholderComponent title="Raporty" />} />
              <Route path="/settings" element={<PlaceholderComponent title="Ustawienia" />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
