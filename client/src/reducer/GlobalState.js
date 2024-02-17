import React, { createContext, useContext, useReducer } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const initialState = {
    user: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
