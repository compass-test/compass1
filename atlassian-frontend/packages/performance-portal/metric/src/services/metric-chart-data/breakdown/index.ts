import {
  BreakdownAggregation,
  usePerfPortalBreakdownChartQuery,
} from '../../../__generated__/graphql';
import {
  useBreakdownComparisonDateParam,
  useCohortTypeParam,
  useEnvParam,
  useFocusedCohortParam,
  usePageLoadTypeParam,
  usePercentileParam,
  useSelectedDateParam,
} from '../../../common/utils/metric-page-param';

const toISODateString = (date: Date) => {
  return date.toISOString().substring(0, 10);
};

export const useBreakdownChartData = (metricId: string) => {
  const [environment] = useEnvParam();
  const [percentile] = usePercentileParam();
  const [pageLoadType] = usePageLoadTypeParam();
  const [cohortType] = useCohortTypeParam();
  const [cohortValue] = useFocusedCohortParam();
  const [baseDate] = useSelectedDateParam();
  const comparisonDate = useBreakdownComparisonDateParam();

  const hasAllRequiredFields =
    environment &&
    percentile &&
    pageLoadType &&
    cohortType &&
    cohortValue &&
    baseDate &&
    comparisonDate;

  return usePerfPortalBreakdownChartQuery({
    variables: {
      id: metricId,
      env: environment,
      baseDate: toISODateString(baseDate),
      comparisonDate: toISODateString(comparisonDate),
      aggregation: (percentile as unknown) as BreakdownAggregation,
      pageLoadType,
      cohortType,
      cohortValue,
    },
    skip: !hasAllRequiredFields,
  });
};
