import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Actions from './index';

export const BasicActions = () => {
  return (
    <CompassTestProvider>
      <Actions onDelete={() => 'I am fake'} />
    </CompassTestProvider>
  );
};
