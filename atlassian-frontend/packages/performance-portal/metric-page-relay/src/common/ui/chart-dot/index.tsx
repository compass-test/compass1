import React, { forwardRef, Ref, useCallback, useEffect } from 'react';

import { ContentRenderer, DotProps as RechartsDotProps } from 'recharts';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import Popup, { PopupProps } from '@atlaskit/popup';
import { CohortType, isNumber } from '@atlassian/performance-portal-common';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { HotEvents } from '../../../services/metric-chart-data/topline/types';
import { theme } from '../../constants';
import { TooltipType } from '../../types';
import {
  formatNumber,
  getCohortWithoutPartialSuffix,
  getTooltipPlacement,
  tooltipDateLabelFormatter,
} from '../../utils';
import { ChartTooltip } from '../chart-tooltip';
import { TooltipDiff } from '../tooltip-diff';

import { TooltipsEvent, TooltipsEventsContainer } from './styled';
import { TooltipDataOverrideInfoSection } from './tooltip-data-override-info-section';
import { TooltipLastUpdatedSection } from './tooltip-last-updated-section';

const getCohortFromDataKey = (dataKey: string) => {
  return dataKey.split('.')[1];
};

type DotProps = RechartsDotProps & {
  color: string;
  cohort: string;
  dateTime: string;
  registerDot?: (arg: {
    dateTime: string;
    cohort: string;
    chartY: number;
  }) => void;
  unregisterDot?: (arg: { dateTime: string; cohort: string }) => void;
  isVisible: boolean;
};

const Dot = forwardRef(
  (
    {
      color,
      cohort,
      dateTime,
      registerDot,
      unregisterDot,
      isVisible,
      ...otherProps
    }: DotProps,
    ref: Ref<unknown>,
  ) => {
    const { cy: chartY } = otherProps;
    useEffect(() => {
      chartY &&
        registerDot?.({
          dateTime,
          cohort,
          chartY,
        });
      return () => {
        unregisterDot?.({
          dateTime,
          cohort,
        });
      };
    }, [chartY, cohort, dateTime, registerDot, unregisterDot]);

    if (!isVisible) {
      return null;
    }

    const forceForwardRefBypassTsError = ref as Ref<SVGCircleElement>;

    return (
      <g className="render-dot">
        <circle
          ref={forceForwardRefBypassTsError}
          {...otherProps}
          r={5}
          strokeWidth={0}
          fill={color}
          fillOpacity={1}
        />
      </g>
    );
  },
);

type DotWithTooltipProp = Omit<DotProps, 'isVisible'> & {
  value: string | number;
  selectedValue: number | undefined;
  hoveredValue: number | undefined;
  hotEvents?: {
    startAt: string;
    endAt: string;
    issueId: string;
    name: string;
  }[];
  tooltipPlacement: PopupProps['placement'];
  valueUnit: string;
  shouldUseColoredIcons: boolean;
  shouldShowCohort: boolean;
  shouldShowDiff: boolean;
  aggregatedAt?: Nullable<Date>;
  overrideAt?: Nullable<Date>;
  overrideSourceName?: Nullable<string>;
};
const DotWithTooltip = ({
  color,
  cohort,
  dateTime,
  value,
  selectedValue,
  hoveredValue,
  hotEvents,
  tooltipPlacement = 'right-start',
  valueUnit = '',
  shouldUseColoredIcons = true,
  shouldShowCohort = true,
  shouldShowDiff = false,
  aggregatedAt,
  overrideAt,
  overrideSourceName,
  ...otherDotProps
}: DotWithTooltipProp) => {
  return (
    <Popup
      isOpen
      placement={tooltipPlacement}
      content={() => {
        const dateLabel = tooltipDateLabelFormatter(dateTime);

        const hotsReportedForTheDay =
          hotEvents?.filter((event) => event.startAt === dateTime) ?? [];
        const hotsResolvedForTheDay =
          hotEvents?.filter((event) => event.endAt === dateTime) ?? [];

        const hasEvents =
          hotsReportedForTheDay.length + hotsResolvedForTheDay.length > 0;

        return (
          <ChartTooltip
            highlightedContent={
              <div>{`${formatNumber(value)} ${valueUnit}`}</div>
            }
          >
            {shouldShowDiff && (
              <TooltipDiff
                selectedValue={selectedValue}
                hoveredValue={hoveredValue}
                unit={valueUnit}
                shouldUseColoredIcons={shouldUseColoredIcons}
              />
            )}
            {shouldShowCohort ? (
              <div style={{ color }}>
                {getCohortWithoutPartialSuffix(cohort)}
              </div>
            ) : null}
            <div>{dateLabel}</div>
            {aggregatedAt && (
              <TooltipLastUpdatedSection
                dataDateTime={dateTime}
                aggregatedAt={aggregatedAt}
              />
            )}
            {(overrideSourceName || overrideAt) && (
              <TooltipDataOverrideInfoSection
                overrideAt={overrideAt}
                overrideSourceName={overrideSourceName}
              />
            )}
            {hasEvents && (
              <TooltipsEventsContainer>
                {hotsReportedForTheDay.map(({ issueId, name }) => (
                  <TooltipsEvent>
                    <EditorWarningIcon
                      label="reported"
                      primaryColor={theme.text.red}
                      size="small"
                    />
                    <div>
                      {issueId} {name}
                    </div>
                  </TooltipsEvent>
                ))}
                {hotsResolvedForTheDay.map(({ issueId, name }) => (
                  <TooltipsEvent>
                    <CheckCircleIcon
                      label="resolved"
                      primaryColor={theme.text.green}
                      size="small"
                    />
                    <div>
                      {issueId} {name}
                    </div>
                  </TooltipsEvent>
                ))}
              </TooltipsEventsContainer>
            )}
          </ChartTooltip>
        );
      }}
      trigger={(triggerProps) => {
        return (
          <Dot
            {...otherDotProps}
            {...triggerProps}
            color={color}
            cohort={cohort}
            dateTime={dateTime}
            isVisible
          />
        );
      }}
    />
  );
};

export type DotRenderer = ContentRenderer<
  RechartsDotProps & {
    dataKey: string;
    payload: {
      dateTime: string;
      values: {
        [cohort: string]: {
          value: number;
          aggregatedAt?: Date;
          overrideAt?: Nullable<Date>;
          overrideSourceName?: Nullable<string>;
        };
      };
    };
  }
>;
interface UseRenderLineDotArgs {
  availableCohorts: { cohort: string; color: string }[];
  hotEvents?: HotEvents;
  visibleCohorts?: string[];
  focusedCohort?: string;
  hoveredCohort?: string;
  selectedDateTime?: string;
  hoveredDateTime?: string;
  selectedValue?: {
    value: number;
    aggregatedAt?: Nullable<Date>;
    overrideAt?: Nullable<Date>;
    overrideSourceName?: Nullable<string>;
  };
  hoveredValue?: {
    value: number;
    aggregatedAt?: Nullable<Date>;
    overrideAt?: Nullable<Date>;
    overrideSourceName?: Nullable<string>;
  };
  registerDot?: (arg: {
    dateTime: string;
    cohort: string;
    chartY: number;
  }) => void;
  unregisterDot?: (arg: { dateTime: string; cohort: string }) => void;
  valueUnit?: string;
  shouldUseColoredIcons?: boolean;
}

export const useRenderLineDot = (arg: UseRenderLineDotArgs) => {
  const {
    selectedDateTime,
    hoveredDateTime,
    selectedValue,
    hoveredValue,
    visibleCohorts,
    focusedCohort,
    hoveredCohort,
    availableCohorts,
    registerDot,
    unregisterDot,
    valueUnit = '',
    shouldUseColoredIcons = false,
  } = arg;

  return useCallback<DotRenderer>(
    (renderDotProps) => {
      const { payload: dataPoint, dataKey, ...dotProps } = renderDotProps;
      const dataKeyCohort = getCohortFromDataKey(dataKey);
      const dataKeyCohortWithoutSuffix = getCohortWithoutPartialSuffix(
        dataKeyCohort,
      );

      const cohortColor =
        availableCohorts?.find(
          ({ cohort }) => cohort === dataKeyCohortWithoutSuffix,
        )?.color ?? theme.chart.colors[0];

      const value = dataPoint.values[dataKeyCohort]?.value;
      const aggregatedAt = dataPoint.values[dataKeyCohort]?.aggregatedAt;
      const overrideAt = dataPoint.values[dataKeyCohort]?.overrideAt;
      const overrideSourceName =
        dataPoint.values[dataKeyCohort]?.overrideSourceName;

      if (value == null) {
        return null;
      }

      const focusedCohortWithoutSuffix =
        focusedCohort && getCohortWithoutPartialSuffix(focusedCohort);

      let selectedCohort = focusedCohortWithoutSuffix;
      // fallback when focused cohort is not visible
      if (
        visibleCohorts?.length &&
        !visibleCohorts.includes(focusedCohortWithoutSuffix as string)
      ) {
        selectedCohort = visibleCohorts[0];
      }

      const isSelectedCohort = dataKeyCohortWithoutSuffix === selectedCohort;
      const isHoveredCohort = dataKeyCohortWithoutSuffix === hoveredCohort;
      const isUserHovering = hoveredDateTime != null;
      const isHoveredDateTime =
        isUserHovering && dataPoint.dateTime === hoveredDateTime;
      const isSelectedDateTime = dataPoint.dateTime === selectedDateTime;

      const shouldShowSelectedTooltip = isSelectedCohort && isSelectedDateTime;

      const shouldShowHoveredTooltip =
        !shouldShowSelectedTooltip && isHoveredCohort && isHoveredDateTime;

      const shouldShowTooltip =
        shouldShowSelectedTooltip || shouldShowHoveredTooltip;

      const tooltipType = shouldShowSelectedTooltip
        ? TooltipType.SELECTED_TOOLTIP
        : TooltipType.HOVER_TOOLTIP;

      if (shouldShowTooltip) {
        const tooltipPlacement = getTooltipPlacement(
          tooltipType,
          selectedDateTime,
          hoveredDateTime,
        );
        const shouldShowCohortInTooltip = dataKeyCohortWithoutSuffix
          ? dataKeyCohortWithoutSuffix.toUpperCase() !== CohortType.ALL
          : true;

        const areHoverAndSelectedValuesOverlapping =
          hoveredValue === selectedValue && hoveredCohort === selectedCohort;

        const shouldShowDiff =
          tooltipType === TooltipType.SELECTED_TOOLTIP &&
          isNumber(selectedValue?.value) &&
          isNumber(hoveredValue?.value) &&
          !areHoverAndSelectedValuesOverlapping;

        return (
          <DotWithTooltip
            {...dotProps}
            color={cohortColor}
            cohort={dataKeyCohort}
            shouldShowDiff={shouldShowDiff}
            shouldShowCohort={shouldShowCohortInTooltip}
            dateTime={dataPoint.dateTime}
            value={value}
            valueUnit={valueUnit}
            aggregatedAt={aggregatedAt}
            overrideAt={overrideAt}
            overrideSourceName={overrideSourceName}
            shouldUseColoredIcons={shouldUseColoredIcons}
            selectedValue={
              isSelectedDateTime ? selectedValue?.value : undefined
            }
            hoveredValue={isSelectedDateTime ? hoveredValue?.value : undefined}
            registerDot={registerDot}
            unregisterDot={unregisterDot}
            tooltipPlacement={tooltipPlacement}
          />
        );
      }

      return (
        <Dot
          {...dotProps}
          color={cohortColor}
          cohort={dataKeyCohort}
          dateTime={dataPoint.dateTime}
          registerDot={registerDot}
          unregisterDot={unregisterDot}
          isVisible={isSelectedCohort && isSelectedDateTime}
        />
      );
    },
    [
      availableCohorts,
      focusedCohort,
      visibleCohorts,
      hoveredDateTime,
      hoveredValue,
      hoveredCohort,
      registerDot,
      selectedDateTime,
      selectedValue,
      unregisterDot,
      valueUnit,
      shouldUseColoredIcons,
    ],
  );
};
