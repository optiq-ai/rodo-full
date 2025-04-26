// src/features/ReportingAndAnalytics/ReportingAndAnalytics.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { LineChart } from '../../components/Chart';
import DataTable from '../../components/DataTable';
import DownloadIcon from '@mui/icons-material/Download';

// Mock data dla wykresów
const mockIncidentData = {
  labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
  datasets: [
    {
      label: 'Incydenty wysokiego ryzyka',
      data: [3, 5, 2, 8, 10, 7, 6, 5, 9, 8, 7, 8],
      color: '#f44336',
    },
    {
      label: 'Incydenty średniego ryzyka',
      data: [5, 8, 12, 15, 10, 7, 11, 14, 16, 12, 9, 12],
      color: '#ff9800',
    },
    {
      label: 'Incydenty niskiego ryzyka',
      data: [8, 10, 15, 12, 8, 9, 14, 17, 13, 11, 10, 9],
      color: '#4caf50',
    }
  ]
};

const mockRequestData = {
  labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
  datasets: [
    {
      label: 'Wnioski o dostęp',
      data: [12, 15, 10, 8, 14, 16, 13, 11, 9, 12, 15, 17],
      color: '#4285f4',
    },
    {
      label: 'Wnioski o usunięcie',
      data: [5, 7, 9, 6, 8, 10, 7, 5, 8, 9, 11, 13],
      color: '#9c27b0',
    },
    {
      label: 'Inne wnioski',
      data: [3, 4, 6, 5, 7, 8, 6, 4, 5, 7, 8, 10],
      color: '#009688',
    }
  ]
};

// Mock data dla tabeli raportów
const mockReports = [
  { 
    id: 1, 
    name: 'Raport miesięczny - Incydenty', 
    type: 'incident', 
    period: 'monthly', 
    lastGenerated: '2023-01-01T12:00:00Z', 
    format: 'pdf',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Raport kwartalny - Wnioski podmiotów', 
    type: 'request', 
    period: 'quarterly', 
    lastGenerated: '2023-01-05T10:30:00Z', 
    format: 'excel',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Raport roczny - Dokumentacja', 
    type: 'document', 
    period: 'yearly', 
    lastGenerated: '2023-01-10T09:15:00Z', 
    format: 'pdf',
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Raport dzienny - Aktywność użytkowników', 
    type: 'user', 
    period: 'daily', 
    lastGenerated: '2023-01-15T14:20:00Z', 
    format: 'csv',
    status: 'inactive'
  },
  { 
    id: 5, 
    name: 'Raport niestandardowy - Analiza ryzyka', 
    type: 'risk', 
    period: 'custom', 
    lastGenerated: '2023-01-20T11:45:00Z', 
    format: 'pdf',
    status: 'active'
  },
];

const reportColumns = [
  { id: 'name', label: 'Nazwa raportu', sortable: true },
  { id: 'type', label: 'Typ', sortable: true,
    render: (value) => {
      const typeMap = {
        'incident': 'Incydenty',
        'request': 'Wnioski podmiotów',
        'document': 'Dokumentacja',
        'user': 'Użytkownicy',
        'risk': 'Analiza ryzyka'
      };
      return typeMap[value] || value;
    }
  },
  { id: 'period', label: 'Okres', sortable: true,
    render: (value) => {
      const periodMap = {
        'daily': 'Dzienny',
        'weekly': 'Tygodniowy',
        'monthly': 'Miesięczny',
        'quarterly': 'Kwartalny',
        'yearly': 'Roczny',
        'custom': 'Niestandardowy'
      };
      return periodMap[value] || value;
    }
  },
  { id: 'lastGenerated', label: 'Ostatnio wygenerowany', type: 'datetime', sortable: true },
  { id: 'format', label: 'Format', sortable: true,
    render: (value) => value.toUpperCase()
  },
  { id: 'status', label: 'Status', type: 'status', sortable: true },
];

const ReportingAndAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('year');
  const [reportType, setReportType] = useState('all');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleGenerateReport = () => {
    // Placeholder dla generowania raportu
    console.log('Generowanie raportu:', { reportType, timeRange });
    // W przyszłości integracja z API
  };

  const handleRefresh = () => {
    setLoading(true);
    // Symulacja odświeżania danych
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Filtrowanie raportów na podstawie wybranego typu
  const filteredReports = mockReports.filter(report => {
    if (reportType === 'all') return true;
    return report.type === reportType;
  });

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Raportowanie i analityka
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Dashboardy" />
          <Tab label="Raporty" />
          <Tab label="Eksport danych" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <Box>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="time-range-label">Zakres czasu</InputLabel>
                <Select
                  labelId="time-range-label"
                  id="time-range"
                  value={timeRange}
                  label="Zakres czasu"
                  onChange={handleTimeRangeChange}
                >
                  <MenuItem value="month">Ostatni miesiąc</MenuItem>
                  <MenuItem value="quarter">Ostatni kwartał</MenuItem>
                  <MenuItem value="year">Ostatni rok</MenuItem>
                  <MenuItem value="custom">Niestandardowy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<DownloadIcon />}
                  sx={{ mr: 2 }}
                >
                  Eksportuj dane
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleRefresh}
                >
                  Odśwież
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <LineChart
                title="Incydenty w czasie"
                subtitle="Liczba incydentów według poziomu ryzyka"
                data={mockIncidentData.datasets}
                labels={mockIncidentData.labels}
                height={350}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LineChart
                title="Wnioski podmiotów danych"
                subtitle="Liczba wniosków według typu"
                data={mockRequestData.datasets}
                labels={mockRequestData.labels}
                height={350}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="report-type-label">Typ raportu</InputLabel>
                <Select
                  labelId="report-type-label"
                  id="report-type"
                  value={reportType}
                  label="Typ raportu"
                  onChange={handleReportTypeChange}
                >
                  <MenuItem value="all">Wszystkie</MenuItem>
                  <MenuItem value="incident">Incydenty</MenuItem>
                  <MenuItem value="request">Wnioski podmiotów</MenuItem>
                  <MenuItem value="document">Dokumentacja</MenuItem>
                  <MenuItem value="user">Użytkownicy</MenuItem>
                  <MenuItem value="risk">Analiza ryzyka</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained"
                  onClick={handleGenerateReport}
                >
                  Generuj nowy raport
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          <DataTable
            columns={reportColumns}
            data={filteredReports}
            loading={loading}
            onRefresh={handleRefresh}
          />
        </Box>
      )}
      
      {tabValue === 2 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Eksport danych
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Wybierz typ danych i format eksportu.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="export-type-label">Typ danych</InputLabel>
                    <Select
                      labelId="export-type-label"
                      id="export-type"
                      value="incidents"
                      label="Typ danych"
                    >
                      <MenuItem value="incidents">Incydenty</MenuItem>
                      <MenuItem value="requests">Wnioski podmiotów</MenuItem>
                      <MenuItem value="documents">Dokumenty</MenuItem>
                      <MenuItem value="registers">Rejestry</MenuItem>
                      <MenuItem value="users">Użytkownicy</MenuItem>
                      <MenuItem value="all">Wszystkie dane</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="export-format-label">Format</InputLabel>
                    <Select
                      labelId="export-format-label"
                      id="export-format"
                      value="csv"
                      label="Format"
                    >
                      <MenuItem value="csv">CSV</MenuItem>
                      <MenuItem value="excel">Excel</MenuItem>
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="json">JSON</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="export-period-label">Okres</InputLabel>
                    <Select
                      labelId="export-period-label"
                      id="export-period"
                      value="all"
                      label="Okres"
                    >
                      <MenuItem value="all">Wszystkie dane</MenuItem>
                      <MenuItem value="month">Ostatni miesiąc</MenuItem>
                      <MenuItem value="quarter">Ostatni kwartał</MenuItem>
                      <MenuItem value="year">Ostatni rok</MenuItem>
                      <MenuItem value="custom">Niestandardowy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 2 }}
                  >
                    Eksportuj dane
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default ReportingAndAnalytics;
