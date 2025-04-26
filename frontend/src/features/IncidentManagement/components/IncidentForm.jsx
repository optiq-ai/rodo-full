// src/features/IncidentManagement/components/IncidentForm.jsx
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
  Radio,
  RadioGroup,
  FormLabel,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import HelpIcon from '@mui/icons-material/Help';

const IncidentForm = ({ incident, mode = 'create' }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({
    title: incident?.title || '',
    description: incident?.description || '',
    incidentType: incident?.incidentType || '',
    severity: incident?.severity || 'medium',
    status: incident?.status || 'new',
    incidentDate: incident?.incidentDate ? new Date(incident.incidentDate) : new Date(),
    detectionDate: incident?.detectionDate ? new Date(incident.detectionDate) : new Date(),
    affectedPersons: incident?.affectedPersons || '',
    affectedData: incident?.affectedData || '',
    dataBreachOccurred: incident?.dataBreachOccurred || false,
    reportedToPuodo: incident?.reportedToPuodo || false,
    reportedToDataSubjects: incident?.reportedToDataSubjects || false,
    correctiveActions: incident?.correctiveActions || '',
    preventiveMeasures: incident?.preventiveMeasures || '',
    assignedTo: incident?.assignedTo || '',
    attachments: []
  });
  
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    incidentType: '',
    incidentDate: '',
    detectionDate: '',
    affectedPersons: '',
    affectedData: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      incidentType: '',
      incidentDate: '',
      detectionDate: '',
      affectedPersons: '',
      affectedData: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Opis jest wymagany';
      isValid = false;
    }

    if (!formData.incidentType) {
      newErrors.incidentType = 'Typ incydentu jest wymagany';
      isValid = false;
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Data incydentu jest wymagana';
      isValid = false;
    }

    if (!formData.detectionDate) {
      newErrors.detectionDate = 'Data wykrycia jest wymagana';
      isValid = false;
    }

    if (formData.dataBreachOccurred) {
      if (!formData.affectedPersons.trim()) {
        newErrors.affectedPersons = 'Informacja o osobach, których dane dotyczą jest wymagana';
        isValid = false;
      }

      if (!formData.affectedData.trim()) {
        newErrors.affectedData = 'Informacja o naruszonych danych jest wymagana';
        isValid = false;
      }
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
      // const response = await api.incidents.create(formData);
      // lub
      // const response = await api.incidents.update(incident.id, formData);
      
      setSuccess(true);
      
      // Przekierowanie po udanym zapisie (po 2 sekundach)
      setTimeout(() => {
        navigate('/incidents');
      }, 2000);
      
    } catch (err) {
      console.error('Błąd podczas zapisywania incydentu:', err);
      setError('Wystąpił błąd podczas zapisywania incydentu. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/incidents');
  };
  
  // Definicja kroków formularza
  const steps = [
    {
      label: 'Podstawowe informacje',
      description: 'Wprowadź podstawowe informacje o incydencie',
      icon: <ErrorOutlineIcon />
    },
    {
      label: 'Szczegóły czasowe',
      description: 'Określ daty i czas incydentu',
      icon: <EventIcon />
    },
    {
      label: 'Opis incydentu',
      description: 'Wprowadź szczegółowy opis incydentu',
      icon: <DescriptionIcon />
    },
    {
      label: 'Naruszenie danych osobowych',
      description: 'Określ czy incydent stanowi naruszenie ochrony danych osobowych',
      icon: <SecurityIcon />
    },
    {
      label: 'Działania naprawcze',
      description: 'Opisz podjęte działania naprawcze i zapobiegawcze',
      icon: <BuildIcon   return (
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
            <ErrorOutlineIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {mode === 'create' ? 'Nowy incydent' : 'Edycja incydentu'}
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
              Incydent został pomyślnie {mode === 'create' ? 'utworzony' : 'zaktualizowany'}.
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
                      <ErrorOutlineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Podstawowe informacje</Typography>
                    </Box>
                  }
                  subheader="Wprowadź podstawowe informacje o incydencie"
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
                        label="Tytuł incydentu"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
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
                      <FormControl 
                        fullWidth 
                        error={!!errors.incidentType} 
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
                        <InputLabel>Typ incydentu</InputLabel>
                        <Select
                          name="incidentType"
                          value={formData.incidentType}
                          onChange={handleChange}
                          label="Typ incydentu"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Wybierz typ incydentu</em>
                          </MenuItem>
                          <MenuItem value="data_breach">Naruszenie ochrony danych osobowych</MenuItem>
                          <MenuItem value="unauthorized_access">Nieuprawniony dostęp</MenuItem>
                          <MenuItem value="data_loss">Utrata danych</MenuItem>
                          <MenuItem value="system_failure">Awaria systemu</MenuItem>
                          <MenuItem value="malware">Złośliwe oprogramowanie</MenuItem>
                          <MenuItem value="phishing">Phishing</MenuItem>
                          <MenuItem value="other">Inny</MenuItem>
                        </Select>
                        {errors.incidentType && <FormHelperText>{errors.incidentType}</FormHelperText>}
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
                        <InputLabel>Poziom ważności</InputLabel>
                        <Select
                          name="severity"
                          value={formData.severity}
                          onChange={handleChange}
                          label="Poziom ważności"
                          disabled={loading}
                        >
                          <MenuItem value="low">Niski</MenuItem>
                          <MenuItem value="medium">Średni</MenuItem>
                          <MenuItem value="high">Wysoki</MenuItem>
                          <MenuItem value="critical">Krytyczny</MenuItem>
                        </Select>
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
                          <MenuItem value="in_progress">W trakcie</MenuItem>
                          <MenuItem value="resolved">Rozwiązany</MenuItem>
                          <MenuItem value="closed">Zamknięty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Przypisany do"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Imię i nazwisko osoby odpowiedzialnej"
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
                      <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Szczegóły czasowe</Typography>
                    </Box>
                  }
                  subheader="Określ daty i czas incydentu"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <DateTimePicker
                        label="Data incydentu"
                        value={formData.incidentDate}
                        onChange={(date) => handleDateChange('incidentDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.incidentDate,
                            helperText: errors.incidentDate,
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
                      <DateTimePicker
                        label="Data wykrycia"
                        value={formData.detectionDate}
                        onChange={(date) => handleDateChange('detectionDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.detectionDate,
                            helperText: errors.detectionDate,
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
                  </Grid>
                </CardContent>
              </Card>
            )}
            
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
                      <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Opis incydentu</Typography>
                    </Box>
                  }
                  subheader="Wprowadź szczegółowy opis incydentu"
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
                        label="Opis incydentu"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        error={!!errors.description}
                        helperText={errors.description}
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
                  </Grid>
                </CardContent>
              </Card>
            )}
            
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
                      <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Naruszenie ochrony danych osobowych</Typography>
                    </Box>
                  }
                  subheader="Określ czy incydent stanowi naruszenie ochrony danych osobowych"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="dataBreachOccurred"
                            checked={formData.dataBreachOccurred}
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
                        label={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Incydent stanowi naruszenie ochrony danych osobowych
                          </Typography>
                        }
                      />
                    </Grid>
                    
                    {formData.dataBreachOccurred && (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Osoby, których dane dotyczą"
                            name="affectedPersons"
                            value={formData.affectedPersons}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            error={!!errors.affectedPersons}
                            helperText={errors.affectedPersons || "Opisz kategorie i przybliżoną liczbę osób, których dane dotyczą"}
                            disabled={loading}
                            required={formData.dataBreachOccurred}
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
                            label="Naruszone dane"
                            name="affectedData"
                            value={formData.affectedData}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            error={!!errors.affectedData}
                            helperText={errors.affectedData || "Opisz kategorie i przybliżoną liczbę wpisów danych osobowych, których dotyczy naruszenie"}
                            disabled={loading}
                            required={formData.dataBreachOccurred}
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
                          <FormControl 
                            component="fieldset"
                            sx={{
                              p: 2,
                              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                              borderRadius: 1,
                              backgroundColor: 'white'
                            }}
                          >
                            <FormLabel 
                              component="legend"
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 500
                              }}
                            >
                              Zgłoszenie do PUODO
                            </FormLabel>
                            <RadioGroup
                              name="reportedToPuodo"
                              value={formData.reportedToPuodo.toString()}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                reportedToPuodo: e.target.value === 'true'
                              }))}
                              row
                            >
                              <FormControlLabel 
                                value="true" 
                                control={
                                  <Radio 
                                    disabled={loading} 
                                    sx={{
                                      color: theme.palette.primary.main,
                                      '&.Mui-checked': {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                } 
                                label="Tak" 
                              />
                              <FormControlLabel 
                                value="false" 
                                control={
                                  <Radio 
                                    disabled={loading}
                                    sx={{
                                      color: theme.palette.primary.main,
                                      '&.Mui-checked': {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                } 
                                label="Nie" 
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <FormControl 
                            component="fieldset"
                            sx={{
                              p: 2,
                              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                              borderRadius: 1,
                              backgroundColor: 'white'
                            }}
                          >
                            <FormLabel 
                              component="legend"
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 500
                              }}
                            >
                              Zgłoszenie do osób, których dane dotyczą
                            </FormLabel>
                            <RadioGroup
                              name="reportedToDataSubjects"
                              value={formData.reportedToDataSubjects.toString()}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                reportedToDataSubjects: e.target.value === 'true'
                              }))}
                              row
                            >
                              <FormControlLabel 
                                value="true" 
                                control={
                                  <Radio 
                                    disabled={loading}
                                    sx={{
                                      color: theme.palette.primary.main,
                                      '&.Mui-checked': {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                } 
                                label="Tak" 
                              />
                              <FormControlLabel 
                                value="false" 
                                control={
                                  <Radio 
                                    disabled={loading}
                                    sx={{
                                      color: theme.palette.primary.main,
                                      '&.Mui-checked': {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                } 
                                label="Nie" 
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            )}
            
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
                      <BuildIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Działania naprawcze i zapobiegawcze</Typography>
                    </Box>
                  }
                  subheader="Opisz podjęte działania naprawcze i zapobiegawcze"
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
                        label="Podjęte działania naprawcze"
                        name="correctiveActions"
                        value={formData.correctiveActions}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        disabled={loading}
                        placeholder="Opisz działania podjęte w celu usunięcia skutków incydentu"
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
                        label="Działania zapobiegawcze"
                        name="preventiveMeasures"
                        value={formData.preventiveMeasures}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        disabled={loading}
                        placeholder="Opisz działania podjęte w celu zapobieżenia podobnym incydentom w przyszłości"
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
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              p: 3, 
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              backgroundColor: alpha(theme.palette.background.default, 0.5)
            }}
          >
            <Button
              variant="outlined"
              onClick={activeStep === 0 ? handleCancel : handleBack}
              disabled={loading}
              sx={{ 
                minWidth: 100,
                background: 'white',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              {activeStep === 0 ? 'Anuluj' : 'Wstecz'}
            </Button>
            
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              disabled={loading}
              startIcon={loading && activeStep === steps.length - 1 ? <CircularProgress size={20} /> : null}
              sx={{ 
                minWidth: 120,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`
                }
              }}
            >
              {activeStep === steps.length - 1 
                ? (loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz incydent' : 'Zapisz zmiany')
                : 'Dalej'
              }
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );            Wybrane pliki:
                  </Typography>
                  <ul>
                    {formData.attachments.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <Button
                          size="small"
                          onClick={() => handleRemoveAttachment(index)}
                          sx={{ ml: 1 }}
                        >
                          Usuń
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz incydent' : 'Zapisz zmiany'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default IncidentForm;
