import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { AnalyticsUtils } from '../utils/AnalyticsUtils';

export const PfAnalyticsUtilsContext = createContext<
  AnalyticsUtils | undefined
>(undefined);

interface PfAnalyticsUtilsContextProps {
  children: ReactNode;
  analyticsUtils: AnalyticsUtils;
}

export const PfAnalyticsUtilsProvider: FC<PfAnalyticsUtilsContextProps> = ({
  children,
  analyticsUtils,
}) => {
  return (
    <PfAnalyticsUtilsContext.Provider value={analyticsUtils}>
      {children}
    </PfAnalyticsUtilsContext.Provider>
  );
};

export function usePfAnalyticsUtils() {
  const analyticsUtils = useContext(PfAnalyticsUtilsContext);
  if (analyticsUtils === undefined) {
    throw new Error(
      'usePfAnalyticsUtils must be used within a PfAnalyticsUtilsProvider',
    );
  }
  return analyticsUtils;
}

export const withAnalyticsUtils = <C extends ComponentClass>(
  Component: C,
): C => {
  return (((props: any) => {
    const analyticsUtils = usePfAnalyticsUtils();
    return <Component {...props} analyticsUtils={analyticsUtils} />;
  }) as any) as C;
};
