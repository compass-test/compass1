import React, { useCallback, useContext, useMemo, useState } from 'react';

import { RechartsFunction } from 'recharts';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { HotEvents } from '../../../services/metric-chart-data/topline/types';
// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useVisibleCohorts } from '../../../services/metric-page-param';
// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { usePageParam } from '../../../services/url-query-param';
import { ToplineChartData } from '../../types';
import {
  getCohortWithoutPartialSuffix,
  getPartialDayCohortName,
} from '../../utils';
import { DotRenderer, useRenderLineDot } from '../chart-dot';

export interface ToplineChartContext {
  selectedDateTime?: string;
  onDateTimeSelected?: (dateTime: string) => void;
  hoveredDateTime?: string;
  setHoveredDateTime?: (dateTime?: string) => void;
  hoveredCohort?: string | undefined;
  setHoveredCohort?: (cohort: string) => void;
}
export const ToplineChartContext = React.createContext<ToplineChartContext>({});

export const useToplineChartContext = (): ToplineChartContext => {
  return useContext(ToplineChartContext);
};

const getClosestValue = (
  valueMap: Map<string, number>,
  closestTo: number,
): string | undefined => {
  const numArr = [...(valueMap.keys() ?? [])];
  if (!numArr.length) {
    return;
  }

  const closest = numArr.reduce((prevCohort, currCohort) => {
    const prevY = valueMap?.get(prevCohort);
    if (!prevY) {
      return currCohort;
    }

    const currY = valueMap?.get(currCohort) ?? 0;
    return Math.abs(currY - closestTo) < Math.abs(prevY - closestTo)
      ? currCohort
      : prevCohort;
  });

  return closest;
};

export const useCommonToplineChartProps = ({
  data,
  availableCohorts,
  hotEvents,
  valueUnit = '',
  shouldUseColoredIcons = true,
}: {
  data: ToplineChartData;
  availableCohorts: { cohort: string; color: string }[];
  hotEvents?: HotEvents;
  valueUnit?: string;
  shouldUseColoredIcons?: boolean;
}): {
  onContainerClick: RechartsFunction;
  onContainerMouseMove: RechartsFunction;
  onContainerMouseOut: RechartsFunction;
  renderLineDot: DotRenderer;
} => {
  const {
    selectedDateTime,
    onDateTimeSelected,
    hoveredDateTime,
    setHoveredDateTime,
    hoveredCohort,
    setHoveredCohort,
  } = useToplineChartContext();

  const [focusedCohort, setFocusedCohort] = usePageParam('focusedCohort');
  const [visibleCohorts] = useVisibleCohorts();

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [dateTimeToCohortChartY] = useState(
    new Map<string, Map<string, number>>(),
  );

  const setFocusedCohortToClosestClick = useCallback(
    (dateTime: string, clickY: number) => {
      const cohortToChartY = dateTimeToCohortChartY.get(dateTime);

      const closest = cohortToChartY
        ? getClosestValue(cohortToChartY, clickY)
        : undefined;

      closest && setFocusedCohort(getCohortWithoutPartialSuffix(closest));
    },
    [dateTimeToCohortChartY, setFocusedCohort],
  );

  const onContainerClick = useCallback(
    (e?: {
      chartY: number;
      activeLabel?: string;
      activePayload: { value: unknown }[];
    }) => {
      const hasDataPoint =
        (e?.activePayload.filter(({ value }) => value != null).length ?? 0) > 0;
      if (!hasDataPoint) {
        return;
      }
      const dateTime = e?.activeLabel;
      dateTime && onDateTimeSelected?.(dateTime);

      if (!dateTime || e?.chartY == null) {
        return;
      }

      setFocusedCohortToClosestClick(dateTime, e?.chartY);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'toplineChart',
        source: 'metric',
      });
      sendUIEvent(analyticsEvent);
    },
    [onDateTimeSelected, setFocusedCohortToClosestClick, createAnalyticsEvent],
  );

  const setHoveredCohortToClosestMouseMove = useCallback(
    (dateTime: string, clickY: number) => {
      const cohortToChartY = dateTimeToCohortChartY.get(dateTime);

      const closest = cohortToChartY
        ? getClosestValue(cohortToChartY, clickY)
        : undefined;

      closest && setHoveredCohort?.(closest);
    },
    [dateTimeToCohortChartY, setHoveredCohort],
  );

  const onContainerMouseMove = useCallback(
    (e?: {
      chartY: number;
      activeLabel?: string;
      activePayload: { value: unknown }[];
    }) => {
      const dateTime = e?.activeLabel;

      if (!dateTime || e?.chartY == null) {
        return;
      }
      setHoveredCohortToClosestMouseMove(dateTime, e?.chartY);
      setHoveredDateTime?.(e?.activeLabel);
    },
    [setHoveredDateTime, setHoveredCohortToClosestMouseMove],
  );

  const onContainerMouseOut = useCallback(
    (e?: { activeLabel?: string }) => {
      setHoveredDateTime?.(e?.activeLabel);
    },
    [setHoveredDateTime],
  );

  const registerDot = useCallback(
    ({
      dateTime,
      cohort,
      chartY,
    }: {
      dateTime: string;
      cohort: string;
      chartY: number;
    }) => {
      const cohortToYMapping =
        dateTimeToCohortChartY.get(dateTime) ?? new Map();
      cohortToYMapping.set(cohort, chartY);
      dateTimeToCohortChartY.set(dateTime, cohortToYMapping);
    },
    [dateTimeToCohortChartY],
  );

  const unregisterDot = useCallback(
    ({ dateTime, cohort }: { dateTime: string; cohort: string }) => {
      const cohortToYMapping = dateTimeToCohortChartY.get(dateTime);
      cohortToYMapping?.delete(cohort);
    },
    [dateTimeToCohortChartY],
  );

  const selectedValue = useMemo(() => {
    const dateData = data.find((d) => d.dateTime === selectedDateTime);
    return (
      dateData?.values[focusedCohort] ??
      dateData?.values[getPartialDayCohortName(focusedCohort)]
    );
  }, [data, focusedCohort, selectedDateTime]);

  const hoveredValue = useMemo(() => {
    if (hoveredCohort) {
      const dateData = data.find((d) => d.dateTime === hoveredDateTime);

      return (
        dateData?.values[hoveredCohort] ??
        dateData?.values[getPartialDayCohortName(hoveredCohort)]
      );
    }
  }, [data, hoveredCohort, hoveredDateTime]);

  const renderLineDot = useRenderLineDot({
    availableCohorts,
    hotEvents,
    selectedDateTime,
    hoveredDateTime,
    selectedValue,
    hoveredValue,
    hoveredCohort,
    focusedCohort,
    visibleCohorts,
    registerDot,
    unregisterDot,
    valueUnit,
    shouldUseColoredIcons,
  });

  return {
    onContainerClick,
    onContainerMouseMove,
    onContainerMouseOut,
    renderLineDot,
  };
};
