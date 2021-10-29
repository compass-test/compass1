import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { RadioSelect } from '@atlaskit/select';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import { Percentile } from '@atlassian/performance-portal-common';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useFilters } from '../../../../services/filters';
import { selectStyles } from '../../../utils/select-styles';

import { Width } from './styled';

type Option = { label: string; value: Percentile };

const options: Option[] = [
  { label: 'p50', value: Percentile.p50 },
  { label: 'p75', value: Percentile.p75 },
  { label: 'p90', value: Percentile.p90 },
];

export const PercentilePicker = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const setValue = useCallback(
    ({ value }) => {
      actions.setPercentile(value);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'percentilePicker',
        source: 'reports',
        attributes: {
          percentile: value,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [actions, createAnalyticsEvent],
  );

  const value = options.find(({ value }) => value === state.percentile);

  return (
    <Width>
      <RadioSelect
        options={options}
        placeholder="percentile"
        spacing={'compact'}
        isSearchable={false}
        onChange={setValue}
        styles={selectStyles}
        value={value}
      />
    </Width>
  );
};
