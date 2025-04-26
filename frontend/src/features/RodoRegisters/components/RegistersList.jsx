// src/features/RodoRegisters/components/RegistersList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from '../../../components/DataTable/DataTable';

const RegistersList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Symulacja pobierania danych z API
    const fetchData = async () => {
      try {
        // W rzeczywistej aplikacji byłoby to wywołanie API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Przykładowe dane
        const mockData = [
          {
            id: 1,
            name: 'Rejestr pracowników',
            category: 'HR',
            status: 'active',
            lastUpdated: '2025-04-15',
            dataSubjects: 'Pracownicy',
            dataController: 'Dział HR',
            riskLevel: 'low'
          },
          {
            id: 2,
            name: 'Rejestr klientów',
            category: 'Sprzedaż',
            status: 'active',
            lastUpdated: '2025-04-10',
            dataSubjects: 'Klienci',
            dataController: 'Dział Sprzedaży',
            riskLevel: 'medium'
          },
          {
            id: 3,
            name: 'Rejestr marketingowy',
            category: 'Marketing',
            status: 'inactive',
            lastUpdated: '2025-03-20',
            dataSubjects: 'Potencjalni klienci',
            dataController: 'Dział Marketingu',
            riskLevel: 'high'
          },
          {
            id: 4,
            name: 'Rejestr dostawców',
            category: 'Zakupy',
            status: 'active',
            lastUpdated: '2025-04-05',
            dataSubjects: 'Dostawcy',
            dataController: 'Dział Zakupów',
            riskLevel: 'low'
          },
          {
            id: 5,
            name: 'Rejestr użytkowników platformy',
            category: 'IT',
            status: 'active',
            lastUpdated: '2025-04-18',
            dataSubjects: 'Użytkownicy',
            dataController: 'Dział IT',
            riskLevel: 'medium'
          }
        ];
        
        setRegisters(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleView = (id) => {
    navigate(`/registers/${id}`);
  };
  
  const handleEdit = (id) => {
    navigate(`/registers/${id}/edit`);
  };
  
  const handleDelete = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć ten rejestr?')) {
      setRegisters(registers.filter(register => register.id !== id));
    }
  };
  
  const columns = [
    {
      field: 'name',
      headerName: 'Nazwa rejestru',
      flex: 2
    },
    {
      field: 'category',
      headerName: 'Kategoria',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const status = params.value;
        let color = 'default';
        let label = 'Nieznany';
        
        if (status === 'active') {
          color = 'success';
          label = 'Aktywny';
        } else if (status === 'inactive') {
          color = 'error';
          label = 'Nieaktywny';
        }
        
        return (
          <Chip 
            label={label} 
            color={color} 
            size="small" 
            variant="filled"
          />
        );
      }
    },
    {
      field: 'lastUpdated',
      headerName: 'Ostatnia aktualizacja',
      flex: 1
    },
    {
      field: 'riskLevel',
      headerName: 'Poziom ryzyka',
      flex: 1,
      renderCell: (params) => {
        const riskLevel = params.value;
        let color = 'default';
        let label = 'Nieznany';
        
        if (riskLevel === 'low') {
          color = 'success';
          label = 'Niski';
        } else if (riskLevel === 'medium') {
          color = 'warning';
          label = 'Średni';
        } else if (riskLevel === 'high') {
          color = 'error';
          label = 'Wysoki';
        }
        
        return (
          <Chip 
            label={label} 
            color={color} 
            size="small" 
            variant="filled"
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Akcje',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => handleView(params.row.id)}
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <VisibilityIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => handleEdit(params.row.id)}
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      )
    }
  ];
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 0, 
        overflow: 'hidden',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.background.paper, 1)} 120px)`,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}>
        <Typography variant="h6" component="h2">
          Lista rejestrów czynności przetwarzania
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Przeglądaj, dodawaj i zarządzaj rejestrami czynności przetwarzania danych osobowych zgodnie z RODO.
        </Typography>
      </Box>
      
      <Box sx={{ height: 500, width: '100%', p: 3, pt: 1 }}>
        <DataTable
          rows={registers}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default RegistersList;
