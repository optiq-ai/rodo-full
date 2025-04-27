// src/features/ConsentManagement/components/ConsentManagementForm.jsx
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
  IconButton,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const ConsentManagementForm = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    type: 'marketing',
    status: 'active',
    description: '',
    legalBasis: 'Art. 6 ust. 1 lit. a) RODO - zgoda osoby, której dane dotyczą',
    dataCategories: [''],
    purposes: [''],
    expiresAt: '',
    consentText: '',
    revocationMethod: '',
    dataRetentionPeriod: '',
    recipients: ['']
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
            name: 'Zgoda na przetwarzanie danych marketingowych',
            type: 'marketing',
            status: 'active',
            description: 'Zgoda na przetwarzanie danych osobowych w celach marketingowych, w tym przesyłanie informacji handlowych drogą elektroniczną.',
            legalBasis: 'Art. 6 ust. 1 lit. a) RODO - zgoda osoby, której dane dotyczą',
            dataCategories: ['Dane identyfikacyjne', 'Dane kontaktowe', 'Preferencje marketingowe'],
            purposes: ['Wysyłka newslettera', 'Personalizacja ofert', 'Analiza preferencji'],
            expiresAt: '2026-04-15',
            consentText: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez [Nazwa Firmy] w celach marketingowych, w tym przesyłanie informacji handlowych drogą elektroniczną na podany przeze mnie adres e-mail. Zgoda jest dobrowolna i może być w każdej chwili wycofana.',
            revocationMethod: 'Link w stopce wiadomości e-mail lub kontakt z IOD',
            dataRetentionPeriod: '12 miesięcy od wycofania zgody',
            recipients: ['Dział marketingu', 'Zewnętrzni dostawcy usług marketingowych']
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
    
    // Usunięcie błędu po wprowadzeniu wartości
    if (errors[arrayName]) {
      setErrors(prev => ({
        ...prev,
        [arrayName]: undefined
      }));
    }
  };
  
  const handleAddArrayItem = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };
  
  const handleRemoveArrayItem = (arrayName, index) => {
    if (formData[arrayName].length <= 1) {
      return; // Nie usuwaj ostatniego elementu
    }
    
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      [arrayName]: newArray
    }));
  };
  
  const handleBack = () => {
    navigate('/consent-management');
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
      if (!formData.name.trim()) stepErrors.name = 'Nazwa zgody jest wymagana';
      if (!formData.description.trim()) stepErrors.description = 'Opis jest wymagany';
      if (!formData.legalBasis.trim()) stepErrors.legalBasis = 'Podstawa prawna jest wymagana';
    } else if (step === 1) {
      const emptyCategories = formData.dataCategories.some(cat => !cat.trim());
      if (emptyCategories) stepErrors.dataCategories = 'Wszystkie kategorie danych muszą być wypełnione';
      
      const emptyPurposes = formData.purposes.some(purpose => !purpose.trim());
      if (emptyPurposes) stepErrors.purposes = 'Wszystkie cele przetwarzania muszą być wypełnione';
    } else if (step === 2) {
      if (!formData.consentText.trim()) stepErrors.consentText = 'Treść zgody jest wymagana';
      if (!formData.revocationMethod.trim()) stepErrors.revocationMethod = 'Metoda wycofania zgody jest wymagana';
      if (!formData.dataRetentionPeriod.trim()) stepErrors.dataRetentionPeriod = 'Okres przechowywania danych jest wymagany';
    } else if (step === 3) {
      const emptyRecipients = formData.recipients.some(recipient => !recipient.trim());
      if (emptyRecipients) stepErrors.recipients = 'Wszyscy odbiorcy danych muszą być wypełnieni';
      
      if (!formData.expiresAt) stepErrors.expiresAt = 'Data wygaśnięcia jest wymagana';
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
    console.log('Zapisywanie danych zgody:', formData);
    
    // Symulacja zapisywania
    setTimeout(() => {
      navigate('/consent-management');
    }, 1000);
  };
  
  const steps = [
    'Informacje podstawowe',
    'Kategorie danych i cele',
    'Treść zgody',
    'Odbiorcy i terminy'
  ];
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych zgody...</Typography>
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
          Zapisz zgodę
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
          {isEditMode ? 'Edycja zgody' : 'Nowa zgoda'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Wypełnij poniższy formularz, aby {isEditMode ? 'zaktualizować' : 'utworzyć'} zgodę na przetwarzanie danych osobowych.
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
                  <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Nazwa zgody"
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
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="type-label">Typ zgody</InputLabel>
                    <Select
                      labelId="type-label"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Typ zgody"
                    >
                      <MenuItem value="marketing">Marketing</MenuItem>
                      <MenuItem value="newsletter">Newsletter</MenuItem>
                      <MenuItem value="profiling">Profilowanie</MenuItem>
                      <MenuItem value="sharing">Udostępnianie danych</MenuItem>
                      <MenuItem value="cookies">Cookies</MenuItem>
                    </Select>
                  </FormControl>
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
                      <MenuItem value="active">Aktywna</MenuItem>
                      <MenuItem value="inactive">Nieaktywna</MenuItem>
                      <MenuItem value="pending">Oczekująca</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={3}
                    label="Opis zgody"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
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
                  <CategoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Kategorie danych i cele</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Kategorie danych
              </Typography>
              {errors.dataCategories && (
                <FormHelperText error>{errors.dataCategories}</FormHelperText>
              )}
              {formData.dataCategories.map((category, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Kategoria danych ${index + 1}`}
                    value={category}
                    onChange={(e) => handleArrayChange('dataCategories', index, e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveArrayItem('dataCategories', index)}
                    disabled={formData.dataCategories.length <= 1}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddArrayItem('dataCategories')}
                sx={{ mb: 3 }}
              >
                Dodaj kategorię danych
              </Button>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Cele przetwarzania
              </Typography>
              {errors.purposes && (
                <FormHelperText error>{errors.purposes}</FormHelperText>
              )}
              {formData.purposes.map((purpose, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Cel przetwarzania ${index + 1}`}
                    value={purpose}
                    onChange={(e) => handleArrayChange('purposes', index, e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveArrayItem('purposes', index)}
                    disabled={formData.purposes.length <= 1}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddArrayItem('purposes')}
              >
                Dodaj cel przetwarzania
              </Button>
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
                  <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Treść zgody</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={6}
                    label="Treść zgody"
                    name="consentText"
                    value={formData.consentText}
                    onChange={handleChange}
                    error={!!errors.consentText}
                    helperText={errors.consentText}
                    variant="outlined"
                    margin="normal"
                    placeholder="Wyrażam zgodę na przetwarzanie moich danych osobowych przez [Nazwa Firmy] w celach..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Metoda wycofania zgody"
                    name="revocationMethod"
                    value={formData.revocationMethod}
                    onChange={handleChange}
                    error={!!errors.revocationMethod}
                    helperText={errors.revocationMethod}
                    variant="outlined"
                    margin="normal"
                    placeholder="Link w stopce wiadomości e-mail lub kontakt z IOD"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Okres przechowywania danych"
                    name="dataRetentionPeriod"
                    value={formData.dataRetentionPeriod}
                    onChange={handleChange}
                    error={!!errors.dataRetentionPeriod}
                    helperText={errors.dataRetentionPeriod}
                    variant="outlined"
                    margin="normal"
                    placeholder="np. 12 miesięcy od wycofania zgody"
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
                  <Typography variant="h6">Odbiorcy i terminy</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Odbiorcy danych
              </Typography>
              {errors.recipients && (
                <FormHelperText error>{errors.recipients}</FormHelperText>
              )}
              {formData.recipients.map((recipient, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Odbiorca danych ${index + 1}`}
                    value={recipient}
                    onChange={(e) => handleArrayChange('recipients', index, e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveArrayItem('recipients', index)}
                    disabled={formData.recipients.length <= 1}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddArrayItem('recipients')}
                sx={{ mb: 3 }}
              >
                Dodaj odbiorcę danych
              </Button>
              
              <Divider sx={{ my: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    label="Data wygaśnięcia"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    error={!!errors.expiresAt}
                    helperText={errors.expiresAt || 'Data wygaśnięcia zgody'}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
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
              Zapisz zgodę
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ConsentManagementForm;
