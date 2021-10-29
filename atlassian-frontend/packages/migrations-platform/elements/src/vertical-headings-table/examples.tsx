import React from 'react';

import { IntlProvider } from 'react-intl';

import VerticalHeadingsTable from './main';

export const VerticalHeadingsTableBasic = () => {
  return (
    <IntlProvider locale="en">
      <VerticalHeadingsTable
        rows={[
          {
            header: 'Header 1',
            content: 'Content 1',
          },
          {
            header: 'Header 2',
            content: <button>Hello</button>,
          },
        ]}
      />
    </IntlProvider>
  );
};
