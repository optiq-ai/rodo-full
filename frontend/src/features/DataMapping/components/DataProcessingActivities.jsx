import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Divider, Stepper, Step, StepLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Komponent czynności przetwarzania danych
const DataProcessingActivities = () => {
  // Przykładowe dane
  const rows = [
    { id: 1, name: 'Przetwarzanie danych klientów', purpose: 'Realizacja umowy', category: 'Klienci', legalBasis: 'Umowa', retention: '5 lat', status: 'Aktywne' },
    { id: 2, name: 'Przetwarzanie danych pracowników', purpose: 'Zatrudnienie', category: 'HR', legalBasis: 'Obowiązek prawny', retention: '10 lat', status: 'Aktywne' },
    { id: 3, name: 'Marketing bezpośredni', purpose: 'Marketing', category: 'Marketing', legalBasis: 'Zgoda', retention: '3 lata', status: 'Aktywne' },
    { id: 4, name: 'Monitoring wizyjny', purpose: 'Bezpieczeństwo', category: 'Bezpieczeństwo', legalBasis: 'Uzasadniony interes', retention: '30 dni', status: 'Aktywne' },
    { id: 5, name: 'Rekrutacja pracowników', purpose: 'Zatrudnienie', category: 'HR', legalBasis: 'Zgoda', retention: '1 rok', status: 'Aktywne' },
    { id: 6, name: 'Obsługa reklamacji', purpose: 'Obsługa klienta', category: 'Klienci', legalBasis: 'Umowa', retention: '3 lata', status: 'Aktywne' },
    { id: 7, name: 'Archiwizacja dokumentów', purpose: 'Archiwizacja', category: 'Administracja', legalBasis: 'Obowiązek prawny', retention: '10 lat', status: 'Aktywne' },
    { id: 8, name: 'Analiza zachowań użytkowników', purpose: 'Analityka', category: 'Marketing', legalBasis: 'Zgoda', retention: '2 lata', status: 'Nieaktywne' },
  ];

  // Kolumny dla DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nazwa czynności', width: 200 },
    { field: 'purpose', headerName: 'Cel', width: 150 },
    { field: 'category', headerName: 'Kategoria', width: 130 },
    { field: 'legalBasis', headerName: 'Podstawa prawna', width: 150 },
    { field: 'retention', headerName: 'Okres retencji', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>Edytuj</Button>
          <Button size="small" variant="outlined" color="error">Usuń</Button>
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
              Czynności Przetwarzania Danych
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zarządzaj rejestrem czynności przetwarzania danych osobowych
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
            >
              Dodaj czynność
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
                  18
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Czynności przetwarzania
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
              <GroupIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kategorie podmiotów danych
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
              <ScheduleIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Czynności do przeglądu
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Proces dodawania czynności przetwarzania */}
        <Card elevation={2} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Proces dokumentowania czynności przetwarzania
          </Typography>
          <Stepper activeStep={-1} sx={{ mt: 2, mb: 3 }}>
            <Step>
              <StepLabel>Identyfikacja czynności</StepLabel>
            </Step>
            <Step>
              <StepLabel>Określenie celu i podstawy prawnej</StepLabel>
            </Step>
            <Step>
              <StepLabel>Określenie kategorii danych</StepLabel>
            </Step>
            <Step>
              <StepLabel>Określenie odbiorców</StepLabel>
            </Step>
            <Step>
              <StepLabel>Określenie zabezpieczeń</StepLabel>
            </Step>
          </Stepper>
          <Button variant="contained">Rozpocznij proces</Button>
        </Card>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Szukaj czynności przetwarzania..."
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

export default DataProcessingActivities;
