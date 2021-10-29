import React from 'react';

import {
  mockServiceDeskBaseUrl,
  mockOpsgenieBaseUrl,
} from '../src/common/mocks';
import GettingStartedPanel from '../src/ui';
import { ActiveState, Product } from '../src';
import { Environment } from '../src/common/types';
import { useStorybookMockData } from './utils';

const Example = () => {
  // Storybooks has trouble with the ReportErrors component unless we do this
  // @ts-ignore
  global.__SERVER__ = false;

  const {
    ControlledWrapper,
    controls,
    state,
    onUserActivity,
    onTaskComplete,
  } = useStorybookMockData();

  return (
    <ControlledWrapper controls={controls}>
      <div
        className="ops-genie-root"
        style={{ maxHeight: '90vh', height: '100%', minHeight: 500 }}
      >
        {state.properties.user.activeState === ActiveState.On && (
          <GettingStartedPanel
            state={state}
            serviceDeskBaseUrl={mockServiceDeskBaseUrl}
            opsgenieBaseUrl={mockOpsgenieBaseUrl}
            product={Product.ServiceDesk}
            environment={Environment.Staging}
            onUserActivity={onUserActivity}
            onTaskComplete={onTaskComplete}
            cloudId="some-cloud-id"
          />
        )}
      </div>
    </ControlledWrapper>
  );
};

export default Example;
