import React from 'react';

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { animated, interpolate, useTransition } from 'react-spring';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { fontFamily, gridSize } from '@atlaskit/theme';
import { N200, N60A, N70A } from '@atlaskit/theme/colors';

import { chartMargin } from './styled';
import { ChartComponentProps, ChartData } from './types';

const labelFontSize = 13;
const labelPadding = gridSize();
const LABEL_SAFE_SPACE = 100;

const fromLeaveTransition = ({ endAngle }: { endAngle: number }) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});

const enterUpdateTransition = (
  { startAngle, endAngle } = { startAngle: 0, endAngle: 360 },
) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type Label<T = any> = { data: T; requestedY: number; height: number };

type Side = 'left' | 'right';

type Group<T = any> = {
  start: number;
  items: Array<T>;
};

const groupHeight = (group: Group) =>
  group.items.reduce((acc, item) => acc + item.height, 0);

const intersectsGroup = (group: Group, pos: number) =>
  pos >= group.start && pos <= group.start + groupHeight(group);

const groupLabels = (labels: Array<Label>): Array<Group> => {
  // important step: sort so that we don't have overlapping elements
  // later in the process (as the groups grow down)
  const sortedLabels = new Array(...labels).sort(
    (a, b) => a.requestedY - b.requestedY,
  );

  const groups: Array<Group> = [];
  let curGroup: Group | null = null;
  sortedLabels.forEach((label) => {
    if (curGroup && intersectsGroup(curGroup, label.requestedY)) {
      curGroup.items.push(label);
    } else {
      curGroup = {
        start: label.requestedY,
        items: [label],
      };

      groups.push(curGroup);
    }
  });

  return groups;
};

const LEGEND_BOX_SIZE = 16;
const LEGEND_BOX_PADDING = 8;

const AnimatedPie = (props: any) => {
  const { arcs, path, getKey, getColor, flyoutLabels } = props;

  const animationSequence: any = {
    from: fromLeaveTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: fromLeaveTransition,
  };

  //@TODO: Clean up typescript issues here.
  const transitions = useTransition(arcs, getKey, animationSequence);

  return (
    <>
      {transitions.map(({ item: arc, props, key }: any, idx) => {
        const [centroidX, centroidY] = path.centroid(arc);
        const hasSpaceForLabel =
          flyoutLabels.length === 0 && arc.endAngle - arc.startAngle >= 0.1;
        const pct = ((arc.endAngle - arc.startAngle) * (180 / Math.PI)) / 360;

        return (
          <g key={`slice-${key}`}>
            <animated.path
              // compute interpolated path d attribute from intermediate angle values
              d={interpolate(
                [props.startAngle, props.endAngle],
                (startAngle, endAngle) =>
                  path({
                    ...arc,
                    startAngle,
                    endAngle,
                  }),
              )}
              fill={getColor(arc)}
              stroke={'#fff'}
              // onClick={() => onClickDatum(arc)}
              // onTouchStart={() => onClickDatum(arc)}
            />
            {hasSpaceForLabel && (
              <animated.g filter="invert(1) grayscale(1) contrast(255)">
                <text
                  fill={getColor(arc)}
                  x={centroidX}
                  y={centroidY}
                  dy=".33em"
                  fontSize={11}
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {pct.toLocaleString(undefined, {
                    style: 'percent',
                  })}
                </text>
              </animated.g>
            )}
          </g>
        );
      })}
      {flyoutLabels}
    </>
  );
};

const margin = {
  top: chartMargin,
  right: chartMargin,
  bottom: chartMargin,
  left: chartMargin,
};

export const PieChart: React.ComponentType<
  ChartComponentProps & { width: number }
> = (props) => {
  const innerWidth = (props.width || 0) - margin.left - margin.right;
  const innerHeight = props.height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a: number, b: number) => b - a;

  const {
    ySeriesNames: seriesNames,
    tableData,
    chartScale,
    xSeriesName,
  } = props;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let useFlyoutLabels = props.legendPosition === 'flyout';

  if (!ctx || innerWidth <= radius * 2 + LABEL_SAFE_SPACE) {
    useFlyoutLabels = false;
  } else {
    ctx.font = `${labelFontSize}px ${fontFamily()}`;
  }

  return (
    <svg width={props.width} height={props.height}>
      <Group top={top} left={left}>
        <Pie
          data={tableData}
          pieValue={(tableData) => Number(tableData[seriesNames[0]])}
          pieSortValues={pieSortValues}
          outerRadius={radius}
        >
          {(pie) => {
            const { arcs, path } = pie;

            const allLabels: Array<Label & { side: Side }> = arcs.map(
              (arc: any, idx: number) => {
                const [, centroidY] = path.centroid(arc);

                return {
                  height: 35,
                  requestedY: centroidY,
                  data: idx,
                  side: arc.startAngle > Math.PI ? 'left' : 'right',
                };
              },
            );

            const labels: { left: Array<Label>; right: Array<Label> } = {
              left: [],
              right: [],
            };

            allLabels.forEach((label) => labels[label.side].push(label));

            const groupedLabels = {
              left: groupLabels(labels.left),
              right: groupLabels(labels.right),
            };

            const flyoutLabels = arcs.map((arc: any, idx: number) => {
              const [centroidX, centroidY] = path.centroid(arc);
              const side = arc.startAngle > Math.PI ? 'left' : 'right';
              const group: Group | undefined = groupedLabels[
                side
              ].find((group) => intersectsGroup(group, centroidY));

              if (!group || !ctx) {
                return null;
              }

              const labelIdx = group.items.findIndex(
                (label) => label.data === idx,
              );
              const offsetY = group.items
                .slice(0, labelIdx)
                .reduce((acc, val) => acc + val.height, 0);

              const lineEndX =
                arc.startAngle > Math.PI
                  ? -innerWidth / 2 + 32
                  : innerWidth / 2 - 32;
              const outsideEdgeX =
                arc.startAngle > Math.PI
                  ? -radius - LEGEND_BOX_SIZE
                  : radius + LEGEND_BOX_SIZE;

              const lineEndY = group.start + offsetY;

              const rectX =
                arc.startAngle > Math.PI
                  ? lineEndX - LEGEND_BOX_SIZE - LEGEND_BOX_PADDING
                  : lineEndX + LEGEND_BOX_PADDING;
              const labelX =
                arc.startAngle > Math.PI
                  ? lineEndX
                  : rectX - LEGEND_BOX_PADDING;

              const pct =
                ((arc.endAngle - arc.startAngle) * (180 / Math.PI)) / 360;

              let label: string = arc.data[xSeriesName];
              let metrics = ctx.measureText(label);

              let allocatedSpace;
              if (arc.startAngle > Math.PI) {
                // left hand size of the pi(e)
                allocatedSpace = -radius - labelX;
              } else {
                // right hand side of the pi(e)
                // allocatedSpace = labelX - diameter;
                allocatedSpace = labelX - radius;
              }

              allocatedSpace -= labelPadding;

              let truncated = false;
              while (metrics.width > allocatedSpace && label.length) {
                truncated = true;
                label = label.slice(0, label.length - 1);
                metrics = ctx.measureText(label + '...');
              }

              if (truncated) {
                if (label.length) {
                  // truncate label
                  label = label + '...';
                } else {
                  label = '...';
                  // if we can't show ..., then we can't show any of the
                  // flyout labels; go back to auto
                  useFlyoutLabels = false;
                  return null;
                }
              }

              return (
                <g key={idx}>
                  {/* line from centroid to label */}
                  <animated.path
                    d={`M ${centroidX},${centroidY} L${outsideEdgeX},${lineEndY} ${lineEndX},${lineEndY}`}
                    stroke={N70A}
                    strokeDasharray="2"
                    fill="none"
                  ></animated.path>

                  {/* legend box */}
                  {chartScale && (
                    <animated.rect
                      x={rectX}
                      y={lineEndY - 16}
                      width={16}
                      height={16}
                      fill={chartScale(arc.data[xSeriesName])}
                      rx={3}
                      ry={3}
                      stroke={N60A}
                    ></animated.rect>
                  )}

                  {/* label */}
                  <text
                    fill="#172B4D"
                    x={labelX}
                    textAnchor={arc.startAngle > Math.PI ? 'start' : 'end'}
                    y={
                      lineEndY - gridSize() / 2 /* move up off the line a bit */
                    }
                    fontSize={labelFontSize}
                    fontFamily={fontFamily()}
                    pointerEvents="none"
                  >
                    {label}
                  </text>

                  {/* value */}
                  <text
                    fill={N200}
                    x={labelX}
                    fontSize={labelFontSize}
                    fontFamily={fontFamily()}
                    textAnchor={arc.startAngle > Math.PI ? 'start' : 'end'}
                    y={lineEndY + labelFontSize}
                  >
                    {pct.toLocaleString(undefined, {
                      style: 'percent',
                    })}
                  </text>
                </g>
              );
            });

            if (props.onLayout) {
              props.onLayout(useFlyoutLabels);
            }

            return (
              <AnimatedPie
                {...pie}
                flyoutLabels={useFlyoutLabels ? flyoutLabels : []}
                getKey={({ data }: { data: ChartData }) => data[xSeriesName]}
                getColor={
                  chartScale
                    ? ({ data }: { data: ChartData }) =>
                        chartScale(data[xSeriesName])
                    : () => '#fff'
                }
              />
            );
          }}
        </Pie>
      </Group>
    </svg>
  );
};
