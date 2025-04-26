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
  FormLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';

const IncidentForm = ({ incident, mode = 'create' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'create' ? 'Nowy incydent' : 'Edycja incydentu'}
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Incydent został pomyślnie {mode === 'create' ? 'utworzony' : 'zaktualizowany'}.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Podstawowe informacje
              </Typography>
            </Grid>
            
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
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.incidentType} required>
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
              <FormControl fullWidth>
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
                    disabled: loading
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
                    disabled: loading
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opis incydentu"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
                disabled={loading}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Naruszenie ochrony danych osobowych
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="dataBreachOccurred"
                    checked={formData.dataBreachOccurred}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Incydent stanowi naruszenie ochrony danych osobowych"
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
                    rows={2}
                    error={!!errors.affectedPersons}
                    helperText={errors.affectedPersons || "Opisz kategorie i przybliżoną liczbę osób, których dane dotyczą"}
                    disabled={loading}
                    required={formData.dataBreachOccurred}
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
                    rows={2}
                    error={!!errors.affectedData}
                    helperText={errors.affectedData || "Opisz kategorie i przybliżoną liczbę wpisów danych osobowych, których dotyczy naruszenie"}
                    disabled={loading}
                    required={formData.dataBreachOccurred}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Zgłoszenie do PUODO</FormLabel>
                    <RadioGroup
                      name="reportedToPuodo"
                      value={formData.reportedToPuodo.toString()}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        reportedToPuodo: e.target.value === 'true'
                      }))}
                      row
                    >
                      <FormControlLabel value="true" control={<Radio disabled={loading} />} label="Tak" />
                      <FormControlLabel value="false" control={<Radio disabled={loading} />} label="Nie" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Zgłoszenie do osób, których dane dotyczą</FormLabel>
                    <RadioGroup
                      name="reportedToDataSubjects"
                      value={formData.reportedToDataSubjects.toString()}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        reportedToDataSubjects: e.target.value === 'true'
                      }))}
                      row
                    >
                      <FormControlLabel value="true" control={<Radio disabled={loading} />} label="Tak" />
                      <FormControlLabel value="false" control={<Radio disabled={loading} />} label="Nie" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </>
            )}
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Działania naprawcze i zapobiegawcze
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Podjęte działania naprawcze"
                name="correctiveActions"
                value={formData.correctiveActions}
                onChange={handleChange}
                multiline
                rows={3}
                disabled={loading}
                placeholder="Opisz działania podjęte w celu usunięcia skutków incydentu"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Środki zapobiegawcze"
                name="preventiveMeasures"
                value={formData.preventiveMeasures}
                onChange={handleChange}
                multiline
                rows={3}
                disabled={loading}
                placeholder="Opisz środki zastosowane w celu zapobieżenia podobnym incydentom w przyszłości"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Załączniki
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                disabled={loading}
                sx={{ mr: 2 }}
              >
                Dodaj załączniki
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              
              {formData.attachments.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Wybrane pliki:
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
