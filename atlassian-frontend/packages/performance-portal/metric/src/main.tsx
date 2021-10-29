import React, { useCallback } from 'react';

import { Helmet } from 'react-helmet';
import { useRouter } from 'react-resource-router';

import { SendMetricScreenEvent } from '@atlassian/performance-portal-analytics';
import { Loading } from '@atlassian/performance-portal-common';

import {
  GetMetricByEventKeyQuery,
  useGetMetricByEventKeyQuery,
} from './__generated__/graphql';
import { useMetricPageState } from './common/utils/metric-page-state';
import { Metric } from './ui';

export default () => {
  const [routerState] = useRouter();
  const params = routerState.match.params;

  if (params.eventKey == null) {
    return <p>Error - Invalid eventKey</p>;
  }

  const [state, actions] = useMetricPageState();

  const onGetMetricByEventKeyCompleted = useCallback(
    (data: GetMetricByEventKeyQuery) => {
      data?.metricByEventKey && actions.setMetric(data.metricByEventKey);
    },
    [actions],
  );

  const { loading } = useGetMetricByEventKeyQuery({
    variables: {
      eventKey: params.eventKey,
    },
    onCompleted: onGetMetricByEventKeyCompleted,
  });

  if (loading) {
    return <Loading />;
  }

  if (!state.metric) {
    return null;
  }

  const { eventKey, name } = state.metric;

  return (
    <>
      <Helmet title={`Performance Portal - metric - ${name} (${eventKey})`} />
      <Metric />
      {eventKey && <SendMetricScreenEvent eventKey={eventKey} />}
    </>
  );
};
