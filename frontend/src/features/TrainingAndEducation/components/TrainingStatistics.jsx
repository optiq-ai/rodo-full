// src/features/TrainingAndEducation/components/TrainingStatistics.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider,
  CircularProgress,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TrainingStatistics = () => {
  const theme = useTheme();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Symulacja pobierania danych z API
    const fetchData = async () => {
      try {
        // W rzeczywistej aplikacji byłoby to wywołanie API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Przykładowe dane
        const mockData = {
          totalTrainings: 28,
          activeTrainings: 12,
          completedTrainings: 16,
          participantsCount: 345,
          completionRate: 78,
          trainingsByCategory: [
            { category: 'RODO - podstawy', count: 8, percentage: 28.6 },
            { category: 'Bezpieczeństwo danych', count: 6, percentage: 21.4 },
            { category: 'Incydenty bezpieczeństwa', count: 5, percentage: 17.9 },
            { category: 'Prawa podmiotów danych', count: 5, percentage: 17.9 },
            { category: 'Inne', count: 4, percentage: 14.2 }
          ],
          trainingsByStatus: [
            { status: 'completed', count: 16, percentage: 57.1 },
            { status: 'in_progress', count: 8, percentage: 28.6 },
            { status: 'planned', count: 4, percentage: 14.3 }
          ],
          participantsByDepartment: [
            { department: 'HR', count: 42, percentage: 12.2 },
            { department: 'IT', count: 68, percentage: 19.7 },
            { department: 'Marketing', count: 55, percentage: 15.9 },
            { department: 'Sprzedaż', count: 85, percentage: 24.6 },
            { department: 'Obsługa klienta', count: 65, percentage: 18.8 },
            { department: 'Administracja', count: 30, percentage: 8.8 }
          ],
          monthlyParticipation: [
            { month: 'Styczeń', count: 45 },
            { month: 'Luty', count: 52 },
            { month: 'Marzec', count: 68 },
            { month: 'Kwiecień', count: 75 }
          ],
          upcomingTrainings: [
            { id: 1, name: 'RODO dla nowych pracowników', date: '2025-05-10', participants: 15 },
            { id: 2, name: 'Bezpieczeństwo danych w pracy zdalnej', date: '2025-05-15', participants: 25 },
            { id: 3, name: 'Obsługa incydentów bezpieczeństwa', date: '2025-05-22', participants: 18 },
            { id: 4, name: 'Prawa podmiotów danych - warsztaty', date: '2025-06-05', participants: 20 }
          ]
        };
        
        setStatistics(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!statistics) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Nie udało się pobrać statystyk szkoleń.</Typography>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Statystyki i analityka szkoleń
      </Typography>
      
      <Grid container spacing={3}>
        {/* Karty z podsumowaniem */}
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.15)}`
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mr: 2
                  }}
                >
                  <SchoolIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Wszystkie szkolenia
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.totalTrainings}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Aktywne: {statistics.activeTrainings} ({Math.round(statistics.activeTrainings / statistics.totalTrainings * 100)}%)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.success.main, 0.08)}`,
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 30px ${alpha(theme.palette.success.main, 0.15)}`
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    mr: 2
                  }}
                >
                  <PeopleIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Uczestnicy
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.participantsCount}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  W {statistics.totalTrainings} szkoleniach
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.warning.main, 0.08)}`,
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 30px ${alpha(theme.palette.warning.main, 0.15)}`
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    mr: 2
                  }}
                >
                  <CalendarTodayIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Nadchodzące
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.upcomingTrainings.length}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Zaplanowane szkolenia
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.info.main, 0.08)}`,
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 30px ${alpha(theme.palette.info.main, 0.15)}`
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    mr: 2
                  }}
                >
                  <CheckCircleIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Ukończenie
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.completionRate}%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Średni wskaźnik ukończenia
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres kategorii szkoleń */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderRadius: 2
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Szkolenia według kategorii</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {statistics.trainingsByCategory.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">
                          {item.category}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {item.count} ({item.percentage}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: index === 0 ? theme.palette.primary.main :
                                           index === 1 ? theme.palette.secondary.main :
                                           index === 2 ? theme.palette.error.main :
                                           index === 3 ? theme.palette.warning.main :
                                           theme.palette.info.main
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres statusów szkoleń */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderRadius: 2
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimelineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Szkolenia według statusu</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {statistics.trainingsByStatus.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">
                          {item.status === 'completed' ? 'Zakończone' : 
                           item.status === 'in_progress' ? 'W trakcie' : 
                           'Zaplanowane'}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {item.count} ({item.percentage}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: item.status === 'completed' ? theme.palette.success.main :
                                           item.status === 'in_progress' ? theme.palette.warning.main :
                                           theme.palette.info.main
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Uczestnicy według działów */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderRadius: 2
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Uczestnicy według działów</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {statistics.participantsByDepartment.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">
                          {item.department}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {item.count} ({item.percentage}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: index === 0 ? theme.palette.primary.main :
                                           index === 1 ? theme.palette.secondary.main :
                                           index === 2 ? theme.palette.error.main :
                                           index === 3 ? theme.palette.warning.main :
                                           index === 4 ? theme.palette.info.main :
                                           theme.palette.success.main
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Nadchodzące szkolenia */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderRadius: 2
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Nadchodzące szkolenia</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              {statistics.upcomingTrainings.map((training, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {training.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(training.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      {training.participants} uczestników
                    </Typography>
                  </Box>
                  {index < statistics.upcomingTrainings.length - 1 && (
                    <Divider sx={{ mt: 1 }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Miesięczna aktywność */}
        <Grid item xs={12}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderRadius: 2
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimelineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Miesięczna aktywność szkoleniowa</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                {statistics.monthlyParticipation.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%' }}>
                    <Box 
                      sx={{ 
                        width: '60%', 
                        backgroundColor: theme.palette.primary.main,
                        height: `${(item.count / 100) * 100}%`,
                        maxHeight: '90%',
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4
                      }} 
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {item.month}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {item.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Liczba uczestników szkoleń w poszczególnych miesiącach
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingStatistics;
