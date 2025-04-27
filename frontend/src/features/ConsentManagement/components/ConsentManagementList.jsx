// src/features/ConsentManagement/components/ConsentManagementList.jsx
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

const ConsentManagementList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [consents, setConsents] = useState([]);
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
            name: 'Zgoda na przetwarzanie danych marketingowych',
            type: 'marketing',
            status: 'active',
            dataCategories: 'Dane kontaktowe, preferencje',
            createdAt: '2025-04-15',
            expiresAt: '2026-04-15',
            createdBy: 'Jan Kowalski',
            version: '1.0'
          },
          {
            id: 2,
            name: 'Zgoda na newsletter',
            type: 'newsletter',
            status: 'active',
            dataCategories: 'Email',
            createdAt: '2025-04-10',
            expiresAt: '2026-04-10',
            createdBy: 'Anna Nowak',
            version: '1.2'
          },
          {
            id: 3,
            name: 'Zgoda na profilowanie',
            type: 'profiling',
            status: 'inactive',
            dataCategories: 'Dane osobowe, historia zakupów, preferencje',
            createdAt: '2025-03-20',
            expiresAt: '2026-03-20',
            createdBy: 'Piotr Wiśniewski',
            version: '2.0'
          },
          {
            id: 4,
            name: 'Zgoda na udostępnianie danych partnerom',
            type: 'sharing',
            status: 'pending',
            dataCategories: 'Dane kontaktowe, historia zakupów',
            createdAt: '2025-04-05',
            expiresAt: '2026-04-05',
            createdBy: 'Magdalena Dąbrowska',
            version: '1.0'
          },
          {
            id: 5,
            name: 'Zgoda na cookies analityczne',
            type: 'cookies',
            status: 'active',
            dataCategories: 'Dane przeglądania',
            createdAt: '2025-04-18',
            expiresAt: '2026-04-18',
            createdBy: 'Tomasz Lewandowski',
            version: '1.1'
          }
        ];
        
        setConsents(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleView = (id) => {
    navigate(`/consent-management/${id}`);
  };
  
  const handleEdit = (id) => {
    navigate(`/consent-management/${id}/edit`);
  };
  
  const handleDelete = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć tę zgodę?')) {
      setConsents(consents.filter(consent => consent.id !== id));
    }
  };
  
  const columns = [
    {
      id: 'name',
      label: 'Nazwa zgody',
      flex: 2
    },
    {
      id: 'type',
      label: 'Typ',
      flex: 1,
      render: (value) => {
        let color = 'default';
        
        if (value === 'marketing') {
          color = 'primary';
        } else if (value === 'newsletter') {
          color = 'secondary';
        } else if (value === 'profiling') {
          color = 'error';
        } else if (value === 'sharing') {
          color = 'warning';
        } else if (value === 'cookies') {
          color = 'info';
        }
        
        return (
          <Chip 
            label={value} 
            color={color} 
            size="small" 
            variant="outlined"
          />
        );
      }
    },
    {
      id: 'status',
      label: 'Status',
      flex: 1,
      render: (value) => {
        let color = 'default';
        let label = 'Nieznany';
        
        if (value === 'active') {
          color = 'success';
          label = 'Aktywna';
        } else if (value === 'inactive') {
          color = 'error';
          label = 'Nieaktywna';
        } else if (value === 'pending') {
          color = 'warning';
          label = 'Oczekująca';
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
      id: 'dataCategories',
      label: 'Kategorie danych',
      flex: 2
    },
    {
      id: 'createdAt',
      label: 'Data utworzenia',
      flex: 1,
      type: 'date'
    },
    {
      id: 'expiresAt',
      label: 'Data wygaśnięcia',
      flex: 1,
      type: 'date'
    },
    {
      id: 'version',
      label: 'Wersja',
      flex: 1
    },
    {
      id: 'actions',
      label: 'Akcje',
      flex: 1,
      sortable: false,
      render: (_, row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => handleView(row.id)}
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <VisibilityIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => handleEdit(row.id)}
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(row.id)}
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
          Lista zgód
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Przeglądaj, dodawaj i zarządzaj zgodami na przetwarzanie danych osobowych.
        </Typography>
      </Box>
      
      <Box sx={{ height: 500, width: '100%', p: 3, pt: 1 }}>
        <DataTable
          data={consents}
          columns={columns}
          loading={loading}
          pagination={true}
          sorting={true}
          filtering={true}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
          onRowClick={(row) => handleView(row.id)}
          title="Zgody"
        />
      </Box>
    </Paper>
  );
};

export default ConsentManagementList;
