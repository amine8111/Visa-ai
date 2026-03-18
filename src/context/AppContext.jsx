import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext(null);

const initialState = {
  profile: {
    age: '',
    nationality: '',
    maritalStatus: '',
    employmentStatus: '',
    monthlyIncome: '',
    bankBalance: '',
    travelHistory: 0,
    previousVisaRefusals: 0,
  },
  documents: {
    passport: false,
    bankStatement: false,
    employmentProof: false,
  },
  assessment: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case 'UPDATE_DOCUMENT':
      return { ...state, documents: { ...state.documents, [action.payload]: true } };
    case 'SET_ASSESSMENT':
      return { ...state, assessment: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateProfile = (data) => dispatch({ type: 'UPDATE_PROFILE', payload: data });
  const updateDocument = (type) => dispatch({ type: 'UPDATE_DOCUMENT', payload: type });
  const setAssessment = (data) => dispatch({ type: 'SET_ASSESSMENT', payload: data });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <AppContext.Provider value={{ ...state, updateProfile, updateDocument, setAssessment, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
