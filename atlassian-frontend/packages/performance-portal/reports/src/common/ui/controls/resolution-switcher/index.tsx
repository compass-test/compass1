import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { RadioSelect } from '@atlaskit/select';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useFilters } from '../../../../services/filters';
import {
  DailyResolution,
  MonthlyResolution,
  WeeklyResolution,
} from '../../../constants';

import { Width } from './styled';

const options = [DailyResolution, WeeklyResolution, MonthlyResolution];

export const ResolutionSwitcher = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const setValue = useCallback(
    ({ value }) => {
      actions.setResolutionType(value);
      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'timeResolutionPicker',
        source: 'reports',
        attributes: {
          resolution: value,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [actions, createAnalyticsEvent],
  );

  const defaultValue = options.find(
    ({ value }) => value === state.resolutionType,
  );

  return (
    <Width>
      <RadioSelect
        defaultValue={defaultValue}
        options={options}
        placeholder="resolution"
        spacing={'compact'}
        isSearchable={false}
        onChange={setValue}
      />
    </Width>
  );
};
