import React from 'react';

import { AsyncIntlProvider, Locale } from '@atlassian/proforma-translations';

import { HowFormsWork } from '../src/jira-common/components/HowFormsWork/HowFormsWork';

export default function HowFormsWorkExample() {
  const locale = Locale.fr_FR;
  return (
    <div data-testid="proforma-how-forms-work">
      <AsyncIntlProvider locale={locale}>
        <HowFormsWork />
      </AsyncIntlProvider>
    </div>
  );
}
