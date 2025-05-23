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
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const TrainingStatistics = () => {
  const theme = useTheme();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Symulacja pobierania danych z API
    const fetchData = async () => {
      try {
        // W rzeczywistej aplikacji byłoby to wywołanie API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Przykładowe dane
        const mockData = {
          totalTrainings: 18,
          completedTrainings: 12,
          pendingTrainings: 6,
          trainingTrends: {
            changePercentage: 20,
            previousPeriodTotal: 15
          },
          participantStats: {
            total: 245,
            completed: 180,
            inProgress: 65
          },
          trainingsByCategory: [
            { category: 'Podstawy RODO', count: 5, percentage: 27.8 },
            { category: 'Bezpieczeństwo danych', count: 4, percentage: 22.2 },
            { category: 'Incydenty bezpieczeństwa', count: 3, percentage: 16.7 },
            { category: 'Prawa podmiotów danych', count: 3, percentage: 16.7 },
            { category: 'Inne', count: 3, percentage: 16.7 }
          ],
          completionRates: {
            management: 92,
            it: 85,
            hr: 78,
            marketing: 65,
            sales: 60
          },
          monthlyTrainingData: [
            { month: 'Styczeń', trainings: 3, participants: 45 },
            { month: 'Luty', trainings: 4, participants: 60 },
            { month: 'Marzec', trainings: 5, participants: 75 },
            { month: 'Kwiecień', trainings: 6, participants: 65 }
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
        <Typography>Nie udało się pobrać danych statystycznych.</Typography>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Statystyki szkoleń i edukacji
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
                {statistics.trainingTrends.changePercentage > 0 ? (
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: theme.palette.error.main, mr: 0.5 }} />
                )}
                <Typography variant="body2" color="text.secondary">
                  {statistics.trainingTrends.changePercentage > 0 ? '+' : ''}{statistics.trainingTrends.changePercentage}% w porównaniu do poprzedniego okresu
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
                  <CheckCircleIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Ukończone szkolenia
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.completedTrainings}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.completedTrainings / statistics.totalTrainings * 100)}% wszystkich szkoleń
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
                  <SchoolIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Oczekujące szkolenia
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.pendingTrainings}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.pendingTrainings / statistics.totalTrainings * 100)}% wszystkich szkoleń
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
                  <PeopleIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Uczestnicy
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.participantStats.total}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.participantStats.completed / statistics.participantStats.total * 100)}% ukończyło szkolenia
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
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statistics.trainingsByCategory}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`${value} (${name === 'count' ? 'ilość' : 'procent'})`, '']}
                      labelFormatter={(label) => `Kategoria: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Ilość" fill={theme.palette.primary.main} />
                    <Bar dataKey="percentage" name="Procent" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Divider sx={{ my: 2 }} />
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
                                           index === 2 ? theme.palette.info.main :
                                           index === 3 ? theme.palette.warning.main :
                                           theme.palette.error.main
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
        
        {/* Wykres wskaźników ukończenia */}
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
                  <CheckCircleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Wskaźniki ukończenia według działów</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Zarząd', value: statistics.completionRates.management, color: theme.palette.success.main },
                        { name: 'IT', value: statistics.completionRates.it, color: theme.palette.info.main },
                        { name: 'HR', value: statistics.completionRates.hr, color: theme.palette.primary.main },
                        { name: 'Marketing', value: statistics.completionRates.marketing, color: theme.palette.warning.main },
                        { name: 'Sprzedaż', value: statistics.completionRates.sales, color: theme.palette.error.main }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {[
                        { name: 'Zarząd', value: statistics.completionRates.management, color: theme.palette.success.main },
                        { name: 'IT', value: statistics.completionRates.it, color: theme.palette.info.main },
                        { name: 'HR', value: statistics.completionRates.hr, color: theme.palette.primary.main },
                        { name: 'Marketing', value: statistics.completionRates.marketing, color: theme.palette.warning.main },
                        { name: 'Sprzedaż', value: statistics.completionRates.sales, color: theme.palette.error.main }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Wskaźnik ukończenia']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Średni wskaźnik ukończenia: {Math.round((statistics.completionRates.management + statistics.completionRates.it + statistics.completionRates.hr + statistics.completionRates.marketing + statistics.completionRates.sales) / 5)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres trendów szkoleń */}
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
                  <Typography variant="h6">Trendy szkoleń w czasie</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={statistics.monthlyTrainingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="trainings" name="Liczba szkoleń" stroke={theme.palette.primary.main} strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="participants" name="Liczba uczestników" stroke={theme.palette.secondary.main} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingStatistics;
