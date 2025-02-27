import { createContext, useContext } from 'react';

export const CreditsContext = createContext();

export const useCredits = () => useContext(CreditsContext);
