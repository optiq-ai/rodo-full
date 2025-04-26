// src/features/IncidentManagement/IncidentManagement.jsx
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

// Mock data dla incydentów
const mockIncidents = [
  { 
    id: 1, 
    title: 'Wyciek danych klientów', 
    description: 'Wyciek danych klientów z bazy danych', 
    status: 'investigating', 
    severity: 'high', 
    reportedAt: '2023-01-01T12:00:00Z', 
    reportedBy: 'Jan Kowalski',
    assignedTo: 'Anna Nowak' 
  },
  { 
    id: 2, 
    title: 'Nieautoryzowany dostęp do systemu', 
    description: 'Wykryto nieautoryzowany dostęp do systemu CRM', 
    status: 'resolved', 
    severity: 'medium', 
    reportedAt: '2023-01-05T10:30:00Z', 
    reportedBy: 'Piotr Wiśniewski',
    assignedTo: 'Jan Kowalski' 
  },
  { 
    id: 3, 
    title: 'Błąd w formularzu kontaktowym', 
    description: 'Błąd w formularzu kontaktowym powodujący zapisywanie niepełnych danych', 
    status: 'resolved', 
    severity: 'low', 
    reportedAt: '2023-01-10T09:15:00Z', 
    reportedBy: 'Magdalena Kowalczyk',
    assignedTo: 'Piotr Wiśniewski' 
  },
  { 
    id: 4, 
    title: 'Utrata dostępu do bazy danych', 
    description: 'Czasowa utrata dostępu do bazy danych klientów', 
    status: 'investigating', 
    severity: 'high', 
    reportedAt: '2023-01-15T14:20:00Z', 
    reportedBy: 'Anna Nowak',
    assignedTo: 'Anna Nowak' 
  },
  { 
    id: 5, 
    title: 'Phishing na pracowników', 
    description: 'Atak phishingowy skierowany na pracowników działu HR', 
    status: 'reported', 
    severity: 'medium', 
    reportedAt: '2023-01-20T11:45:00Z', 
    reportedBy: 'Jan Kowalski',
    assignedTo: null 
  },
  { 
    id: 6, 
    title: 'Naruszenie polityki haseł', 
    description: 'Wykryto naruszenie polityki haseł przez pracowników', 
    status: 'investigating', 
    severity: 'low', 
    reportedAt: '2023-01-25T08:30:00Z', 
    reportedBy: 'Piotr Wiśniewski',
    assignedTo: 'Magdalena Kowalczyk' 
  },
  { 
    id: 7, 
    title: 'Wyciek danych z formularza rejestracyjnego', 
    description: 'Potencjalny wyciek danych z formularza rejestracyjnego na stronie www', 
    status: 'reported', 
    severity: 'high', 
    reportedAt: '2023-01-30T16:15:00Z', 
    reportedBy: 'Anna Nowak',
    assignedTo: null 
  },
];

const incidentColumns = [
  { id: 'title', label: 'Tytuł', sortable: true },
  { id: 'status', label: 'Status', type: 'status', sortable: true,
    render: (value) => {
      const statusMap = {
        'reported': 'Zgłoszony',
        'investigating': 'W trakcie badania',
        'resolved': 'Rozwiązany',
        'closed': 'Zamknięty'
      };
      
      let color = 'default';
      if (value === 'reported') color = 'warning';
      if (value === 'investigating') color = 'info';
      if (value === 'resolved') color = 'success';
      if (value === 'closed') color = 'default';
      
      return (
        <Chip 
          label={statusMap[value] || value} 
          size="small" 
          color={color}
        />
      );
    }
  },
  { id: 'severity', label: 'Ważność', sortable: true, 
    render: (value) => {
      const severityMap = {
        'low': 'Niska',
        'medium': 'Średnia',
        'high': 'Wysoka'
      };
      
      let color = 'default';
      if (value === 'high') color = 'error';
      if (value === 'medium') color = 'warning';
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
            {severityMap[value] || value}
          </Typography>
        </Box>
      );
    }
  },
  { id: 'reportedAt', label: 'Data zgłoszenia', type: 'datetime', sortable: true },
  { id: 'reportedBy', label: 'Zgłaszający', sortable: true },
  { id: 'assignedTo', label: 'Przypisano do', sortable: true,
    render: (value) => value || 'Nieprzypisany'
  },
];

const IncidentManagement = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleIncidentClick = (incident) => {
    // Placeholder dla przejścia do szczegółów incydentu
    console.log('Kliknięto incydent:', incident);
    // navigate(`/incidents/${incident.id}`);
  };

  const handleAddIncident = () => {
    // Placeholder dla dodawania nowego incydentu
    console.log('Dodawanie nowego incydentu');
    // navigate('/incidents/new');
  };

  const handleRefresh = () => {
    setLoading(true);
    // Symulacja odświeżania danych
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Filtrowanie incydentów na podstawie wybranej zakładki
  const filteredIncidents = mockIncidents.filter(incident => {
    if (tabValue === 0) return true; // Wszystkie
    if (tabValue === 1) return incident.status === 'reported'; // Zgłoszone
    if (tabValue === 2) return incident.status === 'investigating'; // W trakcie badania
    if (tabValue === 3) return incident.status === 'resolved' || incident.status === 'closed'; // Rozwiązane
    return true;
  });

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Zarządzanie incydentami
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddIncident}
          >
            Nowy incydent
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
          <Tab label="Zgłoszone" />
          <Tab label="W trakcie badania" />
          <Tab label="Rozwiązane" />
        </Tabs>
      </Box>

      <DataTable
        columns={incidentColumns}
        data={filteredIncidents}
        loading={loading}
        onRowClick={handleIncidentClick}
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

export default IncidentManagement;
