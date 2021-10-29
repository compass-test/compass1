import React, { FC, ReactNode } from 'react';

import { AnalyticsUtils } from '../../utils/AnalyticsUtils';
import { BrowserUtils } from '../../utils/BrowserUtils';
import { ErrorUtils } from '../../utils/ErrorUtils';
import { PfAnalyticsUtilsProvider } from '../AnalyticsUtilsContext';
import { PfBrowserUtilsProvider } from '../BrowserUtilsContext';
import { PfErrorUtilsProvider } from '../ErrorUtilsContext';

export interface PfUtils {
  errorUtils: ErrorUtils;
  analyticsUtils: AnalyticsUtils;
  browserUtils: BrowserUtils;
}

interface UtilsProviderProps {
  utils: PfUtils;
  children: ReactNode;
}

export const UtilsProvider: FC<UtilsProviderProps> = ({ utils, children }) => {
  return (
    <PfBrowserUtilsProvider browserUtils={utils.browserUtils}>
      <PfErrorUtilsProvider errorUtils={utils.errorUtils}>
        <PfAnalyticsUtilsProvider analyticsUtils={utils.analyticsUtils}>
          {children}
        </PfAnalyticsUtilsProvider>
      </PfErrorUtilsProvider>
    </PfBrowserUtilsProvider>
  );
};
