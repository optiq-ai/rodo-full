// src/features/DocumentManagement/components/DocumentForm.jsx
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
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HelpIcon from '@mui/icons-material/Help';

const DocumentForm = ({ document, mode = 'create' }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({
    title: document?.title || '',
    description: document?.description || '',
    category: document?.category || '',
    content: document?.content || '',
    status: document?.status || 'draft',
    version: document?.version || 1,
    file: null
  });
  
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    status: '',
    file: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      category: '',
      content: '',
      status: '',
      file: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Kategoria jest wymagana';
      isValid = false;
    }

    if (!formData.content.trim() && !formData.file) {
      newErrors.content = 'Treść dokumentu lub plik jest wymagany';
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files[0]
      }));
      
      // Czyszczenie błędu po wybraniu pliku
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: ''
        }));
      }
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
      // const response = await api.documents.create(formData);
      // lub
      // const response = await api.documents.update(document.id, formData);
      
      setSuccess(true);
      
      // Przekierowanie po udanym zapisie (po 2 sekundach)
      setTimeout(() => {
        navigate('/documents');
      }, 2000);
      
    } catch (err) {
      console.error('Błąd podczas zapisywania dokumentu:', err);
      setError('Wystąpił błąd podczas zapisywania dokumentu. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/documents');
  };
  
  // Definicja kroków formularza
  const steps = [
    {
      label: 'Podstawowe informacje',
      description: 'Wprowadź podstawowe informacje o dokumencie',
      icon: <DescriptionIcon />
    },
    {
      label: 'Treść dokumentu',
      description: 'Wprowadź treść dokumentu lub załącz plik',
      icon: <TextFieldsIcon />
    },
    {
      label: 'Załączniki',
      description: 'Dodaj załączniki do dokumentu',
      icon: <AttachFileIcon />
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
          <DescriptionIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {mode === 'create' ? 'Nowy dokument' : 'Edycja dokumentu'}
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
            Dokument został pomyślnie {mode === 'create' ? 'utworzony' : 'zaktualizowany'}.
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
                    <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Podstawowe informacje</Typography>
                  </Box>
                }
                subheader="Wprowadź podstawowe informacje o dokumencie"
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
                      label="Tytuł dokumentu"
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
                      error={!!errors.category} 
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
                      <InputLabel>Kategoria</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        label="Kategoria"
                        disabled={loading}
                      >
                        <MenuItem value="">
                          <em>Wybierz kategorię</em>
                        </MenuItem>
                        <MenuItem value="policy">Polityka</MenuItem>
                        <MenuItem value="procedure">Procedura</MenuItem>
                        <MenuItem value="instruction">Instrukcja</MenuItem>
                        <MenuItem value="record">Rejestr</MenuItem>
                        <MenuItem value="other">Inne</MenuItem>
                      </Select>
                      {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
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
                        <MenuItem value="draft">Wersja robocza</MenuItem>
                        <MenuItem value="active">Aktywny</MenuItem>
                        <MenuItem value="inactive">Nieaktywny</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Opis"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      multiline
                      rows={3}
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
                    <TextFieldsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Treść dokumentu</Typography>
                  </Box>
                }
                subheader="Wprowadź treść dokumentu lub załącz plik"
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
                      label="Treść dokumentu"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      multiline
                      rows={10}
                      error={!!errors.content}
                      helperText={errors.content}
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
                    <AttachFileIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Załączniki</Typography>
                  </Box>
                }
                subheader="Dodaj załączniki do dokumentu"
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
                        border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.02),
                        textAlign: 'center',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          borderColor: alpha(theme.palette.primary.main, 0.5)
                        }
                      }}
                    >
                      <AttachFileIcon sx={{ fontSize: 48, color: alpha(theme.palette.primary.main, 0.6), mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Przeciągnij i upuść pliki lub
                      </Typography>
                      <Button
                        variant="contained"
                        component="label"
                        disabled={loading}
                        sx={{ 
                          mt: 1,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                          boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                          '&:hover': {
                            boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`
                          }
                        }}
                      >
                        Wybierz plik
                        <input
                          type="file"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                      {formData.file && (
                        <Box sx={{ mt: 2, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                          <Typography variant="body1" component="div" sx={{ fontWeight: 500 }}>
                            Wybrany plik:
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mt: 1,
                            p: 1,
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: 1
                          }}>
                            <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            <Typography variant="body2">
                              {formData.file.name}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      {errors.file && (
                        <FormHelperText error sx={{ mt: 1 }}>{errors.file}</FormHelperText>
                      )}
                    </Box>
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
              ? (loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz dokument' : 'Zapisz zmiany')
              : 'Dalej'
            }
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentForm;
