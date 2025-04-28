import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, TextField, Button, Divider, Dialog, DialogContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DataMappingForm from './DataMappingForm';

// Komponent listy mapowań danych
const DataMappingList = () => {
  // Stan dla formularza
  const [openForm, setOpenForm] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [searchTerm, setSearchTerm] = useState('');

  // Przykładowe dane
  const rows = [
    { id: 1, name: 'Dane klientów - marketing', category: 'Marketing', status: 'Aktywne', lastUpdated: '2025-04-15', riskLevel: 'Niskie' },
    { id: 2, name: 'Dane pracowników - HR', category: 'HR', status: 'Aktywne', lastUpdated: '2025-04-10', riskLevel: 'Średnie' },
    { id: 3, name: 'Dane finansowe klientów', category: 'Finanse', status: 'Aktywne', lastUpdated: '2025-04-05', riskLevel: 'Wysokie' },
    { id: 4, name: 'Dane dostawców', category: 'Zakupy', status: 'Nieaktywne', lastUpdated: '2025-03-20', riskLevel: 'Niskie' },
    { id: 5, name: 'Dane użytkowników platformy', category: 'IT', status: 'Aktywne', lastUpdated: '2025-04-12', riskLevel: 'Średnie' },
    { id: 6, name: 'Dane medyczne pracowników', category: 'HR', status: 'Aktywne', lastUpdated: '2025-03-28', riskLevel: 'Wysokie' },
    { id: 7, name: 'Dane marketingowe - newsletter', category: 'Marketing', status: 'Aktywne', lastUpdated: '2025-04-18', riskLevel: 'Niskie' },
    { id: 8, name: 'Dane kontrahentów', category: 'Sprzedaż', status: 'Aktywne', lastUpdated: '2025-04-01', riskLevel: 'Średnie' },
  ];

  // Filtrowanie danych na podstawie wyszukiwania
  const filteredRows = rows.filter(row => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obsługa otwierania formularza do tworzenia nowego mapowania
  const handleAddNew = () => {
    setSelectedMapping(null);
    setFormMode('create');
    setOpenForm(true);
  };

  // Obsługa otwierania formularza do edycji istniejącego mapowania
  const handleEdit = (mapping) => {
    setSelectedMapping(mapping);
    setFormMode('edit');
    setOpenForm(true);
  };

  // Obsługa zamykania formularza
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  // Obsługa wyszukiwania
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Kolumny dla DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nazwa mapowania', width: 250 },
    { field: 'category', headerName: 'Kategoria', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'lastUpdated', headerName: 'Ostatnia aktualizacja', width: 180 },
    { field: 'riskLevel', headerName: 'Poziom ryzyka', width: 150 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ mr: 1 }}
            onClick={() => handleEdit(params.row)}
          >
            Edytuj
          </Button>
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
              Lista mapowań danych
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zarządzaj mapowaniami danych osobowych w organizacji
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
              onClick={handleAddNew}
            >
              Dodaj nowe
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

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Szukaj mapowania..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={(params) => handleEdit(params.row)}
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Dialog z formularzem mapowania danych */}
      <Dialog 
        open={openForm} 
        onClose={handleCloseForm}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent sx={{ p: 0 }}>
          <DataMappingForm 
            mode={formMode} 
            mapping={selectedMapping} 
            onClose={handleCloseForm} 
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DataMappingList;
