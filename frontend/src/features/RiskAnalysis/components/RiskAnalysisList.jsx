// src/features/RiskAnalysis/components/RiskAnalysisList.jsx
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

const RiskAnalysisList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [riskAnalyses, setRiskAnalyses] = useState([]);
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
            name: 'Analiza ryzyka - system HR',
            processName: 'Przetwarzanie danych pracowników',
            status: 'completed',
            riskLevel: 'low',
            lastUpdated: '2025-04-15',
            createdBy: 'Jan Kowalski',
            department: 'IT'
          },
          {
            id: 2,
            name: 'Analiza ryzyka - system CRM',
            processName: 'Przetwarzanie danych klientów',
            status: 'in_progress',
            riskLevel: 'medium',
            lastUpdated: '2025-04-10',
            createdBy: 'Anna Nowak',
            department: 'Sprzedaż'
          },
          {
            id: 3,
            name: 'Analiza ryzyka - system marketingowy',
            processName: 'Kampanie marketingowe',
            status: 'completed',
            riskLevel: 'high',
            lastUpdated: '2025-03-20',
            createdBy: 'Piotr Wiśniewski',
            department: 'Marketing'
          },
          {
            id: 4,
            name: 'Analiza ryzyka - system finansowy',
            processName: 'Przetwarzanie danych finansowych',
            status: 'planned',
            riskLevel: 'medium',
            lastUpdated: '2025-04-05',
            createdBy: 'Magdalena Dąbrowska',
            department: 'Finanse'
          },
          {
            id: 5,
            name: 'Analiza ryzyka - aplikacja mobilna',
            processName: 'Przetwarzanie danych użytkowników aplikacji',
            status: 'completed',
            riskLevel: 'medium',
            lastUpdated: '2025-04-18',
            createdBy: 'Tomasz Lewandowski',
            department: 'IT'
          }
        ];
        
        setRiskAnalyses(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleView = (id) => {
    navigate(`/risk-analysis/${id}`);
  };
  
  const handleEdit = (id) => {
    navigate(`/risk-analysis/${id}/edit`);
  };
  
  const handleDelete = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć tę analizę ryzyka?')) {
      setRiskAnalyses(riskAnalyses.filter(analysis => analysis.id !== id));
    }
  };
  
  const columns = [
    {
      field: 'name',
      headerName: 'Nazwa analizy',
      flex: 2
    },
    {
      field: 'processName',
      headerName: 'Proces',
      flex: 2
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const status = params.value;
        let color = 'default';
        let label = 'Nieznany';
        
        if (status === 'completed') {
          color = 'success';
          label = 'Zakończona';
        } else if (status === 'in_progress') {
          color = 'warning';
          label = 'W trakcie';
        } else if (status === 'planned') {
          color = 'info';
          label = 'Planowana';
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
      field: 'lastUpdated',
      headerName: 'Ostatnia aktualizacja',
      flex: 1
    },
    {
      field: 'createdBy',
      headerName: 'Utworzył',
      flex: 1
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
          Lista analiz ryzyka
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Przeglądaj, dodawaj i zarządzaj analizami ryzyka związanymi z przetwarzaniem danych osobowych.
        </Typography>
      </Box>
      
      <Box sx={{ height: 500, width: '100%', p: 3, pt: 1 }}>
        <DataTable
          data={riskAnalyses}
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

export default RiskAnalysisList;
