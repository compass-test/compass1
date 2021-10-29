import React from 'react';

import { IntlProvider } from 'react-intl';

import { HowItWorks } from '../src';
import { formattedSteps } from '../src/ui/how-it-works/mocks';

export default function HowItWorksExample() {
  return (
    <IntlProvider locale="en">
      <HowItWorks steps={formattedSteps} />
    </IntlProvider>
  );
}
