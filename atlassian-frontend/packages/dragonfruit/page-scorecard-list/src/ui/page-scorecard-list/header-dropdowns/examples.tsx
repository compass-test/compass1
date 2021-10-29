import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardSettings from './main';

export const ScorecardSettingsExample = () => (
  <CompassTestProvider>
    <ScorecardSettings />
  </CompassTestProvider>
);

export const ScorecardSettingsDropdownStyleExample = () => (
  <CompassTestProvider>
    <ScorecardSettings styling="dropdown" />
  </CompassTestProvider>
);
