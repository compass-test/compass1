import React from 'react';

import styled from '@emotion/styled';
import { LegendItem, LegendLabel } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { FormattedMessage, injectIntl } from 'react-intl';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { fontFamily } from '@atlaskit/theme';
import { N400, N60A } from '@atlaskit/theme/colors';
import { WidthObserver } from '@atlaskit/width-detector';

import { colorSequence as defaultColorSequence } from '../../colors';
import { DEFAULT_CHART_HEIGHT, defaultParameters } from '../../defaults';
import { i18n } from '../../messages';
import { defaultParseNumber, parseTable } from '../../utils';
import LargeErrorIcon from '../icons/LargeErrorIcon';

import { LinearChart } from './LinearChart';
import { PieChart } from './PieChart';
import { Wrapper } from './styled';
import { ChartsProps, ChartTypes, LegendPosition } from './types';
import {
  createColumnNames,
  formatTableData,
  getColData,
  normaliseYSeriesNames,
  extractTableData as parseTableNumbers,
} from './utilities';

export const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.006em;
  line-height: 24px;

  margin: 0px;

  text-align: center;
  font-family: ${fontFamily()};
`;

export const ErrorContainer = styled.div<{ height: number }>`
  text-align: center;
  display: flex;
  flex-direction: column;
  place-content: center;
  height: ${(props) => props.height}px;

  padding-left: 16px;
  padding-right: 16px;
`;

export const Legend = styled.div<{ direction: LegendPosition }>`
  /* background: orange; */

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 11px;
  line-height: 13px;

  justify-content: center;
  /* align-items: center; */

  padding-left: 16px;
  padding-right: 16px;

  .visx-legend-label {
    color: ${N400};
  }

  ${(p) =>
    p.direction === 'left' || p.direction === 'right'
      ? 'max-width: 110px;'
      : ''}
  ${(p) =>
    p.direction === 'bottom' || p.direction === 'right' ? 'order: 2;' : ''}

  ${(
    p,
  ) => (p.direction === 'bottom' ? 'padding-top: 16px;' : '')}
`;

const LegendContent = styled.div<{ direction: LegendPosition }>`
  /* background: lightpink; */

  justify-content: center;
  ${(p) =>
    p.direction === 'top' ||
    p.direction === 'bottom' ||
    p.direction === 'flyout'
      ? 'flex-direction: row;'
      : 'flex-direction: column;'}
  display: flex;
  flex-wrap: wrap;
`;

const ChartArea = styled.div<{ direction: LegendPosition }>`
  /* background: skyblue; */

  display: flex;
  ${(p) =>
    p.direction === 'left' || p.direction === 'right'
      ? 'flex-direction: row;'
      : 'flex-direction: column;'}
`;

export const Chart = injectIntl<ChartsProps>((props) => {
  const DEFAULT_CHART_PROPS = defaultParameters(
    props.data,
    props.intl,
    props.parseNumber || defaultParseNumber,
  );
  const {
    dataTab: DEFAULT_DATA_TAB,
    customizeTab: DEFAULT_CUSTOMIZE_TAB,
  } = DEFAULT_CHART_PROPS.chartGroup;
  const {
    testId,
    chartType = DEFAULT_CHART_PROPS.chartType,
    chartGroup: {
      dataTab: {
        aggregateData: userAggregateData = DEFAULT_DATA_TAB.aggregateData,
        xAxisIdxField,
        yAxisIdxField,
      },
      customizeTab: {
        styleField: {
          height: userHeight = DEFAULT_CUSTOMIZE_TAB.styleField.height,
          smooth: userSmooth,
          showPoints: userShowPoints,
          orientation = DEFAULT_CUSTOMIZE_TAB.styleField.orientation,
          ...maybeColors
        },
        titlesField: { chartTitle, yLabel },
        legendField: {
          legendPosition: userLegendPosition = DEFAULT_CUSTOMIZE_TAB.legendField
            .legendPosition,
          showLegend: userShowLegend,
        },
      } = DEFAULT_CUSTOMIZE_TAB,
    } = DEFAULT_CHART_PROPS.chartGroup,
    animated: userAnimated,
    data: rawData,
    intl,
    parseNumber = defaultParseNumber,
  } = props;

  /* convert some types from stringified storage */
  const height = Number(userHeight) || DEFAULT_CHART_HEIGHT;
  const aggregateData = Boolean(userAggregateData);
  const smooth = Boolean(userSmooth);
  const showLegend = Boolean(userShowLegend);
  const showPoints = Boolean(userShowPoints);

  if (!rawData) {
    return (
      <Wrapper testId={testId}>
        <ErrorContainer height={height}>
          <LargeErrorIcon />
          <h3>
            <FormattedMessage {...i18n.dataMissingTitle}></FormattedMessage>
          </h3>
          <p>
            <FormattedMessage {...i18n.dataMissingDetails}></FormattedMessage>
          </p>
        </ErrorContainer>
      </Wrapper>
    );
  }

  const isPieChart = chartType === ChartTypes.PIE;
  const ChartComponent = isPieChart ? PieChart : LinearChart;

  const table = parseTable(rawData);
  const numericTable = parseTableNumbers(table, parseNumber);
  const seriesOptions = createColumnNames(table, intl);

  const xSeriesKey = xAxisIdxField || '0';

  // filter ensures we're only looking up series keys that exist in the y axis
  const ySeriesKeys = normaliseYSeriesNames(yAxisIdxField).filter(
    (seriesKey) => seriesOptions[Number(seriesKey)],
  );

  // aggregate data
  const tableData = formatTableData(numericTable, xSeriesKey, aggregateData);

  let ySeriesLabels;
  let colorRange: string[];

  // build color ranges from parameters
  if (!isPieChart) {
    ySeriesLabels = ySeriesKeys.map(
      (ySeriesIdx) => seriesOptions[Number(ySeriesIdx)].label,
    );

    colorRange = ySeriesKeys.map(
      (seriesKey, idx) =>
        (maybeColors as any)[
          `color-${isPieChart ? 'pie' : 'linear'}-${seriesKey}`
        ] || defaultColorSequence[idx],
    );
  } else {
    // pie chart labels is based on x series
    ySeriesLabels = getColData(table, Number(xSeriesKey));

    colorRange = ySeriesLabels.map(
      (_, idx) =>
        (maybeColors as any)[`color-${isPieChart ? 'pie' : 'linear'}-${idx}`] ||
        defaultColorSequence[Number(idx)],
    );
  }

  // build the color range from the domain used for legend area
  const ordinalColorScale = scaleOrdinal({
    domain: ySeriesLabels,
    range: colorRange,
  });

  const prefersReducedMotion =
    window && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // was animation explicitly value'd, or does the user prefer reduced motion
  const animated =
    typeof userAnimated === 'boolean' ? userAnimated : !prefersReducedMotion;

  // legend across linear and pie charts
  const [legendFitsOnChart, setLegendFitsOnChart] = React.useState(true);

  let legendPosition: LegendPosition;
  let showLegendArea = showLegend;
  if (userLegendPosition === 'auto') {
    if (chartType === ChartTypes.PIE) {
      legendPosition = 'flyout';
      showLegendArea = !legendFitsOnChart;
    } else {
      // default to top
      legendPosition = 'top';
    }
  } else {
    legendPosition = userLegendPosition;
  }

  // legend for legend area
  const legend = (
    <Legend direction={legendPosition}>
      <LegendContent direction={legendPosition}>
        {ySeriesLabels.map((label, i) => (
          <LegendItem
            key={`legend-${label}-${i}`}
            margin={5}
            alignItems="flex-start"
          >
            <div style={{ marginTop: 0, marginRight: 2 }}>
              <svg width={8} height={8}>
                <circle fill={colorRange[i]} r={3 + 1} cx={4} cy={4} />
                <circle fill={N60A} r={3 + 1} cx={4} cy={4} />
                <circle fill={colorRange[i]} r={3} cx={4} cy={4} />
              </svg>
            </div>
            <LegendLabel align="left" margin="0 0 0 4px">
              {label}
            </LegendLabel>
          </LegendItem>
        ))}
      </LegendContent>
    </Legend>
  );

  const [width, setWidth] = React.useState<number>(0);

  const chartProps = {
    tableData,
    xSeriesName: xSeriesKey,
    ySeriesNames: ySeriesKeys,

    testId,
    chartType,
    data: tableData,
    aggregateData,
    chartTitle,
    showLegend,
    showPoints,
    chartScale: ordinalColorScale,
    legendPosition,
    height,
    width,
    smooth,
    yLabel,
    orientation,
    animated,
    parseNumber,
    colorSequence: colorRange,

    onLayout: setLegendFitsOnChart,
  };

  return (
    <Wrapper testId={testId}>
      <ChartTitle>{chartTitle}</ChartTitle>
      <ChartArea direction={legendPosition}>
        {showLegendArea && legend}
        <div style={{ flex: 1 }}>
          {/* work around https://github.com/airbnb/visx/issues/1014
           * fixed width inside flexbox doesn't work so well when resizing ;) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <WidthObserver setWidth={setWidth} offscreen />
          </div>
          <div style={{ height }}>
            <div style={{ position: 'absolute', height, width }}>
              <ChartComponent {...chartProps} />
            </div>
          </div>
        </div>
      </ChartArea>
    </Wrapper>
  );
});
