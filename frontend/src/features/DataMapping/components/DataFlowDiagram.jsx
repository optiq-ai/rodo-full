import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// Komponent diagramu przepływu danych
const DataFlowDiagram = () => {
  const theme = useTheme();

  // Przykładowe dane dla wykresów
  const dataFlowData = [
    { name: 'Wewnętrzne', value: 45 },
    { name: 'Zewnętrzne UE', value: 30 },
    { name: 'Zewnętrzne poza UE', value: 15 },
    { name: 'Podmioty przetwarzające', value: 10 },
  ];

  const dataTypeData = [
    { name: 'Dane osobowe', value: 40 },
    { name: 'Dane wrażliwe', value: 15 },
    { name: 'Dane finansowe', value: 25 },
    { name: 'Dane kontaktowe', value: 20 },
  ];

  const monthlyData = [
    { name: 'Sty', nowe: 4, zaktualizowane: 2, usunięte: 1 },
    { name: 'Lut', nowe: 3, zaktualizowane: 5, usunięte: 2 },
    { name: 'Mar', nowe: 2, zaktualizowane: 3, usunięte: 0 },
    { name: 'Kwi', nowe: 5, zaktualizowane: 4, usunięte: 1 },
    { name: 'Maj', nowe: 7, zaktualizowane: 6, usunięte: 2 },
    { name: 'Cze', nowe: 6, zaktualizowane: 4, usunięte: 3 },
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
          Diagram Przepływu Danych
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Wizualizacja przepływu danych osobowych w organizacji
        </Typography>

        <Grid container spacing={3}>
          {/* Karta z wykresem kołowym przepływów danych */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Przepływy danych według kierunku
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataFlowData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {dataFlowData.map((entry, index) => (
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

          {/* Karta z wykresem kołowym typów danych */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Przepływy według typu danych
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {dataTypeData.map((entry, index) => (
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
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Zmiany w mapowaniach danych w czasie
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
                      <Line type="monotone" dataKey="nowe" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="zaktualizowane" stroke={theme.palette.secondary.main} />
                      <Line type="monotone" dataKey="usunięte" stroke={theme.palette.error.main} />
                    </LineChart>
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

export default DataFlowDiagram;
