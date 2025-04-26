// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
// Usunięto import Navigate i useLocation, ponieważ nie są już potrzebne

const ProtectedRoute = ({ children }) => {
  // Usunięto logikę autoryzacji - komponent zawsze renderuje dzieci
  return children;
};

export default ProtectedRoute;
