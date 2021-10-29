import React from 'react';

import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button';

import { AppAssessmentPage, AppAssessmentPageProps } from '../src';
// Mocks
import {
  APP_ALTERNATIVE,
  APP_NEEDED,
  APP_NOT_NEEDED,
  APP_NOT_NEEDED_CONTACT_VENDOR,
  APP_NOT_NEEDED_CONTACT_VENDOR_NO_MIGRATION,
  APP_UNASSIGNED,
} from '../src/common/ui/app-assessment-table/mocks';

export default (props: Partial<AppAssessmentPageProps>) => {
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
        onHome={() => {}}
        onClose={() => {}}
        onContinue={() => {}}
        onMigrationNotesChange={async () => {}}
        onMigrationStatusChange={async () => {}}
        headerButtons={
          <>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </>
        }
        bannerAppearance="warning"
        bannerMessage="You are using assisted support version. Contact support for any issues."
        {...props}
      />
    </IntlProvider>
  );
};
