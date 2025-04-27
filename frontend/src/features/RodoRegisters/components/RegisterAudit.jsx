// src/features/RodoRegisters/components/RegisterAudit.jsx
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

const RegisterAudit = () => {
  const theme = useTheme();
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [newAudit, setNewAudit] = useState({
    name: '',
    description: '',
    registerIds: '',
    plannedDate: '',
    auditor: '',
    status: 'planned'
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
            name: 'Audyt roczny rejestrów HR',
            description: 'Coroczny audyt rejestrów działu HR pod kątem zgodności z RODO',
            registerIds: [1, 8, 15],
            registerNames: ['Rejestr pracowników', 'Rejestr kandydatów', 'Rejestr benefitów'],
            plannedDate: '2025-05-15',
            completedDate: null,
            auditor: 'Anna Kowalska',
            status: 'planned',
            findings: [],
            recommendations: []
          },
          {
            id: 2,
            name: 'Audyt rejestrów marketingowych',
            description: 'Audyt rejestrów działu marketingu po wdrożeniu nowego systemu CRM',
            registerIds: [3, 12],
            registerNames: ['Rejestr marketingowy', 'Rejestr kampanii'],
            plannedDate: '2025-04-10',
            completedDate: '2025-04-12',
            auditor: 'Jan Nowak',
            status: 'completed',
            findings: [
              { severity: 'high', description: 'Brak mechanizmu wycofania zgód w nowym systemie CRM' },
              { severity: 'medium', description: 'Niewystarczające informacje o okresie przechowywania danych' }
            ],
            recommendations: [
              'Wdrożyć mechanizm wycofania zgód w systemie CRM do 30.04.2025',
              'Zaktualizować politykę retencji danych i dodać informacje w rejestrach'
            ]
          },
          {
            id: 3,
            name: 'Audyt bezpieczeństwa rejestrów IT',
            description: 'Audyt bezpieczeństwa rejestrów działu IT po incydencie bezpieczeństwa',
            registerIds: [5, 18],
            registerNames: ['Rejestr użytkowników platformy', 'Rejestr logów systemowych'],
            plannedDate: '2025-03-05',
            completedDate: '2025-03-08',
            auditor: 'Piotr Wiśniewski',
            status: 'completed',
            findings: [
              { severity: 'critical', description: 'Nieszyfrowane dane osobowe w logu systemowym' },
              { severity: 'high', description: 'Brak procedury usuwania danych po okresie retencji' },
              { severity: 'medium', description: 'Niewystarczające zabezpieczenia dostępu do rejestru użytkowników' }
            ],
            recommendations: [
              'Natychmiast wdrożyć szyfrowanie danych osobowych w logach',
              'Opracować i wdrożyć procedurę automatycznego usuwania danych po okresie retencji',
              'Wzmocnić zabezpieczenia dostępu do rejestru użytkowników poprzez dodanie uwierzytelniania dwuskładnikowego'
            ]
          },
          {
            id: 4,
            name: 'Audyt rejestrów sprzedażowych',
            description: 'Kwartalny audyt rejestrów działu sprzedaży',
            registerIds: [2, 9],
            registerNames: ['Rejestr klientów', 'Rejestr zamówień'],
            plannedDate: '2025-06-20',
            completedDate: null,
            auditor: 'Magdalena Dąbrowska',
            status: 'planned',
            findings: [],
            recommendations: []
          },
          {
            id: 5,
            name: 'Audyt rejestrów dostawców',
            description: 'Audyt rejestrów związanych z dostawcami po zmianie przepisów',
            registerIds: [4],
            registerNames: ['Rejestr dostawców'],
            plannedDate: '2025-04-25',
            completedDate: null,
            auditor: 'Tomasz Lewandowski',
            status: 'in_progress',
            findings: [
              { severity: 'medium', description: 'Brak aktualizacji klauzul umownych zgodnie z nowymi przepisami' }
            ],
            recommendations: [
              'Zaktualizować klauzule umowne we wszystkich umowach z dostawcami'
            ]
          }
        ];
        
        setAudits(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleOpenDialog = (audit = null) => {
    if (audit) {
      setSelectedAudit(audit);
      setNewAudit({
        name: audit.name,
        description: audit.description,
        registerIds: audit.registerIds.join(', '),
        plannedDate: audit.plannedDate,
        auditor: audit.auditor,
        status: audit.status
      });
    } else {
      setSelectedAudit(null);
      setNewAudit({
        name: '',
        description: '',
        registerIds: '',
        plannedDate: '',
        auditor: '',
        status: 'planned'
      });
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAudit(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveAudit = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (selectedAudit) {
      // Edycja istniejącego audytu
      const updatedAudits = audits.map(audit => 
        audit.id === selectedAudit.id ? { 
          ...audit, 
          name: newAudit.name,
          description: newAudit.description,
          registerIds: newAudit.registerIds.split(',').map(id => parseInt(id.trim())),
          plannedDate: newAudit.plannedDate,
          auditor: newAudit.auditor,
          status: newAudit.status
        } : audit
      );
      setAudits(updatedAudits);
    } else {
      // Dodanie nowego audytu
      const newAuditWithId = {
        ...newAudit,
        id: Math.max(...audits.map(a => a.id)) + 1,
        registerIds: newAudit.registerIds.split(',').map(id => parseInt(id.trim())),
        registerNames: ['Przykładowy rejestr'], // W rzeczywistej aplikacji pobierane z API
        completedDate: null,
        findings: [],
        recommendations: []
      };
      setAudits([...audits, newAuditWithId]);
    }
    
    handleCloseDialog();
  };
  
  const handleDeleteAudit = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć ten audyt?')) {
      setAudits(audits.filter(audit => audit.id !== id));
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'planned':
        return 'info';
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
      case 'planned':
        return 'Zaplanowany';
      case 'in_progress':
        return 'W trakcie';
      case 'completed':
        return 'Zakończony';
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'planned':
        return <ScheduleIcon />;
      case 'in_progress':
        return <WarningIcon />;
      case 'completed':
        return <CheckCircleIcon />;
      default:
        return null;
    }
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return theme.palette.error.dark;
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
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Ładowanie audytów...</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Audyty rejestrów
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Zaplanuj nowy audyt
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {audits.map((audit) => (
          <Grid item xs={12} key={audit.id}>
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
                    <SecurityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">{audit.name}</Typography>
                  </Box>
                }
                subheader={audit.description}
                action={
                  <Chip 
                    icon={getStatusIcon(audit.status)} 
                    label={getStatusLabel(audit.status)} 
                    color={getStatusColor(audit.status)} 
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
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Audytowane rejestry
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {audit.registerNames.map((name, index) => (
                        <Chip 
                          key={index}
                          label={name} 
                          color="primary" 
                          variant="outlined" 
                          size="small"
                        />
                      ))}
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Planowana data
                        </Typography>
                        <Typography variant="body2">
                          {new Date(audit.plannedDate).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Zakończono
                        </Typography>
                        <Typography variant="body2">
                          {audit.completedDate ? new Date(audit.completedDate).toLocaleDateString() : '-'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Audytor
                        </Typography>
                        <Typography variant="body2">
                          {audit.auditor}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    {(audit.status === 'in_progress' || audit.status === 'completed') && (
                      <>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Ustalenia
                        </Typography>
                        {audit.findings.length > 0 ? (
                          <Box sx={{ mb: 2 }}>
                            {audit.findings.map((finding, index) => (
                              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box 
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1
                                  }}
                                >
                                  {finding.severity === 'critical' || finding.severity === 'high' ? (
                                    <ErrorIcon sx={{ color: getSeverityColor(finding.severity) }} />
                                  ) : (
                                    <WarningIcon sx={{ color: getSeverityColor(finding.severity) }} />
                                  )}
                                </Box>
                                <Typography variant="body2">
                                  <Box component="span" sx={{ fontWeight: 'bold', color: getSeverityColor(finding.severity) }}>
                                    {finding.severity === 'critical' ? 'KRYTYCZNE: ' : 
                                     finding.severity === 'high' ? 'WYSOKIE: ' : 
                                     finding.severity === 'medium' ? 'ŚREDNIE: ' : 'NISKIE: '}
                                  </Box>
                                  {finding.description}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            Brak ustaleń
                          </Typography>
                        )}
                        
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Rekomendacje
                        </Typography>
                        {audit.recommendations.length > 0 ? (
                          <Box>
                            {audit.recommendations.map((recommendation, index) => (
                              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                <Box 
                                  sx={{ 
                                    minWidth: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1
                                  }}
                                >
                                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {index + 1}.
                                  </Typography>
                                </Box>
                                <Typography variant="body2">
                                  {recommendation}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2">
                            Brak rekomendacji
                          </Typography>
                        )}
                      </>
                    )}
                    
                    {audit.status === 'planned' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          Audyt jeszcze się nie rozpoczął. Ustalenia i rekomendacje będą dostępne po jego przeprowadzeniu.
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                {audit.status === 'completed' && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<PictureAsPdfIcon />}
                  >
                    Pobierz raport
                  </Button>
                )}
                {audit.status !== 'completed' && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    disabled
                  >
                    Raport niedostępny
                  </Button>
                )}
                <Box>
                  <IconButton 
                    color="secondary" 
                    onClick={() => handleOpenDialog(audit)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteAudit(audit.id)}
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
      
      {/* Dialog dodawania/edycji audytu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAudit ? 'Edytuj audyt' : 'Zaplanuj nowy audyt'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {selectedAudit 
              ? 'Edytuj poniższe informacje, aby zaktualizować audyt.' 
              : 'Wypełnij poniższe pola, aby zaplanować nowy audyt.'}
          </DialogContentText>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Nazwa audytu"
                name="name"
                value={newAudit.name}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opis audytu"
                name="description"
                value={newAudit.description}
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
                label="ID rejestrów (oddzielone przecinkami)"
                name="registerIds"
                value={newAudit.registerIds}
                onChange={handleInputChange}
                margin="normal"
                helperText="Np. 1, 2, 3"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Audytor"
                name="auditor"
                value={newAudit.auditor}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Planowana data"
                name="plannedDate"
                value={newAudit.plannedDate}
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
                value={newAudit.status}
                onChange={handleInputChange}
                margin="normal"
                select
                SelectProps={{
                  native: true
                }}
              >
                <option value="planned">Zaplanowany</option>
                <option value="in_progress">W trakcie</option>
                <option value="completed">Zakończony</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleSaveAudit} 
            variant="contained" 
            color="primary"
            disabled={!newAudit.name || !newAudit.registerIds || !newAudit.plannedDate || !newAudit.auditor}
          >
            {selectedAudit ? 'Zapisz zmiany' : 'Zaplanuj audyt'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegisterAudit;
