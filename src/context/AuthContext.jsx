import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      if (token && userRole) {
        setUser({ token, role: userRole });
      }
    } catch (err) {
      console.error('Error al cargar datos de autenticación:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token, role) => {
    try {
      if (!token || !role) {
        throw new Error('Datos de autenticación incompletos');
      }
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      setUser({ token, role });
      setError(null);
    } catch (err) {
      console.error('Error durante el login:', err);
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user?.token;
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (typeof roles === 'string') {
      return user.role === roles;
    }
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRole, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};