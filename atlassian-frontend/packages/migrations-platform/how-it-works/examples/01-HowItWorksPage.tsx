import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import Button from '@atlaskit/button/standard-button';
import FocusPage from '@atlassian/mpt-focus-page';

import { HowItWorks } from '../src';
import { formattedSteps } from '../src/ui/how-it-works/mocks';

const footerButtons = (
  <>
    <Button appearance="subtle">Back</Button>
    <Button appearance="primary">Connect to cloud</Button>
  </>
);

export default function HowItWorksWithFocusPage() {
  return (
    <FocusPage
      onClose={() => action('ClosePage')}
      width="large"
      footerButtons={footerButtons}
    >
      <IntlProvider locale="en">
        <HowItWorks steps={formattedSteps} />
      </IntlProvider>
    </FocusPage>
  );
}
