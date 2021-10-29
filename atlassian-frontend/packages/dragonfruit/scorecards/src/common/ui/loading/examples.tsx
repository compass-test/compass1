import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import Loading from './index';

export const LoadingExample = () => {
  return (
    <CompassTestProvider>
      <Loading />
    </CompassTestProvider>
  );
};
