import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ss_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setIsAdmin(parsed.role === 'admin');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulating login logic
    const userData = {
      name: email === 'admin@stream.com' ? 'Admin' : 'User',
      email,
      role: email === 'admin@stream.com' ? 'admin' : 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
    localStorage.setItem('ss_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('ss_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
