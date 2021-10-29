import React, { useMemo } from 'react';

import { scaleLinear } from 'd3-scale';
import sortBy from 'lodash/sortBy';

import * as colors from '@atlaskit/theme/colors';

import { theme } from '../../../common/constants';
import {
  chartWidth,
  itemLabelColumnWidth,
  outerRowHeight,
} from '../../../common/constants/breakdown-chart/waterfall-chart';
import { TimingType } from '../../../common/types';

import { Legend } from './legend';
import { WaterfallRootContainer, WaterfallSvgContainer } from './styled';
import { TimeAxis } from './time-axis';
import { TimingItem } from './timing-item';
import { Props } from './types';

export const WaterfallChart = ({
  data,
  onTimingBarClicked,
  baseDate,
  comparisonDate,
  comparisonType,
  availableCohorts,
  focusedCohort,
  isShowAbsoluteTimingDiff,
  isShowPercentageTimingDiff,
}: Props) => {
  const viewBoxHeight = useMemo(() => (data.length + 2) * outerRowHeight, [
    data.length,
  ]);

  const sortedMetricTimings = useMemo(
    () =>
      sortBy(
        data.filter((m) => m.timingType === TimingType.METRIC),
        ['duration'],
      ),
    [data],
  );

  const sortedAppTimings = useMemo(
    () => data.filter((m) => m.timingType === TimingType.APP),
    [data],
  );

  const sortedTimings = useMemo(
    () => [...sortedMetricTimings, ...sortedAppTimings],
    [sortedAppTimings, sortedMetricTimings],
  );

  const max = useMemo(
    () =>
      sortedTimings.reduce((max, timing) => {
        const finishAt = (timing.startTime ?? 0) + (timing.duration ?? 0);
        const comparisonFinishAt =
          (timing.comparisonStartTime ?? 0) + (timing.comparisonDuration ?? 0);

        const maxFinishAt = Math.max(finishAt, comparisonFinishAt);

        return maxFinishAt > max ? maxFinishAt : max;
      }, 0),
    [sortedTimings],
  );

  const maxBarWidth = chartWidth - itemLabelColumnWidth;
  const scale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max * 1.1])
        .range([0, maxBarWidth]),
    [max, maxBarWidth],
  );

  const mainBarColor = useMemo(
    () =>
      availableCohorts?.find(({ cohort }) => cohort === focusedCohort)?.color ??
      theme.chart.colors[0],
    [availableCohorts, focusedCohort],
  );

  const comparisionColor = colors.N60;

  return (
    <WaterfallRootContainer>
      <WaterfallSvgContainer>
        <svg width={chartWidth} height={viewBoxHeight}>
          <g transform={`translate(${itemLabelColumnWidth}, 0)`}>
            <TimeAxis scale={scale} viewBoxHeight={viewBoxHeight} />
          </g>

          <g transform={`translate(0, ${outerRowHeight})`}>
            {sortedTimings.map((timing, index) => (
              <TimingItem
                key={timing.name}
                timing={timing}
                index={index}
                scale={scale}
                color={
                  timing.level === 0
                    ? mainBarColor
                    : theme.chart.colors[
                        ((timing.level ?? 0) + 2) % theme.chart.colors.length
                      ]
                }
                comparisionColor={comparisionColor}
                onClick={onTimingBarClicked}
                viewBoxWidth={chartWidth}
                baseDate={baseDate}
                comparisonDate={comparisonDate}
                comparisonType={comparisonType}
                isShowAbsoluteTimingDiff={isShowAbsoluteTimingDiff}
                isShowPercentageTimingDiff={isShowPercentageTimingDiff}
              />
            ))}
          </g>
        </svg>
      </WaterfallSvgContainer>
      <Legend
        baseDate={baseDate}
        baseColor={mainBarColor}
        comparisonDate={comparisonDate}
        comparisionColor={comparisionColor}
      />
    </WaterfallRootContainer>
  );
};
