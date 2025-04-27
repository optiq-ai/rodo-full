// src/features/RiskAnalysis/components/RiskAnalysisForm.jsx
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
  Rating,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';

const RiskAnalysisForm = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    processName: '',
    status: 'planned',
    department: '',
    description: '',
    scope: '',
    dataCategories: [''],
    threats: [
      {
        name: '',
        likelihood: 1,
        impact: 1,
        riskLevel: 'low'
      }
    ],
    mitigationMeasures: [''],
    recommendations: [''],
    conclusion: ''
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
            name: 'Analiza ryzyka - system HR',
            processName: 'Przetwarzanie danych pracowników',
            status: 'completed',
            department: 'IT',
            description: 'Analiza ryzyka dla procesu przetwarzania danych osobowych pracowników w systemie HR.',
            scope: 'Analiza obejmuje wszystkie operacje przetwarzania danych osobowych pracowników w systemie HR, w tym gromadzenie, przechowywanie, modyfikację i usuwanie danych.',
            dataCategories: [
              'Dane identyfikacyjne',
              'Dane kontaktowe',
              'Dane adresowe',
              'Dane finansowe',
              'Dane kadrowe'
            ],
            threats: [
              {
                name: 'Nieuprawniony dostęp do danych',
                likelihood: 2,
                impact: 3,
                riskLevel: 'medium'
              },
              {
                name: 'Utrata danych',
                likelihood: 1,
                impact: 4,
                riskLevel: 'low'
              },
              {
                name: 'Wyciek danych',
                likelihood: 1,
                impact: 5,
                riskLevel: 'medium'
              }
            ],
            mitigationMeasures: [
              'Kontrola dostępu oparta na rolach',
              'Szyfrowanie danych w spoczynku i podczas transmisji',
              'Regularne kopie zapasowe',
              'Szkolenia pracowników z zakresu bezpieczeństwa danych',
              'Monitorowanie aktywności użytkowników'
            ],
            recommendations: [
              'Wdrożenie dwuskładnikowego uwierzytelniania',
              'Zwiększenie częstotliwości audytów bezpieczeństwa',
              'Aktualizacja polityki haseł'
            ],
            conclusion: 'Na podstawie przeprowadzonej analizy ryzyka stwierdzono, że ogólny poziom ryzyka dla procesu przetwarzania danych osobowych pracowników w systemie HR jest niski. Zidentyfikowane zagrożenia są odpowiednio kontrolowane przez istniejące środki bezpieczeństwa. Zaleca się wdrożenie dodatkowych środków w celu dalszego zmniejszenia ryzyka.'
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
  
  const handleThreatChange = (index, field, value) => {
    const newThreats = [...formData.threats];
    newThreats[index] = {
      ...newThreats[index],
      [field]: value
    };
    
    // Automatyczne ustawienie poziomu ryzyka na podstawie prawdopodobieństwa i wpływu
    if (field === 'likelihood' || field === 'impact') {
      const likelihood = field === 'likelihood' ? value : newThreats[index].likelihood;
      const impact = field === 'impact' ? value : newThreats[index].impact;
      const riskScore = likelihood * impact;
      
      let riskLevel = 'low';
      if (riskScore >= 15) {
        riskLevel = 'high';
      } else if (riskScore >= 5) {
        riskLevel = 'medium';
      }
      
      newThreats[index].riskLevel = riskLevel;
    }
    
    setFormData(prev => ({
      ...prev,
      threats: newThreats
    }));
  };
  
  const handleAddThreat = () => {
    setFormData(prev => ({
      ...prev,
      threats: [
        ...prev.threats,
        {
          name: '',
          likelihood: 1,
          impact: 1,
          riskLevel: 'low'
        }
      ]
    }));
  };
  
  const handleRemoveThreat = (index) => {
    const newThreats = [...formData.threats];
    newThreats.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      threats: newThreats
    }));
  };
  
  const handleBack = () => {
    navigate('/risk-analysis');
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
      if (!formData.name.trim()) stepErrors.name = 'Nazwa analizy jest wymagana';
      if (!formData.processName.trim()) stepErrors.processName = 'Nazwa procesu jest wymagana';
      if (!formData.description.trim()) stepErrors.description = 'Opis jest wymagany';
      if (!formData.scope.trim()) stepErrors.scope = 'Zakres analizy jest wymagany';
    } else if (step === 1) {
      const emptyCategories = formData.dataCategories.some(cat => !cat.trim());
      if (emptyCategories) stepErrors.dataCategories = 'Wszystkie kategorie danych muszą być wypełnione';
      
      const emptyThreats = formData.threats.some(threat => !threat.name.trim());
      if (emptyThreats) stepErrors.threats = 'Wszystkie zagrożenia muszą mieć nazwę';
    } else if (step === 2) {
      const emptyMeasures = formData.mitigationMeasures.some(measure => !measure.trim());
      if (emptyMeasures) stepErrors.mitigationMeasures = 'Wszystkie środki bezpieczeństwa muszą być wypełnione';
    } else if (step === 3) {
      const emptyRecommendations = formData.recommendations.some(rec => !rec.trim());
      if (emptyRecommendations) stepErrors.recommendations = 'Wszystkie rekomendacje muszą być wypełnione';
      
      if (!formData.conclusion.trim()) stepErrors.conclusion = 'Wnioski są wymagane';
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
    console.log('Zapisywanie danych analizy ryzyka:', formData);
    
    // Symulacja zapisywania
    setTimeout(() => {
      navigate('/risk-analysis');
    }, 1000);
  };
  
  const steps = [
    'Informacje podstawowe',
    'Zagrożenia i dane',
    'Środki bezpieczeństwa',
    'Rekomendacje i wnioski'
  ];
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych analizy ryzyka...</Typography>
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
          Zapisz analizę
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
          {isEditMode ? 'Edycja analizy ryzyka' : 'Nowa analiza ryzyka'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Wypełnij poniższy formularz, aby {isEditMode ? 'zaktualizować' : 'utworzyć'} analizę ryzyka dla procesu przetwarzania danych osobowych.
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
                  <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
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
                    label="Nazwa analizy"
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
                    label="Nazwa procesu"
                    name="processName"
                    value={formData.processName}
                    onChange={handleChange}
                    error={!!errors.processName}
                    helperText={errors.processName}
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
                      <MenuItem value="planned">Planowana</MenuItem>
                      <MenuItem value="in_progress">W trakcie</MenuItem>
                      <MenuItem value="completed">Zakończona</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Dział"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={3}
                    label="Opis analizy"
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
                    multiline
                    rows={3}
                    label="Zakres analizy"
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    error={!!errors.scope}
                    helperText={errors.scope}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 1 && (
          <>
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
                    <Typography variant="h6">Kategorie danych</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">Kategorie przetwarzanych danych osobowych</Typography>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => handleAddArrayItem('dataCategories')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      Dodaj kategorię
                    </Button>
                  </Box>
                  
                  {formData.dataCategories.map((category, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TextField
                        fullWidth
                        label={`Kategoria ${index + 1}`}
                        value={category}
                        onChange={(e) => handleArrayChange('dataCategories', index, e.target.value)}
                        variant="outlined"
                        margin="dense"
                      />
                      {formData.dataCategories.length > 1 && (
                        <IconButton 
                          color="error" 
                          onClick={() => handleRemoveArrayItem('dataCategories', index)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  
                  {errors.dataCategories && (
                    <FormHelperText error>{errors.dataCategories}</FormHelperText>
                  )}
                </Box>
              </CardContent>
            </Card>
            
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
                    <WarningIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Zagrożenia</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">Zidentyfikowane zagrożenia</Typography>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddThreat}
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      Dodaj zagrożenie
                    </Button>
                  </Box>
                  
                  {formData.threats.map((threat, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Zagrożenie {index + 1}
                        </Typography>
                        {formData.threats.length > 1 && (
                          <IconButton 
                            color="error" 
                            onClick={() => handleRemoveThreat(index)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                      
                      <TextField
                        fullWidth
                        label="Nazwa zagrożenia"
                        value={threat.name}
                        onChange={(e) => handleThreatChange(index, 'name', e.target.value)}
                        variant="outlined"
                        margin="dense"
                        sx={{ mb: 2 }}
                      />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" gutterBottom>
                            Prawdopodobieństwo wystąpienia (1-5):
                          </Typography>
                          <Rating
                            name={`likelihood-${index}`}
                            value={threat.likelihood}
                            onChange={(e, newValue) => handleThreatChange(index, 'likelihood', newValue)}
                            max={5}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" gutterBottom>
                            Wpływ (1-5):
                          </Typography>
                          <Rating
                            name={`impact-${index}`}
                            value={threat.impact}
                            onChange={(e, newValue) => handleThreatChange(index, 'impact', newValue)}
                            max={5}
                          />
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Poziom ryzyka (obliczony automatycznie):
                        </Typography>
                        <Chip 
                          label={
                            threat.riskLevel === 'low' 
                              ? 'Niski' 
                              : threat.riskLevel === 'medium' 
                                ? 'Średni' 
                                : 'Wysoki'
                          } 
                          color={
                            threat.riskLevel === 'low' 
                              ? 'success' 
                              : threat.riskLevel === 'medium' 
                                ? 'warning' 
                                : 'error'
                          } 
                          size="small" 
                          variant="filled"
                        />
                      </Box>
                    </Card>
                  ))}
                  
                  {errors.threats && (
                    <FormHelperText error>{errors.threats}</FormHelperText>
                  )}
                </Box>
              </CardContent>
            </Card>
          </>
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
                  <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Środki bezpieczeństwa</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Zastosowane lub planowane środki bezpieczeństwa</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddArrayItem('mitigationMeasures')}
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    Dodaj środek
                  </Button>
                </Box>
                
                {formData.mitigationMeasures.map((measure, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Środek ${index + 1}`}
                      value={measure}
                      onChange={(e) => handleArrayChange('mitigationMeasures', index, e.target.value)}
                      variant="outlined"
                      margin="dense"
                    />
                    {formData.mitigationMeasures.length > 1 && (
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveArrayItem('mitigationMeasures', index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                {errors.mitigationMeasures && (
                  <FormHelperText error>{errors.mitigationMeasures}</FormHelperText>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 3 && (
          <>
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
                    <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Rekomendacje</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">Rekomendowane działania</Typography>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => handleAddArrayItem('recommendations')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      Dodaj rekomendację
                    </Button>
                  </Box>
                  
                  {formData.recommendations.map((recommendation, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TextField
                        fullWidth
                        label={`Rekomendacja ${index + 1}`}
                        value={recommendation}
                        onChange={(e) => handleArrayChange('recommendations', index, e.target.value)}
                        variant="outlined"
                        margin="dense"
                      />
                      {formData.recommendations.length > 1 && (
                        <IconButton 
                          color="error" 
                          onClick={() => handleRemoveArrayItem('recommendations', index)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  
                  {errors.recommendations && (
                    <FormHelperText error>{errors.recommendations}</FormHelperText>
                  )}
                </Box>
              </CardContent>
            </Card>
            
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
                    <Typography variant="h6">Wnioski</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Wnioski z analizy ryzyka"
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleChange}
                  error={!!errors.conclusion}
                  helperText={errors.conclusion}
                  variant="outlined"
                  margin="normal"
                />
              </CardContent>
            </Card>
          </>
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
              Zapisz analizę
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default RiskAnalysisForm;
