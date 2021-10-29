import React from 'react';

import { IntlProvider } from 'react-intl';

import AppAssessmentTable, { Props } from './main';
import {
  APP_ALTERNATIVE,
  APP_NEEDED,
  APP_NOT_NEEDED,
  APP_NOT_NEEDED_CONTACT_VENDOR,
  APP_NOT_NEEDED_CONTACT_VENDOR_DISCARDED,
  APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
  APP_UNASSIGNED,
} from './mocks';

export const AppAssessmentTableEmpty = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentTable
        apps={[]}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppAssessmentTableEmptyWithHomeButton = (
  props: Partial<Props>,
) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentTable
        apps={[]}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        onHome={() => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppAssessmentTableAllStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentTable
        apps={[
          APP_ALTERNATIVE,
          APP_NEEDED,
          APP_NOT_NEEDED,
          APP_NOT_NEEDED_CONTACT_VENDOR,
          APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
          APP_NOT_NEEDED_CONTACT_VENDOR_DISCARDED,
          APP_UNASSIGNED,
        ]}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        onHome={() => {}}
        shouldShowUsage
        {...props}
      />
    </IntlProvider>
  );
};

export const AppAssessmentTableAllStatusEAP = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentTable
        apps={[
          APP_ALTERNATIVE,
          APP_NEEDED,
          APP_NOT_NEEDED,
          APP_NOT_NEEDED_CONTACT_VENDOR,
          APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
          APP_UNASSIGNED,
        ]}
        automatedPathUrlForNonEap="http://atlassian.net"
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        onHome={() => {}}
        shouldShowUsage
        {...props}
      />
    </IntlProvider>
  );
};
