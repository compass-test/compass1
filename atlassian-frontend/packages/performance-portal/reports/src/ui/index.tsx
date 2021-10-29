import React from 'react';

import { graphql, useFragment } from 'react-relay';

import { MonthlyResolution, WeeklyResolution } from '../common/constants';
import { useFilters } from '../services/filters';

import type { uiReportsMetricFragment$key } from './__generated__/uiReportsMetricFragment.graphql';
import { DailyReport } from './daily';
import { WeeklyReport } from './weekly';
import { WeeklyEndOfMonth } from './weekly-end-of-month';

export const Reports = (props: { metrics: uiReportsMetricFragment$key }) => {
  const [filtersState] = useFilters();

  const metrics = useFragment<uiReportsMetricFragment$key>(
    graphql`
      fragment uiReportsMetricFragment on Metric @relay(plural: true) {
        ...dailyReportFragment
        ...weeklyReportFragment
        ...weeklyEndOfMonthReportFragment
      }
    `,
    props.metrics,
  );

  if (filtersState.resolutionType === WeeklyResolution.value) {
    return <WeeklyReport metrics={metrics} />;
  }

  if (filtersState.resolutionType === MonthlyResolution.value) {
    return <WeeklyEndOfMonth metrics={metrics} />;
  }

  return <DailyReport metrics={metrics} />;
};
