import React from 'react';

import { UI_ONBOARDING_MODAL } from '@atlassian/dragonfruit-feature-flags';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Onboarding } from '../src';

const flags = {
  [UI_ONBOARDING_MODAL]: true,
};

export default function Basic() {
  return (
    <CompassTestProvider flags={flags} locale="en">
      <Onboarding data-testId={'dragonfruit-onboarding'} />
    </CompassTestProvider>
  );
}
