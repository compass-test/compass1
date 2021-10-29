import React from 'react';

import { IntlProvider } from 'react-intl';

import WeightSetter from './index';

export const BasicActions = () => {
  return (
    <IntlProvider locale="en">
      <WeightSetter
        value="66"
        testId="dragonfruit-scorecard-templates.criteria-row.weight-setter"
        onEdit={(value) => `Fake editing ${value}`}
      />
    </IntlProvider>
  );
};
