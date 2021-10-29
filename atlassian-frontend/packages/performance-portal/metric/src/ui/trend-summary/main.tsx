import React, { useMemo } from 'react';

import addHours from 'date-fns/addHours';
import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';

import Lozenge from '@atlaskit/lozenge';
import Spinner from '@atlaskit/spinner';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';

import { PageLoadToplineType } from '../../__generated__/graphql';
import storm from '../../common/assets/Storm.svg';
import { theme } from '../../common/constants';
import { SectionContainer, SectionHeader } from '../../common/ui/section';
import {
  formatInUTC,
  getPreviousDate,
  getPreviousDateNonWeekend,
  getStartOfDayUTC,
} from '../../common/utils';
import {
  useCohortTypeParam,
  useFocusedCohortParam,
  usePageLoadTypeParam,
  usePercentileParam,
  useSelectedDateParam,
  useShowWeekendParam,
} from '../../common/utils/metric-page-param';
import { usePageLoadInitialRatioData } from '../../services/metric-chart-data/page-load-initial-ratio';
import { RatioData } from '../../services/metric-chart-data/page-load-initial-ratio/types';
import { ToplineTrendSeries } from '../../services/metric-chart-data/topline/types';

import { MetricSpotlight } from './metric-spotlight';
import { PageTransitionRatioSpotlight } from './page-transition-ratio-spotlight';
import {
  CohortLozengeWrapper,
  Container,
  ErrorImg,
  SpotlightContainer,
  TrendDetails,
  TrendsLoadingContainer,
} from './styled';
import { Props } from './types';

const AlertsIndicator = lazyForPaint(() =>
  import(
    /* webpackChunkName: "performance-portal-metric-alert-indicator" */ './alerts-indicator'
  ).then((m) => m.AlertsIndicator),
);
const notFoundRatio = { ratioWoW: null, ratio: null };

export const TrendSummary = ({
  loading,
  error,
  series: seriesArray,
  availableCohorts,
  id,
}: Props) => {
  const [percentile] = usePercentileParam();
  const [pageLoadType] = usePageLoadTypeParam();
  const [cohortType] = useCohortTypeParam();
  const [focusedCohort] = useFocusedCohortParam();
  const [selectedDate] = useSelectedDateParam();
  const [showWeekend] = useShowWeekendParam();

  const isAlertListOnDailySummaryEnabled = useFeatureFlag(
    'perf-portal.alerts.list.on-daily-summary-section',
    false,
  );

  const {
    loading: isRatioDataLoading,
    error: ratioError,
    data: ratioData,
  } = usePageLoadInitialRatioData(id);

  const { ratioWoW, ratio } = useMemo(() => {
    if (!ratioData) {
      return notFoundRatio;
    }

    const series = ratioData.find(
      (entry) =>
        entry.cohortType === cohortType && entry.cohortValue === focusedCohort,
    );

    if (!series) {
      return notFoundRatio;
    }

    const findValueInSeriesForDate = (s?: RatioData, dt?: Date) =>
      s?.data.find((d) => d.dateTime === dt?.toISOString())?.value || 0;

    const wowDate =
      selectedDate && getStartOfDayUTC(addHours(selectedDate, -(7 * 24)));

    const ratio = findValueInSeriesForDate(series, selectedDate);
    const ratioWoW = findValueInSeriesForDate(series, wowDate);

    return { ratioWoW, ratio };
  }, [ratioData, focusedCohort, cohortType, selectedDate]);

  const { fmp, fmpDod, fmpWow, tti, ttiDod, ttiWow } = useMemo(() => {
    const fmpSeriesForSummary = seriesArray?.find(
      (series) =>
        series.toplineType === PageLoadToplineType.FMP &&
        series.aggregation === percentile &&
        series.pageLoadType === pageLoadType &&
        series.cohortType === cohortType &&
        series.cohortValue === focusedCohort,
    );
    const ttiSeriesForSummary = seriesArray?.find(
      (series) =>
        series.toplineType === PageLoadToplineType.TTI &&
        series.aggregation === percentile &&
        series.pageLoadType === pageLoadType &&
        series.cohortType === cohortType &&
        series.cohortValue === focusedCohort,
    );

    const findValueInSeriesForDate = (s?: ToplineTrendSeries, dt?: Date) =>
      s?.data?.find((d) => d.dateTime === dt?.toISOString())?.value;

    const dodDate = !selectedDate
      ? undefined
      : getStartOfDayUTC(
          showWeekend
            ? getPreviousDate(selectedDate)
            : getPreviousDateNonWeekend(selectedDate),
        );

    const wowDate =
      selectedDate && getStartOfDayUTC(addHours(selectedDate, -(7 * 24)));

    const tti = findValueInSeriesForDate(ttiSeriesForSummary, selectedDate);
    const ttiDod = findValueInSeriesForDate(ttiSeriesForSummary, dodDate);
    const ttiWow = findValueInSeriesForDate(ttiSeriesForSummary, wowDate);

    const fmp = findValueInSeriesForDate(fmpSeriesForSummary, selectedDate);
    const fmpDod = findValueInSeriesForDate(fmpSeriesForSummary, dodDate);
    const fmpWow = findValueInSeriesForDate(fmpSeriesForSummary, wowDate);

    return { fmp, fmpDod, fmpWow, tti, ttiDod, ttiWow };
  }, [
    seriesArray,
    focusedCohort,
    pageLoadType,
    percentile,
    cohortType,
    selectedDate,
    showWeekend,
  ]);

  const currentCohortColor = useMemo(() => {
    if (Array.isArray(availableCohorts)) {
      return availableCohorts.find((c) => c.cohort === focusedCohort)?.color;
    }
    return theme.chart.colors[0];
  }, [availableCohorts, focusedCohort]);

  const unit = 'ms';

  return (
    <SectionContainer>
      <SectionHeader>Trends on</SectionHeader>
      {error && !seriesArray ? (
        <ErrorImg src={storm} />
      ) : loading ? (
        <TrendsLoadingContainer>
          <Spinner size="large" />
        </TrendsLoadingContainer>
      ) : (
        <Container>
          <TrendDetails>
            {selectedDate && (
              <Lozenge>{formatInUTC(selectedDate, 'yyyy-MM-dd')}</Lozenge>
            )}
            {percentile && <Lozenge>{percentile}</Lozenge>}
            {focusedCohort && focusedCohort !== 'all' && (
              <CohortLozengeWrapper color={currentCohortColor}>
                <Lozenge>{focusedCohort}</Lozenge>
              </CohortLozengeWrapper>
            )}
            {isAlertListOnDailySummaryEnabled && (
              <LazySuspense fallback={null}>
                <AlertsIndicator />
              </LazySuspense>
            )}
          </TrendDetails>
          <SpotlightContainer>
            <MetricSpotlight
              label="FMP DoD"
              valueBefore={fmpDod}
              valueAfter={fmp}
              unit={unit}
            />
            <MetricSpotlight
              label="FMP WoW"
              valueBefore={fmpWow}
              valueAfter={fmp}
              unit={unit}
            />

            <MetricSpotlight
              label="TTI DoD"
              valueBefore={ttiDod}
              valueAfter={tti}
              unit={unit}
            />
            <MetricSpotlight
              label="TTI WoW"
              valueBefore={ttiWow}
              valueAfter={tti}
              unit={unit}
            />
            <PageTransitionRatioSpotlight
              valueBefore={ratioWoW || 0}
              valueAfter={ratio || 0}
              unit={'%'}
              loading={isRatioDataLoading}
              error={ratioError}
            />
          </SpotlightContainer>
        </Container>
      )}
    </SectionContainer>
  );
};
