import React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import { Props } from './types';

export const View = ({ children, isConnectedToPage }: Props) => (
  <AnalyticsContext
    data={{
      attributes: {
        isConnectedToPage,
      },
    }}
  >
    {children}
  </AnalyticsContext>
);
