// src/features/SubjectRequestsManagement/components/SubjectRequestForm.jsx
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
  Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';

const SubjectRequestForm = ({ request, mode = 'create' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    requestType: request?.requestType || '',
    status: request?.status || 'new',
    firstName: request?.firstName || '',
    lastName: request?.lastName || '',
    email: request?.email || '',
    phone: request?.phone || '',
    address: request?.address || '',
    identificationMethod: request?.identificationMethod || '',
    identificationDetails: request?.identificationDetails || '',
    requestDetails: request?.requestDetails || '',
    requestDate: request?.requestDate ? new Date(request.requestDate) : new Date(),
    deadlineDate: request?.deadlineDate ? new Date(request.deadlineDate) : new Date(new Date().setDate(new Date().getDate() + 30)),
    assignedTo: request?.assignedTo || '',
    responseDetails: request?.responseDetails || '',
    responseDate: request?.responseDate ? new Date(request.responseDate) : null,
    identityVerified: request?.identityVerified || false,
    requestExtended: request?.requestExtended || false,
    extensionReason: request?.extensionReason || '',
    attachments: []
  });
  
  const [errors, setErrors] = useState({
    requestType: '',
    firstName: '',
    lastName: '',
    email: '',
    identificationMethod: '',
    requestDetails: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      requestType: '',
      firstName: '',
      lastName: '',
      email: '',
      identificationMethod: '',
      requestDetails: ''
    };

    if (!formData.requestType) {
      newErrors.requestType = 'Typ wniosku jest wymagany';
      isValid = false;
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest wymagane';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format adresu email';
      isValid = false;
    }

    if (!formData.identificationMethod) {
      newErrors.identificationMethod = 'Metoda identyfikacji jest wymagana';
      isValid = false;
    }

    if (!formData.requestDetails.trim()) {
      newErrors.requestDetails = 'Szczegóły wniosku są wymagane';
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
      // const response = await api.subjectRequests.create(formData);
      // lub
      // const response = await api.subjectRequests.update(request.id, formData);
      
      setSuccess(true);
      
      // Przekierowanie po udanym zapisie (po 2 sekundach)
      setTimeout(() => {
        navigate('/subject-requests');
      }, 2000);
      
    } catch (err) {
      console.error('Błąd podczas zapisywania wniosku:', err);
      setError('Wystąpił błąd podczas zapisywania wniosku. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/subject-requests');
  };

  // Obliczanie daty terminu na podstawie daty wniosku i typu wniosku
  const calculateDeadlineDate = (requestDate, requestType, extended = false) => {
    const date = new Date(requestDate);
    
    // Standardowy termin to 30 dni
    let daysToAdd = 30;
    
    // Dla wniosków o usunięcie i sprzeciwu - 21 dni
    if (requestType === 'erasure' || requestType === 'objection') {
      daysToAdd = 21;
    }
    
    // Jeśli wniosek został przedłużony, dodajemy dodatkowe 60 dni
    if (extended) {
      daysToAdd += 60;
    }
    
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  // Aktualizacja terminu przy zmianie typu wniosku lub daty wniosku
  React.useEffect(() => {
    if (formData.requestDate && formData.requestType) {
      const newDeadline = calculateDeadlineDate(
        formData.requestDate,
        formData.requestType,
        formData.requestExtended
      );
      
      setFormData(prev => ({
        ...prev,
        deadlineDate: newDeadline
      }));
    }
  }, [formData.requestDate, formData.requestType, formData.requestExtended]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'create' ? 'Nowy wniosek podmiotu danych' : 'Edycja wniosku podmiotu danych'}
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Wniosek został pomyślnie {mode === 'create' ? 'utworzony' : 'zaktualizowany'}.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informacje o wniosku
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.requestType} required>
                <InputLabel>Typ wniosku</InputLabel>
                <Select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  label="Typ wniosku"
                  disabled={loading}
                >
                  <MenuItem value="">
                    <em>Wybierz typ wniosku</em>
                  </MenuItem>
                  <MenuItem value="access">Dostęp do danych (Art. 15 RODO)</MenuItem>
                  <MenuItem value="rectification">Sprostowanie danych (Art. 16 RODO)</MenuItem>
                  <MenuItem value="erasure">Usunięcie danych (Art. 17 RODO)</MenuItem>
                  <MenuItem value="restriction">Ograniczenie przetwarzania (Art. 18 RODO)</MenuItem>
                  <MenuItem value="portability">Przenoszenie danych (Art. 20 RODO)</MenuItem>
                  <MenuItem value="objection">Sprzeciw (Art. 21 RODO)</MenuItem>
                  <MenuItem value="withdrawal">Wycofanie zgody (Art. 7 RODO)</MenuItem>
                  <MenuItem value="other">Inny</MenuItem>
                </Select>
                {errors.requestType && <FormHelperText>{errors.requestType}</FormHelperText>}
              </FormControl>
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
                  <MenuItem value="verification">Weryfikacja tożsamości</MenuItem>
                  <MenuItem value="in_progress">W trakcie realizacji</MenuItem>
                  <MenuItem value="waiting_for_info">Oczekiwanie na informacje</MenuItem>
                  <MenuItem value="completed">Zrealizowany</MenuItem>
                  <MenuItem value="rejected">Odrzucony</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data wniosku"
                value={formData.requestDate}
                onChange={(date) => handleDateChange('requestDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    disabled: loading
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Termin realizacji"
                value={formData.deadlineDate}
                onChange={(date) => handleDateChange('deadlineDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    disabled: loading
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="requestExtended"
                    checked={formData.requestExtended}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Przedłużenie terminu realizacji wniosku"
              />
            </Grid>
            
            {formData.requestExtended && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Powód przedłużenia terminu"
                  name="extensionReason"
                  value={formData.extensionReason}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  disabled={loading}
                  required={formData.requestExtended}
                  placeholder="Podaj powód przedłużenia terminu realizacji wniosku"
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Dane wnioskodawcy
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Imię"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={loading}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nazwisko"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={loading}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adres"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={2}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.identificationMethod} required>
                <InputLabel>Metoda identyfikacji</InputLabel>
                <Select
                  name="identificationMethod"
                  value={formData.identificationMethod}
                  onChange={handleChange}
                  label="Metoda identyfikacji"
                  disabled={loading}
                >
                  <MenuItem value="">
                    <em>Wybierz metodę identyfikacji</em>
                  </MenuItem>
                  <MenuItem value="id_card">Dowód osobisty</MenuItem>
                  <MenuItem value="passport">Paszport</MenuItem>
                  <MenuItem value="email_verification">Weryfikacja email</MenuItem>
                  <MenuItem value="account_login">Logowanie do konta</MenuItem>
                  <MenuItem value="other">Inna</MenuItem>
                </Select>
                {errors.identificationMethod && <FormHelperText>{errors.identificationMethod}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Szczegóły identyfikacji"
                name="identificationDetails"
                value={formData.identificationDetails}
                onChange={handleChange}
                disabled={loading}
                placeholder="Np. numer dokumentu, adres email"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="identityVerified"
                    checked={formData.identityVerified}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Tożsamość zweryfikowana"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Szczegóły wniosku
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Treść wniosku"
                name="requestDetails"
                value={formData.requestDetails}
                onChange={handleChange}
                multiline
                rows={4}
                error={!!errors.requestDetails}
                helperText={errors.requestDetails}
                disabled={loading}
                required
                placeholder="Szczegółowy opis wniosku podmiotu danych"
              />
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
                Odpowiedź na wniosek
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Treść odpowiedzi"
                name="responseDetails"
                value={formData.responseDetails}
                onChange={handleChange}
                multiline
                rows={4}
                disabled={loading}
                placeholder="Szczegółowa odpowiedź na wniosek podmiotu danych"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Data odpowiedzi"
                value={formData.responseDate}
                onChange={(date) => handleDateChange('responseDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    disabled: loading
                  }
                }}
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
                {loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz wniosek' : 'Zapisz zmiany'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default SubjectRequestForm;
