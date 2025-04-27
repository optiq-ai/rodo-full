// src/features/RiskAnalysis/components/RiskAnalyticsOverview.jsx
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

const RiskAnalyticsOverview = () => {
  const theme = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Symulacja pobierania danych z API
    const fetchData = async () => {
      try {
        // W rzeczywistej aplikacji byłoby to wywołanie API
        // Skracamy czas oczekiwania, aby szybciej zobaczyć dane
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Przykładowe dane
        const mockData = {
          totalRiskAnalyses: 24,
          highRiskCount: 5,
          mediumRiskCount: 12,
          lowRiskCount: 7,
          riskTrends: {
            changePercentage: -8.3,
            previousPeriodHighRisk: 6
          },
          topRiskCategories: [
            { category: 'Bezpieczeństwo danych', count: 8, percentage: 33.3 },
            { category: 'Przetwarzanie wrażliwych danych', count: 6, percentage: 25.0 },
            { category: 'Profilowanie', count: 5, percentage: 20.8 },
            { category: 'Przekazywanie danych', count: 3, percentage: 12.5 },
            { category: 'Inne', count: 2, percentage: 8.4 }
          ],
          mitigationStatus: {
            implemented: 18,
            inProgress: 12,
            planned: 8,
            notStarted: 4
          },
          recentRiskAnalyses: [
            { id: 1, name: 'Analiza ryzyka - system CRM', level: 'high', date: '2025-04-20', status: 'completed' },
            { id: 2, name: 'Analiza ryzyka - aplikacja mobilna', level: 'medium', date: '2025-04-18', status: 'in_progress' },
            { id: 3, name: 'Analiza ryzyka - system HR', level: 'low', date: '2025-04-15', status: 'completed' },
            { id: 4, name: 'Analiza ryzyka - strona internetowa', level: 'medium', date: '2025-04-10', status: 'completed' }
          ],
          monthlyRiskData: [
            { month: 'Styczeń', high: 4, medium: 10, low: 6 },
            { month: 'Luty', high: 5, medium: 11, low: 7 },
            { month: 'Marzec', high: 6, medium: 12, low: 5 },
            { month: 'Kwiecień', high: 5, medium: 12, low: 7 }
          ]
        };
        
        setAnalytics(mockData);
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
  
  if (!analytics) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Nie udało się pobrać danych analitycznych.</Typography>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Analityka ryzyka
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
                  <AssessmentIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Wszystkie analizy
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {analytics.totalRiskAnalyses}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {analytics.riskTrends.changePercentage > 0 ? (
                  <TrendingUpIcon sx={{ color: theme.palette.error.main, mr: 0.5 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                )}
                <Typography variant="body2" color="text.secondary">
                  {analytics.riskTrends.changePercentage > 0 ? '+' : ''}{analytics.riskTrends.changePercentage}% w porównaniu do poprzedniego okresu
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
                  Wysokie ryzyko
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {analytics.highRiskCount}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(analytics.highRiskCount / analytics.totalRiskAnalyses * 100)}% wszystkich analiz
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
                  <WarningIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Średnie ryzyko
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {analytics.mediumRiskCount}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(analytics.mediumRiskCount / analytics.totalRiskAnalyses * 100)}% wszystkich analiz
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
                  Niskie ryzyko
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {analytics.lowRiskCount}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(analytics.lowRiskCount / analytics.totalRiskAnalyses * 100)}% wszystkich analiz
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres kategorii ryzyka */}
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
                  <Typography variant="h6">Główne kategorie ryzyka</Typography>
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
                    data={analytics.topRiskCategories}
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
                {analytics.topRiskCategories.map((item, index) => (
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
                            backgroundColor: index === 0 ? theme.palette.error.main :
                                           index === 1 ? theme.palette.warning.main :
                                           index === 2 ? theme.palette.info.main :
                                           index === 3 ? theme.palette.success.main :
                                           theme.palette.secondary.main
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
        
        {/* Status środków zaradczych */}
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
                  <Typography variant="h6">Status środków zaradczych</Typography>
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
                        { name: 'Wdrożone', value: analytics.mitigationStatus.implemented, color: theme.palette.success.main },
                        { name: 'W trakcie', value: analytics.mitigationStatus.inProgress, color: theme.palette.warning.main },
                        { name: 'Zaplanowane', value: analytics.mitigationStatus.planned, color: theme.palette.info.main },
                        { name: 'Nie rozpoczęte', value: analytics.mitigationStatus.notStarted, color: theme.palette.error.main }
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
                        { name: 'Wdrożone', value: analytics.mitigationStatus.implemented, color: theme.palette.success.main },
                        { name: 'W trakcie', value: analytics.mitigationStatus.inProgress, color: theme.palette.warning.main },
                        { name: 'Zaplanowane', value: analytics.mitigationStatus.planned, color: theme.palette.info.main },
                        { name: 'Nie rozpoczęte', value: analytics.mitigationStatus.notStarted, color: theme.palette.error.main }
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        Wdrożone
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {analytics.mitigationStatus.implemented} ({Math.round(analytics.mitigationStatus.implemented / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.round(analytics.mitigationStatus.implemented / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.success.main
                        }
                      }} 
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres trendów ryzyka */}
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
                  <Typography variant="h6">Trendy ryzyka w czasie</Typography>
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
                    data={analytics.monthlyRiskData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="high" name="Wysokie ryzyko" stroke={theme.palette.error.main} strokeWidth={2} />
                    <Line type="monotone" dataKey="medium" name="Średnie ryzyko" stroke={theme.palette.warning.main} strokeWidth={2} />
                    <Line type="monotone" dataKey="low" name="Niskie ryzyko" stroke={theme.palette.success.main} strokeWidth={2} />
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

export default RiskAnalyticsOverview;
