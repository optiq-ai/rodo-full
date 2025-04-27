// src/features/RiskAnalysis/components/RiskMitigationPlans.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const RiskMitigationPlans = () => {
  const theme = useTheme();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    riskAnalysisId: '',
    responsiblePerson: '',
    deadline: '',
    status: 'not_started'
  });
  
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
            name: 'Plan ograniczenia ryzyka dla systemu CRM',
            description: 'Plan działań mających na celu ograniczenie ryzyka związanego z przetwarzaniem danych osobowych w systemie CRM',
            riskAnalysisId: 12,
            riskAnalysisName: 'Analiza ryzyka - System CRM',
            riskLevel: 'high',
            responsiblePerson: 'Jan Kowalski',
            deadline: '2025-06-30',
            status: 'in_progress',
            progress: 45,
            actions: [
              { id: 1, name: 'Wdrożenie szyfrowania danych', status: 'completed', deadline: '2025-05-15' },
              { id: 2, name: 'Implementacja mechanizmu wycofania zgód', status: 'in_progress', deadline: '2025-06-01' },
              { id: 3, name: 'Aktualizacja polityki retencji danych', status: 'not_started', deadline: '2025-06-15' },
              { id: 4, name: 'Szkolenie pracowników', status: 'not_started', deadline: '2025-06-30' }
            ]
          },
          {
            id: 2,
            name: 'Plan ograniczenia ryzyka dla procesu rekrutacji',
            description: 'Plan działań mających na celu ograniczenie ryzyka związanego z przetwarzaniem danych osobowych w procesie rekrutacji',
            riskAnalysisId: 8,
            riskAnalysisName: 'Analiza ryzyka - Proces rekrutacji',
            riskLevel: 'medium',
            responsiblePerson: 'Anna Nowak',
            deadline: '2025-05-31',
            status: 'in_progress',
            progress: 75,
            actions: [
              { id: 1, name: 'Aktualizacja klauzul informacyjnych', status: 'completed', deadline: '2025-04-15' },
              { id: 2, name: 'Wdrożenie procedury usuwania CV po zakończeniu rekrutacji', status: 'completed', deadline: '2025-04-30' },
              { id: 3, name: 'Ograniczenie dostępu do danych kandydatów', status: 'in_progress', deadline: '2025-05-15' },
              { id: 4, name: 'Audyt bezpieczeństwa systemu rekrutacyjnego', status: 'not_started', deadline: '2025-05-31' }
            ]
          },
          {
            id: 3,
            name: 'Plan ograniczenia ryzyka dla aplikacji mobilnej',
            description: 'Plan działań mających na celu ograniczenie ryzyka związanego z przetwarzaniem danych osobowych w aplikacji mobilnej',
            riskAnalysisId: 15,
            riskAnalysisName: 'Analiza ryzyka - Aplikacja mobilna',
            riskLevel: 'high',
            responsiblePerson: 'Piotr Wiśniewski',
            deadline: '2025-07-15',
            status: 'not_started',
            progress: 0,
            actions: [
              { id: 1, name: 'Implementacja uwierzytelniania dwuskładnikowego', status: 'not_started', deadline: '2025-06-15' },
              { id: 2, name: 'Szyfrowanie danych przechowywanych na urządzeniu', status: 'not_started', deadline: '2025-06-30' },
              { id: 3, name: 'Wdrożenie mechanizmu zgód marketingowych', status: 'not_started', deadline: '2025-07-15' }
            ]
          },
          {
            id: 4,
            name: 'Plan ograniczenia ryzyka dla systemu HR',
            description: 'Plan działań mających na celu ograniczenie ryzyka związanego z przetwarzaniem danych osobowych w systemie HR',
            riskAnalysisId: 5,
            riskAnalysisName: 'Analiza ryzyka - System HR',
            riskLevel: 'medium',
            responsiblePerson: 'Magdalena Dąbrowska',
            deadline: '2025-05-15',
            status: 'completed',
            progress: 100,
            actions: [
              { id: 1, name: 'Aktualizacja polityki haseł', status: 'completed', deadline: '2025-04-01' },
              { id: 2, name: 'Wdrożenie logowania zdarzeń', status: 'completed', deadline: '2025-04-15' },
              { id: 3, name: 'Ograniczenie dostępu do danych wrażliwych', status: 'completed', deadline: '2025-04-30' },
              { id: 4, name: 'Szkolenie administratorów systemu', status: 'completed', deadline: '2025-05-15' }
            ]
          },
          {
            id: 5,
            name: 'Plan ograniczenia ryzyka dla procesu marketingowego',
            description: 'Plan działań mających na celu ograniczenie ryzyka związanego z przetwarzaniem danych osobowych w procesie marketingowym',
            riskAnalysisId: 10,
            riskAnalysisName: 'Analiza ryzyka - Proces marketingowy',
            riskLevel: 'low',
            responsiblePerson: 'Tomasz Lewandowski',
            deadline: '2025-06-15',
            status: 'in_progress',
            progress: 30,
            actions: [
              { id: 1, name: 'Aktualizacja formularzy zgód marketingowych', status: 'completed', deadline: '2025-05-01' },
              { id: 2, name: 'Wdrożenie mechanizmu rezygnacji z komunikacji', status: 'in_progress', deadline: '2025-05-15' },
              { id: 3, name: 'Audyt zewnętrznych dostawców usług marketingowych', status: 'not_started', deadline: '2025-06-01' },
              { id: 4, name: 'Szkolenie zespołu marketingu', status: 'not_started', deadline: '2025-06-15' }
            ]
          }
        ];
        
        setPlans(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleOpenDialog = (plan = null) => {
    if (plan) {
      setSelectedPlan(plan);
      setNewPlan({
        name: plan.name,
        description: plan.description,
        riskAnalysisId: plan.riskAnalysisId.toString(),
        responsiblePerson: plan.responsiblePerson,
        deadline: plan.deadline,
        status: plan.status
      });
    } else {
      setSelectedPlan(null);
      setNewPlan({
        name: '',
        description: '',
        riskAnalysisId: '',
        responsiblePerson: '',
        deadline: '',
        status: 'not_started'
      });
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSavePlan = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (selectedPlan) {
      // Edycja istniejącego planu
      const updatedPlans = plans.map(plan => 
        plan.id === selectedPlan.id ? { 
          ...plan, 
          name: newPlan.name,
          description: newPlan.description,
          riskAnalysisId: parseInt(newPlan.riskAnalysisId),
          responsiblePerson: newPlan.responsiblePerson,
          deadline: newPlan.deadline,
          status: newPlan.status
        } : plan
      );
      setPlans(updatedPlans);
    } else {
      // Dodanie nowego planu
      const newPlanWithId = {
        ...newPlan,
        id: Math.max(...plans.map(p => p.id)) + 1,
        riskAnalysisId: parseInt(newPlan.riskAnalysisId),
        riskAnalysisName: 'Analiza ryzyka #' + newPlan.riskAnalysisId,
        riskLevel: 'medium',
        progress: 0,
        actions: []
      };
      setPlans([...plans, newPlanWithId]);
    }
    
    handleCloseDialog();
  };
  
  const handleDeletePlan = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć ten plan?')) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'not_started':
        return 'default';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'not_started':
        return 'Nie rozpoczęto';
      case 'in_progress':
        return 'W trakcie';
      case 'completed':
        return 'Zakończono';
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'not_started':
        return <ScheduleIcon />;
      case 'in_progress':
        return <WarningIcon />;
      case 'completed':
        return <CheckCircleIcon />;
      default:
        return null;
    }
  };
  
  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  const getRiskLevelLabel = (level) => {
    switch (level) {
      case 'high':
        return 'Wysokie';
      case 'medium':
        return 'Średnie';
      case 'low':
        return 'Niskie';
      default:
        return level;
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Ładowanie planów ograniczenia ryzyka...</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Plany ograniczenia ryzyka
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Dodaj nowy plan
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} key={plan.id}>
            <Card 
              elevation={0} 
              sx={{ 
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                borderRadius: 2
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">{plan.name}</Typography>
                  </Box>
                }
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Dla analizy: {plan.riskAnalysisName}
                    </Typography>
                    <Chip 
                      label={getRiskLevelLabel(plan.riskLevel)} 
                      size="small" 
                      sx={{ 
                        ml: 2, 
                        backgroundColor: alpha(getRiskLevelColor(plan.riskLevel), 0.1),
                        color: getRiskLevelColor(plan.riskLevel),
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                }
                action={
                  <Chip 
                    icon={getStatusIcon(plan.status)} 
                    label={getStatusLabel(plan.status)} 
                    color={getStatusColor(plan.status)} 
                    size="medium" 
                    variant="filled"
                  />
                }
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {plan.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PersonIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        <Box component="span" sx={{ color: theme.palette.text.secondary, mr: 1 }}>
                          Odpowiedzialny:
                        </Box>
                        {plan.responsiblePerson}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarTodayIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        <Box component="span" sx={{ color: theme.palette.text.secondary, mr: 1 }}>
                          Termin realizacji:
                        </Box>
                        {new Date(plan.deadline).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Postęp realizacji:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {plan.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={plan.progress} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: plan.progress < 30 ? theme.palette.error.main :
                                           plan.progress < 70 ? theme.palette.warning.main :
                                           theme.palette.success.main
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Działania
                    </Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                            <TableCell>Nazwa działania</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Termin</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {plan.actions.map((action) => (
                            <TableRow key={action.id}>
                              <TableCell>{action.name}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={getStatusLabel(action.status)} 
                                  color={getStatusColor(action.status)} 
                                  size="small" 
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>{new Date(action.deadline).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<PictureAsPdfIcon />}
                >
                  Pobierz plan
                </Button>
                <Box>
                  <IconButton 
                    color="secondary" 
                    onClick={() => handleOpenDialog(plan)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeletePlan(plan.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Dialog dodawania/edycji planu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPlan ? 'Edytuj plan ograniczenia ryzyka' : 'Dodaj nowy plan ograniczenia ryzyka'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {selectedPlan 
              ? 'Edytuj poniższe informacje, aby zaktualizować plan ograniczenia ryzyka.' 
              : 'Wypełnij poniższe pola, aby utworzyć nowy plan ograniczenia ryzyka.'}
          </DialogContentText>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Nazwa planu"
                name="name"
                value={newPlan.name}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opis planu"
                name="description"
                value={newPlan.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="ID analizy ryzyka"
                name="riskAnalysisId"
                value={newPlan.riskAnalysisId}
                onChange={handleInputChange}
                margin="normal"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Osoba odpowiedzialna"
                name="responsiblePerson"
                value={newPlan.responsiblePerson}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Termin realizacji"
                name="deadline"
                value={newPlan.deadline}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Status"
                name="status"
                value={newPlan.status}
                onChange={handleInputChange}
                margin="normal"
                select
                SelectProps={{
                  native: true
                }}
              >
                <option value="not_started">Nie rozpoczęto</option>
                <option value="in_progress">W trakcie</option>
                <option value="completed">Zakończono</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleSavePlan} 
            variant="contained" 
            color="primary"
            disabled={!newPlan.name || !newPlan.riskAnalysisId || !newPlan.responsiblePerson || !newPlan.deadline}
          >
            {selectedPlan ? 'Zapisz zmiany' : 'Dodaj plan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RiskMitigationPlans;
