// src/features/ConsentManagement/components/ConsentManagementDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const ConsentManagementDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [consent, setConsent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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
          createdAt: '2025-04-15',
          expiresAt: '2026-04-15',
          createdBy: 'Jan Kowalski',
          lastModifiedBy: 'Anna Nowak',
          lastModifiedAt: '2025-04-20',
          version: '1.0',
          consentText: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez [Nazwa Firmy] w celach marketingowych, w tym przesyłanie informacji handlowych drogą elektroniczną na podany przeze mnie adres e-mail. Zgoda jest dobrowolna i może być w każdej chwili wycofana.',
          revocationMethod: 'Link w stopce wiadomości e-mail lub kontakt z IOD',
          dataRetentionPeriod: '12 miesięcy od wycofania zgody',
          recipients: ['Dział marketingu', 'Zewnętrzni dostawcy usług marketingowych']
        };
        
        setConsent(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleBack = () => {
    navigate('/consent-management');
  };
  
  const handleEdit = () => {
    navigate(`/consent-management/${id}/edit`);
  };
  
  const handleDelete = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć tę zgodę?')) {
      navigate('/consent-management');
    }
  };
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych zgody...</Typography>
      </Paper>
    );
  }
  
  if (!consent) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Nie znaleziono zgody o podanym ID.</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Powrót do listy
        </Button>
      </Paper>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Powrót do listy
        </Button>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            Edytuj
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Usuń
          </Button>
        </Box>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              {consent.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label={consent.type} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={consent.status === 'active' ? 'Aktywna' : consent.status === 'inactive' ? 'Nieaktywna' : 'Oczekująca'} 
                color={consent.status === 'active' ? 'success' : consent.status === 'inactive' ? 'error' : 'warning'} 
              />
              <Chip 
                label={`Wersja ${consent.version}`} 
                color="default" 
                variant="outlined" 
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Utworzono: {new Date(consent.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wygasa: {new Date(consent.expiresAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow: 'hidden'
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
                <Typography variant="subtitle1" gutterBottom>Opis</Typography>
                <Typography variant="body2" paragraph>
                  {consent.description}
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>Podstawa prawna</Typography>
                <Typography variant="body2" paragraph>
                  {consent.legalBasis}
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>Treść zgody</Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    mb: 2
                  }}
                >
                  <Typography variant="body2">
                    {consent.consentText}
                  </Typography>
                </Paper>
                
                <Typography variant="subtitle1" gutterBottom>Metoda wycofania zgody</Typography>
                <Typography variant="body2" paragraph>
                  {consent.revocationMethod}
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom>Okres przechowywania danych</Typography>
                <Typography variant="body2">
                  {consent.dataRetentionPeriod}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow: 'hidden'
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
                <Typography variant="subtitle1" gutterBottom>Kategorie danych</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {consent.dataCategories.map((category, index) => (
                    <Chip 
                      key={index}
                      label={category} 
                      color="primary" 
                      variant="outlined" 
                      size="small"
                    />
                  ))}
                </Box>
                
                <Typography variant="subtitle1" gutterBottom>Cele przetwarzania</Typography>
                <List dense>
                  {consent.purposes.map((purpose, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <SettingsIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={purpose} />
                    </ListItem>
                  ))}
                </List>
                
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Odbiorcy danych</Typography>
                <List dense>
                  {consent.recipients.map((recipient, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <PersonIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={recipient} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card 
              elevation={0} 
              sx={{ 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow: 'hidden'
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">Historia zmian</Typography>
                  </Box>
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle2" color="text.secondary">Utworzono przez</Typography>
                    <Typography variant="body2">{consent.createdBy}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(consent.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle2" color="text.secondary">Ostatnia modyfikacja</Typography>
                    <Typography variant="body2">{consent.lastModifiedBy}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(consent.lastModifiedAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle2" color="text.secondary">Wersja</Typography>
                    <Typography variant="body2">{consent.version}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ConsentManagementDetail;
