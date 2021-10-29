import React from 'react';

import { IntlProvider } from 'react-intl';

export const withIntlProvider = <Props extends Object>(
  WrappedComponent: React.ComponentType<Props>,
) => (props: Props) => (
  <IntlProvider locale="en">
    <WrappedComponent {...props} />
  </IntlProvider>
);
