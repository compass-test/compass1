import React, { useMemo } from 'react';

import memoizeOne from 'memoize-one';
import { Helmet } from 'react-helmet';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'react-resource-router';

import { SendScreenEvent } from '@atlassian/performance-portal-analytics';

import type {
  mainReportsPageQuery,
  Product,
} from './__generated__/mainReportsPageQuery.graphql';
import { FiltersContainer } from './services/filters';
import { Reports } from './ui';
import { sentenceCaseEveryWord } from './utils';
const JIRA_CORE_EXPERIENCE_EVENT_KEYS = [
  'jira.fe.page-load.issue-view',
  'jira.fe.page-load.classic-backlog',
  'jira.fe.page-load.classic-board',
  'jira.fe.page-load.dashboard.filtered',
  'jira.fe.page-load.global-issue-navigator',
  'jira.fe.page-load.global-issue-navigator.detail-view',
  'jira.fe.page-load.global-issue-navigator.list-view',
  'jira.fe.page-load.new-issue-navigator',
  'jira.fe.page-load.next-gen-board',
  'jira.fe.page-load.next-gen-backlog',
  'jira.fe.page-load.jira-home',
];

const analyticsAttributes = memoizeOne((product: string = '') => ({ product }));

const ReportsWrapper = ({ product }: { product: string }) => {
  // TODO: use useQueryLoader in the route level and usePreloadedQuery here
  // eslint-disable-next-line relay/generated-flow-types
  const { searchMetrics } = useLazyLoadQuery<mainReportsPageQuery>(
    graphql`
      query mainReportsPageQuery($product: Product!) {
        searchMetrics(limit: 500, products: [$product]) {
          metrics {
            product
            ... on BrowserMetric {
              eventKey
            }
            ...uiReportsMetricFragment
          }
        }
      }
    `,
    {
      product: product.toUpperCase() as Product,
    },
  );

  const metrics = useMemo(() => {
    let _metrics = searchMetrics?.metrics;

    if (product === 'jira') {
      _metrics = _metrics?.filter(
        (metric) =>
          metric.eventKey &&
          JIRA_CORE_EXPERIENCE_EVENT_KEYS.includes(metric.eventKey),
      );
    }
    return _metrics;
  }, [searchMetrics?.metrics, product]);

  if (!metrics) {
    return null;
  }

  const attributes = analyticsAttributes(product);

  return (
    <FiltersContainer>
      <Reports metrics={metrics} />
      <SendScreenEvent name={'reports'} attributes={attributes} />
    </FiltersContainer>
  );
};

export default () => {
  const [routerState] = useRouter();

  const product = useMemo(
    () => routerState.match.params.product!.toLowerCase(),
    [routerState.match.params.product],
  );

  return (
    <>
      <Helmet
        title={`Performance Portal - reports - ${sentenceCaseEveryWord(
          product,
        )}`}
      />
      {/*
          Note: key props is important so that we get fresh instance of
                Reports Wrapper whenever user choose different product
        */}
      <ReportsWrapper key={product} product={product} />
    </>
  );
};
