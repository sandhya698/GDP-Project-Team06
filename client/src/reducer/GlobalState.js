import { createContext, useContext, useReducer, useEffect } from 'react';

const GlobalStateContext = createContext();

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'RESTORE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const GlobalStateProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('globalState'));
    if (storedState) {
      dispatch({ type: 'RESTORE_STATE', payload: storedState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalState', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
