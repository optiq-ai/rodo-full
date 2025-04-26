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
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpIcon from '@mui/icons-material/Help';

const NotificationsSettingsForm = ({ notificationsData }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
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

  // Funkcje nawigacji po krokach
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Definicja kroków formularza
  const steps = [
    {
      label: 'Kanały powiadomień',
      description: 'Wybierz kanały otrzymywania powiadomień',
      icon: <EmailIcon />
    },
    {
      label: 'Typy powiadomień',
      description: 'Wybierz typy powiadomień, które chcesz otrzymywać',
      icon: <CategoryIcon />
    },
    {
      label: 'Częstotliwość',
      description: 'Ustaw częstotliwość otrzymywania powiadomień',
      icon: <AccessTimeIcon />
    }
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 0, 
        overflow: 'hidden',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.paper, 1)} 120px)`,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ 
        p: 3, 
        pb: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Ustawienia powiadomień
          </Typography>
        </Box>
        <Tooltip title="Pomoc">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Box sx={{ px: 3, py: 2 }}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
              border: 'none'
            }}
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
              border: 'none'
            }}
          >
            Ustawienia powiadomień zostały pomyślnie zaktualizowane.
          </Alert>
        )}
      </Box>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ px: 3 }}>
          <Stepper 
            activeStep={activeStep} 
            orientation="horizontal" 
            alternativeLabel
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                mt: 1
              },
              '& .MuiStepLabel-iconContainer': {
                '& .MuiStepIcon-root': {
                  color: alpha(theme.palette.primary.main, 0.4),
                  '&.Mui-active': {
                    color: theme.palette.primary.main,
                    boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: '50%'
                  },
                  '&.Mui-completed': {
                    color: theme.palette.success.main
                  }
                }
              }
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel 
                  StepIconComponent={() => (
                    <Box 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: activeStep === index 
                          ? theme.palette.primary.main 
                          : activeStep > index 
                            ? theme.palette.success.main 
                            : alpha(theme.palette.primary.main, 0.2),
                        color: activeStep >= index ? 'white' : theme.palette.text.secondary
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        
        <Box sx={{ px: 3, pb: 3 }}>
          {/* Krok 1: Kanały powiadomień */}
          {activeStep === 0 && (
            <Card 
              elevation={0} 
              sx={{ 
                mb: 3, 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow: 'hidden'
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Kanały powiadomień</Typography>
                  </Box>
                }
                subheader="Wybierz kanały otrzymywania powiadomień"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2, 
                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                      }}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              name="emailNotifications"
                              checked={formData.emailNotifications}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Powiadomienia email
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Otrzymuj powiadomienia na swój adres email
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              name="appNotifications"
                              checked={formData.appNotifications}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Powiadomienia w aplikacji
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Otrzymuj powiadomienia bezpośrednio w aplikacji
                              </Typography>
                            </Box>
                          }
                        />
                      </FormGroup>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Krok 2: Typy powiadomień */}
          {activeStep === 1 && (
            <Card 
              elevation={0} 
              sx={{ 
                mb: 3, 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow: 'hidden'
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Typy powiadomień</Typography>
                  </Box>
                }
                subheader="Wybierz typy powiadomień, które chcesz otrzymywać"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2, 
                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                      }}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              name="incidentNotifications"
                              checked={formData.incidentNotifications}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Incydenty
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Powiadomienia o nowych i zaktualizowanych incydentach
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              name="documentNotifications"
                              checked={formData.documentNotifications}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Dokumenty
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Powiadomienia o nowych i zaktualizowanych dokumentach
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              name="requestNotifications"
                              checked={formData.requestNotifications}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Wnioski podmiotów danych
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Powiadomienia o nowych i zaktualizowanych wnioskach
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              name="reportNotifications"
                              checked={formData.reportNotifications}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Raporty
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Powiadomienia o nowych raportach i analizach
                              </Typography>
                            </Box>
                          }
                        />
                      </FormGroup>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Krok 3: Częstotliwość powiadomień */}
          {activeStep === 2 && (
            <Card 
              elevation={0} 
              sx={{ 
                mb: 3, 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow: 'hidden'
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Częstotliwość powiadomień</Typography>
                  </Box>
                }
                subheader="Ustaw częstotliwość otrzymywania powiadomień"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl 
                      fullWidth
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '&:hover': {
                            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                          }
                        }
                      }}
                    >
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
                    <Box 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2, 
                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Raporty zbiorcze
                        </Typography>
                      </Box>
                      
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              name="dailyDigest"
                              checked={formData.dailyDigest}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Dzienny raport zbiorczy
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Otrzymuj codziennie podsumowanie wszystkich powiadomień
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <FormControlLabel
                          control={
                            <Switch
                              name="weeklyDigest"
                              checked={formData.weeklyDigest}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  },
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Tygodniowy raport zbiorczy
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Otrzymuj co tydzień podsumowanie wszystkich powiadomień
                              </Typography>
                            </Box>
                          }
                        />
                      </FormGroup>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 3 }}>
          <Box>
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                disabled={loading}
                sx={{ 
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                Wstecz
              </Button>
            )}
          </Box>
          
          <Box>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                sx={{ 
                  px: 4,
                  py: 1,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`
                  }
                }}
              >
                Dalej
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{ 
                  px: 4,
                  py: 1,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`
                  }
                }}
              >
                {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default NotificationsSettingsForm;
