// src/App.js - Dodanie brakujących sekcji do górnego menu i poprawa skalowania
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, CssBaseline, Menu, MenuItem, IconButton, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme, { createThemeWithMode } from './config/theme';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ErrorIcon from '@mui/icons-material/Error';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import StorageIcon from '@mui/icons-material/Storage';
import BusinessIcon from '@mui/icons-material/Business';
import FolderIcon from '@mui/icons-material/Folder';

// Import komponentów
import Dashboard from './features/Dashboard';
import RodoRegisters from './features/RodoRegisters';
import RiskAnalysis from './features/RiskAnalysis';
import IncidentManagement from './features/IncidentManagement';
import SubjectRequestsManagement from './features/SubjectRequestsManagement';
import TrainingAndEducation from './features/TrainingAndEducation';
import ReportingAndAnalytics from './features/ReportingAndAnalytics';
import Settings from './features/Settings';
import ConsentManagement from './features/ConsentManagement';
import DataMapping from './features/DataMapping';
import VendorRiskManagement from './features/VendorRiskManagement';
import DocumentManagement from './features/DocumentManagement';

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
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);

  const handleThemeChange = (mode) => {
    setCurrentThemeMode(mode);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSettingsMenuOpen = (event) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenuAnchorEl(null);
  };

  const isSettingsMenuOpen = Boolean(settingsMenuAnchorEl);

  // Wszystkie sekcje nawigacji (bez ustawień, które będą w prawym górnym rogu)
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Dokumenty', path: '/documents', icon: <FolderIcon /> },
    { label: 'Rejestry RODO', path: '/', icon: <ListAltIcon /> },
    { label: 'Analiza Ryzyka', path: '/risk-analysis', icon: <AssessmentIcon /> },
    { label: 'Incydenty', path: '/incidents', icon: <ErrorIcon /> },
    { label: 'Wnioski Podmiotów', path: '/subject-requests', icon: <ContactMailIcon /> },
    { label: 'Szkolenia', path: '/training', icon: <SchoolIcon /> },
    { label: 'Raporty', path: '/reports', icon: <BarChartIcon /> },
    { label: 'Zarządzanie Zgodami', path: '/consent', icon: <VerifiedUserIcon /> },
    { label: 'Mapowanie Danych', path: '/data-mapping', icon: <StorageIcon /> },
    { label: 'Ryzyko Dostawców', path: '/vendor-risk', icon: <BusinessIcon /> }
  ];

  // Dla większych ekranów, pokazujemy tylko część elementów w górnym pasku
  // a resztę w menu rozwijane "Więcej"
  const visibleNavItems = isTablet ? navigationItems.slice(0, 4) : navigationItems.slice(0, 7);
  const moreNavItems = isTablet ? navigationItems.slice(4) : navigationItems.slice(7);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          RODO App
        </Typography>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item, index) => (
          <ListItem 
            button 
            key={index} 
            component={Link} 
            to={item.path}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/settings"
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Ustawienia" />
        </ListItem>
      </List>
    </Box>
  );

  const renderSettingsMenu = (
    <Menu
      anchorEl={settingsMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSettingsMenuOpen}
      onClose={handleSettingsMenuClose}
    >
      <MenuItem 
        component={Link} 
        to="/settings"
        onClick={handleSettingsMenuClose}
      >
        Ustawienia
      </MenuItem>
    </Menu>
  );

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const isMoreMenuOpen = Boolean(moreMenuAnchorEl);

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

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
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            {item.icon}
          </Box>
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
              {/* Logo i przycisk menu dla urządzeń mobilnych */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  RODO App
                </Typography>
              </Box>
              
              {/* Główne elementy nawigacji (widoczne na większych ekranach) */}
              <Box sx={{ 
                display: 'flex', 
                flexGrow: 1,
                ml: 2,
                overflow: 'hidden',
                '& > *': { mx: 0.5 }
              }}>
                {visibleNavItems.map((item, index) => (
                  <Button 
                    key={index} 
                    color="inherit" 
                    component={Link} 
                    to={item.path}
                    sx={{ 
                      fontSize: '0.875rem',
                      px: { md: 1, lg: 1.5 },
                      whiteSpace: 'nowrap'
                    }}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {/* Przycisk "Więcej" dla dodatkowych elementów */}
                {moreNavItems.length > 0 && (
                  <Button
                    color="inherit"
                    onClick={handleMoreMenuOpen}
                    sx={{ 
                      fontSize: '0.875rem',
                      px: { md: 1, lg: 1.5 },
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Więcej
                  </Button>
                )}
              </Box>
              
              {/* Przycisk ustawień (zawsze widoczny) */}
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="ustawienia"
                onClick={handleSettingsMenuOpen}
              >
                <SettingsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          
          {/* Drawer dla urządzeń mobilnych */}
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
            }}
          >
            {drawer}
          </Drawer>
          
          {renderSettingsMenu}
          {renderMoreMenu}
          
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<DocumentManagement />} />
              <Route path="/" element={<RodoRegisters />} />
              <Route path="/risk-analysis" element={<RiskAnalysis />} />
              <Route path="/incidents" element={<IncidentManagement />} />
              <Route path="/subject-requests" element={<SubjectRequestsManagement />} />
              <Route path="/training" element={<TrainingAndEducation />} />
              <Route path="/reports" element={<ReportingAndAnalytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/consent" element={<ConsentManagement />} />
              <Route path="/data-mapping" element={<DataMapping />} />
              <Route path="/vendor-risk" element={<VendorRiskManagement />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
