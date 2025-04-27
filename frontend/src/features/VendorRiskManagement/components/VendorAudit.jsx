import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Divider, Chip, Stepper, Step, StepLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EventIcon from '@mui/icons-material/Event';

// Komponent audytu dostawców
const VendorAudit = () => {
  // Przykładowe dane
  const rows = [
    { id: 1, vendor: 'CloudSafe Solutions', auditType: 'Okresowy', date: '2025-03-15', status: 'Zakończony', result: 'Zgodny', nextAudit: '2025-09-15' },
    { id: 2, vendor: 'DataProcess Inc.', auditType: 'Wstępny', date: '2025-02-10', status: 'Zakończony', result: 'Niezgodny', nextAudit: '2025-05-10' },
    { id: 3, vendor: 'SecureIT Services', auditType: 'Okresowy', date: '2025-06-20', status: 'Zaplanowany', result: '-', nextAudit: '-' },
    { id: 4, vendor: 'MarketingPro', auditType: 'Okresowy', date: '2025-01-20', status: 'Zakończony', result: 'Częściowo zgodny', nextAudit: '2025-07-20' },
    { id: 5, vendor: 'HR Solutions', auditType: 'Po incydencie', date: '2025-03-01', status: 'Zakończony', result: 'Niezgodny', nextAudit: '2025-06-01' },
    { id: 6, vendor: 'AnalyticsPlus', auditType: 'Okresowy', date: '2025-07-15', status: 'Zaplanowany', result: '-', nextAudit: '-' },
    { id: 7, vendor: 'GlobalPayments', auditType: 'Wstępny', date: '2025-05-10', status: 'Zaplanowany', result: '-', nextAudit: '-' },
    { id: 8, vendor: 'DocuStore', auditType: 'Okresowy', date: '2025-01-15', status: 'Zakończony', result: 'Zgodny', nextAudit: '2025-07-15' },
  ];

  // Kolumny dla DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'vendor', headerName: 'Dostawca', width: 180 },
    { field: 'auditType', headerName: 'Typ audytu', width: 130 },
    { field: 'date', headerName: 'Data audytu', width: 130 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => {
        let color = 'success';
        if (params.value === 'Zaplanowany') color = 'info';
        if (params.value === 'Opóźniony') color = 'error';
        
        return (
          <Chip 
            label={params.value} 
            color={color} 
            size="small"
          />
        );
      }
    },
    { 
      field: 'result', 
      headerName: 'Wynik', 
      width: 150,
      renderCell: (params) => {
        if (params.value === '-') return <Typography variant="body2">-</Typography>;
        
        let color = 'success';
        if (params.value === 'Częściowo zgodny') color = 'warning';
        if (params.value === 'Niezgodny') color = 'error';
        
        return (
          <Chip 
            label={params.value} 
            color={color} 
            size="small" 
            variant="outlined"
          />
        );
      }
    },
    { field: 'nextAudit', headerName: 'Następny audyt', width: 130 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 180,
      renderCell: (params) => (
        <Box>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>Szczegóły</Button>
          <Button size="small" variant="outlined" color="primary">Raport</Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" gutterBottom>
              Audyt Dostawców
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zarządzaj audytami dostawców przetwarzających dane osobowe
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
            >
              Zaplanuj audyt
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
            >
              Filtry
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Karty z podsumowaniem */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <AssignmentIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Przeprowadzone audyty
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <VerifiedUserIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  18
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zgodnych dostawców
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <EventIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  6
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zaplanowane audyty
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Proces audytu */}
        <Card elevation={2} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Proces audytu dostawcy
          </Typography>
          <Stepper activeStep={-1} sx={{ mt: 2, mb: 3 }}>
            <Step>
              <StepLabel>Planowanie</StepLabel>
            </Step>
            <Step>
              <StepLabel>Przygotowanie kwestionariusza</StepLabel>
            </Step>
            <Step>
              <StepLabel>Przeprowadzenie audytu</StepLabel>
            </Step>
            <Step>
              <StepLabel>Analiza wyników</StepLabel>
            </Step>
            <Step>
              <StepLabel>Raport i zalecenia</StepLabel>
            </Step>
          </Stepper>
          <Button variant="contained">Rozpocznij proces</Button>
        </Card>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Szukaj audytu..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default VendorAudit;
