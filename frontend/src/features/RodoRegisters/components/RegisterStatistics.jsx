// src/features/RodoRegisters/components/RegisterStatistics.jsx
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
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
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

const RegisterStatistics = () => {
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
          totalRegisters: 32,
          activeRegisters: 28,
          inactiveRegisters: 4,
          registerTrends: {
            changePercentage: 12.5,
            previousPeriodTotal: 28
          },
          registersByCategory: [
            { category: 'Zbiory danych osobowych', count: 14, percentage: 43.8 },
            { category: 'Procesy przetwarzania', count: 8, percentage: 25.0 },
            { category: 'Systemy informatyczne', count: 6, percentage: 18.8 },
            { category: 'Podmioty przetwarzające', count: 4, percentage: 12.5 }
          ],
          dataSubjectsCount: {
            employees: 120,
            customers: 1450,
            suppliers: 45,
            others: 30
          },
          monthlyRegisterData: [
            { month: 'Styczeń', created: 3, updated: 5, archived: 1 },
            { month: 'Luty', created: 4, updated: 7, archived: 0 },
            { month: 'Marzec', created: 2, updated: 9, archived: 1 },
            { month: 'Kwiecień', created: 5, updated: 6, archived: 2 }
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
        Statystyki rejestrów RODO
      </Typography>
      
      <Grid container spacing={3}>
        {/* Karty z podsumowaniem */}
        <Grid item xs={12} md={4}>
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
                  <AssessmentIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Wszystkie rejestry
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.totalRegisters}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {statistics.registerTrends.changePercentage > 0 ? (
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: theme.palette.error.main, mr: 0.5 }} />
                )}
                <Typography variant="body2" color="text.secondary">
                  {statistics.registerTrends.changePercentage > 0 ? '+' : ''}{statistics.registerTrends.changePercentage}% w porównaniu do poprzedniego okresu
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
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
                  Aktywne rejestry
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.activeRegisters}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.activeRegisters / statistics.totalRegisters * 100)}% wszystkich rejestrów
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.error.main, 0.08)}`,
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 30px ${alpha(theme.palette.error.main, 0.15)}`
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
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.main,
                    mr: 2
                  }}
                >
                  <WarningIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Nieaktywne rejestry
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.inactiveRegisters}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.inactiveRegisters / statistics.totalRegisters * 100)}% wszystkich rejestrów
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres kategorii rejestrów */}
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
                  <AssessmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Rejestry według kategorii</Typography>
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
                    data={statistics.registersByCategory}
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
                {statistics.registersByCategory.map((item, index) => (
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
                                           theme.palette.warning.main
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
        
        {/* Wykres podmiotów danych */}
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
                  <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Podmioty danych</Typography>
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
                        { name: 'Pracownicy', value: statistics.dataSubjectsCount.employees, color: theme.palette.primary.main },
                        { name: 'Klienci', value: statistics.dataSubjectsCount.customers, color: theme.palette.secondary.main },
                        { name: 'Dostawcy', value: statistics.dataSubjectsCount.suppliers, color: theme.palette.warning.main },
                        { name: 'Inni', value: statistics.dataSubjectsCount.others, color: theme.palette.info.main }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Pracownicy', value: statistics.dataSubjectsCount.employees, color: theme.palette.primary.main },
                        { name: 'Klienci', value: statistics.dataSubjectsCount.customers, color: theme.palette.secondary.main },
                        { name: 'Dostawcy', value: statistics.dataSubjectsCount.suppliers, color: theme.palette.warning.main },
                        { name: 'Inni', value: statistics.dataSubjectsCount.others, color: theme.palette.info.main }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}`, 'Ilość']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Łączna liczba podmiotów danych: {statistics.dataSubjectsCount.employees + statistics.dataSubjectsCount.customers + statistics.dataSubjectsCount.suppliers + statistics.dataSubjectsCount.others}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres trendów rejestrów */}
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
                  <Typography variant="h6">Aktywność rejestrów w czasie</Typography>
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
                    data={statistics.monthlyRegisterData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="created" name="Utworzone" stroke={theme.palette.success.main} strokeWidth={2} />
                    <Line type="monotone" dataKey="updated" name="Zaktualizowane" stroke={theme.palette.info.main} strokeWidth={2} />
                    <Line type="monotone" dataKey="archived" name="Zarchiwizowane" stroke={theme.palette.error.main} strokeWidth={2} />
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

export default RegisterStatistics;
