# Architektura aplikacji RODO

## Przegląd architektury

Aplikacja RODO została zaprojektowana zgodnie z najlepszymi praktykami tworzenia aplikacji React, z naciskiem na modularność, skalowalność i łatwość utrzymania. Architektura opiera się na podejściu Feature-First z modelem "matrioszki" (zagnieżdżone komponenty), co pozwala na efektywną organizację kodu i łatwą nawigację.

## Architektura frontendowa

### Podejście Feature-First

Struktura projektu jest zorganizowana wokół funkcjonalności biznesowych (features), a nie typów technicznych. Oznacza to, że każda funkcjonalność (np. Dashboard, Zarządzanie Dokumentacją) zawiera wszystkie potrzebne elementy: komponenty, hooki, usługi, itp.

```
src/
└── features/
    ├── Dashboard/
    │   ├── Dashboard.jsx              # Główny komponent
    │   ├── Dashboard.js               # Logika biznesowa
    │   ├── Dashboard.module.css       # Style
    │   ├── index.js                   # Eksport
    │   ├── components/                # Subkomponenty
    │   ├── hooks/                     # Hooki specyficzne dla Dashboard
    │   └── utils/                     # Funkcje pomocnicze
    └── DocumentManagement/
        ├── DocumentManagement.jsx
        ├── DocumentManagement.js
        └── ...
```

### Model "Matrioszki"

Komponenty są organizowane hierarchicznie, gdzie każdy komponent może zawierać własne subkomponenty, tworząc strukturę podobną do rosyjskich matrioszek. Taka organizacja ułatwia zrozumienie zależności między komponentami i ich odpowiedzialności.

```
features/
└── Dashboard/
    ├── components/
    │   ├── DashboardHeader/
    │   │   ├── DashboardHeader.jsx
    │   │   ├── DashboardHeader.js
    │   │   ├── components/
    │   │   │   ├── UserInfo/
    │   │   │   └── DatePicker/
    │   │   └── ...
    │   └── ChartsContainer/
    │       ├── ChartsContainer.jsx
    │       ├── components/
    │       │   ├── FirstChart/
    │       │   │   ├── components/
    │       │   │   │   ├── ChartHeader/
    │       │   │   │   ├── ChartBody/
    │       │   │   │   └── ChartControls/
    │       │   │   └── ...
    │       │   └── SecondChart/
    │       └── ...
    └── ...
```

### Separacja logiki od prezentacji

Aplikacja stosuje zasadę separacji logiki biznesowej od warstwy prezentacji:

- Pliki `.jsx` zawierają tylko komponenty prezentacyjne
- Pliki `.js` zawierają logikę biznesową w formie hooków
- Hooki zwracają dane i funkcje, które są używane w komponentach

```javascript
// Dashboard.js - logika biznesowa
export const useDashboardLogic = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Logika pobierania danych, przetwarzania, itp.
  
  return {
    data,
    isLoading,
    refreshData: () => { /* ... */ }
  };
};

// Dashboard.jsx - warstwa prezentacji
import { useDashboardLogic } from './Dashboard';

const Dashboard = () => {
  const { data, isLoading, refreshData } = useDashboardLogic();
  
  // Renderowanie komponentu
  
  return (
    <div>
      {/* Komponenty prezentacyjne */}
    </div>
  );
};
```

## Zarządzanie stanem

### Redux Toolkit

Redux Toolkit jest używany do zarządzania globalnym stanem aplikacji. Stan jest podzielony na slice'y odpowiadające poszczególnym funkcjonalnościom.

```
src/
└── store/
    ├── index.js                # Konfiguracja store'a
    └── slices/
        ├── authSlice.js        # Stan autentykacji
        ├── documentsSlice.js   # Stan dokumentów
        ├── incidentsSlice.js   # Stan incydentów
        └── ...
```

### React Query

React Query jest używany do zarządzania stanem serwerowym, zapytaniami i cache'owaniem danych.

```javascript
// Przykład użycia React Query
const { data, isLoading, error, refetch } = useQuery(
  ['documents', filters],
  () => fetchDocuments(filters),
  {
    staleTime: 5 * 60 * 1000, // 5 minut
    cacheTime: 10 * 60 * 1000, // 10 minut
  }
);
```

### Context API

Context API jest używane do zarządzania stanem, który jest potrzebny w wielu komponentach, ale nie jest globalny dla całej aplikacji.

```javascript
// Przykład użycia Context API
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Komunikacja z API

### Axios

Axios jest używany do komunikacji z API. Wszystkie zapytania są centralizowane w serwisach API.

```
src/
└── services/
    ├── api.js                  # Konfiguracja Axios
    ├── documentsService.js     # Zapytania związane z dokumentami
    ├── incidentsService.js     # Zapytania związane z incydentami
    └── ...
```

```javascript
// Przykład serwisu API
import api from './api';

export const documentsService = {
  getAll: (filters) => api.get('/documents', { params: filters }),
  getById: (id) => api.get(`/documents/${id}`),
  create: (data) => api.post('/documents', data),
  update: (id, data) => api.put(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),
};
```

## Routing

### React Router

React Router jest używany do zarządzania routingiem w aplikacji. Struktura routingu odzwierciedla strukturę funkcjonalności.

```javascript
// Przykład konfiguracji routingu
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="documents/*" element={<DocumentsRoutes />} />
      <Route path="incidents/*" element={<IncidentsRoutes />} />
      <Route path="risk-analysis/*" element={<RiskAnalysisRoutes />} />
      {/* ... */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
```

## Stylizacja

### Material-UI

Material-UI jest używane jako główna biblioteka komponentów UI. Aplikacja wykorzystuje system motywów Material-UI do zapewnienia spójnego wyglądu.

```javascript
// Przykład konfiguracji motywu
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285f4', // Niebieski
    },
    secondary: {
      main: '#4caf50', // Zielony
    },
    background: {
      default: '#f5f7fa', // Jasne tło
    },
  },
  // Inne ustawienia motywu
});

const App = () => (
  <ThemeProvider theme={theme}>
    <AppRoutes />
  </ThemeProvider>
);
```

### CSS Modules

CSS Modules są używane do stylizacji komponentów, zapewniając lokalny zakres klas CSS.

```css
/* Dashboard.module.css */
.container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}
```

```javascript
// Dashboard.jsx
import styles from './Dashboard.module.css';

const Dashboard = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      {/* ... */}
    </div>
    {/* ... */}
  </div>
);
```

## Internacjonalizacja

### i18next

i18next jest używany do internacjonalizacji aplikacji, umożliwiając wsparcie dla wielu języków.

```javascript
// Przykład konfiguracji i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: {
          // Tłumaczenia dla języka polskiego
        }
      },
      en: {
        translation: {
          // Tłumaczenia dla języka angielskiego
        }
      }
    },
    lng: 'pl', // Domyślny język
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
```

## Testowanie

### Jest i React Testing Library

Jest i React Testing Library są używane do testów jednostkowych i integracyjnych.

```javascript
// Przykład testu komponentu
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard title', () => {
  render(<Dashboard />);
  const titleElement = screen.getByText(/dashboard/i);
  expect(titleElement).toBeInTheDocument();
});
```

### Cypress

Cypress jest używany do testów end-to-end.

```javascript
// Przykład testu E2E
describe('Dashboard', () => {
  it('loads dashboard page', () => {
    cy.visit('/');
    cy.contains('Dashboard').should('be.visible');
    cy.get('[data-testid="dashboard-widget"]').should('have.length.at.least', 1);
  });
});
```

## Architektura kontenerowa

### Docker i Docker Compose

Aplikacja jest skonteneryzowana przy użyciu Dockera i Docker Compose, co zapewnia spójne środowisko rozwojowe i produkcyjne.

```dockerfile
# Przykład Dockerfile dla frontendu
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# Przykład docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=rodo_app
    ports:
      - "5432:5432"

  portainer:
    image: portainer/portainer-ce:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data
    ports:
      - "9000:9000"

volumes:
  postgres_data:
  portainer_data:
```

## Podsumowanie

Architektura aplikacji RODO została zaprojektowana z myślą o modularności, skalowalności i łatwości utrzymania. Podejście Feature-First z modelem "matrioszki" pozwala na efektywną organizację kodu, a separacja logiki od prezentacji ułatwia testowanie i rozwój aplikacji. Wykorzystanie nowoczesnych bibliotek i narzędzi, takich jak Redux Toolkit, React Query, Material-UI i i18next, zapewnia solidną podstawę dla rozwoju aplikacji.
