import { useMemo } from 'react';

import addMonths from 'date-fns/addMonths';

import {
  PageLoadInitialRatioDataFragment,
  PageLoadToplineTrendSeries,
  PageLoadToplineType,
  PageLoadType,
  ToplineAggregation,
  usePageLoadInitialRatioQuery as useGeneratedPageLoadInitialRatioQuery,
} from '../../../__generated__/graphql';
import { getEndOfDayUTC, getStartOfDayUTC } from '../../../common/utils';
import {
  useCohortTypeParam,
  useEnvParam,
} from '../../../common/utils/metric-page-param';

import { RatioData } from './types';

export const usePageLoadInitialRatioQuery = (metricId: string) => {
  const [environment] = useEnvParam();
  const [cohortType] = useCohortTypeParam();

  const endOfTodayUTC = useMemo(() => getEndOfDayUTC(new Date()), []);

  const dateFrom = useMemo(
    () => getStartOfDayUTC(addMonths(endOfTodayUTC, -12)).toISOString(),
    [endOfTodayUTC],
  );
  const dateTo = endOfTodayUTC.toISOString();

  return useGeneratedPageLoadInitialRatioQuery({
    variables: {
      id: metricId,
      env: environment,

      dateTimeRange: {
        from: dateFrom,
        to: dateTo,
      },
      aggregations: [ToplineAggregation.P90],
      toplineTypes: [PageLoadToplineType.TTI],
      pageLoadTypes: [PageLoadType.COMBINED, PageLoadType.TRANSITION],
      cohortTypes: [cohortType],
    },
  });
};

const makeCohortId = (
  data: Pick<PageLoadToplineTrendSeries, 'cohortType' | 'cohortValue'>,
): string => {
  return `${data.cohortType}--${data.cohortValue}`;
};

export const usePageLoadInitialRatioData = (metricId: string) => {
  const result = usePageLoadInitialRatioQuery(metricId);
  if (
    result.loading ||
    result.error ||
    !result.data ||
    result.data.metric?.__typename !== 'PageLoadMetric' ||
    !result.data.metric?.toplineTrend?.series ||
    result.data.metric.toplineTrend.series.length === 0
  ) {
    return {
      loading: result.loading,
      error: result.error,
      data: null,
    };
  }

  const seriesArray = result.data.metric.toplineTrend.series;

  const availableCohorts = seriesArray.reduce<
    Record<
      string,
      {
        cohortType: string;
        cohortValue: string;
        data: Record<PageLoadType, PageLoadInitialRatioDataFragment[]>;
      }
    >
  >((acc, series) => {
    const id = makeCohortId(series);
    const entry = acc[id] || {
      cohortType: series.cohortType,
      cohortValue: series.cohortValue,
      data: {
        [series.pageLoadType]: series.data,
      },
    };

    if (entry) {
      entry.data[series.pageLoadType] = series.data!;
    }

    acc[id] = entry;
    return acc;
  }, {});

  const data: RatioData[] = Object.values(availableCohorts).map((entry) => {
    const series = entry.data[PageLoadType.COMBINED]
      .map((dataEntry) => {
        const transitionVolume =
          PageLoadType.TRANSITION in entry.data
            ? entry.data[PageLoadType.TRANSITION].find(
                ({ dateTime }) => dataEntry.dateTime === dateTime,
              )?.count || 0
            : 0;

        return {
          dateTime: dataEntry.dateTime,
          count: dataEntry.count,
          value: transitionVolume / dataEntry.count,
        };
      })
      .filter((d) => d != null);

    return {
      cohortType: entry.cohortType,
      cohortValue: entry.cohortValue,
      data: series,
    };
  });

  return {
    loading: result.loading,
    error: result.error,
    data,
  };
};
