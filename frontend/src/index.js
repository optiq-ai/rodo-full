// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Inicjalizacja danych testowych dla autentykacji w trybie deweloperskim
if (process.env.NODE_ENV === 'development') {
  // Sprawdź, czy dane autentykacji już istnieją
  if (!localStorage.getItem('isAuthenticated')) {
    console.log('Inicjalizacja danych testowych dla autentykacji');
    localStorage.setItem('accessToken', 'mock-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');
    localStorage.setItem('isAuthenticated', 'true');
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
