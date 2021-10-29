import React, { useCallback, useMemo } from 'react';

import subMonths from 'date-fns/subMonths';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { RadioSelect } from '@atlaskit/select';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { useFilters } from '../../../../services/filters';

import { Width } from './styled';
import { getMonthOptions, parseYearMonthString } from './utils';

export const MonthPicker = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const dateOptions = useMemo(
    () => getMonthOptions({ from: subMonths(new Date(), 1) }),
    [],
  );

  const setValue = useCallback(
    ({ value }) => {
      const { year, month } = parseYearMonthString(value);
      actions.setWeeklyEndOfMonthReportSelectedMonth(year, month);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'datePicker',
        source: 'reports',
        attributes: {
          type: 'month',
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [actions, createAnalyticsEvent],
  );

  const defaultValue = dateOptions.find(({ value }) => {
    const { year, month } = parseYearMonthString(value);
    const selectedMonth = state.weeklyEndOfMonthReport.selectedMonth;
    return year === selectedMonth.year && month === selectedMonth.month;
  });

  return (
    <Width>
      <RadioSelect
        defaultValue={defaultValue}
        options={dateOptions}
        placeholder="month"
        spacing={'compact'}
        isSearchable={false}
        onChange={setValue}
      />
    </Width>
  );
};
