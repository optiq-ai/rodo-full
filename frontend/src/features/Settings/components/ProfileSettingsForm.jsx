// src/features/Settings/components/ProfileSettingsForm.jsx
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
  Avatar,
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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WorkIcon from '@mui/icons-material/Work';
import HelpIcon from '@mui/icons-material/Help';

const ProfileSettingsForm = ({ userData }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    position: userData?.position || '',
    department: userData?.department || '',
    avatar: userData?.avatar || null,
    avatarFile: null
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest wymagane';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format adresu email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Czyszczenie błędu po wprowadzeniu wartości
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target.result,
          avatarFile: file
        }));
      };
      
      reader.readAsDataURL(file);
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
      // const response = await api.users.updateProfile(formData);
      
      setSuccess(true);
      
      // Resetowanie stanu po 3 sekundach
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Błąd podczas aktualizacji profilu:', err);
      setError('Wystąpił błąd podczas aktualizacji profilu. Spróbuj ponownie.');
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
      label: 'Zdjęcie profilowe',
      description: 'Zaktualizuj swoje zdjęcie profilowe',
      icon: <PersonIcon />
    },
    {
      label: 'Dane osobowe',
      description: 'Podstawowe informacje o Tobie',
      icon: <ContactMailIcon />
    },
    {
      label: 'Informacje zawodowe',
      description: 'Twoje stanowisko i dział',
      icon: <WorkIcon />
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
          <PersonIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Dane profilu
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
            Profil został pomyślnie zaktualizowany.
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
          {/* Krok 1: Zdjęcie profilowe */}
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
                    <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Zdjęcie profilowe</Typography>
                  </Box>
                }
                subheader="Zaktualizuj swoje zdjęcie profilowe"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Box position="relative">
                      <Avatar
                        src={formData.avatar}
                        alt={`${formData.firstName} ${formData.lastName}`}
                        sx={{ 
                          width: 120, 
                          height: 120,
                          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: 'white',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                      >
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleAvatarChange}
                          disabled={loading}
                        />
                        <PhotoCameraIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" align="center">
                      Kliknij ikonę aparatu, aby zmienić zdjęcie profilowe. Zalecany rozmiar: 400x400 pikseli.
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Krok 2: Dane osobowe */}
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
                    <ContactMailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Dane osobowe</Typography>
                  </Box>
                }
                subheader="Podstawowe informacje o Tobie"
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
                      label="Imię"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      disabled={loading}
                      required
                      InputProps={{
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
                      label="Nazwisko"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      disabled={loading}
                      required
                      InputProps={{
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
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={loading}
                      required
                      InputProps={{
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
                    <TextField
                      fullWidth
                      label="Telefon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
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
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Krok 3: Informacje zawodowe */}
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
                    <WorkIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Informacje zawodowe</Typography>
                  </Box>
                }
                subheader="Twoje stanowisko i dział"
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
                      label="Stanowisko"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
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
                    <TextField
                      fullWidth
                      label="Dział"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
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

export default ProfileSettingsForm;
