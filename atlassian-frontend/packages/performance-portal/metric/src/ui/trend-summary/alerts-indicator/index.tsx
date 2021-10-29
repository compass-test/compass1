import React, { useState } from 'react';

import formatISO from 'date-fns/formatISO';

import Button from '@atlaskit/button';
import NotificationAllIcon from '@atlaskit/icon/glyph/notification-all';
import Popup from '@atlaskit/popup';

import {
  AlertFragment,
  GetMetricAlertsQueryVariables,
  useGetMetricAlertsQuery,
} from '../../../__generated__/graphql';
import {
  useCohortTypeParam,
  useEnvParam,
  useFocusedCohortParam,
  usePageLoadTypeParam,
  usePercentileParam,
  useSelectedDateParam,
  useToplineTypeParam,
} from '../../../common/utils/metric-page-param';
import { useMetricPageState } from '../../../common/utils/metric-page-state';

import { AlertListPopup } from './alert-list-popup';

export const AlertsIndicator = () => {
  const [pageState] = useMetricPageState();

  const [environment] = useEnvParam();
  const [percentile] = usePercentileParam();
  const [pageLoadType] = usePageLoadTypeParam();
  const [cohortType] = useCohortTypeParam();
  const [selectedDate] = useSelectedDateParam();
  const [toplineType] = useToplineTypeParam();
  const [focusedCohort] = useFocusedCohortParam();

  const selectedDateIsoStr = formatISO(selectedDate, {
    representation: 'date',
  });

  const metricId = pageState.metric?.id;

  const variables: GetMetricAlertsQueryVariables = {
    metricId: metricId!,
    dateFrom: selectedDateIsoStr,
    dateTo: selectedDateIsoStr,
    env: environment,
    aggregation: percentile,
    toplineType,
    pageLoadType,
    cohortType,
    cohortValue: focusedCohort,
  };

  const { data } = useGetMetricAlertsQuery({
    variables,
    skip: variables.metricId == null || variables.cohortValue == null,
    pollInterval: 90_000,
  });

  const [isOpen, setIsOpen] = useState(false);

  if (!data?.metric?.alerts || !data?.metric?.alerts?.length) {
    return null;
  }
  const alerts: AlertFragment[] = data.metric.alerts;
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() => <AlertListPopup alerts={alerts} />}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isOpen}
          iconBefore={<NotificationAllIcon size="small" label="alerts" />}
          onClick={() => setIsOpen(!isOpen)}
        >
          Alerts ({alerts.length})
        </Button>
      )}
    />
  );
};
