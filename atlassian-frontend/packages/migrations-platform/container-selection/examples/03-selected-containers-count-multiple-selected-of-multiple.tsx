import React from 'react';

import { IntlProvider } from 'react-intl';

import { SelectedContainersCount } from '../src';

export default () => {
  return (
    <IntlProvider locale="en">
      <SelectedContainersCount
        containerUnit="project"
        total={42}
        selected={3}
      />
    </IntlProvider>
  );
};
