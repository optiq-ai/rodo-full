// src/features/ConsentManagement/components/ConsentTemplates.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const ConsentTemplates = () => {
  const theme = useTheme();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    type: 'marketing',
    content: '',
    language: 'pl'
  });
  
  useEffect(() => {
    // Symulacja pobierania danych z API
    const fetchData = async () => {
      try {
        // W rzeczywistej aplikacji byłoby to wywołanie API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Przykładowe dane
        const mockData = [
          {
            id: 1,
            name: 'Zgoda marketingowa - podstawowa',
            description: 'Standardowa zgoda na przetwarzanie danych w celach marketingowych',
            type: 'marketing',
            content: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez [Nazwa Firmy] w celach marketingowych, w tym przesyłanie informacji handlowych drogą elektroniczną na podany przeze mnie adres e-mail. Zgoda jest dobrowolna i może być w każdej chwili wycofana.',
            language: 'pl',
            createdAt: '2025-03-15',
            lastUsed: '2025-04-20',
            usageCount: 48
          },
          {
            id: 2,
            name: 'Zgoda na newsletter',
            description: 'Zgoda na otrzymywanie newslettera',
            type: 'newsletter',
            content: 'Wyrażam zgodę na otrzymywanie od [Nazwa Firmy] informacji handlowych drogą elektroniczną w postaci newslettera, na podany przeze mnie adres e-mail. Wiem, że w każdej chwili mogę wycofać zgodę, klikając link rezygnacji w stopce każdego newslettera.',
            language: 'pl',
            createdAt: '2025-03-18',
            lastUsed: '2025-04-22',
            usageCount: 35
          },
          {
            id: 3,
            name: 'Zgoda na profilowanie',
            description: 'Zgoda na profilowanie w celu personalizacji oferty',
            type: 'profiling',
            content: 'Wyrażam zgodę na profilowanie moich danych osobowych przez [Nazwa Firmy] w celu dopasowania oferty produktowej do moich preferencji i zainteresowań. Rozumiem, że zgoda jest dobrowolna i mogę ją wycofać w dowolnym momencie, co nie wpłynie na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.',
            language: 'pl',
            createdAt: '2025-03-20',
            lastUsed: '2025-04-15',
            usageCount: 27
          },
          {
            id: 4,
            name: 'Zgoda na udostępnianie danych partnerom',
            description: 'Zgoda na udostępnianie danych partnerom biznesowym',
            type: 'sharing',
            content: 'Wyrażam zgodę na udostępnianie moich danych osobowych partnerom biznesowym [Nazwa Firmy] w celu przedstawienia mi ofert produktów i usług tych partnerów. Lista partnerów dostępna jest na stronie internetowej [adres strony]. Zgoda jest dobrowolna i może być w każdej chwili wycofana.',
            language: 'pl',
            createdAt: '2025-03-25',
            lastUsed: '2025-04-10',
            usageCount: 15
          },
          {
            id: 5,
            name: 'Marketing consent - basic',
            description: 'Standard consent for data processing for marketing purposes',
            type: 'marketing',
            content: 'I consent to the processing of my personal data by [Company Name] for marketing purposes, including sending commercial information by electronic means to the e-mail address provided by me. The consent is voluntary and can be withdrawn at any time.',
            language: 'en',
            createdAt: '2025-03-28',
            lastUsed: '2025-04-18',
            usageCount: 22
          }
        ];
        
        setTemplates(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleOpenDialog = (template = null) => {
    if (template) {
      setSelectedTemplate(template);
      setNewTemplate({
        name: template.name,
        description: template.description,
        type: template.type,
        content: template.content,
        language: template.language
      });
    } else {
      setSelectedTemplate(null);
      setNewTemplate({
        name: '',
        description: '',
        type: 'marketing',
        content: '',
        language: 'pl'
      });
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveTemplate = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (selectedTemplate) {
      // Edycja istniejącego szablonu
      const updatedTemplates = templates.map(template => 
        template.id === selectedTemplate.id ? { ...template, ...newTemplate } : template
      );
      setTemplates(updatedTemplates);
    } else {
      // Dodanie nowego szablonu
      const newTemplateWithId = {
        ...newTemplate,
        id: Math.max(...templates.map(t => t.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: null,
        usageCount: 0
      };
      setTemplates([...templates, newTemplateWithId]);
    }
    
    handleCloseDialog();
  };
  
  const handleDeleteTemplate = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć ten szablon?')) {
      setTemplates(templates.filter(template => template.id !== id));
    }
  };
  
  const handleCopyTemplate = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        alert('Skopiowano treść szablonu do schowka!');
      })
      .catch(err => {
        console.error('Błąd podczas kopiowania do schowka:', err);
      });
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'marketing':
        return 'primary';
      case 'newsletter':
        return 'secondary';
      case 'profiling':
        return 'error';
      case 'sharing':
        return 'warning';
      case 'cookies':
        return 'info';
      default:
        return 'default';
    }
  };
  
  const getTypeLabel = (type) => {
    switch (type) {
      case 'marketing':
        return 'Marketing';
      case 'newsletter':
        return 'Newsletter';
      case 'profiling':
        return 'Profilowanie';
      case 'sharing':
        return 'Udostępnianie';
      case 'cookies':
        return 'Cookies';
      default:
        return type;
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Ładowanie szablonów zgód...</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Szablony zgód
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Dodaj nowy szablon
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} md={6} key={template.id}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.15)}`
                }
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">{template.name}</Typography>
                  </Box>
                }
                subheader={template.description}
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={getTypeLabel(template.type)} 
                      color={getTypeColor(template.type)} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={template.language === 'pl' ? 'Polski' : 'English'} 
                      color="default" 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    mb: 2,
                    maxHeight: 150,
                    overflow: 'auto'
                  }}
                >
                  <Typography variant="body2">
                    {template.content}
                  </Typography>
                </Paper>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Utworzono: {template.createdAt}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Ostatnio użyto: {template.lastUsed || 'Nigdy'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Liczba użyć: {template.usageCount}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyTemplate(template.content)}
                >
                  Kopiuj treść
                </Button>
                <Box>
                  <IconButton 
                    color="secondary" 
                    onClick={() => handleOpenDialog(template)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteTemplate(template.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Dialog dodawania/edycji szablonu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTemplate ? 'Edytuj szablon zgody' : 'Dodaj nowy szablon zgody'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {selectedTemplate 
              ? 'Edytuj poniższe informacje, aby zaktualizować szablon zgody.' 
              : 'Wypełnij poniższe pola, aby utworzyć nowy szablon zgody.'}
          </DialogContentText>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Nazwa szablonu"
                name="name"
                value={newTemplate.name}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Typ zgody"
                name="type"
                value={newTemplate.type}
                onChange={handleInputChange}
                margin="normal"
                select
                SelectProps={{
                  native: true
                }}
              >
                <option value="marketing">Marketing</option>
                <option value="newsletter">Newsletter</option>
                <option value="profiling">Profilowanie</option>
                <option value="sharing">Udostępnianie danych</option>
                <option value="cookies">Cookies</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opis szablonu"
                name="description"
                value={newTemplate.description}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Treść zgody"
                name="content"
                value={newTemplate.content}
                onChange={handleInputChange}
                margin="normal"
                placeholder="Wyrażam zgodę na przetwarzanie moich danych osobowych przez [Nazwa Firmy] w celach..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Język"
                name="language"
                value={newTemplate.language}
                onChange={handleInputChange}
                margin="normal"
                select
                SelectProps={{
                  native: true
                }}
              >
                <option value="pl">Polski</option>
                <option value="en">English</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleSaveTemplate} 
            variant="contained" 
            color="primary"
            disabled={!newTemplate.name || !newTemplate.content}
          >
            {selectedTemplate ? 'Zapisz zmiany' : 'Dodaj szablon'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConsentTemplates;
