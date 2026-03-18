import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    const demoUser = { id: 'user-' + Date.now(), email };
    setUser(demoUser);
    return { data: { user: demoUser }, error: null };
  };

  const signIn = async (email, password) => {
    if (email && password && password.length >= 6) {
      const demoUser = { id: 'user-' + Date.now(), email };
      setUser(demoUser);
      return { data: { user: demoUser }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials' } };
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
