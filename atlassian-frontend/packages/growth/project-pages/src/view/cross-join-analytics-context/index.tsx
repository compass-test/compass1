import React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import { AccessRequestCapabilityType } from '../../state/confluence/access-request-capabilities/types';
import { Props } from './types';

const CROSS_JOIN_SCENARIOS = [
  {
    type: AccessRequestCapabilityType.DIRECT_ACCESS,
    analyticsName: 'join-product',
  },
  {
    type: AccessRequestCapabilityType.REQUEST_ACCESS,
    analyticsName: 'request-access',
  },
  {
    type: AccessRequestCapabilityType.PENDING_REQUEST_EXISTS,
    analyticsName: 'access-requested',
  },
  {
    type: AccessRequestCapabilityType.DENIED_REQUEST_EXISTS,
    analyticsName: 'access-denied',
  },
  {
    type: AccessRequestCapabilityType.APPROVED_REQUEST_EXISTS,
    analyticsName: 'access-revoked',
  },
  {
    type: AccessRequestCapabilityType.ERROR,
    analyticsName: 'error',
  },
];

const View = ({
  isSpaceConnected,
  confluenceEdition,
  jswEdition,
  accessRequestCapability,
  children,
}: Props) => {
  const crossJoinScenario = CROSS_JOIN_SCENARIOS.find(
    ({ type }) => type === accessRequestCapability,
  )?.analyticsName;

  return (
    <AnalyticsContext
      data={{
        attributes: {
          isSpaceConnected,
          crossJoinScenario,
          confluenceEdition,
          jswEdition,
        },
      }}
    >
      {children}
    </AnalyticsContext>
  );
};

export default View;
