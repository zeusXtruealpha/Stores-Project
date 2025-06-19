
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    // TODO: Replace with actual API call to Spring Boot backend
    // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    
    // Mock login logic - replace with actual backend integration
    const mockUsers = [
      { id: '1', email: 'admin@store.com', password: 'admin123', fullName: 'Admin User', designation: 'Administrator', role: 'admin', isApproved: true },
      { id: '2', email: 'user@store.com', password: 'user123', fullName: 'John Doe', designation: 'Store Manager', role: 'user', isApproved: true }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser && foundUser.isApproved) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};
