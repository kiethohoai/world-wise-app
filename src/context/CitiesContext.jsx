import { createContext, useEffect, useState } from 'react';

const BASE_URL = `http://localhost:8000`;
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(`🚀error (fetchCities):`, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // getCity
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error(`🚀error (getCity):`, error);
    } finally {
      setIsLoading(false);
    }
  }

  // createCity
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      console.log(`🚀CHECK > data:`, data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error(`🚀error (createCity):`, error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
