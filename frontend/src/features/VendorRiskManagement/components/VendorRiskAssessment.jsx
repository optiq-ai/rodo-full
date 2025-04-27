import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Divider, Chip, Rating, Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';

// Komponent oceny ryzyka dostawców
const VendorRiskAssessment = () => {
  const theme = useTheme();

  // Przykładowe dane dla wykresów
  const riskCategoryData = [
    { name: 'Bezpieczeństwo', value: 35 },
    { name: 'Zgodność', value: 25 },
    { name: 'Operacyjne', value: 20 },
    { name: 'Finansowe', value: 15 },
    { name: 'Reputacyjne', value: 5 },
  ];

  const riskTrendData = [
    { name: 'Sty', wysokie: 5, średnie: 12, niskie: 15 },
    { name: 'Lut', wysokie: 6, średnie: 10, niskie: 16 },
    { name: 'Mar', wysokie: 8, średnie: 11, niskie: 13 },
    { name: 'Kwi', wysokie: 7, średnie: 13, niskie: 12 },
    { name: 'Maj', wysokie: 9, średnie: 12, niskie: 11 },
    { name: 'Cze', wysokie: 8, średnie: 14, niskie: 10 },
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
          Ocena Ryzyka Dostawców
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Analizuj i oceniaj ryzyko związane z dostawcami przetwarzającymi dane osobowe
        </Typography>

        <Grid container spacing={3}>
          {/* Karta z wykresem kołowym kategorii ryzyka */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ryzyko według kategorii
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskCategoryData.map((entry, index) => (
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

          {/* Karta z wykresem liniowym trendów ryzyka */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Trendy ryzyka w czasie
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={riskTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="wysokie" stroke={theme.palette.error.main} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="średnie" stroke={theme.palette.warning.main} />
                      <Line type="monotone" dataKey="niskie" stroke={theme.palette.success.main} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Formularz oceny ryzyka */}
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Nowa ocena ryzyka dostawcy
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Wybierz dostawcę"
                      select
                      variant="outlined"
                      defaultValue=""
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="">Wybierz dostawcę</MenuItem>
                      <MenuItem value="1">CloudSafe Solutions</MenuItem>
                      <MenuItem value="2">DataProcess Inc.</MenuItem>
                      <MenuItem value="3">SecureIT Services</MenuItem>
                      <MenuItem value="4">MarketingPro</MenuItem>
                      <MenuItem value="5">HR Solutions</MenuItem>
                    </TextField>
                    
                    <TextField
                      fullWidth
                      label="Typ oceny"
                      select
                      variant="outlined"
                      defaultValue=""
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="">Wybierz typ oceny</MenuItem>
                      <MenuItem value="initial">Wstępna ocena</MenuItem>
                      <MenuItem value="periodic">Ocena okresowa</MenuItem>
                      <MenuItem value="incident">Ocena po incydencie</MenuItem>
                    </TextField>
                    
                    <TextField
                      fullWidth
                      label="Data oceny"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      defaultValue={new Date().toISOString().split('T')[0]}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Bezpieczeństwo danych
                    </Typography>
                    <Rating 
                      name="security-rating" 
                      defaultValue={3} 
                      max={5} 
                      size="large"
                      sx={{ mb: 2 }}
                    />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Zgodność z przepisami
                    </Typography>
                    <Rating 
                      name="compliance-rating" 
                      defaultValue={4} 
                      max={5} 
                      size="large"
                      sx={{ mb: 2 }}
                    />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Ogólny poziom ryzyka
                    </Typography>
                    <Slider
                      defaultValue={30}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Komentarz"
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" sx={{ mr: 2 }}>Anuluj</Button>
                    <Button variant="contained">Zapisz ocenę</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default VendorRiskAssessment;
