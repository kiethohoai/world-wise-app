import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(`Can't not use AuthContext outside AuthProvider`);
  return context;
}
