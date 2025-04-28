// src/features/DataMapping/components/DataMappingForm.jsx
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
  alpha,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';
import CategoryIcon from '@mui/icons-material/Category';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SchemaIcon from '@mui/icons-material/Schema';

const DataMappingForm = ({ mode = 'create', mapping = null, onClose }) => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = mode === 'edit' || id !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dataOwner: '',
    dataCategory: '',
    dataClassification: 'standard',
    retentionPeriod: '',
    dataLocation: '',
    processingPurposes: [''],
    dataSubjects: [''],
    dataElements: [],
    dataFlows: [],
    securityMeasures: [''],
    legalBasis: '',
    thirdPartySharing: false,
    thirdParties: []
  });
  const [errors, setErrors] = useState({});
  
  // Przykładowe dane dla pól wyboru
  const dataCategories = [
    'Dane osobowe', 
    'Dane wrażliwe', 
    'Dane finansowe', 
    'Dane marketingowe', 
    'Dane HR', 
    'Dane techniczne'
  ];
  
  const dataClassifications = [
    { value: 'public', label: 'Publiczne' },
    { value: 'internal', label: 'Wewnętrzne' },
    { value: 'confidential', label: 'Poufne' },
    { value: 'restricted', label: 'Zastrzeżone' },
    { value: 'standard', label: 'Standardowe' }
  ];
  
  const legalBasisOptions = [
    'Zgoda (Art. 6 ust. 1 lit. a) RODO)',
    'Umowa (Art. 6 ust. 1 lit. b) RODO)',
    'Obowiązek prawny (Art. 6 ust. 1 lit. c) RODO)',
    'Żywotne interesy (Art. 6 ust. 1 lit. d) RODO)',
    'Zadanie publiczne (Art. 6 ust. 1 lit. e) RODO)',
    'Uzasadniony interes (Art. 6 ust. 1 lit. f) RODO)'
  ];
  
  const dataElementTypes = [
    'Imię i nazwisko',
    'Adres e-mail',
    'Numer telefonu',
    'Adres zamieszkania',
    'PESEL',
    'NIP',
    'Data urodzenia',
    'Płeć',
    'Numer konta bankowego',
    'Dane o zdrowiu',
    'Dane o wynagrodzeniu',
    'Adres IP',
    'Pliki cookie',
    'Geolokalizacja',
    'Inne'
  ];
  
  useEffect(() => {
    if (isEditMode && mapping) {
      setFormData(mapping);
      setLoading(false);
    } else if (isEditMode && id) {
      // Symulacja pobierania danych z API
      const fetchData = async () => {
        try {
          // W rzeczywistej aplikacji byłoby to wywołanie API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Przykładowe dane
          const mockData = {
            id: parseInt(id),
            name: 'Mapowanie danych klientów',
            description: 'Mapowanie danych klientów w systemie CRM',
            dataOwner: 'Dział Obsługi Klienta',
            dataCategory: 'Dane osobowe',
            dataClassification: 'confidential',
            retentionPeriod: '5 lat od ostatniego kontaktu',
            dataLocation: 'Serwer wewnętrzny, chmura AWS',
            processingPurposes: [
              'Obsługa klienta',
              'Marketing bezpośredni',
              'Analiza zachowań klientów'
            ],
            dataSubjects: [
              'Klienci indywidualni',
              'Potencjalni klienci'
            ],
            dataElements: [
              { name: 'Imię i nazwisko', type: 'Imię i nazwisko', sensitivity: 'standard' },
              { name: 'Email', type: 'Adres e-mail', sensitivity: 'standard' },
              { name: 'Telefon', type: 'Numer telefonu', sensitivity: 'standard' },
              { name: 'Adres', type: 'Adres zamieszkania', sensitivity: 'confidential' },
              { name: 'Historia zakupów', type: 'Inne', sensitivity: 'internal' }
            ],
            dataFlows: [
              { source: 'Formularz kontaktowy', destination: 'CRM', description: 'Dane z formularza kontaktowego na stronie www', frequency: 'Ciągła' },
              { source: 'CRM', destination: 'System mailingowy', description: 'Eksport danych do systemu mailingowego', frequency: 'Codzienna' }
            ],
            securityMeasures: [
              'Szyfrowanie danych',
              'Kontrola dostępu',
              'Regularne kopie zapasowe'
            ],
            legalBasis: 'Zgoda (Art. 6 ust. 1 lit. a) RODO)',
            thirdPartySharing: true,
            thirdParties: [
              { name: 'Dostawca usług mailingowych', purpose: 'Wysyłka newslettera', country: 'UE', safeguards: 'Umowa powierzenia' },
              { name: 'Dostawca usług analitycznych', purpose: 'Analiza zachowań klientów', country: 'USA', safeguards: 'Standardowe klauzule umowne' }
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
  }, [id, isEditMode, mapping]);
  
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
  
  // Obsługa elementów danych
  const handleAddDataElement = () => {
    setFormData(prev => ({
      ...prev,
      dataElements: [...prev.dataElements, { name: '', type: '', sensitivity: 'standard' }]
    }));
  };
  
  const handleRemoveDataElement = (index) => {
    const newElements = [...formData.dataElements];
    newElements.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      dataElements: newElements
    }));
  };
  
  const handleDataElementChange = (index, field, value) => {
    const newElements = [...formData.dataElements];
    newElements[index] = {
      ...newElements[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      dataElements: newElements
    }));
  };
  
  // Obsługa przepływów danych
  const handleAddDataFlow = () => {
    setFormData(prev => ({
      ...prev,
      dataFlows: [...prev.dataFlows, { source: '', destination: '', description: '', frequency: '' }]
    }));
  };
  
  const handleRemoveDataFlow = (index) => {
    const newFlows = [...formData.dataFlows];
    newFlows.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      dataFlows: newFlows
    }));
  };
  
  const handleDataFlowChange = (index, field, value) => {
    const newFlows = [...formData.dataFlows];
    newFlows[index] = {
      ...newFlows[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      dataFlows: newFlows
    }));
  };
  
  // Obsługa podmiotów trzecich
  const handleAddThirdParty = () => {
    setFormData(prev => ({
      ...prev,
      thirdParties: [...prev.thirdParties, { name: '', purpose: '', country: '', safeguards: '' }]
    }));
  };
  
  const handleRemoveThirdParty = (index) => {
    const newThirdParties = [...formData.thirdParties];
    newThirdParties.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      thirdParties: newThirdParties
    }));
  };
  
  const handleThirdPartyChange = (index, field, value) => {
    const newThirdParties = [...formData.thirdParties];
    newThirdParties[index] = {
      ...newThirdParties[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      thirdParties: newThirdParties
    }));
  };
  
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/data-mapping');
    }
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
      if (!formData.name.trim()) stepErrors.name = 'Nazwa mapowania jest wymagana';
      if (!formData.description.trim()) stepErrors.description = 'Opis jest wymagany';
      if (!formData.dataOwner.trim()) stepErrors.dataOwner = 'Właściciel danych jest wymagany';
      if (!formData.dataCategory.trim()) stepErrors.dataCategory = 'Kategoria danych jest wymagana';
    } else if (step === 1) {
      if (formData.dataElements.length === 0) {
        stepErrors.dataElements = 'Dodaj co najmniej jeden element danych';
      } else {
        const invalidElements = formData.dataElements.some(el => !el.name.trim() || !el.type.trim());
        if (invalidElements) stepErrors.dataElements = 'Wszystkie elementy danych muszą być wypełnione';
      }
      
      const emptyPurposes = formData.processingPurposes.some(purpose => !purpose.trim());
      if (emptyPurposes) stepErrors.processingPurposes = 'Wszystkie cele przetwarzania muszą być wypełnione';
      
      const emptySubjects = formData.dataSubjects.some(subject => !subject.trim());
      if (emptySubjects) stepErrors.dataSubjects = 'Wszystkie podmioty danych muszą być wypełnione';
    } else if (step === 2) {
      if (!formData.legalBasis.trim()) stepErrors.legalBasis = 'Podstawa prawna jest wymagana';
      if (!formData.retentionPeriod.trim()) stepErrors.retentionPeriod = 'Okres przechowywania jest wymagany';
      
      const emptyMeasures = formData.securityMeasures.some(measure => !measure.trim());
      if (emptyMeasures) stepErrors.securityMeasures = 'Wszystkie środki bezpieczeństwa muszą być wypełnione';
      
      if (formData.thirdPartySharing && formData.thirdParties.length === 0) {
        stepErrors.thirdParties = 'Dodaj co najmniej jeden podmiot trzeci';
      } else if (formData.thirdPartySharing) {
        const invalidThirdParties = formData.thirdParties.some(tp => !tp.name.trim() || !tp.purpose.trim());
        if (invalidThirdParties) stepErrors.thirdParties = 'Wszystkie podmioty trzecie muszą być wypełnione';
      }
    }
    
    return stepErrors;
  };
  
  const validateForm = () => {
    let isValid = true;
    let allErrors = {};
    
    for (let i = 0; i < 3; i++) {
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
    console.log('Zapisywanie danych mapowania:', formData);
    
    // Symulacja zapisywania
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onClose) {
        onClose();
      } else {
        navigate('/data-mapping');
      }
    }, 1000);
  };
  
  const steps = [
    'Informacje podstawowe',
    'Elementy danych',
    'Bezpieczeństwo i udostępnianie'
  ];
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych mapowania...</Typography>
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
          Zapisz mapowanie
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
          {isEditMode ? 'Edycja mapowania danych' : 'Nowe mapowanie danych'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Wypełnij poniższy formularz, aby {isEditMode ? 'zaktualizować' : 'utworzyć'} mapowanie danych zgodnie z RODO.
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
                  <SchemaIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
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
                    label="Nazwa mapowania"
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
                    label="Właściciel danych"
                    name="dataOwner"
                    value={formData.dataOwner}
                    onChange={handleChange}
                    error={!!errors.dataOwner}
                    helperText={errors.dataOwner}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" error={!!errors.dataCategory}>
                    <InputLabel id="data-category-label">Kategoria danych</InputLabel>
                    <Select
                      labelId="data-category-label"
                      name="dataCategory"
                      value={formData.dataCategory}
                      onChange={handleChange}
                      label="Kategoria danych"
                      required
                    >
                      {dataCategories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                    {errors.dataCategory && <FormHelperText>{errors.dataCategory}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="data-classification-label">Klasyfikacja danych</InputLabel>
                    <Select
                      labelId="data-classification-label"
                      name="dataClassification"
                      value={formData.dataClassification}
                      onChange={handleChange}
                      label="Klasyfikacja danych"
                    >
                      {dataClassifications.map((classification) => (
                        <MenuItem key={classification.value} value={classification.value}>
                          {classification.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lokalizacja danych"
                    name="dataLocation"
                    value={formData.dataLocation}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    placeholder="Np. Serwer wewnętrzny, chmura AWS, itp."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={3}
                    label="Opis mapowania"
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
                    <StorageIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Elementy danych</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                {errors.dataElements && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errors.dataElements}
                  </Typography>
                )}
                
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nazwa elementu</TableCell>
                        <TableCell>Typ danych</TableCell>
                        <TableCell>Wrażliwość</TableCell>
                        <TableCell width="100px">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.dataElements.map((element, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              value={element.name}
                              onChange={(e) => handleDataElementChange(index, 'name', e.target.value)}
                              placeholder="Nazwa elementu"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={element.type}
                                onChange={(e) => handleDataElementChange(index, 'type', e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>Wybierz typ</MenuItem>
                                {dataElementTypes.map((type) => (
                                  <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={element.sensitivity}
                                onChange={(e) => handleDataElementChange(index, 'sensitivity', e.target.value)}
                              >
                                {dataClassifications.map((classification) => (
                                  <MenuItem key={classification.value} value={classification.value}>
                                    {classification.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveDataElement(index)}
                              disabled={formData.dataElements.length <= 1}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddDataElement}
                  sx={{ mb: 3 }}
                >
                  Dodaj element danych
                </Button>
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Cele przetwarzania
                    </Typography>
                    {formData.processingPurposes.map((purpose, index) => (
                      <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          value={purpose}
                          onChange={(e) => handleArrayChange('processingPurposes', index, e.target.value)}
                          placeholder="Cel przetwarzania"
                          error={errors.processingPurposes && !purpose.trim()}
                          variant="outlined"
                        />
                        <IconButton 
                          color="error"
                          onClick={() => handleRemoveArrayItem('processingPurposes', index)}
                          disabled={formData.processingPurposes.length <= 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    {errors.processingPurposes && (
                      <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                        {errors.processingPurposes}
                      </Typography>
                    )}
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddArrayItem('processingPurposes')}
                    >
                      Dodaj cel
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Podmioty danych
                    </Typography>
                    {formData.dataSubjects.map((subject, index) => (
                      <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          value={subject}
                          onChange={(e) => handleArrayChange('dataSubjects', index, e.target.value)}
                          placeholder="Podmiot danych"
                          error={errors.dataSubjects && !subject.trim()}
                          variant="outlined"
                        />
                        <IconButton 
                          color="error"
                          onClick={() => handleRemoveArrayItem('dataSubjects', index)}
                          disabled={formData.dataSubjects.length <= 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    {errors.dataSubjects && (
                      <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                        {errors.dataSubjects}
                      </Typography>
                    )}
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddArrayItem('dataSubjects')}
                    >
                      Dodaj podmiot
                    </Button>
                  </Grid>
                </Grid>
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
                    <CompareArrowsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Przepływy danych</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Źródło</TableCell>
                        <TableCell>Cel</TableCell>
                        <TableCell>Opis</TableCell>
                        <TableCell>Częstotliwość</TableCell>
                        <TableCell width="100px">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.dataFlows.map((flow, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              value={flow.source}
                              onChange={(e) => handleDataFlowChange(index, 'source', e.target.value)}
                              placeholder="Źródło"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              value={flow.destination}
                              onChange={(e) => handleDataFlowChange(index, 'destination', e.target.value)}
                              placeholder="Cel"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              value={flow.description}
                              onChange={(e) => handleDataFlowChange(index, 'description', e.target.value)}
                              placeholder="Opis"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              value={flow.frequency}
                              onChange={(e) => handleDataFlowChange(index, 'frequency', e.target.value)}
                              placeholder="Częstotliwość"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveDataFlow(index)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddDataFlow}
                >
                  Dodaj przepływ danych
                </Button>
              </CardContent>
            </Card>
          </>
        )}
        
        {activeStep === 2 && (
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
                    <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Bezpieczeństwo i podstawy prawne</Typography>
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
                    <FormControl fullWidth margin="normal" error={!!errors.legalBasis}>
                      <InputLabel id="legal-basis-label">Podstawa prawna</InputLabel>
                      <Select
                        labelId="legal-basis-label"
                        name="legalBasis"
                        value={formData.legalBasis}
                        onChange={handleChange}
                        label="Podstawa prawna"
                        required
                      >
                        {legalBasisOptions.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                      {errors.legalBasis && <FormHelperText>{errors.legalBasis}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Okres przechowywania"
                      name="retentionPeriod"
                      value={formData.retentionPeriod}
                      onChange={handleChange}
                      error={!!errors.retentionPeriod}
                      helperText={errors.retentionPeriod}
                      variant="outlined"
                      margin="normal"
                      placeholder="Np. 5 lat od ostatniego kontaktu"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Środki bezpieczeństwa
                    </Typography>
                    {formData.securityMeasures.map((measure, index) => (
                      <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          value={measure}
                          onChange={(e) => handleArrayChange('securityMeasures', index, e.target.value)}
                          placeholder="Środek bezpieczeństwa"
                          error={errors.securityMeasures && !measure.trim()}
                          variant="outlined"
                        />
                        <IconButton 
                          color="error"
                          onClick={() => handleRemoveArrayItem('securityMeasures', index)}
                          disabled={formData.securityMeasures.length <= 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    {errors.securityMeasures && (
                      <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                        {errors.securityMeasures}
                      </Typography>
                    )}
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddArrayItem('securityMeasures')}
                    >
                      Dodaj środek bezpieczeństwa
                    </Button>
                  </Grid>
                </Grid>
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
                    <Typography variant="h6">Udostępnianie podmiotom trzecim</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    Czy dane są udostępniane podmiotom trzecim?
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button 
                        variant={formData.thirdPartySharing ? "contained" : "outlined"} 
                        color={formData.thirdPartySharing ? "primary" : "inherit"}
                        onClick={() => setFormData(prev => ({ ...prev, thirdPartySharing: true }))}
                      >
                        Tak
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button 
                        variant={!formData.thirdPartySharing ? "contained" : "outlined"}
                        color={!formData.thirdPartySharing ? "primary" : "inherit"}
                        onClick={() => setFormData(prev => ({ ...prev, thirdPartySharing: false }))}
                      >
                        Nie
                      </Button>
                    </Grid>
                  </Grid>
                </FormControl>
                
                {formData.thirdPartySharing && (
                  <>
                    {errors.thirdParties && (
                      <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {errors.thirdParties}
                      </Typography>
                    )}
                    
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nazwa podmiotu</TableCell>
                            <TableCell>Cel udostępnienia</TableCell>
                            <TableCell>Kraj</TableCell>
                            <TableCell>Zabezpieczenia</TableCell>
                            <TableCell width="100px">Akcje</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {formData.thirdParties.map((party, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={party.name}
                                  onChange={(e) => handleThirdPartyChange(index, 'name', e.target.value)}
                                  placeholder="Nazwa podmiotu"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={party.purpose}
                                  onChange={(e) => handleThirdPartyChange(index, 'purpose', e.target.value)}
                                  placeholder="Cel udostępnienia"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={party.country}
                                  onChange={(e) => handleThirdPartyChange(index, 'country', e.target.value)}
                                  placeholder="Kraj"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={party.safeguards}
                                  onChange={(e) => handleThirdPartyChange(index, 'safeguards', e.target.value)}
                                  placeholder="Zabezpieczenia"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleRemoveThirdParty(index)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddThirdParty}
                    >
                      Dodaj podmiot trzeci
                    </Button>
                  </>
                )}
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
              Zapisz mapowanie
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default DataMappingForm;
