//TODO: Remove this eslint-disable when we migrate the child components to relay
/* eslint-disable relay/unused-fields*/
import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { SendMetricScreenEvent } from '@atlassian/performance-portal-analytics';

import { useMetricPageState } from '../../common/utils/metric-page-state';
import { PageParamContainer } from '../../services/url-query-param';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { Metric } from '../metric';

import type { metricPageQuery } from './__generated__/metricPageQuery.graphql';

type Props = {
  queryRef: PreloadedQuery<metricPageQuery>;
};

export const MetricPage = (props: Props) => {
  const [state, actions] = useMetricPageState();

  const { metricByEventKey } = usePreloadedQuery<metricPageQuery>(
    graphql`
      query metricPageQuery(
        $eventKey: String!
        $env: Environment!
        $baseDate: Date!
        $comparisonDate: Date!
        $breakdownAggregation: BreakdownAggregation!
        $pageLoadType: PageLoadType!
        $cohortType: CohortType
        $focusedCohort: String
      ) {
        metricByEventKey(eventKey: $eventKey) {
          __typename
          id
          name
          product
          key
          owner {
            __typename
            ... on Staff {
              id
              fullName
            }
            ... on Team {
              id
              teamName
            }
          }
          slackChannel
          ... on BrowserMetric {
            eventType
            eventKey
          }
          ...metricFragment
        }
      }
    `,
    props.queryRef,
  );

  useEffect(() => {
    metricByEventKey && actions.setMetric(metricByEventKey);
  }, [actions, metricByEventKey]);

  if (!state.metric) {
    return null;
  }

  const { eventKey, name } = state.metric;

  return (
    <>
      <Helmet title={`Performance Portal - metric - ${name} (${eventKey})`} />
      <PageParamContainer>
        {metricByEventKey && <Metric data={metricByEventKey} />}
      </PageParamContainer>
      {eventKey && <SendMetricScreenEvent eventKey={eventKey} />}
    </>
  );
};
