# Struktura projektu aplikacji RODO

Ten dokument opisuje szczegółową strukturę projektu aplikacji RODO, zgodną z podejściem Feature-First i modelem "matrioszki".

## Struktura katalogów

```
frontend/
├── public/                      # Pliki statyczne
│   ├── favicon.ico
│   ├── index.html
│   ├── logo.png
│   └── manifest.json
├── src/                         # Kod źródłowy
│   ├── assets/                  # Zasoby statyczne
│   │   ├── icons/               # Ikony
│   │   ├── images/              # Obrazy
│   │   └── styles/              # Globalne style
│   ├── components/              # Współdzielone komponenty
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Chart/
│   │   ├── DataTable/
│   │   ├── Dialog/
│   │   ├── Form/
│   │   ├── Layout/
│   │   ├── Notification/
│   │   └── Sidebar/
│   ├── config/                  # Konfiguracja aplikacji
│   │   ├── api.js               # Konfiguracja API
│   │   ├── routes.js            # Definicje tras
│   │   └── theme.js             # Konfiguracja motywu
│   ├── features/                # Funkcjonalności podzielone na moduły
│   │   ├── Dashboard/
│   │   ├── DocumentManagement/
│   │   ├── RodoRegisters/
│   │   ├── RiskAnalysis/
│   │   ├── IncidentManagement/
│   │   ├── SubjectRequestsManagement/
│   │   ├── TrainingAndEducation/
│   │   ├── ReportingAndAnalytics/
│   │   ├── Settings/
│   │   ├── ConsentManagement/
│   │   ├── DataMapping/
│   │   └── VendorRiskManagement/
│   ├── hooks/                   # Własne hooki
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   ├── useForm.js
│   │   ├── useLocalStorage.js
│   │   └── useNotification.js
│   ├── layouts/                 # Szablony układów stron
│   │   ├── MainLayout/
│   │   ├── AuthLayout/
│   │   └── PrintLayout/
│   ├── providers/               # Dostawcy kontekstu
│   │   ├── AuthProvider.js
│   │   ├── NotificationProvider.js
│   │   └── ThemeProvider.js
│   ├── services/                # Usługi API i logika biznesowa
│   │   ├── api.js               # Konfiguracja Axios
│   │   ├── auth.js              # Usługi autentykacji
│   │   ├── documents.js         # Usługi dokumentów
│   │   ├── incidents.js         # Usługi incydentów
│   │   └── ...                  # Inne usługi
│   ├── store/                   # Konfiguracja Redux
│   │   ├── index.js             # Konfiguracja store'a
│   │   └── slices/              # Slice'y Redux
│   │       ├── authSlice.js
│   │       ├── documentsSlice.js
│   │       ├── incidentsSlice.js
│   │       └── ...
│   ├── utils/                   # Narzędzia pomocnicze
│   │   ├── date.js              # Funkcje do obsługi dat
│   │   ├── format.js            # Funkcje formatujące
│   │   ├── validation.js        # Funkcje walidacyjne
│   │   └── ...                  # Inne narzędzia
│   ├── App.js                   # Główny komponent aplikacji
│   ├── index.js                 # Punkt wejściowy
│   └── setupTests.js            # Konfiguracja testów
├── .env.example                 # Przykładowy plik zmiennych środowiskowych
├── .eslintrc.js                 # Konfiguracja ESLint
├── .prettierrc                  # Konfiguracja Prettier
├── jest.config.js               # Konfiguracja Jest
├── package.json                 # Zależności npm
├── README.md                    # Dokumentacja projektu
└── Dockerfile                   # Konfiguracja kontenera
```

## Szczegółowa struktura modułów funkcjonalnych

Każdy moduł funkcjonalny w katalogu `features/` ma podobną strukturę, zgodną z modelem "matrioszki". Poniżej przedstawiono przykładową strukturę dla modułu Dashboard:

```
features/
└── Dashboard/
    ├── Dashboard.jsx            # Główny komponent
    ├── Dashboard.js             # Logika biznesowa
    ├── Dashboard.module.css     # Style
    ├── index.js                 # Eksport
    ├── components/              # Subkomponenty
    │   ├── DashboardHeader/
    │   │   ├── DashboardHeader.jsx
    │   │   ├── DashboardHeader.js
    │   │   ├── DashboardHeader.module.css
    │   │   ├── index.js
    │   │   └── components/      # Subkomponenty nagłówka
    │   │       ├── UserInfo/
    │   │       └── DatePicker/
    │   ├── StatisticsWidget/
    │   │   ├── StatisticsWidget.jsx
    │   │   ├── StatisticsWidget.js
    │   │   ├── StatisticsWidget.module.css
    │   │   ├── index.js
    │   │   └── components/
    │   │       ├── StatCard/
    │   │       └── StatChart/
    │   ├── RecentActivitiesWidget/
    │   ├── AlertsWidget/
    │   ├── RequestsStatusWidget/
    │   └── ChartsContainer/
    │       ├── ChartsContainer.jsx
    │       ├── ChartsContainer.js
    │       ├── ChartsContainer.module.css
    │       ├── index.js
    │       └── components/
    │           ├── IncidentsChart/
    │           ├── RequestsChart/
    │           └── RiskAnalysisChart/
    ├── hooks/                   # Hooki specyficzne dla Dashboard
    │   ├── useDashboardData.js
    │   └── useChartData.js
    ├── utils/                   # Funkcje pomocnicze dla Dashboard
    │   ├── chartFormatters.js
    │   └── dataTransformers.js
    └── __tests__/              # Testy
        ├── Dashboard.test.js
        └── components/
            ├── DashboardHeader.test.js
            └── ...
```

## Szczegółowa struktura współdzielonych komponentów

Komponenty współdzielone w katalogu `components/` również mają strukturę zgodną z modelem "matrioszki". Poniżej przedstawiono przykładową strukturę dla komponentu DataTable:

```
components/
└── DataTable/
    ├── DataTable.jsx           # Główny komponent
    ├── DataTable.js            # Logika biznesowa
    ├── DataTable.module.css    # Style
    ├── index.js                # Eksport
    ├── components/             # Subkomponenty
    │   ├── TableHeader/
    │   │   ├── TableHeader.jsx
    │   │   ├── TableHeader.js
    │   │   ├── TableHeader.module.css
    │   │   ├── index.js
    │   │   └── components/
    │   │       ├── HeaderCell/
    │   │       └── SortIndicator/
    │   ├── TableBody/
    │   ├── TableFooter/
    │   ├── Pagination/
    │   └── FilterPanel/
    ├── hooks/                  # Hooki specyficzne dla DataTable
    │   ├── useTableSort.js
    │   ├── useTableFilter.js
    │   └── useTablePagination.js
    ├── utils/                  # Funkcje pomocnicze dla DataTable
    │   ├── sortUtils.js
    │   └── filterUtils.js
    └── __tests__/             # Testy
        ├── DataTable.test.js
        └── components/
            ├── TableHeader.test.js
            └── ...
```

## Szczegółowa struktura usług API

Usługi API w katalogu `services/` są zorganizowane według funkcjonalności. Poniżej przedstawiono przykładową strukturę dla usługi documents:

```javascript
// services/documents.js
import api from './api';

export const documentsService = {
  getAll: (filters) => api.get('/documents', { params: filters }),
  getById: (id) => api.get(`/documents/${id}`),
  create: (data) => api.post('/documents', data),
  update: (id, data) => api.put(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),
  getVersions: (id) => api.get(`/documents/${id}/versions`),
  restoreVersion: (id, versionId) => api.post(`/documents/${id}/versions/${versionId}/restore`),
  generateFromTemplate: (templateId, data) => api.post(`/documents/templates/${templateId}/generate`, data),
  export: (id, format) => api.get(`/documents/${id}/export`, { params: { format }, responseType: 'blob' }),
};
```

## Szczegółowa struktura Redux Store

Redux Store jest zorganizowany według funkcjonalności, z wykorzystaniem Redux Toolkit. Poniżej przedstawiono przykładową strukturę dla slice'a documents:

```javascript
// store/slices/documentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { documentsService } from '../../services/documents';

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await documentsService.getAll(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  'documents/fetchDocumentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await documentsService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Pozostałe thunki...

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    currentDocument: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      category: '',
      status: '',
      dateFrom: null,
      dateTo: null,
    },
    pagination: {
      page: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset page when filters change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1; // Reset page when page size changes
    },
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.items;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Nie udało się pobrać dokumentów';
      })
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDocument = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Nie udało się pobrać dokumentu';
      });
    // Pozostałe przypadki...
  },
});

export const { setFilters, setPage, setPageSize, clearCurrentDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
```

## Szczegółowa struktura routingu

Routing jest zorganizowany hierarchicznie, z wykorzystaniem React Router. Poniżej przedstawiono przykładową strukturę routingu:

```javascript
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import { theme } from './config/theme';
import AuthProvider from './providers/AuthProvider';
import NotificationProvider from './providers/NotificationProvider';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './features/Dashboard';
import DocumentManagement from './features/DocumentManagement';
import RodoRegisters from './features/RodoRegisters';
import RiskAnalysis from './features/RiskAnalysis';
import IncidentManagement from './features/IncidentManagement';
import SubjectRequestsManagement from './features/SubjectRequestsManagement';
import TrainingAndEducation from './features/TrainingAndEducation';
import ReportingAndAnalytics from './features/ReportingAndAnalytics';
import Settings from './features/Settings';
import Login from './features/Auth/Login';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="documents/*" element={<DocumentManagement />} />
                  <Route path="registers/*" element={<RodoRegisters />} />
                  <Route path="risk-analysis/*" element={<RiskAnalysis />} />
                  <Route path="incidents/*" element={<IncidentManagement />} />
                  <Route path="subject-requests/*" element={<SubjectRequestsManagement />} />
                  <Route path="training/*" element={<TrainingAndEducation />} />
                  <Route path="reports/*" element={<ReportingAndAnalytics />} />
                  <Route path="settings/*" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
```

## Podsumowanie

Struktura projektu aplikacji RODO została zaprojektowana zgodnie z podejściem Feature-First i modelem "matrioszki", co zapewnia modularność, skalowalność i łatwość utrzymania. Każda funkcjonalność jest zamknięta w swoim własnym katalogu, zawierającym wszystkie potrzebne elementy: komponenty, hooki, usługi, itp. Taka organizacja ułatwia zrozumienie zależności między komponentami i ich odpowiedzialności, a także umożliwia łatwe rozszerzanie aplikacji o nowe funkcjonalności.
