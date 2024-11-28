import { createContext, useEffect, useReducer, useState } from 'react';

const BASE_URL = `http://localhost:8000`;
const CitiesContext = createContext();

// initialState
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

// reducer
function reducer(state, action) {
  switch (action.type) {
    // loading
    case 'loading': {
      return {
        ...state,
        isLoading: true,
      };
    }

    // rejected
    case 'rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    // cities/loaded
    case 'cities/loaded': {
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    }

    // city/loaded
    case 'city/loaded': {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    }

    // city/created
    case 'city/created': {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    }

    // city/deleted
    case 'city/deleted': {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    }

    default: {
      throw new Error(`Unknow action type!`);
    }
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: `There was an error while loading cities.`,
        });
      }
    }
    fetchCities();
  }, []);

  // getCity
  async function getCity(id) {
    if (+id === currentCity.id) return;

    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({
        type: 'city/loaded',
        payload: data,
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: `There was an error while loading city.`,
      });
    }
  }

  // createCity
  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      dispatch({
        type: 'city/created',
        payload: data,
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: `There was an error while creating a new city.`,
      });
    }
  }

  // Delete City
  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({
        type: 'city/deleted',
        payload: id,
      });
    } catch (error) {
      console.error(`🚀error (deleteCity):`, error);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
