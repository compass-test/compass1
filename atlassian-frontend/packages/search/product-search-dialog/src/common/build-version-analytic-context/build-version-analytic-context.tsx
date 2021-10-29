import React, { FunctionComponent } from 'react';
import { SearchDialogAnalyticsContext } from '../analytics';
import { BUILD_VERSION } from '../../buildVersion';

export const BuildVersionAnalyticContext: FunctionComponent<{}> = ({
  children,
}) => (
  <SearchDialogAnalyticsContext
    analyticContext={{ frontend: BUILD_VERSION }}
    nonPrivacySafeAnalyticContext={{}}
  >
    {children}
  </SearchDialogAnalyticsContext>
);
