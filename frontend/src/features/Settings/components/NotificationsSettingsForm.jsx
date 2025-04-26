// src/features/Settings/components/NotificationsSettingsForm.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const NotificationsSettingsForm = ({ notificationsData }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    emailNotifications: notificationsData?.emailNotifications || true,
    appNotifications: notificationsData?.appNotifications || true,
    incidentNotifications: notificationsData?.incidentNotifications || true,
    documentNotifications: notificationsData?.documentNotifications || true,
    requestNotifications: notificationsData?.requestNotifications || true,
    reportNotifications: notificationsData?.reportNotifications || false,
    dailyDigest: notificationsData?.dailyDigest || false,
    weeklyDigest: notificationsData?.weeklyDigest || true,
    notificationFrequency: notificationsData?.notificationFrequency || 'immediate'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Resetowanie stanów
    setError('');
    setSuccess(false);
    
    setLoading(true);
    
    try {
      // Symulacja wysyłania danych do API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder dla integracji z API
      console.log('Wysyłanie danych do API:', formData);
      
      // API call placeholder
      // const response = await api.users.updateNotificationSettings(formData);
      
      setSuccess(true);
      
      // Resetowanie stanu po 3 sekundach
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Błąd podczas aktualizacji ustawień powiadomień:', err);
      setError('Wystąpił błąd podczas aktualizacji ustawień powiadomień. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ustawienia powiadomień
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Ustawienia powiadomień zostały pomyślnie zaktualizowane.
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Kanały powiadomień
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Powiadomienia email"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="appNotifications"
                    checked={formData.appNotifications}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Powiadomienia w aplikacji"
              />
            </FormGroup>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Typy powiadomień
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="incidentNotifications"
                    checked={formData.incidentNotifications}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Incydenty"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="documentNotifications"
                    checked={formData.documentNotifications}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Dokumenty"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="requestNotifications"
                    checked={formData.requestNotifications}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Wnioski podmiotów danych"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="reportNotifications"
                    checked={formData.reportNotifications}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Raporty"
              />
            </FormGroup>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Częstotliwość powiadomień
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Częstotliwość powiadomień</InputLabel>
              <Select
                name="notificationFrequency"
                value={formData.notificationFrequency}
                onChange={handleChange}
                label="Częstotliwość powiadomień"
                disabled={loading}
              >
                <MenuItem value="immediate">Natychmiast</MenuItem>
                <MenuItem value="hourly">Co godzinę</MenuItem>
                <MenuItem value="daily">Raz dziennie</MenuItem>
                <MenuItem value="weekly">Raz w tygodniu</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="dailyDigest"
                    checked={formData.dailyDigest}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Dzienny raport zbiorczy"
              />
              <FormControlLabel
                control={
                  <Switch
                    name="weeklyDigest"
                    checked={formData.weeklyDigest}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Tygodniowy raport zbiorczy"
              />
            </FormGroup>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default NotificationsSettingsForm;
