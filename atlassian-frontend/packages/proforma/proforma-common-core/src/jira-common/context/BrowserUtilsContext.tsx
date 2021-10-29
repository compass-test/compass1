import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { BrowserUtils } from '../utils/BrowserUtils';

export const PfBrowserUtilsContext = createContext<BrowserUtils | undefined>(
  undefined,
);

interface PfBrowserUtilsContextProps {
  children: ReactNode;
  browserUtils: BrowserUtils;
}

export const PfBrowserUtilsProvider: FC<PfBrowserUtilsContextProps> = ({
  children,
  browserUtils,
}) => {
  return (
    <PfBrowserUtilsContext.Provider value={browserUtils}>
      {children}
    </PfBrowserUtilsContext.Provider>
  );
};

export function usePfBrowserUtils() {
  const browserUtils = useContext(PfBrowserUtilsContext);
  if (browserUtils === undefined) {
    throw new Error(
      'usePfBrowserUtils must be used within a PfBrowserUtilsProvider',
    );
  }
  return browserUtils;
}

export const withBrowserUtils = <C extends ComponentClass>(Component: C): C => {
  return (((props: any) => {
    const browserUtils = usePfBrowserUtils();
    return <Component {...props} browserUtils={browserUtils} />;
  }) as any) as C;
};
