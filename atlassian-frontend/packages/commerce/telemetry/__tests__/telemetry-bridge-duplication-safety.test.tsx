import React, { useEffect } from 'react';

import { render } from '@testing-library/react';

import { createAnalyticsClient } from '@atlassian/commerce-telemetry-clients';

import { InternalCommerceTelemetryIntegrations } from '../src';
import { useGasV3UIEventDispatch } from '../src/common/utils/dispatch-hooks';

const ImmediatelyDispatchEvent = () => {
  const dispatch = useGasV3UIEventDispatch();
  useEffect(() => {
    dispatch({
      action: 'irrelevant',
      actionSubject: 'irrelevant',
      actionSubjectId: 'irrelevant',
    });
  }, [dispatch]);

  return null;
};

it(`Declaring ${InternalCommerceTelemetryIntegrations.name} won't call clients multiple times per dispatched event`, () => {
  render(
    <InternalCommerceTelemetryIntegrations>
      <InternalCommerceTelemetryIntegrations>
        <ImmediatelyDispatchEvent />
      </InternalCommerceTelemetryIntegrations>
    </InternalCommerceTelemetryIntegrations>,
  );
  expect(createAnalyticsClient().sendUIEvent).toBeCalledTimes(1);
});
