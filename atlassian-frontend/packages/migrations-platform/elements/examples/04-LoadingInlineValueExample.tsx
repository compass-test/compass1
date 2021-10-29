import React from 'react';

import { IntlProvider } from 'react-intl';

import { LoadingInlineValue } from '../src';

export default function LoadingInlineValueExample() {
  return (
    <IntlProvider locale="en">
      <LoadingInlineValue isLoading={true}>value</LoadingInlineValue>
    </IntlProvider>
  );
}
