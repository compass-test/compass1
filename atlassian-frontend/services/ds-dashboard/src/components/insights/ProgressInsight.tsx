import React from 'react';

import { css } from '@emotion/core';

import { B100, N40, N200, P100 } from '@atlaskit/theme/colors';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Label as ChartLabel,
  PositionType,
  ResponsiveContainer,
} from 'recharts';

import type { Insight, Reference } from '../../types/insights';

import { h400, h200 } from '@atlaskit/theme/typography';
import { gridSize as getGridSize } from '@atlaskit/theme/constants';

/**
 * The library just gives an any type :thonk:
 */
type RechartLabelContentRendererProps = {
  offset: number;
  position?: PositionType;
  viewBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

type ProgressInsightProps = {
  insight: Insight;
};

const gridSize = getGridSize();
const h200Styles = h200();

const labelContainerStyles = css({
  display: 'grid',
  placeItems: 'center',
  height: '100%',
});

const xAxisLabelStyles = css({ marginTop: 2 * gridSize });
const yAxisLabelStyles = css({
  marginTop: 0,
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
});

const getReferenceLineProps = (ref: Reference): ReferenceLine['props'] => {
  const baseProps: ReferenceLine['props'] = {
    stroke: P100,
    strokeWidth: 2,
    ifOverflow: 'extendDomain',
    label: ref.label,
  };
  if ('x' in ref) {
    return { ...baseProps, x: ref.x };
  } else if ('y' in ref) {
    return { ...baseProps, y: ref.y };
  }
  return {};
};

const ProgressInsight = ({ insight }: ProgressInsightProps) => {
  return (
    <ResponsiveContainer aspect={2}>
      <LineChart
        data={insight.data}
        margin={{
          bottom: gridSize * 3,
          left: 0,
          right: gridSize,
          top: gridSize,
        }}
      >
        <CartesianGrid stroke={N40} />
        <XAxis
          dataKey="month"
          stroke={N200}
          tick={{
            ...h200Styles,
            fill: h200Styles.color,
          }}
        >
          <ChartLabel
            content={({
              viewBox,
              offset,
            }: RechartLabelContentRendererProps) => {
              const extendedViewBox = {
                ...viewBox,
                y: viewBox.y + viewBox.height - 2 * offset,
                height: gridSize * 4,
              };
              return (
                <foreignObject {...extendedViewBox}>
                  <div css={labelContainerStyles}>
                    <span css={[h400(), xAxisLabelStyles]}>End of month</span>
                  </div>
                </foreignObject>
              );
            }}
            position="bottom"
          />
        </XAxis>
        <YAxis
          stroke={N200}
          tick={{
            ...h200Styles,
            fill: h200Styles.color,
          }}
        >
          <ChartLabel
            content={({
              viewBox,
              offset,
            }: RechartLabelContentRendererProps) => {
              const extendedViewBox = {
                ...viewBox,
                x: 0,
                width: 2 * gridSize,
              };
              console.log(viewBox, offset);
              return (
                <foreignObject {...extendedViewBox}>
                  <div css={labelContainerStyles}>
                    <span css={[h400(), yAxisLabelStyles]}>Count</span>
                  </div>
                </foreignObject>
              );
            }}
            position="left"
          />
        </YAxis>
        <Line type="monotone" dataKey="count" stroke={B100} strokeWidth={2} />
        <Tooltip />
        {insight?.references?.map((ref) => (
          <ReferenceLine {...getReferenceLineProps(ref)} key={ref.label} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressInsight;
