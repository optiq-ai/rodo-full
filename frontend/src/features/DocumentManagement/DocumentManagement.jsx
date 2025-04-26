// src/features/DocumentManagement/DocumentManagement.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  Tabs,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material';
import DataTable from '../../components/DataTable';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

// Mock data dla dokumentów
const mockDocuments = [
  { 
    id: 1, 
    title: 'Polityka prywatności', 
    description: 'Polityka prywatności firmy', 
    category: 'policy', 
    status: 'active', 
    version: 2, 
    createdBy: 'Jan Kowalski', 
    createdAt: '2023-01-01T12:00:00Z', 
    updatedAt: '2023-02-15T14:30:00Z' 
  },
  { 
    id: 2, 
    title: 'Procedura obsługi incydentów', 
    description: 'Procedura obsługi incydentów bezpieczeństwa', 
    category: 'procedure', 
    status: 'active', 
    version: 1, 
    createdBy: 'Anna Nowak', 
    createdAt: '2023-01-15T10:00:00Z', 
    updatedAt: '2023-01-15T10:00:00Z' 
  },
  { 
    id: 3, 
    title: 'Instrukcja obsługi wniosków podmiotów', 
    description: 'Instrukcja obsługi wniosków podmiotów danych', 
    category: 'instruction', 
    status: 'active', 
    version: 3, 
    createdBy: 'Piotr Wiśniewski', 
    createdAt: '2023-02-01T09:15:00Z', 
    updatedAt: '2023-03-10T11:20:00Z' 
  },
  { 
    id: 4, 
    title: 'Rejestr czynności przetwarzania', 
    description: 'Rejestr czynności przetwarzania danych osobowych', 
    category: 'record', 
    status: 'active', 
    version: 5, 
    createdBy: 'Jan Kowalski', 
    createdAt: '2022-12-01T08:00:00Z', 
    updatedAt: '2023-04-01T13:45:00Z' 
  },
  { 
    id: 5, 
    title: 'Polityka bezpieczeństwa', 
    description: 'Polityka bezpieczeństwa informacji', 
    category: 'policy', 
    status: 'draft', 
    version: 1, 
    createdBy: 'Magdalena Kowalczyk', 
    createdAt: '2023-03-20T15:30:00Z', 
    updatedAt: '2023-03-20T15:30:00Z' 
  },
  { 
    id: 6, 
    title: 'Procedura zarządzania uprawnieniami', 
    description: 'Procedura zarządzania uprawnieniami w systemach informatycznych', 
    category: 'procedure', 
    status: 'inactive', 
    version: 2, 
    createdBy: 'Anna Nowak', 
    createdAt: '2022-11-10T09:00:00Z', 
    updatedAt: '2023-01-05T10:15:00Z' 
  },
  { 
    id: 7, 
    title: 'Instrukcja tworzenia kopii zapasowych', 
    description: 'Instrukcja tworzenia i przechowywania kopii zapasowych', 
    category: 'instruction', 
    status: 'active', 
    version: 1, 
    createdBy: 'Piotr Wiśniewski', 
    createdAt: '2023-02-15T14:00:00Z', 
    updatedAt: '2023-02-15T14:00:00Z' 
  },
];

const documentColumns = [
  { id: 'title', label: 'Tytuł', sortable: true },
  { id: 'category', label: 'Kategoria', sortable: true,
    render: (value) => {
      const categoryMap = {
        'policy': 'Polityka',
        'procedure': 'Procedura',
        'instruction': 'Instrukcja',
        'record': 'Rejestr'
      };
      return categoryMap[value] || value;
    }
  },
  { id: 'status', label: 'Status', type: 'status', sortable: true },
  { id: 'version', label: 'Wersja', sortable: true },
  { id: 'createdBy', label: 'Utworzony przez', sortable: true },
  { id: 'updatedAt', label: 'Ostatnia aktualizacja', type: 'datetime', sortable: true },
];

const DocumentManagement = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDocumentClick = (document) => {
    // Placeholder dla przejścia do szczegółów dokumentu
    console.log('Kliknięto dokument:', document);
    // navigate(`/documents/${document.id}`);
  };

  const handleAddDocument = () => {
    // Placeholder dla dodawania nowego dokumentu
    console.log('Dodawanie nowego dokumentu');
    // navigate('/documents/new');
  };

  const handleRefresh = () => {
    setLoading(true);
    // Symulacja odświeżania danych
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Filtrowanie dokumentów na podstawie wybranej zakładki
  const filteredDocuments = mockDocuments.filter(doc => {
    if (tabValue === 0) return true; // Wszystkie
    if (tabValue === 1) return doc.status === 'active'; // Aktywne
    if (tabValue === 2) return doc.status === 'draft'; // Wersje robocze
    if (tabValue === 3) return doc.status === 'inactive'; // Nieaktywne
    return true;
  });

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Zarządzanie dokumentami
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddDocument}
          >
            Nowy dokument
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
          <Tab label="Aktywne" />
          <Tab label="Wersje robocze" />
          <Tab label="Nieaktywne" />
        </Tabs>
      </Box>

      <DataTable
        columns={documentColumns}
        data={filteredDocuments}
        loading={loading}
        onRowClick={handleDocumentClick}
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

export default DocumentManagement;
