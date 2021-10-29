import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentTypeSelect from './main';

export const ComponentTypeSelectExample = () => (
  <CompassTestProvider locale="en">
    <ComponentTypeSelect />
  </CompassTestProvider>
);

export const FilterStyleComponentTypeSelectExample = () => (
  <CompassTestProvider locale="en">
    <ComponentTypeSelect styling="dropdown" />
  </CompassTestProvider>
);
