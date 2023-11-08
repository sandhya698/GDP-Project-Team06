// Initialize initialState from localStorage if available
export const initialState = JSON.parse(localStorage.getItem('userState')) || {
    isAuthenticated: false,
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