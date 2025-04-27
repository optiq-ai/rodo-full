// src/features/TrainingAndEducation/components/TrainingList.jsx
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

const TrainingList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
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
            title: 'Podstawy RODO dla pracowników',
            type: 'e-learning',
            status: 'active',
            targetGroup: 'Wszyscy pracownicy',
            completionRate: 78,
            lastUpdated: '2025-04-10',
            duration: 60,
            mandatory: true
          },
          {
            id: 2,
            title: 'Bezpieczeństwo danych osobowych',
            type: 'webinar',
            status: 'planned',
            targetGroup: 'Dział IT',
            completionRate: 0,
            lastUpdated: '2025-04-15',
            duration: 90,
            mandatory: true
          },
          {
            id: 3,
            title: 'Obsługa incydentów związanych z danymi osobowymi',
            type: 'workshop',
            status: 'completed',
            targetGroup: 'Kadra zarządzająca',
            completionRate: 100,
            lastUpdated: '2025-03-20',
            duration: 120,
            mandatory: true
          },
          {
            id: 4,
            title: 'Aktualizacja przepisów RODO 2025',
            type: 'e-learning',
            status: 'active',
            targetGroup: 'Dział prawny',
            completionRate: 45,
            lastUpdated: '2025-04-05',
            duration: 45,
            mandatory: false
          },
          {
            id: 5,
            title: 'Ochrona danych w pracy zdalnej',
            type: 'webinar',
            status: 'active',
            targetGroup: 'Wszyscy pracownicy',
            completionRate: 62,
            lastUpdated: '2025-04-01',
            duration: 60,
            mandatory: true
          }
        ];
        
        setTrainings(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleView = (id) => {
    navigate(`/training-and-education/${id}`);
  };
  
  const handleEdit = (id) => {
    navigate(`/training-and-education/${id}/edit`);
  };
  
  const handleDelete = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć to szkolenie?')) {
      setTrainings(trainings.filter(training => training.id !== id));
    }
  };
  
  const columns = [
    {
      field: 'title',
      headerName: 'Tytuł szkolenia',
      flex: 2
    },
    {
      field: 'type',
      headerName: 'Typ',
      flex: 1,
      renderCell: (params) => {
        const type = params.value;
        let color = 'default';
        let label = type;
        
        if (type === 'e-learning') {
          color = 'primary';
        } else if (type === 'webinar') {
          color = 'secondary';
        } else if (type === 'workshop') {
          color = 'info';
        }
        
        return (
          <Chip 
            label={label} 
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
      flex: 1,
      renderCell: (params) => {
        const status = params.value;
        let color = 'default';
        let label = 'Nieznany';
        
        if (status === 'active') {
          color = 'success';
          label = 'Aktywne';
        } else if (status === 'planned') {
          color = 'info';
          label = 'Planowane';
        } else if (status === 'completed') {
          color = 'secondary';
          label = 'Zakończone';
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
      field: 'targetGroup',
      headerName: 'Grupa docelowa',
      flex: 1.5
    },
    {
      field: 'completionRate',
      headerName: 'Ukończenie (%)',
      flex: 1,
      renderCell: (params) => {
        const rate = params.value;
        let color = theme.palette.error.main;
        
        if (rate >= 80) {
          color = theme.palette.success.main;
        } else if (rate >= 50) {
          color = theme.palette.warning.main;
        }
        
        return (
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center',
            position: 'relative'
          }}>
            <Box sx={{ 
              width: '80%', 
              height: 10, 
              bgcolor: alpha(color, 0.2),
              borderRadius: 5
            }}>
              <Box sx={{ 
                width: `${rate}%`, 
                height: '100%', 
                bgcolor: color,
                borderRadius: 5
              }} />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {rate}%
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'duration',
      headerName: 'Czas trwania (min)',
      flex: 1
    },
    {
      field: 'mandatory',
      headerName: 'Obowiązkowe',
      flex: 1,
      renderCell: (params) => (
        <Chip 
          label={params.value ? 'Tak' : 'Nie'} 
          color={params.value ? 'error' : 'default'} 
          size="small" 
          variant="outlined"
        />
      )
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
          Lista szkoleń
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Przeglądaj, dodawaj i zarządzaj szkoleniami z zakresu ochrony danych osobowych.
        </Typography>
      </Box>
      
      <Box sx={{ height: 500, width: '100%', p: 3, pt: 1 }}>
        <DataTable
          data={trainings}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          pagination={true}
          sorting={true}
          filtering={true}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
        />
      </Box>
    </Paper>
  );
};

export default TrainingList;
