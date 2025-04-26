// src/features/ReportingAndAnalytics/components/ReportConfigurationForm.jsx
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
  Chip,
  OutlinedInput,
  ListItemText,
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const reportTypes = [
  'incidents_summary',
  'subject_requests_summary',
  'documents_status',
  'compliance_status',
  'data_processing_activities',
  'risk_assessment',
  'audit_logs'
];

const reportTypeLabels = {
  incidents_summary: 'Podsumowanie incydentów',
  subject_requests_summary: 'Podsumowanie wniosków podmiotów',
  documents_status: 'Status dokumentów',
  compliance_status: 'Status zgodności',
  data_processing_activities: 'Czynności przetwarzania',
  risk_assessment: 'Ocena ryzyka',
  audit_logs: 'Logi audytowe'
};

const ReportConfigurationForm = ({ reportConfig, mode = 'create' }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({
    name: reportConfig?.name || '',
    description: reportConfig?.description || '',
    reportTypes: reportConfig?.reportTypes || [],
    startDate: reportConfig?.startDate ? new Date(reportConfig.startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: reportConfig?.endDate ? new Date(reportConfig.endDate) : new Date(),
    schedule: reportConfig?.schedule || 'none',
    recipients: reportConfig?.recipients || '',
    includeCharts: reportConfig?.includeCharts || true,
    includeTables: reportConfig?.includeTables || true,
    includeRawData: reportConfig?.includeRawData || false,
    exportFormat: reportConfig?.exportFormat || 'pdf'
  });
  
  const [errors, setErrors] = useState({
    name: '',
    reportTypes: '',
    startDate: '',
    endDate: '',
    recipients: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      reportTypes: '',
      startDate: '',
      endDate: '',
      recipients: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nazwa raportu jest wymagana';
      isValid = false;
    }

    if (formData.reportTypes.length === 0) {
      newErrors.reportTypes = 'Wybierz co najmniej jeden typ raportu';
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Data początkowa jest wymagana';
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Data końcowa jest wymagana';
      isValid = false;
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'Data końcowa musi być późniejsza niż data początkowa';
      isValid = false;
    }

    if (formData.schedule !== 'none' && !formData.recipients.trim()) {
      newErrors.recipients = 'Lista odbiorców jest wymagana dla raportów cyklicznych';
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

  const handleReportTypesChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setFormData(prev => ({
      ...prev,
      reportTypes: typeof value === 'string' ? value.split(',') : value,
    }));
    
    // Czyszczenie błędu po wprowadzeniu wartości
    if (errors.reportTypes) {
      setErrors(prev => ({
        ...prev,
        reportTypes: ''
      }));
    }
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
      // const response = await api.reports.createConfiguration(formData);
      // lub
      // const response = await api.reports.updateConfiguration(reportConfig.id, formData);
      
      setSuccess(true);
      
      // Resetowanie stanu po 3 sekundach
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Błąd podczas zapisywania konfiguracji raportu:', err);
      setError('Wystąpił błąd podczas zapisywania konfiguracji raportu. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  // Definicja kroków formularza
  const steps = [
    {
      label: 'Podstawowe informacje',
      description: 'Wprowadź podstawowe informacje o raporcie',
      icon: <AssessmentIcon />
    },
    {
      label: 'Zakres czasowy',
      description: 'Określ zakres czasowy raportu',
      icon: <DateRangeIcon />
    },
    {
      label: 'Harmonogram i dostarczanie',
      description: 'Ustaw harmonogram generowania i dostarczania raportu',
      icon: <ScheduleIcon />
    },
    {
      label: 'Zawartość raportu',
      description: 'Określ zawartość i format raportu',
      icon: <SettingsIcon />
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
            <AssessmentIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {mode === 'create' ? 'Nowa konfiguracja raportu' : 'Edycja konfiguracji raportu'}
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
              Konfiguracja raportu została pomyślnie {mode === 'create' ? 'utworzona' : 'zaktualizowana'}.
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
            {/* Krok 1: Podstawowe informacje */}
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
                      <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Podstawowe informacje</Typography>
                    </Box>
                  }
                  subheader="Wprowadź podstawowe informacje o raporcie"
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
                        label="Nazwa raportu"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
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
                        label="Opis"
                        name="description"
                        value={formData.description}
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
                    
                    <Grid item xs={12}>
                      <FormControl 
                        fullWidth 
                        error={!!errors.reportTypes} 
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
                        <InputLabel>Typy raportów</InputLabel>
                        <Select
                          multiple
                          name="reportTypes"
                          value={formData.reportTypes}
                          onChange={handleReportTypesChange}
                          input={<OutlinedInput label="Typy raportów" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip 
                                  key={value} 
                                  label={reportTypeLabels[value] || value} 
                                  sx={{
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                          disabled={loading}
                        >
                          {reportTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              <Checkbox 
                                checked={formData.reportTypes.indexOf(type) > -1}
                                sx={{
                                  color: theme.palette.primary.main,
                                  '&.Mui-checked': {
                                    color: theme.palette.primary.main,
                                  },
                                }}
                              />
                              <ListItemText primary={reportTypeLabels[type] || type} />
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.reportTypes && <FormHelperText>{errors.reportTypes}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
            
            {/* Krok 2: Zakres czasowy */}
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
                      <DateRangeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Zakres czasowy</Typography>
                    </Box>
                  }
                  subheader="Określ zakres czasowy raportu"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Data początkowa"
                        value={formData.startDate}
                        onChange={(date) => handleDateChange('startDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.startDate,
                            helperText: errors.startDate,
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
                        label="Data końcowa"
                        value={formData.endDate}
                        onChange={(date) => handleDateChange('endDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            error: !!errors.endDate,
                            helperText: errors.endDate,
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
            
            {/* Krok 3: Harmonogram i dostarczanie */}
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
                      <ScheduleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Harmonogram i dostarczanie</Typography>
                    </Box>
                  }
                  subheader="Ustaw harmonogram generowania i dostarczania raportu"
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
                        <InputLabel>Harmonogram</InputLabel>
                        <Select
                          name="schedule"
                          value={formData.schedule}
                          onChange={handleChange}
                          label="Harmonogram"
                          disabled={loading}
                        >
                          <MenuItem value="none">Jednorazowy (bez harmonogramu)</MenuItem>
                          <MenuItem value="daily">Codziennie</MenuItem>
                          <MenuItem value="weekly">Co tydzień</MenuItem>
                          <MenuItem value="monthly">Co miesiąc</MenuItem>
                          <MenuItem value="quarterly">Co kwartał</MenuItem>
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
                        <InputLabel>Format eksportu</InputLabel>
                        <Select
                          name="exportFormat"
                          value={formData.exportFormat}
                          onChange={handleChange}
                          label="Format eksportu"
                          disabled={loading}
                        >
                          <MenuItem value="pdf">PDF</MenuItem>
                          <MenuItem value="excel">Excel</MenuItem>
                          <MenuItem value="csv">CSV</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Odbiorcy raportu"
                        name="recipients"
                        value={formData.recipients}
                        onChange={handleChange}
                        error={!!errors.recipients}
                        helperText={errors.recipients || "Adresy email oddzielone przecinkami"}
                        disabled={loading}
                        required={formData.schedule !== 'none'}
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
            
            {/* Krok 4: Zawartość raportu */}
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
                      <SettingsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">Zawartość raportu</Typography>
                    </Box>
                  }
                  subheader="Określ zawartość i format raportu"
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
                            name="includeCharts"
                            checked={formData.includeCharts}
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
                            Dołącz wykresy
                          </Typography>
                        }
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="includeTables"
                            checked={formData.includeTables}
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
                            Dołącz tabele
                          </Typography>
                        }
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="includeRawData"
                            checked={formData.includeRawData}
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
                            Dołącz surowe dane
                          </Typography>
                        }
                      />
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
                ? (loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz raport' : 'Zapisz zmiany')
                : 'Dalej'
              }
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ReportConfigurationForm;
