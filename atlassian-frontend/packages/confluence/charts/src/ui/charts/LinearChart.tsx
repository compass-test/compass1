import React from 'react';

import styled from '@emotion/styled';
import { curveCardinal, curveLinear } from '@visx/curve';
import { Marker } from '@visx/marker';
import {
  AnimatedAxis,
  AnimatedBarGroup,
  AnimatedBarSeries,
  AnimatedGrid,
  AnimatedLineSeries,
  Axis,
  BarGroup,
  BarSeries,
  buildChartTheme,
  Grid,
  LineSeries,
  XYChart,
} from '@visx/xychart';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { fontFamily } from '@atlaskit/theme';
import { N40, N400, N60A, N900 } from '@atlaskit/theme/colors';

import { chartMargin } from './styled';
import { ChartComponentProps, ChartData, ChartTypes } from './types';

const scaleWidth = 32;

/* todo: good candidate for memoization if perf is an issue */
const truncate = (label: string | number | undefined, area: number) => {
  if (!label) {
    return label;
  }

  /* should be freeable once we leave this func */
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    // fallback to truncating at 13 characters
    if (label.toString().length > 13) {
      return label.toString().slice(0, 13 - 3) + '…';
    } else {
      return label;
    }
  }

  ctx.font = `11px ${fontFamily()}`;

  let curLabel = label.toString();
  let truncCount = curLabel.length - 1;
  while (ctx.measureText(curLabel).width > area) {
    truncCount--;
    curLabel = label.toString().slice(0, truncCount) + '…';

    if (truncCount === 0) {
      break;
    }
  }

  return curLabel;
};

const StyledChart = styled.div`
  .visx-bar {
    outline-color: ${N60A};
    outline-style: solid;
    outline-width: 1px;
    outline-offset: -1px;
  }

  .marker-circle circle {
    outline-color: ${N60A};
    outline-style: solid;
    outline-width: 1px;
    outline-offset: -1px;
  }
`;

export const CircleWithOutline = ({
  id,
  size,
  strokeWidth = 1,
  fill,
  border,
}: {
  id: string;
  size: number;
  strokeWidth?: number;
  fill: string;
  border: number;
}) => {
  const diameter = size * 2;
  const bounds = diameter + strokeWidth;
  const mid = bounds / 2;
  return (
    <Marker
      id={id}
      markerWidth={bounds}
      markerHeight={bounds}
      refX={2}
      refY={mid}
      orient="auto-start-reverse"
      markerUnits="strokeWidth"
      strokeWidth={strokeWidth}
      fill={fill}
    >
      <circle r={size + border} fill={fill} cx={mid} cy={mid} />
      <circle r={size + border} fill={N60A} cx={mid} cy={mid} />
      <circle r={size} cx={mid} cy={mid} />
    </Marker>
  );
};

const LineComponent = (props: {
  ySeriesNames: string[];
  tableData: ChartData[];
  xSeriesName: string;
  showPoints?: boolean;
  smooth?: boolean;
  invertAxes: boolean;
  animated: boolean;
  colorSequence?: string[];
  spaceForLabel: number;
}) => {
  const SeriesComponent = props.animated ? AnimatedLineSeries : LineSeries;

  return (
    <>
      {props.ySeriesNames.map((seriesName, idx) => {
        const xAccessor = (data: ChartData) =>
          truncate(data[props.xSeriesName], props.spaceForLabel);
        const yAccessor = (data: ChartData) => data[seriesName];

        return (
          <React.Fragment key={`line-${idx}`}>
            {props.showPoints && props.colorSequence && (
              <CircleWithOutline
                id={`marker-circle-${idx}`}
                fill={props.colorSequence[idx]}
                size={1.5}
                border={0.5}
              />
            )}
            <SeriesComponent
              dataKey={`${seriesName}-${idx}`}
              data={props.tableData}
              xAccessor={props.invertAxes ? yAccessor : xAccessor}
              yAccessor={props.invertAxes ? xAccessor : yAccessor}
              markerMid={`url(#marker-circle-${idx}`}
              markerStart={`url(#marker-circle-${idx}`}
              markerEnd={`url(#marker-circle-${idx}`}
              curve={props.smooth ? curveCardinal : curveLinear}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

const BarComponent = (props: {
  ySeriesNames: string[];
  tableData: ChartData[];
  xAxisSeriesName: string;
  invertAxes: boolean;
  animated: boolean;
  spaceForLabel: number;
}) => {
  const BarGroupComponent = props.animated ? AnimatedBarGroup : BarGroup;
  const BarSeriesComponent = props.animated ? AnimatedBarSeries : BarSeries;

  return (
    <BarGroupComponent>
      {props.ySeriesNames.map((seriesName, idx) => {
        const xAccessor = (data: ChartData) =>
          truncate(data[props.xAxisSeriesName], props.spaceForLabel);
        const yAccessor = (data: ChartData) => data[seriesName];

        return (
          <BarSeriesComponent
            key={`${seriesName}-${idx}`}
            dataKey={seriesName}
            data={props.tableData}
            xAccessor={props.invertAxes ? yAccessor : xAccessor}
            yAccessor={props.invertAxes ? xAccessor : yAccessor}
          />
        );
      })}
    </BarGroupComponent>
  );
};

export const LinearChart = (props: ChartComponentProps) => {
  const {
    ySeriesNames,
    tableData,
    xSeriesName,
    showPoints,
    smooth,
    orientation,
    colorSequence,
    xLabel,
  } = props;

  const useYScale = !!props.yLabel;
  const useXScale = !!props.xLabel;
  const xAxisOrientation = orientation === 'horizontal' ? 'left' : 'bottom';
  const yAxisOrientation = orientation === 'horizontal' ? 'bottom' : 'left';

  const leftMarginHorizontal = scaleWidth + (useXScale ? scaleWidth : 0);
  const leftMarginVertical = useYScale ? scaleWidth + scaleWidth : 0;

  const AxisComponent = props.animated ? AnimatedAxis : Axis;
  const GridComponent = props.animated ? AnimatedGrid : Grid;

  const margin = {
    top: chartMargin,
    left:
      chartMargin +
      (orientation === 'vertical' ? leftMarginVertical : 0) +
      (orientation === 'horizontal' ? leftMarginHorizontal : 0),
    right: chartMargin + (orientation === 'horizontal' ? chartMargin : 0),
    bottom: chartMargin,
  };

  const xScale = {
    type:
      orientation === 'horizontal' ? ('linear' as const) : ('band' as const),
    paddingInner: 0.3,
  };

  const yScale = {
    type:
      orientation === 'horizontal' ? ('band' as const) : ('linear' as const),
    paddingInner: 0.3,
  };

  const customTheme = colorSequence
    ? buildChartTheme({
        backgroundColor: '#ffffff',
        gridColor: N40,
        gridColorDark: N400,
        tickLength: 4,
        colors: colorSequence,
      })
    : undefined;

  const spacePerLabel =
    orientation === 'vertical'
      ? props.width / (ySeriesNames.length * 2)
      : scaleWidth + 8;

  return (
    <StyledChart>
      <XYChart
        theme={customTheme}
        xScale={xScale}
        yScale={yScale}
        height={props.height}
        key={`chart`}
        margin={margin}
        width={props.width}
      >
        <GridComponent
          rows={orientation === 'vertical'}
          columns={orientation === 'horizontal'}
          animationTrajectory={'center'}
          numTicks={5}
        />
        {props.chartType === ChartTypes.LINE ? (
          <LineComponent
            key="chart"
            ySeriesNames={ySeriesNames}
            tableData={tableData}
            xSeriesName={xSeriesName}
            showPoints={showPoints}
            smooth={smooth}
            invertAxes={orientation === 'horizontal'}
            animated={props.animated}
            colorSequence={colorSequence}
            spaceForLabel={spacePerLabel}
          />
        ) : (
          <BarComponent
            key="chart"
            ySeriesNames={ySeriesNames}
            tableData={tableData}
            xAxisSeriesName={xSeriesName}
            invertAxes={orientation === 'horizontal'}
            animated={props.animated}
            spaceForLabel={spacePerLabel}
          />
        )}
        <AxisComponent
          key={`x-axis ${xAxisOrientation}`}
          orientation={xAxisOrientation}
          numTicks={6}
          label={xLabel}
          strokeWidth={0}
          labelOffset={
            xAxisOrientation === 'left' ? margin.left / 1.67 : margin.bottom / 2
          }
          labelProps={{
            fontFamily: fontFamily(),
            color: N900,
            textAnchor: 'middle',
          }}
          tickLabelProps={() =>
            ({
              fontFamily: fontFamily(),
              color: N900,
            } as any)
          }
        />
        {useYScale && (
          <AxisComponent
            key={`y-axis ${yAxisOrientation}`}
            label={props.yLabel}
            orientation={yAxisOrientation}
            numTicks={5}
            strokeWidth={0}
            labelOffset={
              yAxisOrientation === 'bottom'
                ? margin.bottom / 2
                : margin.left / 1.67
            }
            labelProps={{
              fontFamily: fontFamily(),
              color: N900,
              textAnchor: 'middle',
            }}
          />
        )}
      </XYChart>
    </StyledChart>
  );
};
