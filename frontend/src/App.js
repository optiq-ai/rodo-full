// src/App.js - Usunięcie górnego menu i pozostawienie tylko paska bocznego
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container, CssBaseline, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
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
  </Box>
);

function App() {
  const [currentThemeMode, setCurrentThemeMode] = useState('light');
  const currentTheme = React.useMemo(() => createThemeWithMode(currentThemeMode), [currentThemeMode]);
  const [drawerOpen, setDrawerOpen] = useState(true); // Domyślnie otwarte na większych ekranach

  const handleThemeChange = (mode) => {
    setCurrentThemeMode(mode);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Wszystkie sekcje nawigacji
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

  const drawerWidth = 250;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <CustomCursor />
      <SoundEffects />
      <MicroInteractions />
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* AppBar tylko z przyciskiem menu i tytułem */}
          <AppBar 
            position="fixed" 
            sx={{ 
              zIndex: (theme) => theme.zIndex.drawer + 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` }
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                RODO App
              </Typography>
            </Toolbar>
          </AppBar>
          
          {/* Stały pasek boczny dla większych ekranów i tymczasowy dla mobilnych */}
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {/* Mobilna wersja szuflady */}
            <Drawer
              variant="temporary"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Lepsze działanie na urządzeniach mobilnych
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              <Box sx={{ width: drawerWidth }} role="presentation">
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
            </Drawer>
            
            {/* Stała wersja szuflady dla większych ekranów */}
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              <Toolbar /> {/* Przestrzeń na AppBar */}
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  {navigationItems.map((item, index) => (
                    <ListItem 
                      button 
                      key={index} 
                      component={Link} 
                      to={item.path}
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
                  >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ustawienia" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
          
          {/* Główna zawartość */}
          <Box
            component="main"
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              mt: '64px' // Wysokość AppBar
            }}
          >
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
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
