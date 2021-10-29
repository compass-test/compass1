import React from 'react';

import { FormattedMessage } from 'react-intl';

import { AsyncIntlProvider, Locale } from '../src';

export default function AsyncIntlProviderExample() {
  const formLocale = Locale.ja_JP;
  const messageId =
    'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorDesc';

  return (
    <AsyncIntlProvider locale={formLocale}>
      <FormattedMessage id={messageId} />
    </AsyncIntlProvider>
  );
}
