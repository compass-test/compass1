import React from 'react';

import {
  mockServiceDeskBaseUrl,
  mockOpsgenieBaseUrl,
} from '../src/common/mocks';
import { ActiveState, Environment, Product } from '../src/common/types';
import { Lozenge } from '../src';
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
  } = useStorybookMockData();

  return (
    <ControlledWrapper controls={controls}>
      <div className="ops-genie-root" style={{ height: '800px' }}>
        {state.properties.user.activeState === ActiveState.On && (
          <Lozenge
            state={state}
            serviceDeskBaseUrl={mockServiceDeskBaseUrl}
            opsgenieBaseUrl={mockOpsgenieBaseUrl}
            product={Product.ServiceDesk}
            environment={Environment.Staging}
            onUserActivity={onUserActivity}
            cloudId="some-cloud-id"
          />
        )}
      </div>
    </ControlledWrapper>
  );
};

export default Example;
