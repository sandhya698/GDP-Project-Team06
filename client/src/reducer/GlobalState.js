import React, { createContext, useContext, useEffect, useReducer } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const initialState = {
    user: null,
    token: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        localStorage.setItem('globalState', JSON.stringify({ ...state, user: action.payload }));
        return { ...state, user: action.payload };
      case 'SET_TOKEN':
        localStorage.setItem('globalState', JSON.stringify({ ...state, token: action.payload }));
        return { ...state, token: action.payload };
      case 'RESTORE_STATE':
        localStorage.setItem('globalState', JSON.stringify({ ...state, ...action.payload }));
        return { ...state, ...action.payload };
      case 'REMOVE_STATE':
        localStorage.setItem('globalState', JSON.stringify({ ...initialState }));
        return {...initialState};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const checkTokenValidity = (token) => {
    const decodedJwt = parseJwt(token);
    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      // console.log('removing state');
      localStorage.removeItem('globalState');
      dispatch({ type: 'REMOVE_STATE' }); // Reset state to initial after removing
    }
  };

  useEffect(() => {
    // console.log('Checking for stored state...');
    const storedState = JSON.parse(localStorage.getItem('globalState'));
    // console.log(storedState)
    if (storedState && storedState.user && storedState.token) {
      // console.log('Restoring state:', storedState);
      dispatch({ type: 'RESTORE_STATE', payload: storedState });
      checkTokenValidity(storedState.token);
    } else {
      // console.log('No stored state found.');
    }
    //eslint-disable-next-line
  }, []);
  
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
