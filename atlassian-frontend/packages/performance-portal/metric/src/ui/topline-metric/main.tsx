import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import addHours from 'date-fns/addHours';
import addMonths from 'date-fns/addMonths';
import uniqBy from 'lodash/uniqBy';

import Spinner from '@atlaskit/spinner';

import storm from '../../common/assets/Storm.svg';
import { ToplineChartData } from '../../common/types';
import { SectionContainer, SectionHeader } from '../../common/ui/section';
import { ToplineChartContext } from '../../common/ui/topline-chart';
import {
  getCohortWithoutPartialSuffix,
  getEndOfDayUTC,
  getPartialDayCohortName,
  getStartOfDayUTC,
  isPartialDayAggregation,
  isWeekendDate,
} from '../../common/utils';
import {
  useCohortTypeParam,
  usePageLoadTypeParam,
  usePercentileParam,
  useToplineRangeParam,
  useToplineTypeParam,
  useVisibleCohorts,
} from '../../common/utils/metric-page-param';
import {
  ToplineTrendData,
  ToplineTrendGoal,
} from '../../services/metric-chart-data/topline/types';

import { ControlSwitchers } from './control-switchers';
import { ErrorImg, ToplineLoadingContainer } from './styled';
import { ToplineLegend } from './topline-legend';
import { TrendChart } from './trend-chart';
import { Props } from './types';
import { VolumeChart } from './volume-chart';

type OnLoadProps = {
  onLoad?: () => void;
};

const OnLoad = memo((props: OnLoadProps) => {
  useLayoutEffect(() => {
    // charts render in the next event loop - to catch whole part setTimeout
    setTimeout(() => {
      props.onLoad?.();
    });
  }, [props]);
  return null;
});

export const ToplineMetric = ({
  onDateSelected,
  loading,
  error,
  series: seriesArray,
  hotEvents,
  showWeekend,
  selectedDate,
  availableCohorts,
  onLoad,
}: Props) => {
  const [percentile] = usePercentileParam();
  const [pageLoadType] = usePageLoadTypeParam();
  const [selectedCohortType] = useCohortTypeParam();
  const [range, setRange] = useToplineRangeParam();
  const [toplineType] = useToplineTypeParam();

  const endOfTodayUTC = useMemo(() => getEndOfDayUTC(new Date()), []);
  const [xDomain, setXDomain] = useState<{ start: Date; end: Date }>({
    start: addMonths(endOfTodayUTC, -range),
    end: endOfTodayUTC,
  });

  const handleDateRangeChange = (value: number) => {
    if (range !== value) {
      setRange(value);
      const start = getStartOfDayUTC(addMonths(endOfTodayUTC, -value));
      setXDomain({ start, end: endOfTodayUTC });
    }
  };

  const xAxisPoints = useMemo(() => {
    const { start, end } = xDomain;

    const points = [];
    for (
      let p = getStartOfDayUTC(start);
      p.getTime() <= getStartOfDayUTC(end).getTime();
      p = addHours(p, 24)
    ) {
      if (!showWeekend) {
        const isWeekend = isWeekendDate(p);
        if (isWeekend) {
          continue;
        }
      }

      points.push(p.toISOString());
    }
    return points;
  }, [showWeekend, xDomain]);

  const toplineTrendSeriesArray = useMemo(
    () =>
      seriesArray?.filter(
        (series) =>
          series.toplineType === toplineType &&
          series.aggregation === percentile &&
          series.pageLoadType === pageLoadType &&
          series.cohortType === selectedCohortType,
      ),
    [seriesArray, pageLoadType, percentile, selectedCohortType, toplineType],
  );

  const [trendChartData, countChartData, cohorts, goals] = useMemo(() => {
    type DataPoint = Omit<ToplineTrendData, 'dateTime' | '__typename'> & {
      cohort: string;
    };
    const dataMap = new Map<string, DataPoint[]>();
    xAxisPoints.forEach((dateTime) => {
      dataMap.set(dateTime, []);
    });

    const goals: ToplineTrendGoal[] = [];

    toplineTrendSeriesArray?.forEach((series) => {
      const cohortValue = series.cohortValue;
      if (series.goal) {
        goals.push(...series.goal);
      }

      series.data?.forEach(
        ({
          dateTime,
          value,
          count,
          aggregatedAt,
          overrideAt,
          overrideSourceName,
        }) => {
          const dataArray = dataMap.get(dateTime);
          if (dataArray == null) {
            return;
          }
          dataArray.push({
            cohort: cohortValue,
            value,
            count,
            aggregatedAt,
            overrideAt,
            overrideSourceName,
          });
        },
      );
    });

    const trendChartData: ToplineChartData = [];
    const countChartData: ToplineChartData = [];

    const cohortSet = new Set<string>();
    dataMap.forEach((dataPointArray, dateTime) => {
      const dataValueObject: {
        [cohort: string]: {
          value: number;
          aggregatedAt?: Nullable<Date>;
          overrideAt?: Nullable<Date>;
          overrideSourceName?: Nullable<string>;
        };
      } = {};
      const dataCountObject: {
        [cohort: string]: {
          value: number;
          aggregatedAt?: Nullable<Date>;
          overrideAt?: Nullable<Date>;
          overrideSourceName?: Nullable<string>;
        };
      } = {};
      dataPointArray.forEach(
        ({
          cohort,
          value,
          count,
          aggregatedAt,
          overrideAt,
          overrideSourceName,
        }) => {
          const aggregatedAtDate = aggregatedAt
            ? new Date(aggregatedAt)
            : undefined;

          const overrideAtDate = overrideAt ? new Date(overrideAt) : undefined;
          if (
            aggregatedAtDate &&
            isPartialDayAggregation(new Date(dateTime), aggregatedAtDate)
          ) {
            const partialDayCohortName = getPartialDayCohortName(cohort);
            const prevDayTrendValues =
              trendChartData[trendChartData.length - 1]?.values;
            prevDayTrendValues[partialDayCohortName] =
              prevDayTrendValues[cohort];

            const prevDayCountValues =
              countChartData[trendChartData.length - 1]?.values;
            prevDayCountValues[partialDayCohortName] =
              prevDayCountValues[cohort];

            dataValueObject[partialDayCohortName] = {
              value,
              aggregatedAt: aggregatedAtDate,
              overrideAt: overrideAtDate,
              overrideSourceName,
            };
            dataCountObject[partialDayCohortName] = {
              value: count,
              aggregatedAt: aggregatedAtDate,
              overrideAt: overrideAtDate,
              overrideSourceName,
            };
          } else {
            dataValueObject[cohort] = {
              value,
              aggregatedAt: aggregatedAtDate,
              overrideAt: overrideAtDate,
              overrideSourceName,
            };
            dataCountObject[cohort] = {
              value: count,
              aggregatedAt: aggregatedAtDate,
              overrideAt: overrideAtDate,
              overrideSourceName,
            };
          }
          cohortSet.add(cohort);
        },
      );
      trendChartData.push({
        dateTime,
        values: dataValueObject,
      });
      countChartData.push({
        dateTime,
        values: dataCountObject,
      });
    });
    const cohorts = [...cohortSet].sort();

    return [
      trendChartData,
      countChartData,
      cohorts,
      uniqBy(goals, (g) => g.id),
    ];
  }, [toplineTrendSeriesArray, xAxisPoints]);

  const [
    visibleCohorts,
    showCohort,
    hideCohort,
    showAllCohort,
    showOnlyCohort,
    isAllCohortVisible,
  ] = useVisibleCohorts(cohorts);

  const availableVisibleCohorts = useMemo(() => {
    if (Array.isArray(availableCohorts)) {
      return availableCohorts.filter(({ cohort }) =>
        visibleCohorts.includes(cohort),
      );
    }
    return [];
  }, [availableCohorts, visibleCohorts]);

  const [hoveredDateTime, setHoveredDateTime] = useState<string | undefined>(
    undefined,
  );

  const [hoveredCohort, _setHoveredCohort] = useState<string | undefined>(
    undefined,
  );
  const setHoveredCohort = useCallback((cohort: string) => {
    _setHoveredCohort(getCohortWithoutPartialSuffix(cohort));
  }, []);

  const onDateTimeSelected = useCallback(
    (selectedDateTime: string) => {
      onDateSelected?.(new Date(selectedDateTime));
    },
    [onDateSelected],
  );

  return (
    <ToplineChartContext.Provider
      value={{
        selectedDateTime: selectedDate?.toISOString(),
        onDateTimeSelected,
        hoveredDateTime,
        setHoveredDateTime,
        hoveredCohort,
        setHoveredCohort,
      }}
    >
      <SectionContainer>
        <SectionHeader>Topline</SectionHeader>
        <ControlSwitchers
          onDateRangeChange={handleDateRangeChange}
          selectedDateRange={range}
        />
        {error && !seriesArray ? (
          <ErrorImg src={storm} />
        ) : loading || !availableCohorts ? (
          <ToplineLoadingContainer>
            <Spinner size="large" />
          </ToplineLoadingContainer>
        ) : (
          <>
            <TrendChart
              data={trendChartData}
              availableCohorts={availableVisibleCohorts}
              goals={goals}
              hotEvents={hotEvents}
              label={`${percentile}`}
            />
            <VolumeChart
              data={countChartData}
              availableCohorts={availableVisibleCohorts}
            />
            <ToplineLegend
              availableCohorts={availableCohorts}
              visibleCohorts={visibleCohorts}
              isAllCohortVisible={isAllCohortVisible}
              onShowAllCohorts={showAllCohort}
              onShowOnlyCohort={showOnlyCohort}
              onHideCohort={hideCohort}
              onShowCohort={showCohort}
            />
          </>
        )}
        {!loading && seriesArray && <OnLoad onLoad={onLoad} />}
      </SectionContainer>
    </ToplineChartContext.Provider>
  );
};
