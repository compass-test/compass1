import React, { useMemo } from 'react';

import {
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  TickFormatterFunction,
  ViewBox,
  XAxis,
  YAxis,
} from 'recharts';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import AtlaskitTooltip from '@atlaskit/tooltip';
import { findSkippedWeekends } from '@atlassian/performance-portal-common';

import { theme } from '../../../common/constants';
import { renderWeekendLine } from '../../../common/ui/skipped-weekend-line';
import {
  useCommonToplineChartProps,
  useToplineChartContext,
} from '../../../common/ui/topline-chart';
import {
  dateTickFormatter,
  formatNumber,
  getPartialDayCohortName,
} from '../../../common/utils';

import { FixedSizeForeignObject } from './styled';
import { Props } from './types';

const SignalIcon = ({
  viewBox,
  tooltipContent,
  children,
}: {
  viewBox: ViewBox;
  tooltipContent: string;
  children: React.ReactNode;
}) => (
  <FixedSizeForeignObject x={viewBox.x && viewBox.x - 12} y={viewBox.y}>
    <AtlaskitTooltip content={tooltipContent}>{children}</AtlaskitTooltip>
  </FixedSizeForeignObject>
);
const renderWarningIcon = ({
  viewBox,
  value,
}: {
  viewBox: ViewBox;
  value: string;
}) => {
  return (
    <SignalIcon viewBox={viewBox} tooltipContent={value}>
      <EditorWarningIcon label="" primaryColor={theme.text.red} />
    </SignalIcon>
  );
};

const renderCheckCircleIcon = ({
  viewBox,
  value,
}: {
  viewBox: ViewBox;
  value: string;
}) => {
  return (
    <SignalIcon viewBox={viewBox} tooltipContent={value}>
      <CheckCircleIcon label="" primaryColor={theme.text.green} />
    </SignalIcon>
  );
};

const metricTickFormatter: TickFormatterFunction = (value) => {
  return formatNumber(value);
};

const toStartOfDayUtc = (isoString: string) => {
  const date = new Date(isoString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  ).toISOString();
};

const roundToClosestHundredMillis = (x: number) => {
  return Math.round(x / 100) * 100;
};

export const TrendChart = ({
  data,
  availableCohorts,
  goals,
  hotEvents,
  label,
  width = '100%',
  height = 300,
}: Props) => {
  const skippedWeekends = useMemo(
    () => findSkippedWeekends(data?.map(({ dateTime }) => dateTime)),
    [data],
  );

  // shifts all events to beginning of day to as Topline chart is on daily basis
  const dailyHotEvents = useMemo(
    () =>
      hotEvents?.map(({ startAt, endAt, ...rest }) => ({
        ...rest,
        startAt: startAt && toStartOfDayUtc(startAt),
        endAt: endAt && toStartOfDayUtc(endAt),
      })),
    [hotEvents],
  );

  const [goalMin, goalMax] = useMemo(() => {
    const goalValues = goals?.map((g) => g.value);
    if (!goalValues) {
      return [null, null];
    }
    return [Math.min(...goalValues), Math.max(...goalValues)];
  }, [goals]);

  const { selectedDateTime, hoveredDateTime } = useToplineChartContext();

  const {
    onContainerClick,
    onContainerMouseMove,
    onContainerMouseOut,
    renderLineDot,
  } = useCommonToplineChartProps({
    data,
    availableCohorts,
    hotEvents: dailyHotEvents,
    valueUnit: 'ms',
  });

  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart
        onClick={onContainerClick}
        onMouseMove={onContainerMouseMove}
        onMouseOut={onContainerMouseOut}
        data={data}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="dateTime"
          scale="point"
          tickFormatter={dateTickFormatter}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="number"
          label={{
            value: label,
            angle: -90,
            position: 'insideLeft',
          }}
          tickFormatter={metricTickFormatter}
          tickLine={false}
          axisLine={false}
          domain={[
            (dataMin) =>
              roundToClosestHundredMillis(
                (goalMin ? Math.min(dataMin, goalMin) : dataMin) * 0.9,
              ),
            (dataMax) =>
              roundToClosestHundredMillis(
                (goalMax ? Math.max(dataMax, goalMax) : dataMax) * 1.1,
              ),
          ]}
        />
        {skippedWeekends?.map(([friday, monday]) => (
          <ReferenceArea
            key={`${friday}:${monday}`}
            x1={friday}
            x2={monday}
            shape={renderWeekendLine}
          />
        ))}
        {selectedDateTime && (
          <ReferenceLine x={selectedDateTime} strokeWidth={1} isFront={false} />
        )}
        {hoveredDateTime && (
          <ReferenceLine x={hoveredDateTime} strokeWidth={1} isFront={false} />
        )}
        {goals &&
          goals.map((goal) => (
            <ReferenceLine
              key={`${goal.name}`}
              y={goal.value}
              isFront={true}
              stroke={theme.goal}
              strokeWidth={1}
              strokeDasharray="8 10"
            >
              {goal.name && (
                <Label
                  value={`goal ${goal.name}`}
                  position={'center'}
                  fill={theme.goal}
                />
              )}
            </ReferenceLine>
          ))}
        {dailyHotEvents &&
          dailyHotEvents.map((hot) => {
            if (!hot.startAt) {
              return null;
            }
            return (
              <ReferenceLine
                key={`event_${hot.issueId}_${hot.startAt}`}
                x={hot.startAt}
                strokeWidth={0}
                isFront={true}
              >
                <Label
                  value={`${hot.issueId} ${hot.name}`}
                  position="top"
                  content={renderWarningIcon}
                />
              </ReferenceLine>
            );
          })}
        {dailyHotEvents &&
          dailyHotEvents.map((hot) => {
            if (!hot.endAt) {
              return null;
            }
            return (
              <ReferenceLine
                key={`event_${hot.issueId}_${hot.endAt}`}
                x={hot.endAt}
                strokeWidth={0}
                isFront={true}
              >
                <Label
                  value={`Resolved: ${hot.issueId} ${hot.name}`}
                  position="top"
                  content={renderCheckCircleIcon}
                />
              </ReferenceLine>
            );
          })}
        {availableCohorts.map(({ cohort, color }) => (
          <Line
            key={cohort}
            dataKey={`values.${cohort}.value`}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            dot={renderLineDot}
          />
        ))}
        {availableCohorts.map(({ cohort, color }) => (
          <Line
            key={`${cohort}Today`}
            dataKey={`values.${getPartialDayCohortName(cohort)}.value`}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={renderLineDot}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
