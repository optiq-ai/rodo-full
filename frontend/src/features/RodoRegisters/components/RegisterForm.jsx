// src/features/RodoRegisters/components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const RegisterForm = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'active',
    dataSubjects: '',
    dataController: '',
    dataProcessor: '',
    riskLevel: 'low',
    legalBasis: '',
    retentionPeriod: '',
    description: '',
    personalDataCategories: [''],
    processingPurposes: [''],
    securityMeasures: [''],
    dataRecipients: ['']
  });
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (isEditMode) {
      // Symulacja pobierania danych z API
      const fetchData = async () => {
        try {
          // W rzeczywistej aplikacji byłoby to wywołanie API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Przykładowe dane
          const mockData = {
            id: parseInt(id),
            name: 'Rejestr pracowników',
            category: 'HR',
            status: 'active',
            dataSubjects: 'Pracownicy',
            dataController: 'Dział HR',
            dataProcessor: 'Wewnętrzny',
            riskLevel: 'low',
            legalBasis: 'Art. 6 ust. 1 lit. b) RODO - wykonanie umowy',
            retentionPeriod: '50 lat od zakończenia stosunku pracy',
            description: 'Rejestr zawiera dane osobowe pracowników przetwarzane w związku z zatrudnieniem, wynagrodzeniem i świadczeniami pracowniczymi.',
            personalDataCategories: [
              'Dane identyfikacyjne',
              'Dane kontaktowe',
              'Dane adresowe',
              'Dane finansowe',
              'Dane kadrowe'
            ],
            processingPurposes: [
              'Realizacja stosunku pracy',
              'Naliczanie wynagrodzeń',
              'Realizacja świadczeń pracowniczych',
              'Szkolenia i rozwój pracowników'
            ],
            securityMeasures: [
              'Kontrola dostępu',
              'Szyfrowanie danych',
              'Kopie zapasowe',
              'Szkolenia pracowników'
            ],
            dataRecipients: [
              'ZUS',
              'Urząd Skarbowy',
              'Firma szkoleniowa XYZ'
            ]
          };
          
          setFormData(mockData);
        } catch (error) {
          console.error('Błąd podczas pobierania danych:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [id, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Usunięcie błędu po wprowadzeniu wartości
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleArrayChange = (arrayName, index, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = value;
    
    setFormData(prev => ({
      ...prev,
      [arrayName]: newArray
    }));
  };
  
  const handleAddArrayItem = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };
  
  const handleRemoveArrayItem = (arrayName, index) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      [arrayName]: newArray
    }));
  };
  
  const handleBack = () => {
    navigate('/registers');
  };
  
  const handleNext = () => {
    const stepErrors = validateStep(activeStep);
    if (Object.keys(stepErrors).length === 0) {
      setActiveStep(prev => prev + 1);
    } else {
      setErrors(stepErrors);
    }
  };
  
  const handlePrev = () => {
    setActiveStep(prev => prev - 1);
  };
  
  const validateStep = (step) => {
    const stepErrors = {};
    
    if (step === 0) {
      if (!formData.name.trim()) stepErrors.name = 'Nazwa rejestru jest wymagana';
      if (!formData.category.trim()) stepErrors.category = 'Kategoria jest wymagana';
      if (!formData.description.trim()) stepErrors.description = 'Opis jest wymagany';
    } else if (step === 1) {
      if (!formData.dataSubjects.trim()) stepErrors.dataSubjects = 'Osoby, których dane dotyczą są wymagane';
      if (!formData.dataController.trim()) stepErrors.dataController = 'Administrator danych jest wymagany';
      if (!formData.legalBasis.trim()) stepErrors.legalBasis = 'Podstawa prawna jest wymagana';
      if (!formData.retentionPeriod.trim()) stepErrors.retentionPeriod = 'Okres przechowywania jest wymagany';
    } else if (step === 2) {
      const emptyCategories = formData.personalDataCategories.some(cat => !cat.trim());
      if (emptyCategories) stepErrors.personalDataCategories = 'Wszystkie kategorie danych muszą być wypełnione';
      
      const emptyPurposes = formData.processingPurposes.some(purpose => !purpose.trim());
      if (emptyPurposes) stepErrors.processingPurposes = 'Wszystkie cele przetwarzania muszą być wypełnione';
    } else if (step === 3) {
      const emptyMeasures = formData.securityMeasures.some(measure => !measure.trim());
      if (emptyMeasures) stepErrors.securityMeasures = 'Wszystkie środki bezpieczeństwa muszą być wypełnione';
      
      const emptyRecipients = formData.dataRecipients.some(recipient => !recipient.trim());
      if (emptyRecipients) stepErrors.dataRecipients = 'Wszyscy odbiorcy danych muszą być wypełnieni';
    }
    
    return stepErrors;
  };
  
  const validateForm = () => {
    let isValid = true;
    let allErrors = {};
    
    for (let i = 0; i < 4; i++) {
      const stepErrors = validateStep(i);
      if (Object.keys(stepErrors).length > 0) {
        isValid = false;
        allErrors = { ...allErrors, ...stepErrors };
      }
    }
    
    setErrors(allErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // W rzeczywistej aplikacji byłoby to wywołanie API
    console.log('Zapisywanie danych rejestru:', formData);
    
    // Symulacja zapisywania
    setTimeout(() => {
      navigate('/registers');
    }, 1000);
  };
  
  const steps = [
    'Informacje podstawowe',
    'Dane administratora',
    'Kategorie i cele',
    'Bezpieczeństwo'
  ];
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych rejestru...</Typography>
      </Paper>
    );
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Anuluj
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          type="submit"
        >
          Zapisz rejestr
        </Button>
      </Box>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3,
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.paper, 1)} 120px)`,
          borderTop: `4px solid ${theme.palette.primary.main}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {isEditMode ? 'Edycja rejestru' : 'Nowy rejestr czynności przetwarzania'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Wypełnij poniższy formularz, aby {isEditMode ? 'zaktualizować' : 'utworzyć'} rejestr czynności przetwarzania danych osobowych zgodnie z RODO.
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === 0 && (
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              overflow: 'hidden',
              mb: 3
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Informacje podstawowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Nazwa rejestru"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Kategoria"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    error={!!errors.category}
                    helperText={errors.category}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value="active">Aktywny</MenuItem>
                      <MenuItem value="inactive">Nieaktywny</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="risk-level-label">Poziom ryzyka</InputLabel>
                    <Select
                      labelId="risk-level-label"
                      name="riskLevel"
                      value={formData.riskLevel}
                      onChange={handleChange}
                      label="Poziom ryzyka"
                    >
                      <MenuItem value="low">Niski</MenuItem>
                      <MenuItem value="medium">Średni</MenuItem>
                      <MenuItem value="high">Wysoki</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    label="Opis rejestru"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    variant="outlined"
                    margin="normal"
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
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              overflow: 'hidden',
              mb: 3
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Dane administratora i podstawy prawne</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Administrator danych"
                    name="dataController"
                    value={formData.dataController}
                    onChange={handleChange}
                    error={!!errors.dataController}
                    helperText={errors.dataController}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Podmiot przetwarzający"
                    name="dataProcessor"
                    value={formData.dataProcessor}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Osoby, których dane dotyczą"
                    name="dataSubjects"
                    value={formData.dataSubjects}
                    onChange={handleChange}
                    error={!!errors.dataSubjects}
                    helperText={errors.dataSubjects}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Podstawa prawna"
                    name="legalBasis"
                    value={formData.legalBasis}
                    onChange={handleChange}
                    error={!!errors.legalBasis}
                    helperText={errors.legalBasis}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Okres przechowywania danych"
                    name="retentionPeriod"
                    value={formData.retentionPeriod}
                    onChange={handleChange}
                    error={!!errors.retentionPeriod}
                    helperText={errors.retentionPeriod}
                    variant="outlined"
                    margin="normal"
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
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              overflow: 'hidden',
              mb: 3
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Kategorie danych i cele przetwarzania</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Kategorie danych osobowych</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddArrayItem('personalDataCategories')}
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    Dodaj kategorię
                  </Button>
                </Box>
                
                {formData.personalDataCategories.map((category, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Kategoria ${index + 1}`}
                      value={category}
                      onChange={(e) => handleArrayChange('personalDataCategories', index, e.target.value)}
                      variant="outlined"
                      margin="dense"
                    />
                    {formData.personalDataCategories.length > 1 && (
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveArrayItem('personalDataCategories', index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                {errors.personalDataCategories && (
                  <FormHelperText error>{errors.personalDataCategories}</FormHelperText>
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Cele przetwarzania</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddArrayItem('processingPurposes')}
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    Dodaj cel
                  </Button>
                </Box>
                
                {formData.processingPurposes.map((purpose, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Cel ${index + 1}`}
                      value={purpose}
                      onChange={(e) => handleArrayChange('processingPurposes', index, e.target.value)}
                      variant="outlined"
                      margin="dense"
                    />
                    {formData.processingPurposes.length > 1 && (
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveArrayItem('processingPurposes', index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                {errors.processingPurposes && (
                  <FormHelperText error>{errors.processingPurposes}</FormHelperText>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 3 && (
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              overflow: 'hidden',
              mb: 3
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Bezpieczeństwo i odbiorcy danych</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Środki bezpieczeństwa</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddArrayItem('securityMeasures')}
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    Dodaj środek
                  </Button>
                </Box>
                
                {formData.securityMeasures.map((measure, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Środek ${index + 1}`}
                      value={measure}
                      onChange={(e) => handleArrayChange('securityMeasures', index, e.target.value)}
                      variant="outlined"
                      margin="dense"
                    />
                    {formData.securityMeasures.length > 1 && (
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveArrayItem('securityMeasures', index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                {errors.securityMeasures && (
                  <FormHelperText error>{errors.securityMeasures}</FormHelperText>
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Odbiorcy danych</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddArrayItem('dataRecipients')}
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    Dodaj odbiorcę
                  </Button>
                </Box>
                
                {formData.dataRecipients.map((recipient, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Odbiorca ${index + 1}`}
                      value={recipient}
                      onChange={(e) => handleArrayChange('dataRecipients', index, e.target.value)}
                      variant="outlined"
                      margin="dense"
                    />
                    {formData.dataRecipients.length > 1 && (
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveArrayItem('dataRecipients', index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                {errors.dataRecipients && (
                  <FormHelperText error>{errors.dataRecipients}</FormHelperText>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={activeStep === 0}
          >
            Wstecz
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Dalej
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Zapisz rejestr
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
