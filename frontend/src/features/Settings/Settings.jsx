// src/features/Settings/Settings.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton
} from '@mui/material';
import ProfileSettingsForm from './components/ProfileSettingsForm';
import SecuritySettingsForm from './components/SecuritySettingsForm';
import NotificationsSettingsForm from './components/NotificationsSettingsForm';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import BackupIcon from '@mui/icons-material/Backup';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@example.com',
    position: 'Administrator RODO',
    phone: '+48 123 456 789',
    language: 'pl',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: true,
    incidentAlerts: true,
    requestAlerts: true,
    documentUpdates: false,
    weeklyReports: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveProfile = () => {
    // Placeholder dla zapisywania profilu
    console.log('Zapisywanie profilu:', profileData);
    // W przyszłości integracja z API
  };

  const handleSaveNotifications = () => {
    // Placeholder dla zapisywania ustawień powiadomień
    console.log('Zapisywanie ustawień powiadomień:', notificationSettings);
    // W przyszłości integracja z API
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <Card>
            <CardContent>
              <ProfileSettingsForm userData={profileData} />
            </CardContent>
          </Card>
        );
      
      case 'security':
        return (
          <Card>
            <CardContent>
              <SecuritySettingsForm securityData={{
                twoFactorEnabled: false,
                emailNotificationsEnabled: true,
                sessionTimeout: 30
              }} />
            </CardContent>
          </Card>
        );
      
      case 'notifications':
        return (
          <Card>
            <CardContent>
              <NotificationsSettingsForm notificationsData={notificationSettings} />
            </CardContent>
          </Card>
        );
      
      case 'language':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Język i region
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Język aplikacji
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Język"
                    value={profileData.language}
                    onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                    margin="normal"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="pl">Polski</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                  >
                    Zapisz ustawienia
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'backup':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Kopie zapasowe i eksport
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Eksport danych
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Eksportuj dane z aplikacji do plików CSV lub JSON.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                  >
                    Eksportuj do CSV
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                  >
                    Eksportuj do JSON
                  </Button>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
                Kopia zapasowa
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Utwórz kopię zapasową wszystkich danych i ustawień.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
              >
                Utwórz kopię zapasową
              </Button>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
                Przywracanie z kopii
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Przywróć dane z wcześniej utworzonej kopii zapasowej.
              </Typography>
              <Button 
                variant="outlined" 
                component="label"
              >
                Wybierz plik kopii zapasowej
                <input hidden accept=".backup" type="file" />
              </Button>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Ustawienia
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ height: '100%' }}>
            <List component="nav" aria-label="settings navigation">
              <ListItem 
                button 
                selected={activeSection === 'profile'} 
                onClick={() => setActiveSection('profile')}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'security'} 
                onClick={() => setActiveSection('security')}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Bezpieczeństwo" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'notifications'} 
                onClick={() => setActiveSection('notifications')}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Powiadomienia" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'language'} 
                onClick={() => setActiveSection('language')}
              >
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Język i region" />
              </ListItem>
              <ListItem 
                button 
                selected={activeSection === 'backup'} 
                onClick={() => setActiveSection('backup')}
              >
                <ListItemIcon>
                  <BackupIcon />
                </ListItemIcon>
                <ListItemText primary="Kopie zapasowe i eksport" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          {renderContent()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
