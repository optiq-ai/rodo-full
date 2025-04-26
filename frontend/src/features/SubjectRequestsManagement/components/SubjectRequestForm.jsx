// src/features/SubjectRequestsManagement/components/SubjectRequestForm.jsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
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
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HelpIcon from '@mui/icons-material/Help';
import ReplyIcon from '@mui/icons-material/Reply';

const SubjectRequestForm = ({ request, mode = 'create' }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({
    requestType: request?.requestType || '',
    status: request?.status || 'new',
    firstName: request?.firstName || '',
    lastName: request?.lastName || '',
    email: request?.email || '',
    phone: request?.phone || '',
    address: request?.address || '',
    identificationMethod: request?.identificationMethod || '',
    identificationDetails: request?.identificationDetails || '',
    requestDetails: request?.requestDetails || '',
    requestDate: request?.requestDate ? new Date(request.requestDate) : new Date(),
    deadlineDate: request?.deadlineDate ? new Date(request.deadlineDate) : new Date(new Date().setDate(new Date().getDate() + 30)),
    assignedTo: request?.assignedTo || '',
    responseDetails: request?.responseDetails || '',
    responseDate: request?.responseDate ? new Date(request.responseDate) : null,
    identityVerified: request?.identityVerified || false,
    requestExtended: request?.requestExtended || false,
    extensionReason: request?.extensionReason || '',
    attachments: []
  });
  
  const [errors, setErrors] = useState({
    requestType: '',
    firstName: '',
    lastName: '',
    email: '',
    identificationMethod: '',
    requestDetails: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      requestType: '',
      firstName: '',
      lastName: '',
      email: '',
      identificationMethod: '',
      requestDetails: ''
    };

    if (!formData.requestType) {
      newErrors.requestType = 'Typ wniosku jest wymagany';
      isValid = false;
    }

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

    if (!formData.identificationMethod) {
      newErrors.identificationMethod = 'Metoda identyfikacji jest wymagana';
      isValid = false;
    }

    if (!formData.requestDetails.trim()) {
      newErrors.requestDetails = 'Szczegóły wniosku są wymagane';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Czyszczenie błędu po wprowadzeniu wartości
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
    
    // Czyszczenie błędu po wprowadzeniu wartości
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...filesArray]
      }));
    }
  };

  const handleRemoveAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Funkcje nawigacji po krokach
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
      // const response = await api.subjectRequests.create(formData);
      // lub
      // const response = await api.subjectRequests.update(request.id, formData);
      
      setSuccess(true);
      
      // Przekierowanie po udanym zapisie (po 2 sekundach)
      setTimeout(() => {
        navigate('/subject-requests');
      }, 2000);
      
    } catch (err) {
      console.error('Błąd podczas zapisywania wniosku:', err);
      setError('Wystąpił błąd podczas zapisywania wniosku. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/subject-requests');
  };

  // Obliczanie daty terminu na podstawie daty wniosku i typu wniosku
  const calculateDeadlineDate = (requestDate, requestType, extended = false) => {
    const date = new Date(requestDate);
    
    // Standardowy termin to 30 dni
    let daysToAdd = 30;
    
    // Dla wniosków o usunięcie i sprzeciwu - 21 dni
    if (requestType === 'erasure' || requestType === 'objection') {
      daysToAdd = 21;
    }
    
    // Jeśli wniosek został przedłużony, dodajemy dodatkowe 60 dni
    if (extended) {
      daysToAdd += 60;
    }
    
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  // Aktualizacja terminu przy zmianie typu wniosku lub daty wniosku
  React.useEffect(() => {
    if (formData.requestDate && formData.requestType) {
      const newDeadline = calculateDeadlineDate(
        formData.requestDate,
        formData.requestType,
        formData.requestExtended
      );
      
      setFormData(prev => ({
        ...prev,
        deadlineDate: newDeadline
      }));
    }
  }, [formData.requestDate, formData.requestType, formData.requestExtended]);

  // Definicja kroków formularza
  const steps = [
    {
      label: 'Informacje o wniosku',
      description: 'Wprowadź podstawowe informacje o wniosku',
      icon: <AssignmentIcon />
    },
    {
      label: 'Dane wnioskodawcy',
      description: 'Wprowadź dane osoby składającej wniosek',
      icon: <PersonIcon />
    },
    {
      label: 'Weryfikacja tożsamości',
      description: 'Określ metodę weryfikacji tożsamości',
      icon: <VerifiedUserIcon />
    },
    {
      label: 'Szczegóły wniosku',
      description: 'Wprowadź szczegóły wniosku i załączniki',
      icon: <DescriptionIcon />
    },
    {
      label: 'Odpowiedź na wniosek',
      description: 'Wprowadź informacje o odpowiedzi na wniosek',
      icon: <ReplyIcon />
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
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
            <AssignmentIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {mode === 'create' ? 'Nowy wniosek podmiotu danych' : 'Edycja wniosku podmiotu danych'}
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
              Wniosek został pomyślnie {mode === 'create' ? 'utworzony' : 'zaktualizowany'}.
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
            {/* Krok 1: Informacje o wniosku */}
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
                      <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Informacje o wniosku</Typography>
                    </Box>
                  }
                  subheader="Wprowadź podstawowe informacje o wniosku"
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
                        error={!!errors.requestType} 
                        required
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
                        <InputLabel>Typ wniosku</InputLabel>
                        <Select
                          name="requestType"
                          value={formData.requestType}
                          onChange={handleChange}
                          label="Typ wniosku"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Wybierz typ wniosku</em>
                          </MenuItem>
                          <MenuItem value="access">Dostęp do danych (Art. 15 RODO)</MenuItem>
                          <MenuItem value="rectification">Sprostowanie danych (Art. 16 RODO)</MenuItem>
                          <MenuItem value="erasure">Usunięcie danych (Art. 17 RODO)</MenuItem>
                          <MenuItem value="restriction">Ograniczenie przetwarzania (Art. 18 RODO)</MenuItem>
                          <MenuItem value="portability">Przenoszenie danych (Art. 20 RODO)</MenuItem>
                          <MenuItem value="objection">Sprzeciw (Art. 21 RODO)</MenuItem>
                          <MenuItem value="withdrawal">Wycofanie zgody (Art. 7 RODO)</MenuItem>
                          <MenuItem value="other">Inny</MenuItem>
                        </Select>
                        {errors.requestType && <FormHelperText>{errors.requestType}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    
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
                        <InputLabel>Status</InputLabel>
                        <Select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          label="Status"
                          disabled={loading}
                        >
                          <MenuItem value="new">Nowy</MenuItem>
                          <MenuItem value="verification">Weryfikacja tożsamości</MenuItem>
                          <MenuItem value="in_progress">W trakcie realizacji</MenuItem>
                          <MenuItem value="waiting_for_info">Oczekiwanie na informacje</MenuItem>
                          <MenuItem value="completed">Zrealizowany</MenuItem>
                          <MenuItem value="rejected">Odrzucony</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Data wniosku"
                        value={formData.requestDate}
                        onChange={(date) => handleDateChange('requestDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            disabled: loading,
                            sx: { 
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                '&:hover': {
                                  boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                                },
                                '&.Mui-focused': {
                                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                                }
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Termin realizacji"
                        value={formData.deadlineDate}
                        onChange={(date) => handleDateChange('deadlineDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            disabled: loading,
                            sx: { 
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                '&:hover': {
                                  boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                                },
                                '&.Mui-focused': {
                                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                                }
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="requestExtended"
                            checked={formData.requestExtended}
                            onChange={handleChange}
                            disabled={loading}
                            sx={{
                              color: theme.palette.primary.main,
                              '&.Mui-checked': {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        }
                        label="Przedłużenie terminu realizacji wniosku"
                      />
                    </Grid>
                    
                    {formData.requestExtended && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Powód przedłużenia terminu"
                          name="extensionReason"
                          value={formData.extensionReason}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          disabled={loading}
                          required={formData.requestExtended}
                          placeholder="Podaj powód przedłużenia terminu realizacji wniosku"
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
                    )}
                    
                    <Grid item xs={12}>
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
                        <InputLabel>Przypisany do</InputLabel>
                        <Select
                          name="assignedTo"
                          value={formData.assignedTo}
                          onChange={handleChange}
                          label="Przypisany do"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Nie przypisano</em>
                          </MenuItem>
                          <MenuItem value="user1">Jan Kowalski</MenuItem>
                          <MenuItem value="user2">Anna Nowak</MenuItem>
                          <MenuItem value="user3">Piotr Wiśniewski</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
            
            {/* Krok 2: Dane wnioskodawcy */}
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
                      <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Dane wnioskodawcy</Typography>
                    </Box>
                  }
                  subheader="Wprowadź dane osoby składającej wniosek"
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
                    
                    <Grid item xs={12} sm={6}>
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
                    
                    <Grid item xs={12} sm={6}>
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
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Adres"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        rows={2}
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
            
            {/* Krok 3: Weryfikacja tożsamości */}
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
                      <VerifiedUserIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Weryfikacja tożsamości</Typography>
                    </Box>
                  }
                  subheader="Określ metodę weryfikacji tożsamości wnioskodawcy"
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
                        error={!!errors.identificationMethod} 
                        required
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
                        <InputLabel>Metoda identyfikacji</InputLabel>
                        <Select
                          name="identificationMethod"
                          value={formData.identificationMethod}
                          onChange={handleChange}
                          label="Metoda identyfikacji"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Wybierz metodę identyfikacji</em>
                          </MenuItem>
                          <MenuItem value="id_card">Dowód osobisty</MenuItem>
                          <MenuItem value="passport">Paszport</MenuItem>
                          <MenuItem value="email_verification">Weryfikacja email</MenuItem>
                          <MenuItem value="account_login">Logowanie do konta</MenuItem>
                          <MenuItem value="other">Inna</MenuItem>
                        </Select>
                        {errors.identificationMethod && <FormHelperText>{errors.identificationMethod}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Szczegóły identyfikacji"
                        name="identificationDetails"
                        value={formData.identificationDetails}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Np. numer dokumentu, adres email"
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="identityVerified"
                            checked={formData.identityVerified}
                            onChange={handleChange}
                            disabled={loading}
                            sx={{
                              color: theme.palette.primary.main,
                              '&.Mui-checked': {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        }
                        label="Tożsamość zweryfikowana"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box 
                        sx={{ 
                          p: 3, 
                          border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          textAlign: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            borderColor: alpha(theme.palette.primary.main, 0.5)
                          }
                        }}
                      >
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id="identity-file-upload"
                          disabled={loading}
                        />
                        <label htmlFor="identity-file-upload">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AttachFileIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              Przeciągnij i upuść pliki lub kliknij, aby dodać dokumenty tożsamości
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Możesz dodać skany dokumentów tożsamości (np. dowód osobisty, paszport)
                            </Typography>
                          </Box>
                        </label>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
            
            {/* Krok 4: Szczegóły wniosku */}
            {activeStep === 3 && (
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
                      <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Szczegóły wniosku</Typography>
                    </Box>
                  }
                  subheader="Wprowadź szczegóły wniosku i załączniki"
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
                        multiline
                        rows={6}
                        label="Szczegóły wniosku"
                        name="requestDetails"
                        value={formData.requestDetails}
                        onChange={handleChange}
                        error={!!errors.requestDetails}
                        helperText={errors.requestDetails || "Opisz dokładnie czego dotyczy wniosek, jakie dane są objęte wnioskiem itp."}
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
                      <Box 
                        sx={{ 
                          p: 3, 
                          border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          textAlign: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            borderColor: alpha(theme.palette.primary.main, 0.5)
                          }
                        }}
                      >
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id="request-file-upload"
                          disabled={loading}
                        />
                        <label htmlFor="request-file-upload">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AttachFileIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              Przeciągnij i upuść pliki lub kliknij, aby dodać załączniki
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Możesz dodać dokumenty związane z wnioskiem
                            </Typography>
                          </Box>
                        </label>
                      </Box>
                    </Grid>
                    
                    {formData.attachments.length > 0 && (
                      <Grid item xs={12}>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Wybrane pliki:
                          </Typography>
                          <ul>
                            {formData.attachments.map((file, index) => (
                              <li key={index} style={{ marginBottom: '8px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Typography variant="body2">{file.name}</Typography>
                                  <Button 
                                    size="small" 
                                    color="error" 
                                    onClick={() => handleRemoveAttachment(index)}
                                    disabled={loading}
                                  >
                                    Usuń
                                  </Button>
                                </Box>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            )}
            
            {/* Krok 5: Odpowiedź na wniosek */}
            {activeStep === 4 && (
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
                      <ReplyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Odpowiedź na wniosek</Typography>
                    </Box>
                  }
                  subheader="Wprowadź informacje o odpowiedzi na wniosek"
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
                        multiline
                        rows={6}
                        label="Szczegóły odpowiedzi"
                        name="responseDetails"
                        value={formData.responseDetails}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Opisz w jaki sposób wniosek został zrealizowany, jakie działania zostały podjęte itp."
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
                      <DatePicker
                        label="Data odpowiedzi"
                        value={formData.responseDate}
                        onChange={(date) => handleDateChange('responseDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            disabled: loading,
                            sx: { 
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                '&:hover': {
                                  boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                                },
                                '&.Mui-focused': {
                                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
                                }
                              }
                            }
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box 
                        sx={{ 
                          p: 3, 
                          border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          textAlign: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            borderColor: alpha(theme.palette.primary.main, 0.5)
                          }
                        }}
                      >
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id="response-file-upload"
                          disabled={loading}
                        />
                        <label htmlFor="response-file-upload">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AttachFileIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              Przeciągnij i upuść pliki lub kliknij, aby dodać załączniki odpowiedzi
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Możesz dodać dokumenty związane z odpowiedzią na wniosek
                            </Typography>
                          </Box>
                        </label>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 3 }}>
            <Box>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
                sx={{ 
                  mr: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                Anuluj
              </Button>
              
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
            
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              disabled={loading}
              endIcon={loading && <CircularProgress size={20} color="inherit" />}
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
              {activeStep === steps.length - 1 
                ? (loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz wniosek' : 'Zapisz zmiany')
                : 'Dalej'
              }
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default SubjectRequestForm;
