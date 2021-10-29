import React, { FC } from 'react';

import { curveMonotoneX } from '@visx/curve';
import { MarkerArrow, MarkerCircle } from '@visx/marker';
import { Axis, Grid, LineSeries, Tooltip, XYChart } from '@visx/xychart';

import { B400, N300, N50 } from '@atlaskit/theme/colors';

import { TooltipData, TooltipDate } from './styled';
import { LinearChartProps, SearchStats } from './types';

export const AnalyticsChart: FC<LinearChartProps> = ({
  data,
  height,
  width,
}) => {
  const accessors = {
    xAccessor: (d: SearchStats) => d.label,
    yAccessor: (d: SearchStats) => d.value,
  };

  const containsSingleValue = data.length === 1;
  return (
    <div data-testid="analytics-chart">
      <XYChart
        height={height ? height : 300}
        width={width ? width : 500}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <Grid
          columns={false}
          numTicks={3}
          strokeWidth={1.5}
          lineStyle={{ color: '#000' }}
        />
        <MarkerCircle id="marker-circle" fill={`${B400}`} size={4} refX={2} />
        <MarkerArrow id="marker-arrow" fill={`${B400}`} refX={2} size={8} />
        <LineSeries
          dataKey="Line 1"
          data={data}
          {...accessors}
          curve={curveMonotoneX}
          strokeWidth={1.25}
          stroke={`${B400}`}
          markerStart={containsSingleValue ? 'url(#marker-circle)' : undefined}
          markerEnd={containsSingleValue ? undefined : 'url(#marker-arrow)'}
        />
        <Axis
          orientation="left"
          hideTicks
          hideAxisLine
          numTicks={3}
          tickLabelProps={() => ({
            fill: `${N300}`,
            fontSize: 12,
            fontWeight: 400,
            textAnchor: 'end',
          })}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair={!containsSingleValue}
          verticalCrosshairStyle={{
            color: `${N50}`,
            width: 0.5,
            opacity: 0.75,
          }}
          showSeriesGlyphs={!containsSingleValue}
          glyphStyle={{ fill: `${B400}`, stroke: `${B400}`, radius: 4 }}
          renderTooltip={({ tooltipData }) => {
            return (
              <div style={{ width: '90px', height: '54px' }}>
                <TooltipDate>
                  {accessors.xAccessor(
                    tooltipData!.nearestDatum!.datum as SearchStats,
                  )}
                </TooltipDate>
                <TooltipData>
                  {accessors.yAccessor(
                    tooltipData!.nearestDatum!.datum as SearchStats,
                  )}
                </TooltipData>
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
};
