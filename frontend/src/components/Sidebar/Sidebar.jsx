// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Box,
  Typography
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ErrorIcon from '@mui/icons-material/Error';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import routes from '../../config/routes';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: routes.dashboard },
  { text: 'Dokumentacja', icon: <DescriptionIcon />, path: routes.documents },
  { text: 'Rejestry RODO', icon: <ListAltIcon />, path: routes.registers },
  { text: 'Analiza Ryzyka', icon: <AssessmentIcon />, path: routes.riskAnalysis },
  { text: 'Incydenty', icon: <ErrorIcon />, path: routes.incidents },
  { text: 'Wnioski Podmiotów', icon: <ContactMailIcon />, path: routes.subjectRequests },
  { text: 'Szkolenia', icon: <SchoolIcon />, path: routes.training },
  { text: 'Raporty', icon: <BarChartIcon />, path: routes.reports },
  { text: 'Ustawienia', icon: <SettingsIcon />, path: routes.settings },
  { text: 'Zarządzanie Zgodami', icon: <HandshakeIcon />, path: routes.consentManagement },
  { text: 'Mapowanie Danych', icon: <AccountTreeIcon />, path: routes.dataMapping },
  { text: 'Ryzyko Dostawców', icon: <BusinessIcon />, path: routes.vendorRisk },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose && window.innerWidth < 960) {
      onClose();
    }
  };

  const drawer = (
    <>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          RODO App
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderLeft: '4px solid #4285f4',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
                '& .MuiListItemText-primary': {
                  color: 'primary.main',
                  fontWeight: 500,
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(66, 133, 244, 0.05)',
              },
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobilna wersja */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Lepsze mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktopowa wersja */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
