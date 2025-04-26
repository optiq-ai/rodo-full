# Instrukcja integracji z backendem

## Wprowadzenie

Ten dokument zawiera instrukcje dotyczące integracji frontendu aplikacji RODO z backendem. Frontend został zaprojektowany z myślą o łatwej integracji z API RESTful, które będzie dostarczać dane i obsługiwać logikę biznesową.

## Architektura integracji

Frontend aplikacji RODO komunikuje się z backendem za pomocą konfigurowalnego klienta HTTP (Axios), który jest już skonfigurowany w projekcie. Wszystkie zapytania do API są centralizowane przez serwis API, który obsługuje:

- Dodawanie nagłówków autoryzacji
- Obsługę błędów
- Odświeżanie tokenów
- Przekształcanie danych

## Konfiguracja połączenia z API

### 1. Konfiguracja adresu API

Adres bazowy API jest konfigurowany w pliku `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

W środowisku produkcyjnym należy zmienić ten adres na właściwy adres API.

### 2. Konfiguracja klienta HTTP

Klient HTTP jest już skonfigurowany w pliku `src/config/api.js`. W przypadku potrzeby dostosowania konfiguracji, należy edytować ten plik.

## Implementacja integracji z API

### 1. Tworzenie serwisów API

Dla każdego modułu funkcjonalnego należy utworzyć odpowiedni serwis API w katalogu `src/services`. Przykładowa implementacja serwisu dla modułu dokumentów:

```javascript
// src/services/documentService.js
import api from '../config/api';

export const getDocuments = async (params) => {
  const response = await api.get('/documents', { params });
  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await api.post('/documents', documentData);
  return response.data;
};

export const updateDocument = async (id, documentData) => {
  const response = await api.put(`/documents/${id}`, documentData);
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};
```

### 2. Integracja z Redux

Każdy moduł funkcjonalny powinien mieć swój slice Redux, który będzie obsługiwał stan i akcje związane z tym modułem. Przykładowa implementacja slice'a dla modułu dokumentów:

```javascript
// src/store/slices/documentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as documentService from '../../services/documentService';

// Akcje asynchroniczne
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async (params, { rejectWithValue }) => {
    try {
      return await documentService.getDocuments(params);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  'documents/fetchDocumentById',
  async (id, { rejectWithValue }) => {
    try {
      return await documentService.getDocumentById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDocument = createAsyncThunk(
  'documents/createDocument',
  async (documentData, { rejectWithValue }) => {
    try {
      return await documentService.createDocument(documentData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDocument = createAsyncThunk(
  'documents/updateDocument',
  async ({ id, documentData }, { rejectWithValue }) => {
    try {
      return await documentService.updateDocument(id, documentData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (id, { rejectWithValue }) => {
    try {
      return await documentService.deleteDocument(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    currentDocument: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDocuments
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchDocumentById
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
        state.error = action.payload;
      })
      // createDocument
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateDocument
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex(doc => doc.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        state.currentDocument = action.payload;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteDocument
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(doc => doc.id !== action.payload.id);
        if (state.currentDocument && state.currentDocument.id === action.payload.id) {
          state.currentDocument = null;
        }
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentDocument, clearError } = documentsSlice.actions;

export default documentsSlice.reducer;
```

### 3. Aktualizacja głównego reducera

Po utworzeniu slice'a dla modułu, należy zaktualizować główny reducer w pliku `src/store/index.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Importy reducerów
import authReducer from './slices/authSlice';
import documentsReducer from './slices/documentsSlice';
// Importy pozostałych reducerów...

const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentsReducer,
  // Pozostałe reducery...
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
```

### 4. Integracja z komponentami

W komponentach należy używać hooków Redux do pobierania danych i wywoływania akcji. Przykład integracji z komponentem DocumentManagement:

```javascript
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments, deleteDocument } from '../../store/slices/documentsSlice';
// Pozostałe importy...

const DocumentManagement = () => {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector(state => state.documents);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleDocumentClick = (document) => {
    navigate(`/documents/${document.id}`);
  };

  const handleAddDocument = () => {
    navigate('/documents/new');
  };

  const handleRefresh = () => {
    dispatch(fetchDocuments());
  };

  // Filtrowanie dokumentów na podstawie wybranej zakładki
  const filteredDocuments = documents.filter(doc => {
    if (tabValue === 0) return true; // Wszystkie
    if (tabValue === 1) return doc.status === 'active'; // Aktywne
    if (tabValue === 2) return doc.status === 'draft'; // Wersje robocze
    if (tabValue === 3) return doc.status === 'inactive'; // Nieaktywne
    return true;
  });

  // Pozostała implementacja komponentu...
};

export default DocumentManagement;
```

## Autentykacja i autoryzacja

### 1. Implementacja autentykacji

Autentykacja jest obsługiwana przez moduł Auth. Przykładowa implementacja serwisu autentykacji:

```javascript
// src/services/authService.js
import api from '../config/api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await api.post('/auth/refresh-token', { refreshToken });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};
```

### 2. Implementacja slice'a autentykacji

```javascript
// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

// Akcje asynchroniczne
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      // Zapisanie tokenów w localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('isAuthenticated', 'true');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      // Usunięcie tokenów z localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isAuthenticated');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
```

## Wymagania dla backendu

Backend powinien dostarczać API RESTful zgodne z następującymi wymaganiami:

### 1. Endpointy API

Backend powinien dostarczać następujące endpointy API:

#### Autentykacja

- `POST /api/v1/auth/login` - logowanie użytkownika
- `POST /api/v1/auth/logout` - wylogowanie użytkownika
- `POST /api/v1/auth/refresh-token` - odświeżanie tokenu
- `POST /api/v1/auth/register` - rejestracja użytkownika
- `POST /api/v1/auth/forgot-password` - resetowanie hasła
- `POST /api/v1/auth/reset-password` - ustawianie nowego hasła

#### Dokumenty

- `GET /api/v1/documents` - pobieranie listy dokumentów
- `GET /api/v1/documents/:id` - pobieranie szczegółów dokumentu
- `POST /api/v1/documents` - tworzenie nowego dokumentu
- `PUT /api/v1/documents/:id` - aktualizacja dokumentu
- `DELETE /api/v1/documents/:id` - usuwanie dokumentu

#### Incydenty

- `GET /api/v1/incidents` - pobieranie listy incydentów
- `GET /api/v1/incidents/:id` - pobieranie szczegółów incydentu
- `POST /api/v1/incidents` - tworzenie nowego incydentu
- `PUT /api/v1/incidents/:id` - aktualizacja incydentu
- `DELETE /api/v1/incidents/:id` - usuwanie incydentu

#### Wnioski podmiotów danych

- `GET /api/v1/subject-requests` - pobieranie listy wniosków
- `GET /api/v1/subject-requests/:id` - pobieranie szczegółów wniosku
- `POST /api/v1/subject-requests` - tworzenie nowego wniosku
- `PUT /api/v1/subject-requests/:id` - aktualizacja wniosku
- `DELETE /api/v1/subject-requests/:id` - usuwanie wniosku

#### Rejestry RODO

- `GET /api/v1/registers` - pobieranie listy rejestrów
- `GET /api/v1/registers/:id` - pobieranie szczegółów rejestru
- `POST /api/v1/registers` - tworzenie nowego rejestru
- `PUT /api/v1/registers/:id` - aktualizacja rejestru
- `DELETE /api/v1/registers/:id` - usuwanie rejestru

#### Analiza ryzyka

- `GET /api/v1/risk-analysis` - pobieranie listy analiz ryzyka
- `GET /api/v1/risk-analysis/:id` - pobieranie szczegółów analizy ryzyka
- `POST /api/v1/risk-analysis` - tworzenie nowej analizy ryzyka
- `PUT /api/v1/risk-analysis/:id` - aktualizacja analizy ryzyka
- `DELETE /api/v1/risk-analysis/:id` - usuwanie analizy ryzyka

#### Szkolenia

- `GET /api/v1/training` - pobieranie listy szkoleń
- `GET /api/v1/training/:id` - pobieranie szczegółów szkolenia
- `POST /api/v1/training` - tworzenie nowego szkolenia
- `PUT /api/v1/training/:id` - aktualizacja szkolenia
- `DELETE /api/v1/training/:id` - usuwanie szkolenia

#### Raporty

- `GET /api/v1/reports` - pobieranie listy raportów
- `GET /api/v1/reports/:id` - pobieranie szczegółów raportu
- `POST /api/v1/reports` - tworzenie nowego raportu
- `GET /api/v1/reports/generate/:type` - generowanie raportu określonego typu

#### Ustawienia

- `GET /api/v1/settings` - pobieranie ustawień
- `PUT /api/v1/settings` - aktualizacja ustawień

#### Użytkownicy

- `GET /api/v1/users` - pobieranie listy użytkowników
- `GET /api/v1/users/:id` - pobieranie szczegółów użytkownika
- `POST /api/v1/users` - tworzenie nowego użytkownika
- `PUT /api/v1/users/:id` - aktualizacja użytkownika
- `DELETE /api/v1/users/:id` - usuwanie użytkownika

### 2. Format odpowiedzi API

Wszystkie odpowiedzi API powinny mieć następujący format:

```json
{
  "success": true,
  "data": {
    // Dane odpowiedzi
  },
  "message": "Opcjonalny komunikat"
}
```

W przypadku błędu:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Komunikat błędu"
  }
}
```

### 3. Autentykacja

Backend powinien obsługiwać autentykację za pomocą tokenów JWT:

- Token dostępu (access token) - krótkoterminowy token używany do autoryzacji żądań
- Token odświeżania (refresh token) - długoterminowy token używany do odświeżania tokenu dostępu

Wszystkie żądania do chronionych endpointów powinny zawierać nagłówek `Authorization` z tokenem dostępu:

```
Authorization: Bearer <access_token>
```

## Testowanie integracji

Po zaimplementowaniu integracji z backendem, należy przeprowadzić testy integracyjne, aby upewnić się, że frontend poprawnie komunikuje się z backendem. Testy powinny obejmować:

1. Autentykację i autoryzację
2. Pobieranie danych z API
3. Tworzenie, aktualizację i usuwanie danych
4. Obsługę błędów

## Podsumowanie

Integracja frontendu z backendem wymaga implementacji serwisów API, slice'ów Redux i aktualizacji komponentów. Backend powinien dostarczać API RESTful zgodne z wymaganiami opisanymi w tym dokumencie.

W przypadku pytań lub problemów z integracją, proszę o kontakt z zespołem deweloperskim.
