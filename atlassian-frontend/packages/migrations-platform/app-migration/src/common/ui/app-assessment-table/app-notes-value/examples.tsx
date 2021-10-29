import React from 'react';

import { IntlProvider } from 'react-intl';

import AppNotesValue, { Props } from './main';

export const WithDefaultNotes = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppNotesValue
        appKey="fake-key"
        defaultMigrationNotes="default notes."
        onChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const WithoutDefaultNotes = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppNotesValue appKey="fake-key" onChange={async () => {}} {...props} />
    </IntlProvider>
  );
};
