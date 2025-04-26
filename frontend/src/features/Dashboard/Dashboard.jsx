// src/features/Dashboard/Dashboard.jsx
import React from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
} from '@mui/material';
import { StatCard } from '../../components/Card';
import { LineChart } from '../../components/Chart';
import DataTable from '../../components/DataTable';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ErrorIcon from '@mui/icons-material/Error';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

// Mock data dla dashboardu
const mockStats = [
  { 
    title: 'Dokumenty', 
    value: '124', 
    icon: <DescriptionIcon />, 
    color: '#4285f4', 
    trend: 'up', 
    trendValue: 12 
  },
  { 
    title: 'Rejestry', 
    value: '45', 
    icon: <ListAltIcon />, 
    color: '#4caf50', 
    trend: 'up', 
    trendValue: 5 
  },
  { 
    title: 'Incydenty', 
    value: '8', 
    icon: <ErrorIcon />, 
    color: '#f44336', 
    trend: 'down', 
    trendValue: -15 
  },
  { 
    title: 'Wnioski', 
    value: '32', 
    icon: <ContactMailIcon />, 
    color: '#ff9800', 
    trend: 'up', 
    trendValue: 8 
  },
];

const mockChartData = {
  labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
  datasets: [
    {
      label: 'Incydenty',
      data: [3, 5, 2, 8, 10, 7, 6, 5, 9, 8, 7, 8],
      color: '#f44336',
    },
    {
      label: 'Wnioski podmiotów',
      data: [5, 8, 12, 15, 10, 7, 11, 14, 16, 12, 9, 12],
      color: '#ff9800',
    }
  ]
};

const mockActivities = [
  { id: 1, type: 'document', text: 'Zaktualizowano Politykę Prywatności', time: '2 godziny temu', user: 'Jan Kowalski' },
  { id: 2, type: 'incident', text: 'Zgłoszono nowy incydent: Wyciek danych', time: '4 godziny temu', user: 'Anna Nowak' },
  { id: 3, type: 'request', text: 'Nowy wniosek o dostęp do danych', time: '1 dzień temu', user: 'Piotr Wiśniewski' },
  { id: 4, type: 'register', text: 'Dodano nowy wpis do rejestru czynności', time: '2 dni temu', user: 'Magdalena Kowalczyk' },
  { id: 5, type: 'document', text: 'Utworzono nowy dokument: Procedura obsługi incydentów', time: '3 dni temu', user: 'Jan Kowalski' },
];

const mockIncidents = [
  { id: 1, title: 'Wyciek danych klientów', status: 'investigating', severity: 'high', reportedAt: '2023-01-01T12:00:00Z', assignedTo: 'Anna Nowak' },
  { id: 2, title: 'Nieautoryzowany dostęp do systemu', status: 'resolved', severity: 'medium', reportedAt: '2023-01-05T10:30:00Z', assignedTo: 'Jan Kowalski' },
  { id: 3, title: 'Błąd w formularzu kontaktowym', status: 'resolved', severity: 'low', reportedAt: '2023-01-10T09:15:00Z', assignedTo: 'Piotr Wiśniewski' },
  { id: 4, title: 'Utrata dostępu do bazy danych', status: 'investigating', severity: 'high', reportedAt: '2023-01-15T14:20:00Z', assignedTo: 'Anna Nowak' },
  { id: 5, title: 'Phishing na pracowników', status: 'reported', severity: 'medium', reportedAt: '2023-01-20T11:45:00Z', assignedTo: null },
];

const incidentColumns = [
  { id: 'title', label: 'Tytuł', sortable: true },
  { id: 'status', label: 'Status', type: 'status', sortable: true },
  { id: 'severity', label: 'Ważność', sortable: true, 
    render: (value) => {
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
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {value}
          </Typography>
        </Box>
      );
    }
  },
  { id: 'reportedAt', label: 'Data zgłoszenia', type: 'datetime', sortable: true },
  { id: 'assignedTo', label: 'Przypisano do', sortable: true,
    render: (value) => value || 'Nieprzypisany'
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleIncidentClick = (incident) => {
    // Placeholder dla przejścia do szczegółów incydentu
    navigate(`${routes.incidents}/${incident.id}`);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document':
        return <DescriptionIcon color="primary" />;
      case 'incident':
        return <ErrorIcon color="error" />;
      case 'request':
        return <ContactMailIcon color="warning" />;
      case 'register':
        return <ListAltIcon color="success" />;
      default:
        return <NotificationsActiveIcon />;
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      {/* Statystyki */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              trendValue={stat.trendValue}
              onClick={() => navigate(
                stat.title === 'Dokumenty' ? routes.documents :
                stat.title === 'Rejestry' ? routes.registers :
                stat.title === 'Incydenty' ? routes.incidents :
                routes.subjectRequests
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* Wykresy i aktywności */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <LineChart
            title="Trendy"
            subtitle="Liczba incydentów i wniosków podmiotów danych w czasie"
            data={mockChartData.datasets}
            labels={mockChartData.labels}
            height={350}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6">Ostatnie aktywności</Typography>
            </Box>
            <Divider />
            <List sx={{ p: 0, height: 350, overflow: 'auto' }}>
              {mockActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      {getActivityIcon(activity.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.text}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {activity.user}
                          </Typography>
                          {` — ${activity.time}`}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Button variant="text" size="small">
                Zobacz wszystkie aktywności
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabela incydentów */}
      <DataTable
        title="Ostatnie incydenty"
        subtitle="Lista ostatnio zgłoszonych incydentów"
        columns={incidentColumns}
        data={mockIncidents}
        onRowClick={handleIncidentClick}
        onRefresh={() => console.log('Odświeżanie danych...')}
        actions={
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => navigate(routes.incidents)}
            sx={{ mr: 1 }}
          >
            Zobacz wszystkie
          </Button>
        }
      />
    </Box>
  );
};

export default Dashboard;
