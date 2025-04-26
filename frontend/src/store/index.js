// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Importy reducerów
// Docelowo będą tutaj importy z poszczególnych slices
// import authReducer from './slices/authSlice';
// import documentsReducer from './slices/documentsSlice';
// itd.

// Tymczasowy reducer dla placeholderów
const placeholderReducer = (state = {}, action) => {
  return state;
};

const rootReducer = combineReducers({
  // Docelowo będą tutaj wszystkie reducery
  // auth: authReducer,
  // documents: documentsReducer,
  // itd.
  
  // Tymczasowe placeholdery
  auth: placeholderReducer,
  documents: placeholderReducer,
  registers: placeholderReducer,
  riskAnalysis: placeholderReducer,
  incidents: placeholderReducer,
  subjectRequests: placeholderReducer,
  training: placeholderReducer,
  reports: placeholderReducer,
  settings: placeholderReducer,
  consentManagement: placeholderReducer,
  dataMapping: placeholderReducer,
  vendorRisk: placeholderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
