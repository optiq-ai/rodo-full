// src/features/TrainingAndEducation/components/TrainingDetail.jsx
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
  ListItemIcon,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';

const TrainingDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [training, setTraining] = useState(null);
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
          title: 'Podstawy RODO dla pracowników',
          type: 'e-learning',
          status: 'active',
          targetGroup: 'Wszyscy pracownicy',
          completionRate: 78,
          lastUpdated: '2025-04-10',
          createdAt: '2025-01-15',
          createdBy: 'Anna Kowalska',
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
          ],
          participants: [
            { department: 'IT', enrolled: 15, completed: 12 },
            { department: 'HR', enrolled: 8, completed: 7 },
            { department: 'Marketing', enrolled: 12, completed: 8 },
            { department: 'Sprzedaż', enrolled: 20, completed: 14 },
            { department: 'Administracja', enrolled: 10, completed: 8 }
          ]
        };
        
        setTraining(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleEdit = () => {
    navigate(`/training-and-education/${id}/edit`);
  };
  
  const handleDelete = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć to szkolenie?')) {
      navigate('/training-and-education');
    }
  };
  
  const handleBack = () => {
    navigate('/training-and-education');
  };
  
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Ładowanie danych szkolenia...</Typography>
      </Paper>
    );
  }
  
  if (!training) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Nie znaleziono szkolenia o podanym ID.</Typography>
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
      label = 'Aktywne';
    } else if (status === 'planned') {
      color = 'info';
      label = 'Planowane';
    } else if (status === 'completed') {
      color = 'secondary';
      label = 'Zakończone';
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
  
  const getTypeChip = (type) => {
    let color = 'default';
    let label = type;
    
    if (type === 'e-learning') {
      color = 'primary';
    } else if (type === 'webinar') {
      color = 'secondary';
    } else if (type === 'workshop') {
      color = 'info';
    }
    
    return (
      <Chip 
        label={label} 
        color={color} 
        size="small" 
        variant="outlined"
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
                {training.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Status: {getStatusChip(training.status)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Typ: {getTypeChip(training.type)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Obowiązkowe: 
                  <Chip 
                    label={training.mandatory ? 'Tak' : 'Nie'} 
                    color={training.mandatory ? 'error' : 'default'} 
                    size="small" 
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Utworzono: {training.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ostatnia aktualizacja: {training.lastUpdated}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Utworzył: {training.createdBy}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {training.description}
          </Typography>
          
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Postęp ukończenia:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={training.completionRate} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 
                        training.completionRate >= 80 
                          ? theme.palette.success.main 
                          : training.completionRate >= 50 
                            ? theme.palette.warning.main 
                            : theme.palette.error.main
                    }
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {training.completionRate}%
              </Typography>
            </Box>
          </Box>
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
                  <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Cele szkoleniowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <List dense disablePadding>
                {training.learningObjectives.map((objective, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={objective} />
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
                  <GroupIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Informacje podstawowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Grupa docelowa" 
                    secondary={training.targetGroup} 
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AccessTimeIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Czas trwania" 
                    secondary={`${training.duration} minut`} 
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CalendarTodayIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Data utworzenia" 
                    secondary={training.createdAt} 
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <DescriptionIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Wymagania ukończenia" 
                    secondary={
                      <List dense disablePadding sx={{ mt: 1 }}>
                        {training.completionRequirements.map((req, index) => (
                          <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={req} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    } 
                  />
                </ListItem>
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
                  <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Moduły szkoleniowe</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {training.modules.map((module, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {index + 1}. {module.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Czas trwania: {module.duration} minut
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Tematy:
                        </Typography>
                        <List dense disablePadding>
                          {module.topics.map((topic, topicIndex) => (
                            <ListItem key={topicIndex} disablePadding sx={{ py: 0.25 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={topic} 
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
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
              <List dense disablePadding>
                {training.materials.map((material, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <DescriptionIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={material} />
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
                  <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Uczestnicy</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={1}>
                {training.participants.map((participant, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Typography variant="body2">
                        {participant.department}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {participant.completed}/{participant.enrolled} ({Math.round(participant.completed/participant.enrolled*100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.round(participant.completed/participant.enrolled*100)} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        mb: 1.5,
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 
                            participant.completed/participant.enrolled >= 0.8 
                              ? theme.palette.success.main 
                              : participant.completed/participant.enrolled >= 0.5 
                                ? theme.palette.warning.main 
                                : theme.palette.error.main
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingDetail;
