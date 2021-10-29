import React, { useCallback, useMemo } from 'react';

import subWeeks from 'date-fns/subWeeks';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { RadioSelect } from '@atlaskit/select';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { useFilters } from '../../../../services/filters';

import { Width } from './styled';
import { getWeekOptions, Option, parseYearWeekNoString } from './utils';

export const WeekPicker = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const optionGroups = useMemo(
    () =>
      getWeekOptions({
        from: subWeeks(new Date(), 1),
        noOfWeeks: 25,
      }),
    [],
  );

  const setValue = useCallback(
    ({ value }) => {
      const { year, weekNo } = parseYearWeekNoString(value);
      actions.setWeeklyReportSelectedWeek(year, weekNo);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'datePicker',
        source: 'reports',
        attributes: {
          type: 'week',
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [actions, createAnalyticsEvent],
  );

  const defaultValue = useMemo(
    () =>
      optionGroups.reduce((defaultOption, group) => {
        const { options } = group;
        const optionFoundInGroup = options.find(({ value }) => {
          const { year, weekNo } = parseYearWeekNoString(value);

          const selectedWeek = state.weeklyReport.selectedWeek;

          return selectedWeek.year === year && selectedWeek.weekNo === weekNo;
        });
        if (optionFoundInGroup) {
          defaultOption = optionFoundInGroup;
        }
        return defaultOption;
      }, {}) as Option,
    [optionGroups, state.weeklyReport.selectedWeek],
  );

  return (
    <Width>
      <RadioSelect
        defaultValue={defaultValue}
        options={optionGroups}
        placeholder="week"
        spacing={'compact'}
        isSearchable={false}
        onChange={setValue}
      />
    </Width>
  );
};
