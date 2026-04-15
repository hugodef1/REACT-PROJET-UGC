import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ugc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Auth fictive : on crée l'utilisateur si les champs sont valides
    if (!email || !password) throw new Error('Champs requis');
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Utilisateur',
      avatar: null,
      illimite: false,
    };
    setUser(userData);
    localStorage.setItem('ugc_user', JSON.stringify(userData));
    return userData;
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) throw new Error('Champs requis');
    const userData = { id: Date.now(), name, email, avatar: null, illimite: false };
    setUser(userData);
    localStorage.setItem('ugc_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ugc_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('ugc_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
