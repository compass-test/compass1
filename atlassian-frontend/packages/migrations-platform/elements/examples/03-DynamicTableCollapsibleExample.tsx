import React from 'react';

import { IntlProvider } from 'react-intl';

import { DynamicTableCollapsible } from '../src';
import {
  getCollapsibleRows,
  head,
  presidents,
} from '../src/dynamic-table-collapsible/mocks';

export default function ProgressPercentageExample() {
  return (
    <IntlProvider locale="en">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '80%',
          }}
        >
          <DynamicTableCollapsible
            head={head}
            rows={getCollapsibleRows(presidents)}
          />
        </div>
      </div>
    </IntlProvider>
  );
}
