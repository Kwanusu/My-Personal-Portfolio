// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Simplistic check
  return isAuthenticated ? children : <Navigate to="/login" />;
};