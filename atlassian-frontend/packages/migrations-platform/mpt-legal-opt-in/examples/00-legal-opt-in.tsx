import React from 'react';

import { IntlProvider } from 'react-intl';

import { LegalOptInModal } from '../src';

export default function LegalOptInExample() {
  return (
    <IntlProvider locale="en">
      <LegalOptInModal onClose={() => {}} onAgree={() => {}} />
    </IntlProvider>
  );
}
