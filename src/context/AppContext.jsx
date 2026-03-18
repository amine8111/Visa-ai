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
  isSimulatorMode: false,
  simulatorProfile: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: { ...state.documents, [action.payload]: true },
      };
    case 'SET_ASSESSMENT':
      return {
        ...state,
        assessment: action.payload,
      };
    case 'START_SIMULATOR':
      return {
        ...state,
        isSimulatorMode: true,
        simulatorProfile: { ...state.profile },
      };
    case 'UPDATE_SIMULATOR_PROFILE':
      return {
        ...state,
        simulatorProfile: { ...state.simulatorProfile, ...action.payload },
      };
    case 'EXIT_SIMULATOR':
      return {
        ...state,
        isSimulatorMode: false,
        simulatorProfile: null,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateProfile = (data) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: data });
  };

  const updateDocument = (type) => {
    dispatch({ type: 'UPDATE_DOCUMENT', payload: type });
  };

  const setAssessment = (data) => {
    dispatch({ type: 'SET_ASSESSMENT', payload: data });
  };

  const startSimulator = () => {
    dispatch({ type: 'START_SIMULATOR' });
  };

  const updateSimulatorProfile = (data) => {
    dispatch({ type: 'UPDATE_SIMULATOR_PROFILE', payload: data });
  };

  const exitSimulator = () => {
    dispatch({ type: 'EXIT_SIMULATOR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const activeProfile = state.isSimulatorMode ? state.simulatorProfile : state.profile;

  return (
    <AppContext.Provider
      value={{
        ...state,
        activeProfile,
        updateProfile,
        updateDocument,
        setAssessment,
        startSimulator,
        updateSimulatorProfile,
        exitSimulator,
        reset,
      }}
    >
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
