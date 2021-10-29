import React from 'react';

import { IntlProvider } from 'react-intl';

import { ProviderInlineValue } from '../src';

const reducer = (stats?: number) => (stats ? stats : null);

const provider = () => {
  return new Promise<number>((res, rej) => {
    res(20);
  });
};

export default function ProviderInlineValueExample() {
  return (
    <IntlProvider locale="en">
      <ProviderInlineValue provider={provider} reducer={reducer} />
    </IntlProvider>
  );
}
