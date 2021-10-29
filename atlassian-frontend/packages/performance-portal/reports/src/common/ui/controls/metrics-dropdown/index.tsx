import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '@atlaskit/dropdown-menu';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useFilters } from '../../../../services/filters';
import { MetricsOptions } from '../../../types';

type Option = { label: string; value: MetricsOptions };

const options: Option[] = [
  { label: 'FMP', value: MetricsOptions.FMP },
  { label: 'TTI', value: MetricsOptions.TTI },
  { label: 'Transition ratio', value: MetricsOptions.SPATransitionRatio },
];

export const MetricsDropdown = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  return (
    <DropdownMenu trigger="visible metrics" triggerType="button">
      <DropdownItemGroupCheckbox id="visible-metrics">
        {options.map((option) => (
          <DropdownItemCheckbox
            id={option.value}
            key={option.value}
            isSelected={state.visibleMetrics[option.value]}
            onClick={() => {
              actions.setVisibleMetric(
                option.value,
                !state.visibleMetrics[option.value],
              );

              const analyticsEvent = createAnalyticsEvent({
                action: 'clicked',
                actionSubject: 'visibleMetricsPicker',
                source: 'reports',
                attributes: {
                  metric: option.value,
                },
              });
              sendUIEvent(analyticsEvent);
            }}
          >
            {option.label}
          </DropdownItemCheckbox>
        ))}
      </DropdownItemGroupCheckbox>
    </DropdownMenu>
  );
};
