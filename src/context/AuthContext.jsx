import { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  session: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        session: action.payload,
        user: action.payload?.user || null,
        loading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SIGN_OUT':
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        dispatch({ type: 'SET_SESSION', payload: data.session });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };
    initAuth();
  }, []);

  const signUp = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const { data, error } = await supabase.auth.signUp(email, password);
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { error };
    }
    dispatch({ type: 'SET_SESSION', payload: data.session || { user: data.user } });
    return { data, error: null };
  };

  const signIn = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const { data, error } = await supabase.auth.signIn(email, password);
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { error };
    }
    dispatch({ type: 'SET_SESSION', payload: data.session });
    return { data, error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
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
