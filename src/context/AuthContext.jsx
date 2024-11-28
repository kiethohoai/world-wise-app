import { createContext, useReducer } from 'react';

/* Fake user */
const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

/* State */
const initialState = {
  user: null,
  isAuthenticated: false,
};

/* Reducer */
function reducer(state, action) {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case 'logout': {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    default: {
      throw new Error(`Unknow action.`);
    }
  }
}

/* Context */
const AuthContext = createContext();

/* Provider */
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  // Login
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: 'login',
        payload: FAKE_USER,
      });
    }
  }

  // Logout
  function logout() {
    dispatch({
      type: 'logout',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
