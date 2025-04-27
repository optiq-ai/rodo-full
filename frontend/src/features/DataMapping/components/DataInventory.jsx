import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, MenuItem, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';

// Komponent inwentaryzacji danych
const DataInventory = () => {
  // Przykładowe dane
  const rows = [
    { id: 1, name: 'Baza danych klientów', type: 'Baza danych', location: 'Serwer wewnętrzny', retention: '5 lat', sensitivity: 'Wysoka', owner: 'Dział IT' },
    { id: 2, name: 'Pliki HR', type: 'System plików', location: 'Chmura', retention: '10 lat', sensitivity: 'Wysoka', owner: 'Dział HR' },
    { id: 3, name: 'Dane marketingowe', type: 'CRM', location: 'SaaS', retention: '3 lata', sensitivity: 'Średnia', owner: 'Dział Marketingu' },
    { id: 4, name: 'Dokumenty finansowe', type: 'System plików', location: 'Serwer wewnętrzny', retention: '7 lat', sensitivity: 'Wysoka', owner: 'Dział Finansowy' },
    { id: 5, name: 'Dane dostawców', type: 'Baza danych', location: 'Serwer wewnętrzny', retention: '5 lat', sensitivity: 'Niska', owner: 'Dział Zakupów' },
    { id: 6, name: 'Nagrania rozmów', type: 'System plików', location: 'Chmura', retention: '2 lata', sensitivity: 'Wysoka', owner: 'Obsługa Klienta' },
    { id: 7, name: 'Dane logowania', type: 'Logi', location: 'Serwer wewnętrzny', retention: '1 rok', sensitivity: 'Średnia', owner: 'Dział IT' },
    { id: 8, name: 'Kopie zapasowe', type: 'System plików', location: 'Chmura', retention: '3 lata', sensitivity: 'Wysoka', owner: 'Dział IT' },
  ];

  // Kolumny dla DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nazwa zasobu', width: 200 },
    { field: 'type', headerName: 'Typ', width: 130 },
    { field: 'location', headerName: 'Lokalizacja', width: 150 },
    { field: 'retention', headerName: 'Okres retencji', width: 130 },
    { field: 'sensitivity', headerName: 'Wrażliwość', width: 130 },
    { field: 'owner', headerName: 'Właściciel', width: 150 },
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
              Inwentaryzacja Danych
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zarządzaj zasobami danych osobowych w organizacji
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
            >
              Dodaj zasób
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
              <StorageIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zasoby danych
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
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zasoby wysokiego ryzyka
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
              <DescriptionIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="div">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zasoby do przeglądu
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Szukaj zasobu..."
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

export default DataInventory;
