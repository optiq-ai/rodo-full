// src/App.js - Aktualizacja importów dla zaimplementowanych modułów
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './store';
import theme from './config/theme';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './features/Dashboard';
import Login from './features/Auth/Login';
import DocumentManagement from './features/DocumentManagement';
import IncidentManagement from './features/IncidentManagement';
import SubjectRequestsManagement from './features/SubjectRequestsManagement';
import Settings from './features/Settings';
import ReportingAndAnalytics from './features/ReportingAndAnalytics';

// Placeholdery dla pozostałych modułów
const RodoRegisters = () => <div>Moduł Rejestrów RODO</div>;
const RiskAnalysis = () => <div>Moduł Analizy Ryzyka</div>;
const TrainingAndEducation = () => <div>Moduł Szkoleń i Edukacji</div>;
const ConsentManagement = () => <div>Moduł Zarządzania Zgodami</div>;
const DataMapping = () => <div>Moduł Mapowania Danych</div>;
const VendorRiskManagement = () => <div>Moduł Zarządzania Ryzykiem Dostawców</div>;

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Ścieżki publiczne */}
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            
            {/* Ścieżki chronione */}
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
              <Route path="consent-management/*" element={<ConsentManagement />} />
              <Route path="data-mapping/*" element={<DataMapping />} />
              <Route path="vendor-risk/*" element={<VendorRiskManagement />} />
            </Route>
            
            {/* Obsługa 404 */}
            <Route path="*" element={<div>Strona nie znaleziona</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
