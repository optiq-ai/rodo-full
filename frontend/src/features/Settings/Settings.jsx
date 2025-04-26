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
              <Typography variant="h6" gutterBottom>
                Profil użytkownika
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ width: 100, height: 100, mr: 2 }}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                  src="/static/images/avatar/1.jpg"
                />
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Zdjęcie profilowe
                  </Typography>
                  <IconButton color="primary" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCameraIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Imię"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nazwisko"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stanowisko"
                    name="position"
                    value={profileData.position}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSaveProfile}
                    sx={{ mt: 2 }}
                  >
                    Zapisz zmiany
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      
      case 'security':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bezpieczeństwo
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Zmiana hasła
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Aktualne hasło"
                    type="password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nowe hasło"
                    type="password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Powtórz nowe hasło"
                    type="password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                  >
                    Zmień hasło
                  </Button>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
                Uwierzytelnianie dwuskładnikowe
              </Typography>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Włącz uwierzytelnianie dwuskładnikowe"
              />
              <Typography variant="body2" color="textSecondary">
                Zwiększ bezpieczeństwo swojego konta, wymagając dodatkowego kodu podczas logowania.
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
                Sesje aktywne
              </Typography>
              <Typography variant="body2">
                Ostatnie logowanie: 26.04.2025, 12:30
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                sx={{ mt: 2 }}
              >
                Wyloguj ze wszystkich urządzeń
              </Button>
            </CardContent>
          </Card>
        );
      
      case 'notifications':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Powiadomienia
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Kanały powiadomień
              </Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onChange={handleNotificationChange} 
                    name="emailNotifications" 
                    color="primary" 
                  />
                }
                label="Powiadomienia email"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.browserNotifications} 
                    onChange={handleNotificationChange} 
                    name="browserNotifications" 
                    color="primary" 
                  />
                }
                label="Powiadomienia w przeglądarce"
              />
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Typy powiadomień
              </Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.incidentAlerts} 
                    onChange={handleNotificationChange} 
                    name="incidentAlerts" 
                    color="primary" 
                  />
                }
                label="Alerty o incydentach"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.requestAlerts} 
                    onChange={handleNotificationChange} 
                    name="requestAlerts" 
                    color="primary" 
                  />
                }
                label="Alerty o wnioskach podmiotów"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.documentUpdates} 
                    onChange={handleNotificationChange} 
                    name="documentUpdates" 
                    color="primary" 
                  />
                }
                label="Aktualizacje dokumentów"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.weeklyReports} 
                    onChange={handleNotificationChange} 
                    name="weeklyReports" 
                    color="primary" 
                  />
                }
                label="Tygodniowe raporty"
              />
              
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSaveNotifications}
                sx={{ mt: 3 }}
              >
                Zapisz ustawienia
              </Button>
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
