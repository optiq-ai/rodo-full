import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Divider, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Komponent listy dostawców
const VendorList = () => {
  // Przykładowe dane
  const rows = [
    { id: 1, name: 'CloudSafe Solutions', category: 'Hosting', riskLevel: 'Niskie', status: 'Zatwierdzony', lastAudit: '2025-03-15', contractEnd: '2026-05-20' },
    { id: 2, name: 'DataProcess Inc.', category: 'Przetwarzanie danych', riskLevel: 'Wysokie', status: 'Zatwierdzony', lastAudit: '2025-02-10', contractEnd: '2025-12-31' },
    { id: 3, name: 'SecureIT Services', category: 'Bezpieczeństwo', riskLevel: 'Średnie', status: 'W ocenie', lastAudit: '2024-11-05', contractEnd: '2025-10-15' },
    { id: 4, name: 'MarketingPro', category: 'Marketing', riskLevel: 'Średnie', status: 'Zatwierdzony', lastAudit: '2025-01-20', contractEnd: '2026-01-31' },
    { id: 5, name: 'HR Solutions', category: 'HR', riskLevel: 'Wysokie', status: 'Zatwierdzony', lastAudit: '2025-03-01', contractEnd: '2026-03-31' },
    { id: 6, name: 'AnalyticsPlus', category: 'Analityka', riskLevel: 'Niskie', status: 'Zatwierdzony', lastAudit: '2025-02-25', contractEnd: '2026-02-28' },
    { id: 7, name: 'GlobalPayments', category: 'Płatności', riskLevel: 'Wysokie', status: 'W ocenie', lastAudit: '2024-12-10', contractEnd: '2025-08-15' },
    { id: 8, name: 'DocuStore', category: 'Przechowywanie dokumentów', riskLevel: 'Średnie', status: 'Zatwierdzony', lastAudit: '2025-01-15', contractEnd: '2026-01-15' },
  ];

  // Kolumny dla DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nazwa dostawcy', width: 200 },
    { field: 'category', headerName: 'Kategoria', width: 180 },
    { 
      field: 'riskLevel', 
      headerName: 'Poziom ryzyka', 
      width: 130,
      renderCell: (params) => {
        let color = 'success';
        if (params.value === 'Średnie') color = 'warning';
        if (params.value === 'Wysokie') color = 'error';
        
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
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => {
        let color = 'success';
        if (params.value === 'W ocenie') color = 'warning';
        if (params.value === 'Odrzucony') color = 'error';
        
        return (
          <Chip 
            label={params.value} 
            color={color} 
            size="small"
          />
        );
      }
    },
    { field: 'lastAudit', headerName: 'Ostatni audyt', width: 130 },
    { field: 'contractEnd', headerName: 'Koniec umowy', width: 130 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 180,
      renderCell: (params) => (
        <Box>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>Szczegóły</Button>
          <Button size="small" variant="outlined" color="primary">Ocena</Button>
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
              Lista Dostawców
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zarządzaj dostawcami przetwarzającymi dane osobowe
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
            >
              Dodaj dostawcę
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
              <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  32
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aktywni dostawcy
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
              <SecurityIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dostawcy wysokiego ryzyka
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
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dostawcy zweryfikowani
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Szukaj dostawcy..."
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

export default VendorList;
