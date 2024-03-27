import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isLoading: true
};

const authReducer = (state, action) => {
  const { user, token } = action.payload || {};
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
          "authState",
          JSON.stringify({ ...state, user, token, isLoading: false })
      );
      return { ...state, user, token, isLoading:false };
    case "LOGOUT":
      localStorage.removeItem("authState");
      return {...initialState, isLoading: false};
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_USER':
      console.log(user);
      localStorage.setItem(
          "authState",
          JSON.stringify({ ...state, user, isLoading: false })
      );
      return { ...state, user, isLoading:false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const authState = JSON.parse(localStorage.getItem("authState"));
    let autoLogout = false;
    if (authState) {
      autoLogout = checkTokenValidity(authState.token);
      if (autoLogout) {
        dispatch({ type: "LOGOUT" });
      } else if (!autoLogout) {
        dispatch({ type: "LOGIN", payload: { ...authState } });
      }
    }
     
    dispatch({ type: 'SET_LOADING', payload: false });
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
