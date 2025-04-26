// src/features/RodoRegisters/components/RegisterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Divider, 
  Chip,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RegisterDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [register, setRegister] = useState(null);
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
          name: 'Rejestr pracowników',
          category: 'HR',
          status: 'active',
          lastUpdated: '2025-04-15',
          createdAt: '2025-01-10',
          dataSubjects: 'Pracownicy',
          dataController: 'Dział HR',
          dataProcessor: 'Wewnętrzny',
          riskLevel: 'low',
          legalBasis: 'Art. 6 ust. 1 lit. b) RODO - wykonanie umowy',
          retentionPeriod: '50 lat od zakończenia stosunku pracy',
          description: 'Rejestr zawiera dane osobowe pracowników przetwarzane w związku z zatrudnieniem, wynagrodzeniem i świadczeniami pracowniczymi.',
          personalDataCategories: [
            'Dane identyfikacyjne',
            'Dane kontaktowe',
            'Dane adresowe',
            'Dane finansowe',
            'Dane kadrowe'
          ],
          processingPurposes: [
            'Realizacja stosunku pracy',
            'Naliczanie wynagrodzeń',
            'Realizacja świadczeń pracowniczych',
            'Szkolenia i rozwój pracowników'
          ],
          securityMeasures: [
            'Kontrola dostępu',
            'Szyfrowanie danych',
            'Kopie zapasowe',
            'Szkolenia pracowników'
          ],
          dataRecipients: [
            'ZUS',
            'Urząd Skarbowy',
            'Firma szkoleniowa XYZ'
          ]
        };
        
        setRegister(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleEdit = () => {
    navigate(`/registers/${id}/edit`);
  };
  
  const handleDelete = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć ten rejestr?')) {
      navigate('/registers');
    }
  };
  
  const handleBack = () => {
    navigate('/registers');
  };
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych rejestru...</Typography>
      </Paper>
    );
  }
  
  if (!register) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Nie znaleziono rejestru o podanym ID.</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Powrót do listy
        </Button>
      </Paper>
    );
  }
  
  const getStatusChip = (status) => {
    let color = 'default';
    let label = 'Nieznany';
    
    if (status === 'active') {
      color = 'success';
      label = 'Aktywny';
    } else if (status === 'inactive') {
      color = 'error';
      label = 'Nieaktywny';
    }
    
    return (
      <Chip 
        label={label} 
        color={color} 
        size="small" 
        variant="filled"
      />
    );
  };
  
  const getRiskLevelChip = (riskLevel) => {
    let color = 'default';
    let label = 'Nieznany';
    
    if (riskLevel === 'low') {
      color = 'success';
      label = 'Niski';
    } else if (riskLevel === 'medium') {
      color = 'warning';
      label = 'Średni';
    } else if (riskLevel === 'high') {
      color = 'error';
      label = 'Wysoki';
    }
    
    return (
      <Chip 
        label={label} 
        color={color} 
        size="small" 
        variant="filled"
      />
    );
  };
  
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
            variant="contained"
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
          p: 0, 
          overflow: 'hidden',
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.paper, 1)} 120px)`,
          borderTop: `4px solid ${theme.palette.primary.main}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          mb: 3
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h5" component="h1" gutterBottom>
                {register.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Status: {getStatusChip(register.status)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kategoria: {register.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Poziom ryzyka: {getRiskLevelChip(register.riskLevel)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Utworzono: {register.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ostatnia aktualizacja: {register.lastUpdated}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {register.description}
          </Typography>
        </Box>
      </Paper>
      
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
                  <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Informacje podstawowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Administrator danych
                  </Typography>
                  <Typography variant="body1">
                    {register.dataController}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Podmiot przetwarzający
                  </Typography>
                  <Typography variant="body1">
                    {register.dataProcessor}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Osoby, których dane dotyczą
                  </Typography>
                  <Typography variant="body1">
                    {register.dataSubjects}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Podstawa prawna
                  </Typography>
                  <Typography variant="body1">
                    {register.legalBasis}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Okres przechowywania
                  </Typography>
                  <Typography variant="body1">
                    {register.retentionPeriod}
                  </Typography>
                </Grid>
              </Grid>
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
                  <Typography variant="h6">Kategorie danych i cele przetwarzania</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Kategorie danych osobowych
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {register.personalDataCategories.map((category, index) => (
                  <Chip 
                    key={index} 
                    label={category} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Cele przetwarzania
              </Typography>
              <List dense disablePadding>
                {register.processingPurposes.map((purpose, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText primary={purpose} />
                  </ListItem>
                ))}
              </List>
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
              <List dense disablePadding>
                {register.securityMeasures.map((measure, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText primary={measure} />
                  </ListItem>
                ))}
              </List>
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
                  <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Odbiorcy danych</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <List dense disablePadding>
                {register.dataRecipients.map((recipient, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText primary={recipient} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterDetail;
