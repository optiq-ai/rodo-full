// src/features/ConsentManagement/components/ConsentStatistics.jsx
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
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

const ConsentStatistics = () => {
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
          totalConsents: 156,
          activeConsents: 124,
          inactiveConsents: 22,
          pendingConsents: 10,
          consentsByType: [
            { type: 'marketing', count: 48, percentage: 30.8 },
            { type: 'newsletter', count: 35, percentage: 22.4 },
            { type: 'profiling', count: 27, percentage: 17.3 },
            { type: 'sharing', count: 31, percentage: 19.9 },
            { type: 'cookies', count: 15, percentage: 9.6 }
          ],
          consentTrends: {
            newLastMonth: 23,
            revokedLastMonth: 8,
            changePercentage: 15.4
          },
          expiringConsents: 12,
          recentActivity: [
            { date: '2025-04-25', action: 'created', count: 5 },
            { date: '2025-04-24', action: 'updated', count: 8 },
            { date: '2025-04-23', action: 'revoked', count: 3 },
            { date: '2025-04-22', action: 'created', count: 7 },
            { date: '2025-04-21', action: 'updated', count: 4 }
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
        <Typography>Nie udało się pobrać statystyk zgód.</Typography>
      </Paper>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Statystyki i analityka zgód
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
                  <PieChartIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Wszystkie zgody
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.totalConsents}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Aktywne: {statistics.activeConsents} ({Math.round(statistics.activeConsents / statistics.totalConsents * 100)}%)
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
                  Aktywne zgody
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.activeConsents}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.activeConsents / statistics.totalConsents * 100)}% wszystkich zgód
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
                  <CancelIcon />
                </Box>
                <Typography variant="h6" component="div">
                  Nieaktywne zgody
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.inactiveConsents}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(statistics.inactiveConsents / statistics.totalConsents * 100)}% wszystkich zgód
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
                  Wygasające zgody
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {statistics.expiringConsents}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Wygasają w ciągu 30 dni
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Wykres typów zgód */}
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
                  <BarChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">Zgody według typu</Typography>
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
                    data={statistics.consentsByType}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`${value} (${name === 'count' ? 'ilość' : 'procent'})`, '']}
                      labelFormatter={(label) => `Typ: ${label.charAt(0).toUpperCase() + label.slice(1)}`}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Ilość" fill={theme.palette.primary.main} />
                    <Bar dataKey="percentage" name="Procent" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Divider sx={{ my: 2 }} />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Trendy zgód */}
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
                  <Typography variant="h6">Trendy zgód</Typography>
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
                        { name: 'Aktywne', value: statistics.activeConsents, color: theme.palette.success.main },
                        { name: 'Nieaktywne', value: statistics.inactiveConsents, color: theme.palette.error.main },
                        { name: 'Oczekujące', value: statistics.pendingConsents, color: theme.palette.warning.main }
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
                        { name: 'Aktywne', value: statistics.activeConsents, color: theme.palette.success.main },
                        { name: 'Nieaktywne', value: statistics.inactiveConsents, color: theme.palette.error.main },
                        { name: 'Oczekujące', value: statistics.pendingConsents, color: theme.palette.warning.main }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}`, 'Ilość']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              
              <Box sx={{ height: 300, width: '100%', mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { date: '2025-01', created: 18, revoked: 5 },
                      { date: '2025-02', created: 22, revoked: 7 },
                      { date: '2025-03', created: 19, revoked: 6 },
                      { date: '2025-04', created: 23, revoked: 8 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="created" name="Nowe zgody" stroke={theme.palette.success.main} strokeWidth={2} />
                    <Line type="monotone" dataKey="revoked" name="Wycofane zgody" stroke={theme.palette.error.main} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Ostatnia aktywność
              </Typography>
              {statistics.recentActivity.slice(0, 3).map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(activity.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    {activity.action === 'created' ? 'Utworzono' : 
                     activity.action === 'updated' ? 'Zaktualizowano' : 
                     'Wycofano'}: {activity.count}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsentStatistics;
