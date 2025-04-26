// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  // Mock data dla powiadomień
  const notifications = [
    { id: 1, text: 'Nowy incydent został zgłoszony', read: false },
    { id: 2, text: 'Nowy wniosek podmiotu danych', read: false },
    { id: 3, text: 'Przypomnienie: Aktualizacja polityki prywatności', read: true },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    // Logika wylogowania
    handleCloseUserMenu();
    // Przekierowanie do strony logowania
    navigate('/login');
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate('/settings/profile');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: 'text.primary', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Pomoc */}
        <Tooltip title="Pomoc">
          <IconButton color="inherit" sx={{ ml: 1 }}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        
        {/* Powiadomienia */}
        <Tooltip title="Powiadomienia">
          <IconButton 
            color="inherit" 
            onClick={handleOpenNotificationsMenu}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={unreadNotificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-notifications"
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotificationsMenu}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem 
                key={notification.id} 
                onClick={handleCloseNotificationsMenu}
                sx={{ 
                  fontWeight: notification.read ? 'normal' : 'bold',
                  backgroundColor: notification.read ? 'transparent' : 'rgba(66, 133, 244, 0.05)',
                  minWidth: '300px'
                }}
              >
                <Typography textAlign="left">{notification.text}</Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography textAlign="center">Brak powiadomień</Typography>
            </MenuItem>
          )}
        </Menu>
        
        {/* Profil użytkownika */}
        <Box sx={{ ml: 2 }}>
          <Tooltip title="Otwórz ustawienia">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleProfile}>
              <Typography textAlign="center">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Wyloguj</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
