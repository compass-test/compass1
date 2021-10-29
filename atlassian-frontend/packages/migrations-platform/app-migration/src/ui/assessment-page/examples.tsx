import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import {
  APP_ALTERNATIVE,
  APP_NEEDED,
  APP_NOT_NEEDED,
  APP_NOT_NEEDED_CONTACT_VENDOR,
  APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
  APP_UNASSIGNED,
} from '../../common/ui/app-assessment-table/mocks';

import AppAssessmentPage, { Props } from './main';

export const AppAssessmentPageEmpty = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentPage
        apps={[]}
        onHome={action('onHome')}
        onClose={action('onClose')}
        onContinue={action('onContinue')}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppAssessmentPageAllStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentPage
        apps={[
          APP_ALTERNATIVE,
          APP_NEEDED,
          APP_NOT_NEEDED,
          APP_NOT_NEEDED_CONTACT_VENDOR,
          APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
          APP_UNASSIGNED,
        ]}
        onHome={action('onHome')}
        onClose={action('onClose')}
        onContinue={action('onContinue')}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        shouldShowUsage
        {...props}
      />
    </IntlProvider>
  );
};

export const AppAssessmentPageAllStatusEAP = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppAssessmentPage
        apps={[
          APP_ALTERNATIVE,
          APP_NEEDED,
          APP_NOT_NEEDED,
          APP_NOT_NEEDED_CONTACT_VENDOR,
          APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
          APP_UNASSIGNED,
        ]}
        automatedPathUrlForNonEap="http://atlassian.net"
        onHome={action('onHome')}
        onClose={action('onClose')}
        onContinue={action('onContinue')}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        shouldShowUsage
        {...props}
      />
    </IntlProvider>
  );
};
