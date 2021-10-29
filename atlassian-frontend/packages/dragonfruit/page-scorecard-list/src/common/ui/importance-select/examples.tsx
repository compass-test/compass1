import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ImportanceSelect from './main';

export const ImportanceSelectExample = () => (
  <CompassTestProvider locale="en">
    <ImportanceSelect />
  </CompassTestProvider>
);

export const FilterStyleImportanceSelectExample = () => (
  <CompassTestProvider locale="en">
    <ImportanceSelect styling="dropdown" />
  </CompassTestProvider>
);
