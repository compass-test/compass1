import { useMemo } from 'react';

import addMonths from 'date-fns/addMonths';

import {
  PageLoadToplineType,
  usePerfPortalToplineChartQuery,
} from '../../../__generated__/graphql';
import { getEndOfDayUTC, getStartOfDayUTC } from '../../../common/utils';
import {
  useCohortTypeParam,
  useEnvParam,
  usePageLoadTypeParam,
  usePercentileParam,
} from '../../../common/utils/metric-page-param';

const allToplineTypes = Object.values(PageLoadToplineType);

export const useToplineChartData = (metricId: string) => {
  const [environment] = useEnvParam();
  const [percentile] = usePercentileParam();
  const [pageLoadType] = usePageLoadTypeParam();
  const [cohortType] = useCohortTypeParam();

  const endOfTodayUTC = useMemo(() => getEndOfDayUTC(new Date()), []);

  const dateFrom = useMemo(
    () => getStartOfDayUTC(addMonths(endOfTodayUTC, -12)).toISOString(),
    [endOfTodayUTC],
  );
  const dateTo = endOfTodayUTC.toISOString();

  return usePerfPortalToplineChartQuery({
    variables: {
      id: metricId,
      env: environment,

      dateFrom,
      dateTo,

      dateTimeRange: {
        from: dateFrom,
        to: dateTo,
      },
      aggregations: [percentile],
      // all topline types is needed so we can generate TTI & FMP summary in spotlight
      toplineTypes: allToplineTypes,
      pageLoadTypes: [pageLoadType],
      cohortTypes: [cohortType],
    },
  });
};
