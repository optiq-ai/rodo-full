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

const RiskAnalyticsOverview = () => {
  const theme = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Symulacja pobierania danych z API
    const fetchData = async () => {
      try {
        // W rzeczywistej aplikacji byłoby to wywołanie API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Przykładowe dane
        const mockData = {
          totalRiskAnalyses: 35,
          activeRiskAnalyses: 28,
          completedRiskAnalyses: 7,
          highRiskCount: 9,
          mediumRiskCount: 18,
          lowRiskCount: 8,
          riskTrend: [
            { month: 'Styczeń', highRisk: 5, mediumRisk: 12, lowRisk: 6 },
            { month: 'Luty', highRisk: 7, mediumRisk: 14, lowRisk: 7 },
            { month: 'Marzec', highRisk: 8, mediumRisk: 16, lowRisk: 7 },
            { month: 'Kwiecień', highRisk: 9, mediumRisk: 18, lowRisk: 8 }
          ],
          topRiskCategories: [
            { category: 'Bezpieczeństwo danych', count: 12, percentage: 34.3 },
            { category: 'Przetwarzanie wrażliwych danych', count: 8, percentage: 22.9 },
            { category: 'Profilowanie', count: 6, percentage: 17.1 },
            { category: 'Transfer danych', count: 5, percentage: 14.3 },
            { category: 'Retencja danych', count: 4, percentage: 11.4 }
          ],
          mitigationStatus: {
            implemented: 42,
            inProgress: 18,
            planned: 15,
            notStarted: 8
          },
          recentActivity: [
            { date: '2025-04-25', action: 'created', description: 'Nowa analiza ryzyka dla systemu CRM' },
            { date: '2025-04-24', action: 'updated', description: 'Aktualizacja analizy ryzyka dla procesu rekrutacji' },
            { date: '2025-04-23', action: 'completed', description: 'Zakończono analizę ryzyka dla aplikacji mobilnej' },
            { date: '2025-04-22', action: 'created', description: 'Nowa analiza ryzyka dla procesu marketingowego' },
            { date: '2025-04-21', action: 'updated', description: 'Aktualizacja analizy ryzyka dla systemu HR' }
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
        Przegląd analityki ryzyka
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
                <Typography variant="body2" color="text.secondary">
                  Aktywne: {analytics.activeRiskAnalyses} ({Math.round(analytics.activeRiskAnalyses / analytics.totalRiskAnalyses * 100)}%)
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
                  <SecurityIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Środki zaradcze
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {analytics.mitigationStatus.implemented}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Wdrożone z {analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted} zaplanowanych
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
                  Zakończone analizy
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {analytics.completedRiskAnalyses}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(analytics.completedRiskAnalyses / analytics.totalRiskAnalyses * 100)}% wszystkich analiz
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
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.success.main
                        }
                      }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        W trakcie wdrażania
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {analytics.mitigationStatus.inProgress} ({Math.round(analytics.mitigationStatus.inProgress / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.round(analytics.mitigationStatus.inProgress / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.warning.main
                        }
                      }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        Zaplanowane
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {analytics.mitigationStatus.planned} ({Math.round(analytics.mitigationStatus.planned / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.round(analytics.mitigationStatus.planned / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.info.main
                        }
                      }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        Nie rozpoczęte
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {analytics.mitigationStatus.notStarted} ({Math.round(analytics.mitigationStatus.notStarted / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.round(analytics.mitigationStatus.notStarted / (analytics.mitigationStatus.implemented + analytics.mitigationStatus.inProgress + analytics.mitigationStatus.planned + analytics.mitigationStatus.notStarted) * 100)} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.error.main
                        }
                      }} 
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Trend ryzyka */}
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
                  <TimelineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Trend ryzyka w czasie</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                {analytics.riskTrend.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%' }}>
                    <Box sx={{ width: '100%', display: 'flex', height: 150 }}>
                      <Box 
                        sx={{ 
                          width: '30%', 
                          backgroundColor: theme.palette.error.main,
                          height: `${(item.highRisk / 20) * 100}%`,
                          alignSelf: 'flex-end',
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          mx: 0.5
                        }} 
                      />
                      <Box 
                        sx={{ 
                          width: '30%', 
                          backgroundColor: theme.palette.warning.main,
                          height: `${(item.mediumRisk / 20) * 100}%`,
                          alignSelf: 'flex-end',
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          mx: 0.5
                        }} 
                      />
                      <Box 
                        sx={{ 
                          width: '30%', 
                          backgroundColor: theme.palette.success.main,
                          height: `${(item.lowRisk / 20) * 100}%`,
                          alignSelf: 'flex-end',
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          mx: 0.5
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {item.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: theme.palette.error.main, mr: 1, borderRadius: 1 }} />
                  <Typography variant="body2">Wysokie</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: theme.palette.warning.main, mr: 1, borderRadius: 1 }} />
                  <Typography variant="body2">Średnie</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: theme.palette.success.main, mr: 1, borderRadius: 1 }} />
                  <Typography variant="body2">Niskie</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Ostatnia aktywność */}
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
                  <TimelineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Ostatnia aktywność</Typography>
                </Box>
              }
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            />
            <CardContent>
              {analytics.recentActivity.map((activity, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(activity.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: activity.action === 'created' ? theme.palette.info.main : 
                             activity.action === 'updated' ? theme.palette.warning.main : 
                             theme.palette.success.main,
                      fontWeight: 'bold'
                    }}>
                      {activity.action === 'created' ? 'Utworzono' : 
                       activity.action === 'updated' ? 'Zaktualizowano' : 
                       'Zakończono'}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {activity.description}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskAnalyticsOverview;
