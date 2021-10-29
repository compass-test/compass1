import React, { createContext, ReactNode, useContext } from 'react';

export interface LoggerContextInterface {
  captureException: (error: Error, tags?: Record<string, string>) => void;
  captureMessage: (message: string, tags?: Record<string, string>) => void;
}

export const LoggerContext = createContext<LoggerContextInterface | undefined>(
  undefined,
);

interface LoggerContextProviderProps {
  children: ReactNode;
  logger: LoggerContextInterface;
}

export const LoggerContextProvider = ({
  children,
  logger,
}: LoggerContextProviderProps) => {
  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
};

export const useLogger = () => {
  return useContext(LoggerContext);
};
