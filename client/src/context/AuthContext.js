import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user, token } = action.payload;
      localStorage.setItem(
          "authState",
          JSON.stringify({ ...state, user, token })
      );
      return { ...state, user, token };
    case "LOGOUT":
      localStorage.removeItem("authState");
      return initialState;
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
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem("authState"));

    if (authState) {
      checkTokenValidity(authState.token);
      dispatch({ type: "LOGIN", payload: { ...authState } });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
