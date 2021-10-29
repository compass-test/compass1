import React, { useCallback } from 'react';

import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '@atlaskit/dropdown-menu';

import { ToplineMetrics } from '../../../common/types';

interface Props {
  metrics: { [key: string]: boolean };
  setMetrics: (metrics: { [key: string]: boolean }) => void;
}

export const MetricsControl = ({ metrics, setMetrics }: Props) => {
  const handleMetricsChange = useCallback(
    (metric: ToplineMetrics) => () => {
      setMetrics({
        ...metrics,
        [metric]: !metrics[metric],
      });
    },
    [setMetrics, metrics],
  );

  return (
    <DropdownMenu trigger="Metrics" triggerType="button">
      <DropdownItemGroupCheckbox id="metrics">
        {Object.values(ToplineMetrics).map((metric) => (
          <DropdownItemCheckbox
            id={metric}
            key={metric}
            isSelected={metrics[metric]}
            onClick={handleMetricsChange(metric)}
          >
            {metric}
          </DropdownItemCheckbox>
        ))}
      </DropdownItemGroupCheckbox>
    </DropdownMenu>
  );
};
