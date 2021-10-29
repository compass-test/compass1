import React, { useState } from 'react';

import { graphql, useLazyLoadQuery } from 'react-relay';

import Button from '@atlaskit/button';
import NotificationAllIcon from '@atlaskit/icon/glyph/notification-all';
import Popup from '@atlaskit/popup';

import { toGQLDate } from '../../../common/utils';
import { useMetricPageState } from '../../../common/utils/metric-page-state';
import { usePageParam } from '../../../services/url-query-param';

import type {
  alertsIndicatorQuery,
  alertsIndicatorQueryVariables,
  PageLoadToplineType,
  ToplineAggregation,
} from './__generated__/alertsIndicatorQuery.graphql';
import { AlertListPopup } from './alert-list-popup';

const isToplineAggregation = (value: string): value is ToplineAggregation => {
  if (['p50', 'p75', 'p90'].includes(value)) {
    return true;
  }
  return false;
};

const isPageLoadToplineType = (value: string): value is PageLoadToplineType => {
  if (['FMP', 'TTI'].includes(value)) {
    return true;
  }
  return false;
};

export const AlertsIndicator = () => {
  const [pageState] = useMetricPageState();

  const [environment] = usePageParam('env');
  const [percentile] = usePageParam('percentile');
  const [pageLoadType] = usePageParam('pageLoadType');
  const [cohortType] = usePageParam('cohortType');
  const [focusedCohort] = usePageParam('focusedCohort');
  const [selectedDate] = usePageParam('selectedDate');
  const [topLineType] = usePageParam('topLineType');

  const selectedDateIsoStr = toGQLDate(selectedDate);

  const metricId = pageState.metric?.id;

  if (!isToplineAggregation(percentile)) {
    throw new Error(`invalid percentile param value ${percentile}`);
  }
  if (!isPageLoadToplineType(topLineType)) {
    throw new Error(`invalid topLineType param value ${topLineType}`);
  }

  const variables: alertsIndicatorQueryVariables = {
    metricId: metricId!,
    dateFrom: selectedDateIsoStr,
    dateTo: selectedDateIsoStr,
    env: environment,
    aggregation: percentile,
    toplineType: topLineType,
    pageLoadType,
    cohortType,
    cohortValue: focusedCohort,
  };

  // eslint-disable-next-line relay/generated-flow-types
  const data = useLazyLoadQuery<alertsIndicatorQuery>(
    graphql`
      query alertsIndicatorQuery(
        $metricId: ID!
        $dateFrom: Date!
        $dateTo: Date!
        $env: Environment!
        $aggregation: ToplineAggregation!
        $toplineType: PageLoadToplineType!
        $pageLoadType: PageLoadType!
        $cohortType: CohortType!
        $cohortValue: String!
      ) {
        metric(id: $metricId) {
          alerts(
            dateFrom: $dateFrom
            dateTo: $dateTo
            env: $env
            aggregation: $aggregation
            toplineType: $toplineType
            pageLoadType: $pageLoadType
            cohortType: $cohortType
            cohortValue: $cohortValue
          ) {
            id
            ...alertListPopupFragment
          }
        }
      }
    `,
    variables,
  );

  const [isOpen, setIsOpen] = useState(false);

  if (!data?.metric?.alerts || !data?.metric?.alerts?.length) {
    return null;
  }
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() =>
        data?.metric?.alerts && <AlertListPopup data={data.metric.alerts} />
      }
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isOpen}
          iconBefore={<NotificationAllIcon size="small" label="alerts" />}
          onClick={() => setIsOpen(!isOpen)}
        >
          Alerts ({data?.metric?.alerts?.length})
        </Button>
      )}
    />
  );
};
