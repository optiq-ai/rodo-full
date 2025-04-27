# Dokumentacja: Dodawanie nowych sekcji do aplikacji RODO

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Struktura projektu](#struktura-projektu)
3. [Proces dodawania nowej sekcji](#proces-dodawania-nowej-sekcji)
4. [Lista kontrolna](#lista-kontrolna)
5. [Najczęstsze problemy](#najczęstsze-problemy)

## Wprowadzenie

Aplikacja RODO jest zbudowana w oparciu o architekturę modułową, gdzie każda funkcjonalność (sekcja) jest implementowana jako oddzielny moduł. Ten dokument opisuje proces dodawania nowych sekcji do aplikacji, aby zapewnić spójność i uniknąć typowych błędów.

## Struktura projektu

Aplikacja ma następującą strukturę katalogów:

```
src/
├── components/         # Współdzielone komponenty
│   ├── DataTable/      # Komponent tabeli danych
│   └── ...
├── config/             # Konfiguracja aplikacji
│   ├── routes.js       # Definicje tras
│   └── ...
├── features/           # Funkcjonalności (sekcje) aplikacji
│   ├── RiskAnalysis/   # Moduł Analizy Ryzyka
│   │   ├── RiskAnalysis.jsx              # Główny komponent
│   │   ├── components/                   # Podkomponenty
│   │   │   ├── RiskAnalysisList.jsx      # Lista analiz
│   │   │   ├── RiskAnalysisDetail.jsx    # Szczegóły analizy
│   │   │   └── RiskAnalysisForm.jsx      # Formularz analizy
│   │   └── index.js                      # Eksport modułu
│   └── ...
├── layouts/            # Układy stron
├── store/              # Zarządzanie stanem
└── App.js              # Główny komponent aplikacji
```

## Proces dodawania nowej sekcji

### 1. Utworzenie struktury katalogów i plików

Dla nowej sekcji (np. `ConsentManagement`) należy utworzyć następującą strukturę:

```bash
mkdir -p src/features/ConsentManagement/components
touch src/features/ConsentManagement/ConsentManagement.jsx
touch src/features/ConsentManagement/index.js
touch src/features/ConsentManagement/components/ConsentManagementList.jsx
touch src/features/ConsentManagement/components/ConsentManagementDetail.jsx
touch src/features/ConsentManagement/components/ConsentManagementForm.jsx
```

### 2. Implementacja głównego komponentu

Plik `ConsentManagement.jsx` powinien zawierać routing dla podkomponentów:

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Button, Typography, useTheme, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import ConsentManagementList from './components/ConsentManagementList';
import ConsentManagementDetail from './components/ConsentManagementDetail';
import ConsentManagementForm from './components/ConsentManagementForm';

const ConsentManagement = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" component="h1">
          Zarządzanie zgodami
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/consent-management/new')}
        >
          Dodaj nową zgodę
        </Button>
      </Box>

      <Routes>
        <Route path="/" element={<ConsentManagementList />} />
        <Route path="/new" element={<ConsentManagementForm />} />
        <Route path="/:id" element={<ConsentManagementDetail />} />
        <Route path="/:id/edit" element={<ConsentManagementForm />} />
      </Routes>
    </Box>
  );
};

export default ConsentManagement;
```

### 3. Implementacja pliku index.js

Plik `index.js` powinien eksportować główny komponent:

```jsx
export { default } from './ConsentManagement';
```

### 4. Implementacja komponentu listy

Plik `ConsentManagementList.jsx` powinien zawierać tabelę z danymi:

```jsx
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
          // Dane przykładowe
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
  
  // Implementacja funkcji obsługi
  
  const columns = [
    // Definicje kolumn
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
```

### 5. Implementacja komponentów szczegółów i formularza

Podobnie należy zaimplementować komponenty `ConsentManagementDetail.jsx` i `ConsentManagementForm.jsx`.

### 6. Aktualizacja pliku routes.js

Dodaj nową trasę w pliku `src/config/routes.js`:

```jsx
import ConsentManagement from '../features/ConsentManagement';

const routes = [
  // Istniejące trasy
  {
    path: '/consent-management/*',
    element: <ConsentManagement />,
    name: 'Zarządzanie zgodami',
    icon: <ConsentIcon />
  },
];
```

### 7. Aktualizacja pliku App.js

Zaktualizuj plik `App.js`, aby używał nowego modułu:

```jsx
import ConsentManagement from './features/ConsentManagement';

// W komponencie Routes:
<Route path="/consent-management/*" element={<ConsentManagement />} />
```

## Lista kontrolna

Przed zatwierdzeniem zmian, upewnij się, że:

- [ ] Wszystkie komponenty mają eksport domyślny (`export default KomponentName;`)
- [ ] Wszystkie używane komponenty MUI są zaimportowane (np. `Chip`, `Button`, itp.)
- [ ] Komponent `DataTable` używa prop `data` zamiast `rows`
- [ ] Komponent `DataTable` ma skonfigurowane odpowiednie parametry (pagination, sorting, filtering)
- [ ] Trasy są poprawnie zdefiniowane w `routes.js`
- [ ] Moduł jest poprawnie zaimportowany w `App.js`
- [ ] Wszystkie placeholdery API są odpowiednio oznaczone komentarzami

## Najczęstsze problemy

### 1. Brakujące importy komponentów

**Problem:** Komponenty używane w kodzie nie są zaimportowane.

**Rozwiązanie:** Zawsze sprawdzaj, czy wszystkie używane komponenty są zaimportowane na górze pliku.

```jsx
// Przykład poprawnego importu
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Chip  // Upewnij się, że Chip jest zaimportowany, jeśli jest używany
} from '@mui/material';
```

### 2. Niepoprawne nazwy propsów w DataTable

**Problem:** Komponent DataTable oczekuje prop `data`, ale przekazywany jest `rows`.

**Rozwiązanie:** Zawsze używaj `data` zamiast `rows` przy przekazywaniu danych do DataTable.

```jsx
// Niepoprawnie
<DataTable rows={items} ... />

// Poprawnie
<DataTable data={items} ... />
```

### 3. Brak eksportu domyślnego

**Problem:** Komponenty nie mają eksportu domyślnego, co powoduje błędy importu.

**Rozwiązanie:** Zawsze dodawaj `export default KomponentName;` na końcu pliku komponentu.

```jsx
const MojKomponent = () => {
  // Implementacja
};

export default MojKomponent; // Nie zapomnij o tym!
```

### 4. Brak aktualizacji App.js

**Problem:** Nowy moduł nie jest widoczny w aplikacji, ponieważ nie został dodany do App.js.

**Rozwiązanie:** Zawsze aktualizuj App.js, aby używał nowego modułu zamiast placeholdera.

```jsx
// Niepoprawnie (placeholder)
<Route path="/consent-management/*" element={<div>Zarządzanie zgodami</div>} />

// Poprawnie
import ConsentManagement from './features/ConsentManagement';
<Route path="/consent-management/*" element={<ConsentManagement />} />
```
