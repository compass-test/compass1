import React from 'react';

import { IntlProvider } from 'react-intl';

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '70%',
      margin: '50px auto',
    }}
  >
    <IntlProvider locale="en">{children}</IntlProvider>
  </div>
);
