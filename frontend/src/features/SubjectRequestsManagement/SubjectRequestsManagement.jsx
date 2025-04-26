// src/features/SubjectRequestsManagement/SubjectRequestsManagement.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import DataTable from '../../components/DataTable';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

// Mock data dla wniosków podmiotów danych
const mockRequests = [
  { 
    id: 1, 
    subject: 'Jan Nowak', 
    email: 'jan.nowak@example.com',
    requestType: 'access', 
    status: 'pending', 
    priority: 'normal',
    submittedAt: '2023-01-01T12:00:00Z', 
    dueDate: '2023-01-31T12:00:00Z',
    assignedTo: 'Anna Kowalska' 
  },
  { 
    id: 2, 
    subject: 'Maria Wiśniewska', 
    email: 'maria.wisniewska@example.com',
    requestType: 'erasure', 
    status: 'in_progress', 
    priority: 'high',
    submittedAt: '2023-01-05T10:30:00Z', 
    dueDate: '2023-02-04T10:30:00Z',
    assignedTo: 'Piotr Nowak' 
  },
  { 
    id: 3, 
    subject: 'Adam Kowalski', 
    email: 'adam.kowalski@example.com',
    requestType: 'rectification', 
    status: 'completed', 
    priority: 'normal',
    submittedAt: '2023-01-10T09:15:00Z', 
    dueDate: '2023-02-09T09:15:00Z',
    assignedTo: 'Magdalena Zielińska' 
  },
  { 
    id: 4, 
    subject: 'Ewa Dąbrowska', 
    email: 'ewa.dabrowska@example.com',
    requestType: 'portability', 
    status: 'pending', 
    priority: 'low',
    submittedAt: '2023-01-15T14:20:00Z', 
    dueDate: '2023-02-14T14:20:00Z',
    assignedTo: null 
  },
  { 
    id: 5, 
    subject: 'Tomasz Lewandowski', 
    email: 'tomasz.lewandowski@example.com',
    requestType: 'restriction', 
    status: 'in_progress', 
    priority: 'high',
    submittedAt: '2023-01-20T11:45:00Z', 
    dueDate: '2023-02-19T11:45:00Z',
    assignedTo: 'Anna Kowalska' 
  },
  { 
    id: 6, 
    subject: 'Katarzyna Wójcik', 
    email: 'katarzyna.wojcik@example.com',
    requestType: 'objection', 
    status: 'completed', 
    priority: 'normal',
    submittedAt: '2023-01-25T08:30:00Z', 
    dueDate: '2023-02-24T08:30:00Z',
    assignedTo: 'Piotr Nowak' 
  },
  { 
    id: 7, 
    subject: 'Michał Kamiński', 
    email: 'michal.kaminski@example.com',
    requestType: 'access', 
    status: 'pending', 
    priority: 'normal',
    submittedAt: '2023-01-30T16:15:00Z', 
    dueDate: '2023-03-01T16:15:00Z',
    assignedTo: null 
  },
];

const requestColumns = [
  { id: 'subject', label: 'Podmiot danych', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'requestType', label: 'Typ wniosku', sortable: true,
    render: (value) => {
      const requestTypeMap = {
        'access': 'Dostęp do danych',
        'erasure': 'Usunięcie danych',
        'rectification': 'Sprostowanie danych',
        'portability': 'Przeniesienie danych',
        'restriction': 'Ograniczenie przetwarzania',
        'objection': 'Sprzeciw wobec przetwarzania'
      };
      
      return requestTypeMap[value] || value;
    }
  },
  { id: 'status', label: 'Status', type: 'status', sortable: true,
    render: (value) => {
      const statusMap = {
        'pending': 'Oczekujący',
        'in_progress': 'W trakcie',
        'completed': 'Zakończony',
        'rejected': 'Odrzucony'
      };
      
      let color = 'default';
      if (value === 'pending') color = 'warning';
      if (value === 'in_progress') color = 'info';
      if (value === 'completed') color = 'success';
      if (value === 'rejected') color = 'error';
      
      return (
        <Chip 
          label={statusMap[value] || value} 
          size="small" 
          color={color}
        />
      );
    }
  },
  { id: 'priority', label: 'Priorytet', sortable: true, 
    render: (value) => {
      const priorityMap = {
        'low': 'Niski',
        'normal': 'Normalny',
        'high': 'Wysoki'
      };
      
      let color = 'default';
      if (value === 'high') color = 'error';
      if (value === 'normal') color = 'primary';
      if (value === 'low') color = 'success';
      
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: `${color}.main`,
              mr: 1
            }}
          />
          <Typography variant="body2">
            {priorityMap[value] || value}
          </Typography>
        </Box>
      );
    }
  },
  { id: 'submittedAt', label: 'Data złożenia', type: 'datetime', sortable: true },
  { id: 'dueDate', label: 'Termin realizacji', type: 'date', sortable: true },
  { id: 'assignedTo', label: 'Przypisano do', sortable: true,
    render: (value) => value || 'Nieprzypisany'
  },
];

const SubjectRequestsManagement = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRequestClick = (request) => {
    // Placeholder dla przejścia do szczegółów wniosku
    console.log('Kliknięto wniosek:', request);
    // navigate(`/subject-requests/${request.id}`);
  };

  const handleAddRequest = () => {
    // Placeholder dla dodawania nowego wniosku
    console.log('Dodawanie nowego wniosku');
    // navigate('/subject-requests/new');
  };

  const handleRefresh = () => {
    setLoading(true);
    // Symulacja odświeżania danych
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Filtrowanie wniosków na podstawie wybranej zakładki
  const filteredRequests = mockRequests.filter(request => {
    if (tabValue === 0) return true; // Wszystkie
    if (tabValue === 1) return request.status === 'pending'; // Oczekujące
    if (tabValue === 2) return request.status === 'in_progress'; // W trakcie
    if (tabValue === 3) return request.status === 'completed' || request.status === 'rejected'; // Zakończone
    return true;
  });

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Wnioski podmiotów danych
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddRequest}
          >
            Nowy wniosek
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Wszystkie" />
          <Tab label="Oczekujące" />
          <Tab label="W trakcie" />
          <Tab label="Zakończone" />
        </Tabs>
      </Box>

      <DataTable
        columns={requestColumns}
        data={filteredRequests}
        loading={loading}
        onRowClick={handleRequestClick}
        onRefresh={handleRefresh}
        actions={
          <>
            <Tooltip title="Eksportuj">
              <IconButton size="small" sx={{ mr: 1 }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zaawansowane filtry">
              <IconButton size="small" sx={{ mr: 1 }}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
    </Box>
  );
};

export default SubjectRequestsManagement;
