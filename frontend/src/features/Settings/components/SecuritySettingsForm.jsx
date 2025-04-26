// src/features/Settings/components/SecuritySettingsForm.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';

const SecuritySettingsForm = ({ securityData }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: securityData?.twoFactorEnabled || false,
    emailNotificationsEnabled: securityData?.emailNotificationsEnabled || true,
    sessionTimeout: securityData?.sessionTimeout || 30
  });
  
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    sessionTimeout: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      sessionTimeout: ''
    };

    // Walidacja tylko jeśli użytkownik próbuje zmienić hasło
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Aktualne hasło jest wymagane';
        isValid = false;
      }

      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Hasło musi mieć co najmniej 8 znaków';
        isValid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
        newErrors.newPassword = 'Hasło musi zawierać małe i wielkie litery oraz cyfry';
        isValid = false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Hasła nie są identyczne';
        isValid = false;
      }
    }

    if (formData.sessionTimeout < 1 || formData.sessionTimeout > 120) {
      newErrors.sessionTimeout = 'Czas sesji musi być między 1 a 120 minut';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
    
    // Czyszczenie błędu po wprowadzeniu wartości
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTogglePasswordVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Resetowanie stanów
    setError('');
    setSuccess(false);
    
    // Walidacja formularza
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Symulacja wysyłania danych do API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder dla integracji z API
      console.log('Wysyłanie danych do API:', formData);
      
      // API call placeholder
      // const response = await api.users.updateSecurity(formData);
      
      setSuccess(true);
      
      // Resetowanie pól hasła
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Resetowanie stanu po 3 sekundach
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Błąd podczas aktualizacji ustawień bezpieczeństwa:', err);
      setError('Wystąpił błąd podczas aktualizacji ustawień bezpieczeństwa. Spróbuj ponownie.');
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
      label: 'Zmiana hasła',
      description: 'Zaktualizuj swoje hasło',
      icon: <LockIcon />
    },
    {
      label: 'Uwierzytelnianie',
      description: 'Ustawienia uwierzytelniania dwuskładnikowego',
      icon: <SecurityIcon />
    },
    {
      label: 'Sesja i powiadomienia',
      description: 'Ustawienia sesji i powiadomień bezpieczeństwa',
      icon: <NotificationsIcon />
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
          <SecurityIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Ustawienia bezpieczeństwa
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
            Ustawienia bezpieczeństwa zostały pomyślnie zaktualizowane.
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
          {/* Krok 1: Zmiana hasła */}
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
                    <LockIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Zmiana hasła</Typography>
                  </Box>
                }
                subheader="Zaktualizuj swoje hasło"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Aktualne hasło"
                      name="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      error={!!errors.currentPassword}
                      helperText={errors.currentPassword}
                      disabled={loading}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleTogglePasswordVisibility('current')}
                              edge="end"
                            >
                              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { 
                          backgroundColor: 'white',
                          '&:hover': {
                            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                          }
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nowe hasło"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleChange}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword}
                      disabled={loading}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleTogglePasswordVisibility('new')}
                              edge="end"
                            >
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { 
                          backgroundColor: 'white',
                          '&:hover': {
                            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                          }
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Potwierdź nowe hasło"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      disabled={loading}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleTogglePasswordVisibility('confirm')}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { 
                          backgroundColor: 'white',
                          '&:hover': {
                            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                          }
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Hasło musi zawierać co najmniej 8 znaków, w tym małe i wielkie litery oraz cyfry.
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Krok 2: Uwierzytelnianie dwuskładnikowe */}
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
                    <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Uwierzytelnianie dwuskładnikowe</Typography>
                  </Box>
                }
                subheader="Zwiększ bezpieczeństwo swojego konta"
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
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SecurityIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Uwierzytelnianie dwuskładnikowe
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" paragraph>
                        Uwierzytelnianie dwuskładnikowe zwiększa bezpieczeństwo konta, wymagając dodatkowego kodu podczas logowania.
                      </Typography>
                      
                      <FormControlLabel
                        control={
                          <Switch
                            name="twoFactorEnabled"
                            checked={formData.twoFactorEnabled}
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
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Włącz uwierzytelnianie dwuskładnikowe
                          </Typography>
                        }
                      />
                    </Box>
                  </Grid>
                  
                  {formData.twoFactorEnabled && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Po włączeniu uwierzytelniania dwuskładnikowego, przy następnym logowaniu zostaniesz poproszony o skonfigurowanie aplikacji uwierzytelniającej.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Krok 3: Sesja i powiadomienia */}
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
                    <Typography variant="h6">Sesja i powiadomienia</Typography>
                  </Box>
                }
                subheader="Ustawienia sesji i powiadomień bezpieczeństwa"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Czas wygaśnięcia sesji (minuty)"
                      name="sessionTimeout"
                      type="number"
                      value={formData.sessionTimeout}
                      onChange={handleChange}
                      error={!!errors.sessionTimeout}
                      helperText={errors.sessionTimeout || "Wartość między 1 a 120 minut"}
                      disabled={loading}
                      InputProps={{
                        inputProps: { min: 1, max: 120 },
                        sx: { 
                          backgroundColor: 'white',
                          '&:hover': {
                            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                          }
                        }
                      }}
                    />
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
                        <NotificationsIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Powiadomienia bezpieczeństwa
                        </Typography>
                      </Box>
                      
                      <FormControlLabel
                        control={
                          <Switch
                            name="emailNotificationsEnabled"
                            checked={formData.emailNotificationsEnabled}
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
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Powiadomienia email o nowych logowaniach
                          </Typography>
                        }
                      />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Otrzymuj powiadomienia email, gdy ktoś zaloguje się na Twoje konto z nowego urządzenia lub lokalizacji.
                      </Typography>
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

export default SecuritySettingsForm;
