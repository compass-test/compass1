import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardHeader from './main';

export const ScorecardHeaderExample = () => (
  <CompassTestProvider>
    <ScorecardHeader
      description={'Component description will go here'}
      name={'Component Title'}
      testId="storybook"
    />
  </CompassTestProvider>
);
