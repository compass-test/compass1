import React from 'react';

import { N200, N800 } from '@atlaskit/theme/colors';
import {
  getDiffData,
  getLocalisedAbsoluteDiff,
} from '@atlassian/performance-portal-common';

import {
  itemLabelColumnWidth,
  itemLabelHeight,
  outerRowHeight,
  rowMargin,
} from '../../../../../common/constants/breakdown-chart/waterfall-chart';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ChartTimingData } from '../../types';

export interface Props {
  isShowAbsoluteTimingDiff: boolean;
  isShowPercentageTimingDiff: boolean;
  timing: ChartTimingData;
  onClick?: (timingName: string) => void;
}

const timingLabelFormatter = (timingName: string) => {
  if (typeof timingName === 'string') {
    return timingName.split('/').pop();
  }
  return timingName;
};

const timingDiffFormatter = (
  absoluteDiff: Nullable<number>,
  isShowAbsoluteDiff: boolean,
  isShowPercentageDiff: boolean,
  percentageDiffStr: Nullable<string>,
): string =>
  [
    ...(absoluteDiff != null && isShowAbsoluteDiff
      ? [getLocalisedAbsoluteDiff(absoluteDiff, '')]
      : []),
    ...(isShowPercentageDiff ? [percentageDiffStr] : []),
  ].join(' ');

const TimingDiff = ({
  absoluteDiff,
  diffColor,
  isShowAbsoluteDiff,
  isShowPercentageDiff,
  percentageDiffStr,
}: {
  absoluteDiff: Nullable<number>;
  diffColor: string;
  isShowAbsoluteDiff: boolean;
  isShowPercentageDiff: boolean;
  percentageDiffStr: Nullable<string>;
}) => {
  return !isShowAbsoluteDiff && !isShowPercentageDiff ? null : (
    <>
      (
      <tspan fill={diffColor}>
        {timingDiffFormatter(
          absoluteDiff,
          isShowAbsoluteDiff,
          isShowPercentageDiff,
          percentageDiffStr,
        )}
      </tspan>
      )
    </>
  );
};

const ChevronRight = () => (
  <path
    d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z"
    stroke={N800}
  />
);

const ChevronDown = () => (
  <path
    d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
    stroke={N800}
  />
);

export const TimingLabel = (props: Props) => {
  const {
    timing,
    isShowAbsoluteTimingDiff,
    isShowPercentageTimingDiff,
  } = props;

  const {
    absoluteDiff: durationAbsDiff,
    percentageDiffStr: durationDiffStr,
    color: durationDiffColor,
  } = getDiffData(
    timing.duration ?? undefined,
    timing.comparisonDuration ?? undefined,
    'ms',
  );

  const {
    absoluteDiff: startTimeAbsDiff,
    percentageDiffStr: startTimeDiffStr,
    color: startTimeDiffColor,
  } = getDiffData(
    timing.startTime ?? undefined,
    timing.comparisonStartTime ?? undefined,
    'ms',
  );

  const marginX = 4 + 16 * timing.level;
  const chevronIconWidth = 24;

  return (
    <>
      {/* to keep clickable label area*/}
      <rect height={outerRowHeight} width={itemLabelColumnWidth} opacity={0} />
      <g transform={`translate(${marginX}, ${rowMargin})`} fill={N800}>
        {timing.hasSubmetrics && (
          <g>{timing.isExpanded ? <ChevronDown /> : <ChevronRight />}</g>
        )}
        <g
          transform={`translate(${chevronIconWidth}, 0)`}
          stroke="none"
          fill={N800}
        >
          <text
            fontSize={12}
            dominantBaseline="hanging"
            transform={`translate(0, 2)`}
          >
            {timingLabelFormatter(timing.name)}
          </text>
          <g
            transform={`translate(0, ${itemLabelHeight})`}
            fill={N200}
            fontSize={11}
          >
            <text dominantBaseline="text-bottom">
              start at: {timing.startTime}
              {(isShowAbsoluteTimingDiff || isShowPercentageTimingDiff) && ' '}
              <TimingDiff
                absoluteDiff={startTimeAbsDiff}
                diffColor={startTimeDiffColor}
                isShowAbsoluteDiff={isShowAbsoluteTimingDiff}
                isShowPercentageDiff={isShowPercentageTimingDiff}
                percentageDiffStr={startTimeDiffStr}
              />
            </text>

            <text x={(itemLabelColumnWidth - marginX - chevronIconWidth) / 2}>
              duration: {timing.duration}
              {(isShowAbsoluteTimingDiff || isShowPercentageTimingDiff) && ' '}
              <TimingDiff
                absoluteDiff={durationAbsDiff}
                diffColor={durationDiffColor}
                isShowAbsoluteDiff={isShowAbsoluteTimingDiff}
                isShowPercentageDiff={isShowPercentageTimingDiff}
                percentageDiffStr={durationDiffStr}
              />
            </text>
          </g>
        </g>
      </g>
    </>
  );
};
