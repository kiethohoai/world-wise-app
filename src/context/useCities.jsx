import { useContext } from 'react';
import { CitiesContext } from './CitiesContext';

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(`You can't use context outside the provider`);
  return context;
}
