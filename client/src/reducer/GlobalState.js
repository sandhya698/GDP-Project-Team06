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
        return { ...state, user: action.payload };
      case 'SET_TOKEN':
        return { ...state, token: action.payload };
      case 'RESTORE_STATE':
        return { ...state, ...action.payload };
      case 'REMOVE_STATE':
        return initialState;
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
      // console.log('removing state')
      localStorage.removeItem('globalState');
    }
  }

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('globalState'));
    // console.log(storedState)
    if (storedState) {
      // console.log('restoring state')
      dispatch({ type: 'RESTORE_STATE', payload: storedState });
      checkTokenValidity(storedState.token)
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log('state changed ', state)
    localStorage.setItem('globalState', JSON.stringify(state));
    checkTokenValidity(state.token);
    //eslint-disable-next-line
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
