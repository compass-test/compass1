import React from 'react';

import { IntlProvider } from 'react-intl';

import ErrorSummary from '../src/ui/components/ErrorSummary';

export default function AppPreflightErrorSummaryExample() {
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <ErrorSummary count={5} />
      </IntlProvider>
    </div>
  );
}
