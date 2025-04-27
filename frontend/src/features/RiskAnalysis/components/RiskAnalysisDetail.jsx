// src/features/RiskAnalysis/components/RiskAnalysisDetail.jsx
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
  Rating,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RiskAnalysisDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [riskAnalysis, setRiskAnalysis] = useState(null);
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
          name: 'Analiza ryzyka - system HR',
          processName: 'Przetwarzanie danych pracowników',
          status: 'completed',
          riskLevel: 'low',
          lastUpdated: '2025-04-15',
          createdAt: '2025-01-10',
          createdBy: 'Jan Kowalski',
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
              riskScore: 6,
              riskLevel: 'medium'
            },
            {
              name: 'Utrata danych',
              likelihood: 1,
              impact: 4,
              riskScore: 4,
              riskLevel: 'low'
            },
            {
              name: 'Wyciek danych',
              likelihood: 1,
              impact: 5,
              riskScore: 5,
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
        
        setRiskAnalysis(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleEdit = () => {
    navigate(`/risk-analysis/${id}/edit`);
  };
  
  const handleDelete = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć tę analizę ryzyka?')) {
      navigate('/risk-analysis');
    }
  };
  
  const handleBack = () => {
    navigate('/risk-analysis');
  };
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych analizy ryzyka...</Typography>
      </Paper>
    );
  }
  
  if (!riskAnalysis) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Nie znaleziono analizy ryzyka o podanym ID.</Typography>
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
    
    if (status === 'completed') {
      color = 'success';
      label = 'Zakończona';
    } else if (status === 'in_progress') {
      color = 'warning';
      label = 'W trakcie';
    } else if (status === 'planned') {
      color = 'info';
      label = 'Planowana';
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
                {riskAnalysis.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Status: {getStatusChip(riskAnalysis.status)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Proces: {riskAnalysis.processName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Poziom ryzyka: {getRiskLevelChip(riskAnalysis.riskLevel)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Utworzono: {riskAnalysis.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ostatnia aktualizacja: {riskAnalysis.lastUpdated}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Utworzył: {riskAnalysis.createdBy}, {riskAnalysis.department}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {riskAnalysis.description}
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Zakres analizy:</strong> {riskAnalysis.scope}
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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {riskAnalysis.dataCategories.map((category, index) => (
                  <Chip 
                    key={index} 
                    label={category} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
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
                {riskAnalysis.mitigationMeasures.map((measure, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <CheckCircleIcon sx={{ mr: 1, color: theme.palette.success.main, fontSize: 20 }} />
                    <ListItemText primary={measure} />
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
                  <WarningIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Zidentyfikowane zagrożenia</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {riskAnalysis.threats.map((threat, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%',
                        borderColor: 
                          threat.riskLevel === 'high' 
                            ? alpha(theme.palette.error.main, 0.5) 
                            : threat.riskLevel === 'medium' 
                              ? alpha(theme.palette.warning.main, 0.5) 
                              : alpha(theme.palette.success.main, 0.5),
                        borderWidth: '2px'
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {threat.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Prawdopodobieństwo:
                          </Typography>
                          <Rating 
                            value={threat.likelihood} 
                            readOnly 
                            max={5}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Wpływ:
                          </Typography>
                          <Rating 
                            value={threat.impact} 
                            readOnly 
                            max={5}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Poziom ryzyka:
                          </Typography>
                          {getRiskLevelChip(threat.riskLevel)}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
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
              <List dense disablePadding>
                {riskAnalysis.recommendations.map((recommendation, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemText primary={recommendation} />
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
                  <Typography variant="h6">Wnioski</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Typography variant="body2">
                {riskAnalysis.conclusion}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskAnalysisDetail;
