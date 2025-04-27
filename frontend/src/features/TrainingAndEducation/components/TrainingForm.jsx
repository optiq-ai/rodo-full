// src/features/TrainingAndEducation/components/TrainingForm.jsx
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
  Checkbox,
  FormControlLabel,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';

const TrainingForm = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    title: '',
    type: 'e-learning',
    status: 'planned',
    targetGroup: '',
    duration: '',
    mandatory: true,
    description: '',
    learningObjectives: [''],
    modules: [
      {
        title: '',
        duration: '',
        topics: ['']
      }
    ],
    materials: [''],
    completionRequirements: ['']
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
            title: 'Podstawy RODO dla pracowników',
            type: 'e-learning',
            status: 'active',
            targetGroup: 'Wszyscy pracownicy',
            duration: 60,
            mandatory: true,
            description: 'Szkolenie wprowadzające do podstawowych zasad ochrony danych osobowych zgodnie z RODO. Kurs obejmuje najważniejsze definicje, prawa osób, których dane dotyczą, oraz obowiązki administratora danych.',
            learningObjectives: [
              'Zrozumienie podstawowych pojęć RODO',
              'Poznanie praw osób, których dane dotyczą',
              'Identyfikacja obowiązków administratora danych',
              'Rozpoznawanie sytuacji wymagających zgody na przetwarzanie danych',
              'Podstawy bezpiecznego przetwarzania danych osobowych'
            ],
            modules: [
              {
                title: 'Wprowadzenie do RODO',
                duration: 15,
                topics: ['Historia ochrony danych', 'Kluczowe definicje', 'Zakres stosowania RODO']
              },
              {
                title: 'Prawa osób, których dane dotyczą',
                duration: 20,
                topics: ['Prawo dostępu', 'Prawo do usunięcia danych', 'Prawo do przenoszenia danych', 'Prawo do sprzeciwu']
              },
              {
                title: 'Obowiązki administratora danych',
                duration: 15,
                topics: ['Rejestr czynności przetwarzania', 'Zgłaszanie naruszeń', 'Privacy by design']
              },
              {
                title: 'Test końcowy',
                duration: 10,
                topics: ['Pytania wielokrotnego wyboru', 'Studium przypadku']
              }
            ],
            materials: [
              'Prezentacja szkoleniowa',
              'Poradnik RODO dla pracowników',
              'Infografiki z kluczowymi informacjami',
              'Przykładowe formularze zgód'
            ],
            completionRequirements: [
              'Ukończenie wszystkich modułów szkoleniowych',
              'Uzyskanie minimum 70% punktów w teście końcowym',
              'Wypełnienie ankiety ewaluacyjnej'
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
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
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
  
  const handleModuleChange = (index, field, value) => {
    const newModules = [...formData.modules];
    newModules[index] = {
      ...newModules[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      modules: newModules
    }));
  };
  
  const handleModuleTopicChange = (moduleIndex, topicIndex, value) => {
    const newModules = [...formData.modules];
    const newTopics = [...newModules[moduleIndex].topics];
    newTopics[topicIndex] = value;
    newModules[moduleIndex] = {
      ...newModules[moduleIndex],
      topics: newTopics
    };
    
    setFormData(prev => ({
      ...prev,
      modules: newModules
    }));
  };
  
  const handleAddModuleTopic = (moduleIndex) => {
    const newModules = [...formData.modules];
    newModules[moduleIndex] = {
      ...newModules[moduleIndex],
      topics: [...newModules[moduleIndex].topics, '']
    };
    
    setFormData(prev => ({
      ...prev,
      modules: newModules
    }));
  };
  
  const handleRemoveModuleTopic = (moduleIndex, topicIndex) => {
    const newModules = [...formData.modules];
    const newTopics = [...newModules[moduleIndex].topics];
    newTopics.splice(topicIndex, 1);
    newModules[moduleIndex] = {
      ...newModules[moduleIndex],
      topics: newTopics
    };
    
    setFormData(prev => ({
      ...prev,
      modules: newModules
    }));
  };
  
  const handleAddModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: '',
          duration: '',
          topics: ['']
        }
      ]
    }));
  };
  
  const handleRemoveModule = (index) => {
    const newModules = [...formData.modules];
    newModules.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      modules: newModules
    }));
  };
  
  const handleBack = () => {
    navigate('/training-and-education');
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
      if (!formData.title.trim()) stepErrors.title = 'Tytuł szkolenia jest wymagany';
      if (!formData.targetGroup.trim()) stepErrors.targetGroup = 'Grupa docelowa jest wymagana';
      if (!formData.duration) stepErrors.duration = 'Czas trwania jest wymagany';
      if (!formData.description.trim()) stepErrors.description = 'Opis jest wymagany';
    } else if (step === 1) {
      const emptyObjectives = formData.learningObjectives.some(obj => !obj.trim());
      if (emptyObjectives) stepErrors.learningObjectives = 'Wszystkie cele szkoleniowe muszą być wypełnione';
    } else if (step === 2) {
      const emptyModules = formData.modules.some(module => !module.title.trim() || !module.duration);
      if (emptyModules) stepErrors.modules = 'Wszystkie moduły muszą mieć tytuł i czas trwania';
      
      const emptyTopics = formData.modules.some(module => 
        module.topics.some(topic => !topic.trim())
      );
      if (emptyTopics) stepErrors.moduleTopics = 'Wszystkie tematy modułów muszą być wypełnione';
    } else if (step === 3) {
      const emptyMaterials = formData.materials.some(material => !material.trim());
      if (emptyMaterials) stepErrors.materials = 'Wszystkie materiały szkoleniowe muszą być wypełnione';
      
      const emptyRequirements = formData.completionRequirements.some(req => !req.trim());
      if (emptyRequirements) stepErrors.completionRequirements = 'Wszystkie wymagania ukończenia muszą być wypełnione';
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
    console.log('Zapisywanie danych szkolenia:', formData);
    
    // Symulacja zapisywania
    setTimeout(() => {
      navigate('/training-and-education');
    }, 1000);
  };
  
  const steps = [
    'Informacje podstawowe',
    'Cele szkoleniowe',
    'Moduły szkoleniowe',
    'Materiały i wymagania'
  ];
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych szkolenia...</Typography>
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
          Zapisz szkolenie
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
          {isEditMode ? 'Edycja szkolenia' : 'Nowe szkolenie'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Wypełnij poniższy formularz, aby {isEditMode ? 'zaktualizować' : 'utworzyć'} szkolenie z zakresu ochrony danych osobowych.
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
                  <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
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
                    label="Tytuł szkolenia"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Typ szkolenia</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Typ szkolenia"
                    >
                      <MenuItem value="e-learning">E-learning</MenuItem>
                      <MenuItem value="webinar">Webinar</MenuItem>
                      <MenuItem value="workshop">Warsztat</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value="planned">Planowane</MenuItem>
                      <MenuItem value="active">Aktywne</MenuItem>
                      <MenuItem value="completed">Zakończone</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Grupa docelowa"
                    name="targetGroup"
                    value={formData.targetGroup}
                    onChange={handleChange}
                    error={!!errors.targetGroup}
                    helperText={errors.targetGroup}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Czas trwania (minuty)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    error={!!errors.duration}
                    helperText={errors.duration}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.mandatory}
                        onChange={handleCheckboxChange}
                        name="mandatory"
                        color="primary"
                      />
                    }
                    label="Szkolenie obowiązkowe"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Opis szkolenia"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    multiline
                    rows={4}
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
                  <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Cele szkoleniowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              {errors.learningObjectives && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {errors.learningObjectives}
                </Typography>
              )}
              
              {formData.learningObjectives.map((objective, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Cel szkoleniowy ${index + 1}`}
                    value={objective}
                    onChange={(e) => handleArrayChange('learningObjectives', index, e.target.value)}
                    sx={{ mr: 1 }}
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveArrayItem('learningObjectives', index)}
                    disabled={formData.learningObjectives.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddArrayItem('learningObjectives')}
                sx={{ mt: 1 }}
              >
                Dodaj cel szkoleniowy
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
                  <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Moduły szkoleniowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              {(errors.modules || errors.moduleTopics) && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {errors.modules || errors.moduleTopics}
                </Typography>
              )}
              
              {formData.modules.map((module, moduleIndex) => (
                <Card 
                  key={moduleIndex} 
                  variant="outlined" 
                  sx={{ mb: 3, position: 'relative' }}
                >
                  <CardContent>
                    <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveModule(moduleIndex)}
                        disabled={formData.modules.length <= 1}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Moduł {moduleIndex + 1}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          required
                          label="Tytuł modułu"
                          value={module.title}
                          onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          required
                          label="Czas trwania (minuty)"
                          type="number"
                          value={module.duration}
                          onChange={(e) => handleModuleChange(moduleIndex, 'duration', e.target.value)}
                          InputProps={{ inputProps: { min: 1 } }}
                        />
                      </Grid>
                    </Grid>
                    
                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                      Tematy:
                    </Typography>
                    
                    {module.topics.map((topic, topicIndex) => (
                      <Box key={topicIndex} sx={{ display: 'flex', mb: 1 }}>
                        <TextField
                          fullWidth
                          label={`Temat ${topicIndex + 1}`}
                          value={topic}
                          onChange={(e) => handleModuleTopicChange(moduleIndex, topicIndex, e.target.value)}
                          sx={{ mr: 1 }}
                        />
                        <IconButton 
                          color="error" 
                          onClick={() => handleRemoveModuleTopic(moduleIndex, topicIndex)}
                          disabled={module.topics.length <= 1}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => handleAddModuleTopic(moduleIndex)}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Dodaj temat
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddModule}
                variant="outlined"
                sx={{ mt: 1 }}
              >
                Dodaj moduł szkoleniowy
              </Button>
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
                    <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Materiały szkoleniowe</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                {errors.materials && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errors.materials}
                  </Typography>
                )}
                
                {formData.materials.map((material, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      fullWidth
                      label={`Materiał ${index + 1}`}
                      value={material}
                      onChange={(e) => handleArrayChange('materials', index, e.target.value)}
                      sx={{ mr: 1 }}
                    />
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveArrayItem('materials', index)}
                      disabled={formData.materials.length <= 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddArrayItem('materials')}
                  sx={{ mt: 1 }}
                >
                  Dodaj materiał
                </Button>
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
                    <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Wymagania ukończenia</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                {errors.completionRequirements && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errors.completionRequirements}
                  </Typography>
                )}
                
                {formData.completionRequirements.map((requirement, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      fullWidth
                      label={`Wymaganie ${index + 1}`}
                      value={requirement}
                      onChange={(e) => handleArrayChange('completionRequirements', index, e.target.value)}
                      sx={{ mr: 1 }}
                    />
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveArrayItem('completionRequirements', index)}
                      disabled={formData.completionRequirements.length <= 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddArrayItem('completionRequirements')}
                  sx={{ mt: 1 }}
                >
                  Dodaj wymaganie
                </Button>
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
              Zapisz szkolenie
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TrainingForm;
