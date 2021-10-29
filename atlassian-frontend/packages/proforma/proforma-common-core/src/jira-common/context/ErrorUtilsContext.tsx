import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { ErrorUtils } from '../utils/ErrorUtils';

export const PfErrorUtilsContext = createContext<ErrorUtils | undefined>(
  undefined,
);

interface PfErrorUtilsContextProps {
  children: ReactNode;
  errorUtils: ErrorUtils;
}

export const PfErrorUtilsProvider: FC<PfErrorUtilsContextProps> = ({
  children,
  errorUtils,
}) => {
  return (
    <PfErrorUtilsContext.Provider value={errorUtils}>
      {children}
    </PfErrorUtilsContext.Provider>
  );
};

export function usePfErrorUtils() {
  const errorUtils = useContext(PfErrorUtilsContext);
  if (errorUtils === undefined) {
    throw new Error(
      'usePfErrorUtils must be used within a PfErrorUtilsProvider',
    );
  }
  return errorUtils;
}

export const withErrorUtils = <C extends ComponentClass>(Component: C): C => {
  return (((props: any) => {
    const errorUtils = usePfErrorUtils();
    return <Component {...props} errorUtils={errorUtils} />;
  }) as any) as C;
};
