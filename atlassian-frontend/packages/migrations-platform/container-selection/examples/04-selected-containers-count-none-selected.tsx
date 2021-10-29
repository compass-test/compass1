import React from 'react';

import { IntlProvider } from 'react-intl';

import { SelectedContainersCount } from '../src';

export default () => {
  return (
    <IntlProvider locale="en">
      <SelectedContainersCount containerUnit="plan" total={42} selected={0} />
    </IntlProvider>
  );
};
