import React, { useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';
import { useRouterActions } from 'react-resource-router';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import {
  SearchMetricsSortBy,
  SearchMetricsSortOrder,
  Team,
} from '../../../../__generated__/graphql';
import { METRICS_PAGE_SIZE } from '../../../../common/constants';
import { SearchMetricsSort } from '../../../../services/filters';

import type { metricTableFragment$key } from './__generated__/metricTableFragment.graphql';
import { EventKeyColumn } from './column/event-key';
import { MetricNameColumn } from './column/metric-name';
import { ProductColumn } from './column/product';
import { TableWrapper } from './styled';

interface MetricTableStatelessProps {
  isLoading: boolean;
  onSetPage: (page: number) => void;
  onSort: (sort: SearchMetricsSort) => void;
  page: number;
  data: metricTableFragment$key;
  sortKey?: SearchMetricsSortBy;
  sortOrder?: SearchMetricsSortOrder;
}

export const MetricTable = ({
  isLoading,
  onSetPage,
  onSort,
  page,
  data: dataProps,
  sortKey,
  sortOrder,
}: MetricTableStatelessProps) => {
  const { push } = useRouterActions();
  const callback = useCallback(push, [push]);

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const handleSort = useCallback(
    (data) => {
      onSort({ sortBy: data?.key, sortOrder: data?.sortOrder });
      const analyticsEvent = createAnalyticsEvent({
        action: 'sorted',
        actionSubject: 'catalogTable',
        source: 'catalog',
      });
      sendUIEvent(analyticsEvent);
    },
    [createAnalyticsEvent, onSort],
  );

  const { metrics, totalCount } = useFragment<metricTableFragment$key>(
    graphql`
      fragment metricTableFragment on MetricPaginatedResults {
        metrics {
          id
          owner {
            id
            __typename
            ... on Team {
              teamName
            }
          }
          ... on BrowserMetric {
            eventKey
          }
          ...metricName_metric
          ...eventKey_metric
          ...product_metric
        }
        totalCount
      }
    `,
    dataProps,
  );

  const rows = metrics
    ? metrics.map((metric) => {
        return {
          cells: [
            {
              key: `${SearchMetricsSortBy.NAME}-${metric.id}`,
              content: <MetricNameColumn metric={metric} />,
            },
            {
              key: `${SearchMetricsSortBy.EVENT_KEY}-${metric.id}`,
              content: <EventKeyColumn metric={metric} />,
            },
            {
              key: `${SearchMetricsSortBy.OWNER}-${metric.id}`,
              content: (metric.owner as Team)?.teamName ?? metric.owner?.id,
            },
            {
              key: `${SearchMetricsSortBy.PRODUCT}-${metric.id}`,
              content: <ProductColumn metric={metric} />,
            },
          ],
          onClick: () => {
            callback(`/metric/${metric.eventKey}/?percentile=p90`);
          },
        };
      })
    : [];

  return (
    <TableWrapper>
      <DynamicTableStateless
        head={{
          cells: [
            {
              key: SearchMetricsSortBy.NAME,
              content: 'Metric name',
              isSortable: true,
              width: 800,
            },
            {
              key: SearchMetricsSortBy.EVENT_KEY,
              content: 'Metric key',
              isSortable: true,
              width: 800,
            },
            {
              key: SearchMetricsSortBy.OWNER,
              content: 'Team',
              isSortable: true,
              width: 600,
            },
            {
              key: SearchMetricsSortBy.PRODUCT,
              content: 'Product',
              isSortable: true,
              width: 300,
            },
          ],
        }}
        isFixedSize
        isLoading={isLoading}
        onSetPage={onSetPage}
        onSort={handleSort}
        page={page}
        rows={rows}
        rowsPerPage={METRICS_PAGE_SIZE}
        sortKey={sortKey}
        sortOrder={sortOrder}
        totalRows={totalCount}
      />
    </TableWrapper>
  );
};
