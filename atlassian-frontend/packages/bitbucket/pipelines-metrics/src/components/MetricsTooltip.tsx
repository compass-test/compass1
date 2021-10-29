import React from 'react';

import { Limits } from '../types';

import { TooltipItem, TooltipWrapper } from './styled';

export type Props = {
  active?: boolean;
  payload?: { payload: { timestamp: string; values: any } }[];
  chartType: 'Memory' | 'CPU';
  unit?: string;
  limits: Limits;
  visibleMetrics: { [key: string]: boolean };
};

const MetricsTooltip: React.FC<Props> = ({
  active,
  chartType,
  payload,
  unit,
  limits,
  visibleMetrics,
}) => {
  if (!active || !payload) {
    return null;
  }
  const visibleLimit = Object.keys(limits).reduce(
    (reducer, key) => reducer + (visibleMetrics[key] ? limits[key] : 0),
    0,
  );
  const data = payload[0].payload;
  return (
    <TooltipWrapper>
      {limits ? (
        <TooltipItem>{`${chartType} limit: ${visibleLimit} ${unit}`}</TooltipItem>
      ) : null}
      {data.timestamp ? (
        <TooltipItem>{`timestamp: ${payload[0].payload.timestamp}`}</TooltipItem>
      ) : null}
      {Object.keys(data.values).map((key, index) => {
        if (!visibleMetrics[key] || Number.isNaN(data.values[key])) {
          return null;
        }
        return (
          <TooltipItem key={`metric_tooltip_${index}`}>
            {key}:{' '}
            <strong>
              {(Number(data.values[key]) * limits[key]).toFixed()}/{limits[key]}{' '}
              {unit}
            </strong>
          </TooltipItem>
        );
      })}
    </TooltipWrapper>
  );
};

export default React.memo(MetricsTooltip);
