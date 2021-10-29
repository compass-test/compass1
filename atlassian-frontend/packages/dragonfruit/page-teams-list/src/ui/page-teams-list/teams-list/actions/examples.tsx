import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Actions } from './index';

export const ActionsExample = () => {
  return (
    <CompassTestProvider>
      <div style={{ margin: '100px' }}>
        <Actions teamName={'team name'} accountId={'fake-account-id'} />
      </div>
    </CompassTestProvider>
  );
};
