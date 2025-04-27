import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Komponent statystyk dostawców
const VendorStatistics = () => {
  const theme = useTheme();

  // Przykładowe dane dla wykresów
  const vendorCategoryData = [
    { name: 'Hosting', value: 25 },
    { name: 'Przetwarzanie danych', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'HR', value: 10 },
    { name: 'Bezpieczeństwo', value: 15 },
    { name: 'Inne', value: 15 },
  ];

  const riskLevelData = [
    { name: 'Niskie', value: 45 },
    { name: 'Średnie', value: 35 },
    { name: 'Wysokie', value: 20 },
  ];

  const monthlyData = [
    { name: 'Sty', nowi: 3, zakończone: 1 },
    { name: 'Lut', nowi: 2, zakończone: 2 },
    { name: 'Mar', nowi: 4, zakończone: 1 },
    { name: 'Kwi', nowi: 5, zakończone: 3 },
    { name: 'Maj', nowi: 3, zakończone: 2 },
    { name: 'Cze', nowi: 4, zakończone: 1 },
  ];

  const auditStatusData = [
    { name: 'Wykonane', value: 65 },
    { name: 'Zaplanowane', value: 25 },
    { name: 'Zaległe', value: 10 },
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Statystyki Dostawców
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Analiza statystyczna dostawców przetwarzających dane osobowe
        </Typography>

        <Grid container spacing={3}>
          {/* Karty z podsumowaniem */}
          <Grid item xs={12} md={3}>
            <Card elevation={2} sx={{ 
              p: 2, 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <Typography variant="h3" component="div" color="primary.main">
                32
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Aktywni dostawcy
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card elevation={2} sx={{ 
              p: 2, 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <Typography variant="h3" component="div" color="error.main">
                8
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Wysokie ryzyko
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card elevation={2} sx={{ 
              p: 2, 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <Typography variant="h3" component="div" color="warning.main">
                5
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Audyty do wykonania
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card elevation={2} sx={{ 
              p: 2, 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <Typography variant="h3" component="div" color="success.main">
                12
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Nowi w tym roku
              </Typography>
            </Card>
          </Grid>

          {/* Karta z wykresem słupkowym kategorii dostawców */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dostawcy według kategorii
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vendorCategoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Liczba dostawców" fill={theme.palette.primary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Karta z wykresem kołowym poziomów ryzyka */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dostawcy według poziomu ryzyka
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskLevelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskLevelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Karta z wykresem liniowym zmian w czasie */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Zmiany liczby dostawców w czasie
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="nowi" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="zakończone" stroke={theme.palette.error.main} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Karta z wykresem kołowym statusu audytów */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status audytów dostawców
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={auditStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {auditStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" sx={{ mr: 2 }}>Eksportuj jako PDF</Button>
          <Button variant="contained">Generuj raport</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default VendorStatistics;
