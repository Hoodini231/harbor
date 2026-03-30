import { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Root application provider
 * Wraps app with necessary contexts and providers
 */
export default function AppProvider({ children }: AppProviderProps) {
  return <>{children}</>;
}
