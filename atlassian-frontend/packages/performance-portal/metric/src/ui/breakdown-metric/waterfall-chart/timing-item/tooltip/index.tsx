import React, { useMemo } from 'react';

import { ScaleLinear } from 'd3-scale';

import { getDiffData } from '@atlassian/performance-portal-common';

import { ComparisonType } from '../../../../../common/types';
import { ChartTooltip } from '../../../../../common/ui/chart-tooltip';
import { formatNumber, toISODateString } from '../../../../../common/utils';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ChartTimingData } from '../../types';

import { Diff, LegendColorContainer, NumberContent } from './styled';

export interface Props {
  timing: ChartTimingData;
  scale: ScaleLinear<number, number>;
  color: string;
  index: number;
  viewBoxWidth: number;
  onClick?: (timingName: string) => void;
  baseDate: Date;
  comparisonDate: Date;
  comparisonType: ComparisonType;
  comparisionColor: string;
}

const LegendColor = ({ color }: { color: string }) => {
  const rectSize = 12;
  return (
    <LegendColorContainer>
      <svg width={rectSize} height={rectSize}>
        <circle
          fill={color}
          stroke={color}
          cx={rectSize / 2}
          cy={rectSize / 2}
          r={rectSize / 2}
        />
      </svg>
    </LegendColorContainer>
  );
};

const ComparisonRow = ({
  label,
  baseValue,
  comparisonValue,
  unit = 'ms',
  useColor = true,
}: {
  label: string;
  baseValue?: number | null;
  comparisonValue?: number | null;
  unit?: string;
  useColor?: boolean;
}) => {
  const { percentageDiffStr, absoluteDiffStr, color } = useMemo(
    () =>
      getDiffData(baseValue ?? undefined, comparisonValue ?? undefined, unit),
    [baseValue, comparisonValue, unit],
  );
  return (
    <tr>
      <td>{label}</td>
      <td>
        <NumberContent>
          {baseValue != null ? formatNumber(baseValue) : null}
          {` ${unit}`}
        </NumberContent>
      </td>
      <td>
        <NumberContent>
          {comparisonValue != null ? formatNumber(comparisonValue) : null}
          {` ${unit}`}
        </NumberContent>
      </td>
      <td>
        <NumberContent>
          {useColor ? (
            <Diff color={color}>{absoluteDiffStr}</Diff>
          ) : (
            absoluteDiffStr
          )}
        </NumberContent>
      </td>
      <td>
        <NumberContent>
          {useColor ? (
            <Diff color={color}>{percentageDiffStr}</Diff>
          ) : (
            percentageDiffStr
          )}
        </NumberContent>
      </td>
    </tr>
  );
};

export const Tooltip = (props: Props) => {
  const { timing, color, comparisionColor, baseDate, comparisonDate } = props;

  return (
    <ChartTooltip highlightedContent={<b>{timing.name}</b>}>
      <table>
        <thead>
          <tr>
            <th />
            <th>
              <LegendColor color={color} />
              {toISODateString(baseDate)}
            </th>
            <th>
              <LegendColor color={comparisionColor} />
              {toISODateString(comparisonDate)}
            </th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {timing.startTime != null && (
            <ComparisonRow
              label="Start At"
              baseValue={timing.startTime}
              comparisonValue={timing.comparisonStartTime}
            />
          )}
          {timing.duration != null && (
            <ComparisonRow
              label="Duration"
              baseValue={timing.duration}
              comparisonValue={timing.comparisonDuration}
            />
          )}
          {timing.count != null && (
            <ComparisonRow
              label="Volume"
              baseValue={timing.count}
              comparisonValue={timing.comparisonCount}
              unit=""
              useColor={false}
            />
          )}
        </tbody>
      </table>
    </ChartTooltip>
  );
};
