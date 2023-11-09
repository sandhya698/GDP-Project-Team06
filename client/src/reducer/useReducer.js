import Cookies from 'js-cookie';

// Check if cookieName exists
function isCookiePresent(cookieName) {
  const cookieValue = Cookies.get(cookieName);
  return cookieValue ? true : false;
}

// Determine whether the user is authenticated based on the presence of a cookie
const isAuthenticated = isCookiePresent('isAuthenticated');

export const initialState = {
  isAuthenticated,
};

export const reducer = (state, action) => {
    if (action.type === 'USER') {
      // Update the state
      const newState = {
        ...state,
        isAuthenticated: action.payload,
      };
  
      // Save the new state to localStorage
      localStorage.setItem('userState', JSON.stringify(newState));
  
      return newState;
    }
  
    return state;
};