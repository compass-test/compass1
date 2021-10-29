import React, { ReactElement } from 'react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { LastDeployed } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const event = {
  displayName: '#32',
  url: 'https://atlassian.com',
  lastUpdated: new Date().toISOString(),
  environment: {
    displayName: 'Production',
  },
};

export const LastDeployedExample = () => (
  <div style={{ marginTop: '24px' }}>
    <LastDeployed
      deploymentEvent={event}
      componentType={CompassComponentType.SERVICE}
    />
  </div>
);
