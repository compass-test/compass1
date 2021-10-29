import React from 'react';

import { render } from '@testing-library/react';

import { ComponentSyncEventStatus } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ManagedSettings } from './index';

describe('ConfigAsCodeSetup', () => {
  test('renders successfully', () => {
    const testTimestamp = new Date().toISOString();
    const dataManager = {
      ecosystemAppId: '89ae44dd-e7e3-4e4e-b63e-4f83f1b317ed',
      externalSourceURL:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/',
      lastSyncEvent: {
        status: ComponentSyncEventStatus.SUCCESS,
        time: testTimestamp,
      },
    };
    const installedApps = [
      {
        metadata: {
          id: '89ae44dd-e7e3-4e4e-b63e-4f83f1b317ed',
          name: 'test app zzz',
          description: 'test app',
        },
        installation: {
          environmentKey: 'default',
          id: 'test123',
        },
      },
    ];

    const wrapper = render(
      <CompassTestProvider>
        <ManagedSettings
          dataManager={dataManager}
          installedApps={installedApps}
        />
      </CompassTestProvider>,
    );

    expect(wrapper.getByText('compass.yml in test app zzz')).toBeDefined();
    expect(wrapper.getByText('a few seconds ago')).toBeDefined();
  });
});
