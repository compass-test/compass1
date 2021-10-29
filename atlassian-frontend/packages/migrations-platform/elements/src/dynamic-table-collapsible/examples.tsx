import React from 'react';

import { IntlProvider } from 'react-intl';

import DynamicTableCollapsible from './main';
import {
  getCollapsibleRows,
  head,
  presidentListWithoutContent,
  presidents,
} from './mocks';

export const DynamicTableWithCollapsibleRows = () => {
  return (
    <IntlProvider locale="en">
      <DynamicTableCollapsible
        head={head}
        rows={getCollapsibleRows(presidents)}
      />
    </IntlProvider>
  );
};

export const DynamicTableWithoutCollapsibleRows = () => {
  return (
    <IntlProvider locale="en">
      <DynamicTableCollapsible
        head={head}
        rows={getCollapsibleRows(presidentListWithoutContent)}
      />
    </IntlProvider>
  );
};
