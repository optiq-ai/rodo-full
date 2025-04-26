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
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DocumentForm = ({ document, mode = 'create' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
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

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {mode === 'create' ? 'Nowy dokument' : 'Edycja dokumentu'}
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Dokument został pomyślnie {mode === 'create' ? 'utworzony' : 'zaktualizowany'}.
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.category} required>
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
            <FormControl fullWidth>
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
              rows={2}
              disabled={loading}
            />
          </Grid>
          
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
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              lub prześlij plik
            </Typography>
            <Button
              variant="outlined"
              component="label"
              disabled={loading}
              sx={{ mr: 2 }}
            >
              Wybierz plik
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {formData.file && (
              <Typography variant="body2" component="span">
                Wybrany plik: {formData.file.name}
              </Typography>
            )}
            {errors.file && (
              <FormHelperText error>{errors.file}</FormHelperText>
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
              {loading ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz dokument' : 'Zapisz zmiany'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DocumentForm;
