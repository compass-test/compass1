import React from 'react';

import { useRelayResource } from '@atlassian/performance-portal-relay-utils';

import { metricResource } from './services/resources';
import { MetricPage } from './ui';

export default () => {
  const queryRef = useRelayResource(metricResource);

  if (!queryRef) {
    return null;
  }

  return <MetricPage queryRef={queryRef} />;
};
