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
  ListItemText
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'create' ? 'Nowa konfiguracja raportu' : 'Edycja konfiguracji raportu'}
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Konfiguracja raportu została pomyślnie {mode === 'create' ? 'utworzona' : 'zaktualizowana'}.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Podstawowe informacje
              </Typography>
            </Grid>
            
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
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.reportTypes} required>
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
                        <Chip key={value} label={reportTypeLabels[value] || value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  disabled={loading}
                >
                  {reportTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={formData.reportTypes.indexOf(type) > -1} />
                      <ListItemText primary={reportTypeLabels[type] || type} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.reportTypes && <FormHelperText>{errors.reportTypes}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Zakres czasowy
              </Typography>
            </Grid>
            
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
                    disabled: loading
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
                    disabled: loading
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Harmonogram i dostarczanie
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              <FormControl fullWidth>
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
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Zawartość raportu
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="includeCharts"
                    checked={formData.includeCharts}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Dołącz wykresy"
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
                  />
                }
                label="Dołącz tabele"
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
                  />
                }
                label="Dołącz surowe dane"
              />
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
                {loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz raport' : 'Zapisz zmiany'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ReportConfigurationForm;
