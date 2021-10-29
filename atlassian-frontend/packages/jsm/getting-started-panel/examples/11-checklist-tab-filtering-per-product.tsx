import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { action } from '@storybook/addon-actions';
import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
  useMockCompletedTasks,
} from '../src/common/mocks';
import { mockVisibilityDataAllKeys } from '../src/common/services/visibility/mocks';
import GettingStartedPanel from '../src/ui';
import { ActiveState, Product } from '../src';
import { Environment } from '../src/common/types';

const Example = () => {
  const [properties, setProperties] = useState(mockGspState.properties);
  const visibilityData = mockVisibilityDataAllKeys;
  const [{ completedTasks }, { onTaskComplete }] = useMockCompletedTasks(3);

  const [serviceDeskBaseUrl, setServiceDeskBaseUrl] = useState<
    string | undefined
  >(mockServiceDeskBaseUrl);

  const [opsgenieBaseUrl, setOpsgenieBaseUrl] = useState<string | undefined>(
    mockOpsgenieBaseUrl,
  );

  const onSetProperty = ({
    key,
    value,
  }: {
    key: string;
    value: string | undefined;
  }) => {
    setProperties({
      ...properties,
      user: {
        ...properties.user,
        [key]: value,
      },
    });
  };

  return (
    <AnalyticsListener onEvent={action('Analytics')}>
      <IntlProvider locale="en">
        <>
          <div
            style={{
              paddingBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              width: '320px',
            }}
          >
            <p>Change baseUrl's and projectId:</p>
            <button onClick={() => setOpsgenieBaseUrl(mockOpsgenieBaseUrl)}>
              Set OG Base Url to {mockOpsgenieBaseUrl}
            </button>
            <button onClick={() => setOpsgenieBaseUrl(undefined)}>
              Set OG Base Url to `undefined`
            </button>
            <button
              onClick={() => setServiceDeskBaseUrl(mockServiceDeskBaseUrl)}
            >
              Set JSD Base Url to {mockServiceDeskBaseUrl}
            </button>
            <button onClick={() => setServiceDeskBaseUrl(undefined)}>
              Set JSD Base Url to `undefined`
            </button>
            <button
              onClick={() =>
                onSetProperty({ key: 'projectId', value: '12345' })
              }
            >
              Set JSD project Id to `12345`
            </button>
            <button
              onClick={() =>
                onSetProperty({ key: 'projectId', value: undefined })
              }
            >
              Set JSD project Id to `undefined`
            </button>
          </div>
          <div style={{ height: '800px' }}>
            {properties.user.activeState === ActiveState.On && (
              <GettingStartedPanel
                state={{
                  completedItems: completedTasks,
                  properties: {
                    ...properties,
                    user: { ...properties.user, ...visibilityData.user },
                    workspace: visibilityData.workspace,
                  },
                }}
                serviceDeskBaseUrl={serviceDeskBaseUrl}
                opsgenieBaseUrl={opsgenieBaseUrl}
                product={Product.ServiceDesk}
                onUserActivity={onSetProperty}
                onTaskComplete={onTaskComplete}
                environment={Environment.Local}
                cloudId="some-cloud-id"
              />
            )}
          </div>
        </>
      </IntlProvider>
    </AnalyticsListener>
  );
};

export default Example;
