// src/features/TrainingAndEducation/components/TrainingMaterials.jsx
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  InputAdornment,
  useTheme,
  alpha
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SchoolIcon from '@mui/icons-material/School';

const TrainingMaterials = () => {
  const theme = useTheme();
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    type: 'pdf',
    category: '',
    url: ''
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
            title: 'Podstawy RODO - podręcznik',
            description: 'Kompleksowy podręcznik omawiający podstawowe zasady RODO, prawa podmiotów danych oraz obowiązki administratorów.',
            type: 'pdf',
            category: 'RODO - podstawy',
            url: '/materials/rodo-basics.pdf',
            size: '2.4 MB',
            uploadDate: '2025-01-15',
            downloads: 145
          },
          {
            id: 2,
            title: 'Bezpieczeństwo danych osobowych',
            description: 'Materiał szkoleniowy dotyczący bezpieczeństwa danych osobowych, w tym technicznych i organizacyjnych środków ochrony.',
            type: 'pdf',
            category: 'Bezpieczeństwo danych',
            url: '/materials/data-security.pdf',
            size: '3.1 MB',
            uploadDate: '2025-02-10',
            downloads: 98
          },
          {
            id: 3,
            title: 'Obsługa incydentów bezpieczeństwa - wideo szkoleniowe',
            description: 'Szkolenie wideo pokazujące procedury postępowania w przypadku wystąpienia incydentu bezpieczeństwa danych.',
            type: 'video',
            category: 'Incydenty bezpieczeństwa',
            url: '/materials/incident-handling.mp4',
            size: '156 MB',
            uploadDate: '2025-02-28',
            downloads: 72
          },
          {
            id: 4,
            title: 'Prawa podmiotów danych - prezentacja',
            description: 'Prezentacja omawiająca prawa osób, których dane dotyczą, w tym prawo dostępu, sprostowania, usunięcia i przenoszenia danych.',
            type: 'presentation',
            category: 'Prawa podmiotów danych',
            url: '/materials/data-subject-rights.pptx',
            size: '5.8 MB',
            uploadDate: '2025-03-05',
            downloads: 112
          },
          {
            id: 5,
            title: 'Ocena skutków dla ochrony danych (DPIA) - szablon',
            description: 'Szablon dokumentu do przeprowadzania oceny skutków dla ochrony danych wraz z instrukcją wypełniania.',
            type: 'document',
            category: 'DPIA',
            url: '/materials/dpia-template.docx',
            size: '1.2 MB',
            uploadDate: '2025-03-12',
            downloads: 86
          },
          {
            id: 6,
            title: 'RODO w praktyce - case studies',
            description: 'Zbiór studiów przypadków pokazujących praktyczne zastosowanie przepisów RODO w różnych sytuacjach biznesowych.',
            type: 'pdf',
            category: 'RODO - podstawy',
            url: '/materials/rodo-case-studies.pdf',
            size: '4.5 MB',
            uploadDate: '2025-03-20',
            downloads: 65
          },
          {
            id: 7,
            title: 'Bezpieczeństwo w pracy zdalnej - wideo szkoleniowe',
            description: 'Szkolenie wideo na temat bezpieczeństwa danych osobowych podczas pracy zdalnej.',
            type: 'video',
            category: 'Bezpieczeństwo danych',
            url: '/materials/remote-work-security.mp4',
            size: '128 MB',
            uploadDate: '2025-04-02',
            downloads: 94
          },
          {
            id: 8,
            title: 'Zgody na przetwarzanie danych - wzory',
            description: 'Wzory formularzy zgód na przetwarzanie danych osobowych zgodne z wymogami RODO.',
            type: 'document',
            category: 'Zgody',
            url: '/materials/consent-templates.docx',
            size: '0.8 MB',
            uploadDate: '2025-04-10',
            downloads: 120
          }
        ];
        
        setMaterials(mockData);
        setFilteredMaterials(mockData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = materials.filter(material => 
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials(materials);
    }
  }, [searchQuery, materials]);
  
  const handleOpenDialog = (material = null) => {
    if (material) {
      setSelectedMaterial(material);
      setNewMaterial({
        title: material.title,
        description: material.description,
        type: material.type,
        category: material.category,
        url: material.url
      });
    } else {
      setSelectedMaterial(null);
      setNewMaterial({
        title: '',
        description: '',
        type: 'pdf',
        category: '',
        url: ''
      });
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveMaterial = () => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (selectedMaterial) {
      // Edycja istniejącego materiału
      const updatedMaterials = materials.map(material => 
        material.id === selectedMaterial.id ? { 
          ...material, 
          title: newMaterial.title,
          description: newMaterial.description,
          type: newMaterial.type,
          category: newMaterial.category,
          url: newMaterial.url
        } : material
      );
      setMaterials(updatedMaterials);
    } else {
      // Dodanie nowego materiału
      const newMaterialWithId = {
        ...newMaterial,
        id: Math.max(...materials.map(m => m.id)) + 1,
        size: '1.0 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0
      };
      setMaterials([...materials, newMaterialWithId]);
    }
    
    handleCloseDialog();
  };
  
  const handleDeleteMaterial = (id) => {
    // W rzeczywistej aplikacji byłoby to wywołanie API
    if (window.confirm('Czy na pewno chcesz usunąć ten materiał?')) {
      setMaterials(materials.filter(material => material.id !== id));
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon sx={{ color: theme.palette.error.main }} />;
      case 'video':
        return <VideocamIcon sx={{ color: theme.palette.primary.main }} />;
      case 'presentation':
        return <DescriptionIcon sx={{ color: theme.palette.warning.main }} />;
      case 'document':
        return <InsertDriveFileIcon sx={{ color: theme.palette.info.main }} />;
      default:
        return <InsertDriveFileIcon />;
    }
  };
  
  const getTypeLabel = (type) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'video':
        return 'Wideo';
      case 'presentation':
        return 'Prezentacja';
      case 'document':
        return 'Dokument';
      default:
        return type;
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Ładowanie materiałów szkoleniowych...</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Materiały szkoleniowe
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Dodaj nowy materiał
        </Button>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Szukaj materiałów szkoleniowych..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />
      </Box>
      
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Znaleziono {filteredMaterials.length} materiałów
        </Typography>
        <Box>
          <Button
            size="small"
            startIcon={<FilterListIcon />}
            sx={{ mr: 1 }}
          >
            Filtruj
          </Button>
          <Button
            size="small"
            startIcon={<SortIcon />}
          >
            Sortuj
          </Button>
        </Box>
      </Box>
      
      <Paper variant="outlined" sx={{ borderRadius: 2 }}>
        <List>
          {filteredMaterials.map((material, index) => (
            <React.Fragment key={material.id}>
              <ListItem
                sx={{ 
                  py: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                <ListItemIcon>
                  {getTypeIcon(material.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {material.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {material.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Chip 
                          label={getTypeLabel(material.type)} 
                          size="small" 
                          sx={{ mr: 1, mb: 0.5 }} 
                          variant="outlined"
                        />
                        <Chip 
                          label={material.category} 
                          size="small" 
                          sx={{ mr: 1, mb: 0.5 }} 
                          color="primary" 
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 2, mb: 0.5 }}>
                          Rozmiar: {material.size}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 2, mb: 0.5 }}>
                          Dodano: {new Date(material.uploadDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Pobrań: {material.downloads}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex' }}>
                    <Tooltip title="Pobierz">
                      <IconButton edge="end" sx={{ mr: 1 }}>
                        <GetAppIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Podgląd">
                      <IconButton edge="end" sx={{ mr: 1 }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edytuj">
                      <IconButton edge="end" sx={{ mr: 1 }} onClick={() => handleOpenDialog(material)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń">
                      <IconButton edge="end" color="error" onClick={() => handleDeleteMaterial(material.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredMaterials.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {filteredMaterials.length === 0 && (
            <ListItem>
              <ListItemText
                primary="Nie znaleziono materiałów szkoleniowych"
                secondary="Spróbuj zmienić kryteria wyszukiwania lub dodaj nowe materiały"
              />
            </ListItem>
          )}
        </List>
      </Paper>
      
      {/* Dialog dodawania/edycji materiału */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedMaterial ? 'Edytuj materiał szkoleniowy' : 'Dodaj nowy materiał szkoleniowy'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {selectedMaterial 
              ? 'Edytuj poniższe informacje, aby zaktualizować materiał szkoleniowy.' 
              : 'Wypełnij poniższe pola, aby dodać nowy materiał szkoleniowy.'}
          </DialogContentText>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Tytuł materiału"
                name="title"
                value={newMaterial.title}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opis materiału"
                name="description"
                value={newMaterial.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Typ materiału"
                name="type"
                value={newMaterial.type}
                onChange={handleInputChange}
                margin="normal"
                select
                SelectProps={{
                  native: true
                }}
              >
                <option value="pdf">PDF</option>
                <option value="video">Wideo</option>
                <option value="presentation">Prezentacja</option>
                <option value="document">Dokument</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Kategoria"
                name="category"
                value={newMaterial.category}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="URL materiału"
                name="url"
                value={newMaterial.url}
                onChange={handleInputChange}
                margin="normal"
                helperText="Podaj ścieżkę do pliku lub link do materiału"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleSaveMaterial} 
            variant="contained" 
            color="primary"
            disabled={!newMaterial.title || !newMaterial.type || !newMaterial.category || !newMaterial.url}
          >
            {selectedMaterial ? 'Zapisz zmiany' : 'Dodaj materiał'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrainingMaterials;
