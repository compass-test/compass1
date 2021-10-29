import React, { useCallback, useMemo, useState } from 'react';

import {
  CartesianGrid,
  DotProps,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ButtonGroup } from '@atlaskit/button';
import Button from '@atlaskit/button/custom-theme-button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import CheckboxIndeterminateIcon from '@atlaskit/icon/glyph/checkbox-indeterminate';
import ErrorIcon from '@atlaskit/icon/glyph/jira/failed-build-status';
import MoreIcon from '@atlaskit/icon/glyph/more';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import * as colors from '@atlaskit/theme/colors';

import { ContainerState, ContainerStates, Limits, Metric } from '../types';
import parseMetrics from '../utils/parseMetrics';
import toPercent from '../utils/toPercent';

import MetricsTooltip from './MetricsTooltip';
import {
  ContainerStateWrapper,
  Header,
  MetricsChartWrapper,
  themeAreaColors,
  themeMetricButton,
  Wrapper,
} from './styled';

type Props = {
  metrics: Metric[];
  limits: Limits;
  chartType: 'CPU' | 'Memory';
  containerStates?: ContainerStates;
};

const MAX_VISIBLE_CONTAINER_BUTTONS = 3;

const MetricsDot: React.FC<DotProps & { payload?: any }> = ({
  cx,
  cy,
  payload,
}) => {
  if (!payload.hasReachedLimit) {
    return null;
  }
  return <circle cx={Number(cx)} cy={Number(cy)} r={5} fill={colors.R300} />;
};

const ContainerStateIcon: React.FC<{
  containerState: ContainerState;
  primaryColor?: string;
  secondaryColor?: string;
}> = ({ containerState, primaryColor, secondaryColor }) => (
  <ContainerStateWrapper>
    {containerState === ContainerState.warning ? (
      <WarningIcon
        size="small"
        label="Warning"
        {...{ primaryColor, secondaryColor }}
      />
    ) : null}
    {containerState === ContainerState.error ? (
      <ErrorIcon
        size="small"
        label="Error"
        {...{ primaryColor, secondaryColor }}
      />
    ) : null}
  </ContainerStateWrapper>
);

const PipelinesMetrics: React.FC<Props> = ({
  metrics,
  limits,
  chartType,
  containerStates = {},
}) => {
  const [visibleMetrics, setVisibleMetrics] = useState<{
    [key: string]: boolean;
  }>(
    Object.keys(metrics[0].values).reduce(
      (reducer, key) => ({ ...reducer, [key]: true }),
      {},
    ),
  );

  const unit = chartType === 'Memory' ? 'MB' : 'Millicores';
  const showLimit = chartType === 'Memory';
  const data = useMemo(() => parseMetrics(metrics, visibleMetrics, limits), [
    metrics,
    visibleMetrics,
    limits,
  ]);

  const renderButton = useCallback(
    (key, containerState, i) => (
      <Button
        key={`metric_button_${key}`}
        isSelected={visibleMetrics[key]}
        className={themeAreaColors[i]}
        theme={themeMetricButton}
        iconAfter={
          <>
            <ContainerStateIcon
              containerState={containerState}
              secondaryColor={themeAreaColors[i]}
            />
            {visibleMetrics[key] ? (
              <CheckboxIcon
                label={`Hide ${key}`}
                secondaryColor={themeAreaColors[i]}
              />
            ) : (
              <CheckboxIndeterminateIcon
                label={`Show ${key}`}
                secondaryColor={colors.N60}
              />
            )}
          </>
        }
        onClick={() =>
          setVisibleMetrics({
            ...visibleMetrics,
            [key]: !visibleMetrics[key],
          })
        }
      >
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </Button>
    ),
    [visibleMetrics],
  );

  return (
    <Wrapper data-testid="pipelines-metrics">
      <Header>
        <h3>{chartType} used over time</h3>
        <ButtonGroup>
          {Object.keys(visibleMetrics).map((key, i, list) => {
            const shouldRenderButton =
              list.length <= MAX_VISIBLE_CONTAINER_BUTTONS || key === 'build';
            return shouldRenderButton
              ? renderButton(key, containerStates[key], i)
              : null;
          })}
          {Object.keys(visibleMetrics).length >
          MAX_VISIBLE_CONTAINER_BUTTONS ? (
            <DropdownMenu
              triggerType="button"
              triggerButtonProps={{
                appearance: 'subtle',
                iconBefore: <MoreIcon label="More" primaryColor={colors.N0} />,
              }}
              testId="pipelines-metrics-container-dropdown"
              position="bottom right"
            >
              <DropdownItemGroup>
                {Object.keys(visibleMetrics)
                  .filter((key) => key !== 'build')
                  .map((key, i) => (
                    <DropdownItem
                      key={`metric_dropdown_${key}`}
                      elemBefore={
                        <svg width={12} height={20}>
                          <circle
                            cx={4}
                            cy={10}
                            r={4}
                            fill={themeAreaColors[i + 1]}
                          />
                        </svg>
                      }
                      elemAfter={
                        <>
                          <ContainerStateIcon
                            containerState={containerStates[key]}
                            primaryColor={
                              containerStates[key] === ContainerState.warning
                                ? colors.Y500
                                : colors.R300
                            }
                          />
                          {visibleMetrics[key] ? (
                            <CheckboxIcon
                              label={`Hide ${key}`}
                              primaryColor={colors.B200}
                            />
                          ) : (
                            <CheckboxIndeterminateIcon
                              label={`Show ${key}`}
                              primaryColor={colors.N60}
                            />
                          )}
                        </>
                      }
                      onClick={() =>
                        setVisibleMetrics({
                          ...visibleMetrics,
                          [key]: !visibleMetrics[key],
                        })
                      }
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </DropdownItem>
                  ))}
              </DropdownItemGroup>
            </DropdownMenu>
          ) : null}
        </ButtonGroup>
      </Header>
      <MetricsChartWrapper>
        <ResponsiveContainer>
          <LineChart
            width={800}
            height={250}
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis
              label={{
                value: `% of ${chartType} used`,
                angle: -90,
                position: 'insideTopLeft',
                offset: -55,
                fill: colors.N60,
              }}
              dataKey="duration"
              stroke={colors.N0}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={toPercent}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              stroke={colors.N0}
              axisLine={false}
              tickLine={false}
            />
            <CartesianGrid
              horizontalPoints={
                showLimit ? [75, 135, 195, 250] : [20, 75, 135, 195, 250]
              }
              strokeDasharray="0"
              vertical={false}
              stroke={`rgba(235, 236, 240, 0.5)`}
            />
            {Object.keys(visibleMetrics).map((key, i) => (
              <Line
                key={`area_${key}`}
                type="monotone"
                dataKey={`values.${key}`}
                stroke={themeAreaColors[i]}
                strokeWidth={3}
                animationDuration={100}
                dot={() => null}
              />
            ))}
            <Tooltip
              cursor={{ stroke: colors.N0, strokeDasharray: 2 }}
              content={
                <MetricsTooltip
                  chartType={chartType}
                  visibleMetrics={visibleMetrics}
                  limits={limits}
                  unit={unit}
                />
              }
            />
            {showLimit ? (
              <Line
                type="monotone"
                dataKey="limit"
                stroke={colors.R200}
                strokeDasharray="3"
                activeDot={<MetricsDot />}
                dot={<MetricsDot />}
                animationDuration={100}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </MetricsChartWrapper>
    </Wrapper>
  );
};

export default React.memo(PipelinesMetrics);
