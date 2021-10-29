import React, { Suspense, useMemo } from 'react';

import addHours from 'date-fns/addHours';
import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';

import Lozenge from '@atlaskit/lozenge';
import Spinner from '@atlaskit/spinner';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';

import storm from '../../common/assets/Storm.svg';
import { theme } from '../../common/constants';
import { AvailableCohort } from '../../common/types';
import { SectionContainer, SectionHeader } from '../../common/ui/section';
import {
  formatInUTC,
  getPreviousDate,
  getPreviousDateNonWeekend,
  getStartOfDayUTC,
  toGQLDate,
} from '../../common/utils';
import { useToplineChartData } from '../../services/metric-chart-data';
import { ToplineTrendSerie } from '../../services/metric-chart-data/topline/types';
import { usePageParam } from '../../services/url-query-param';

import { MetricSpotlight } from './metric-spotlight';
import {
  PageTransitionRatioSpotlight,
  PageTransitionRatioSpotlightLoading,
} from './page-transition-ratio-spotlight';
import {
  CohortLozengeWrapper,
  Container,
  ErrorImg,
  SpotlightContainer,
  TrendDetails,
  TrendsLoadingContainer,
} from './styled';

const AlertsIndicator = lazyForPaint(() =>
  import(
    /* webpackChunkName: "performance-portal-metric-alert-indicator" */ './alerts-indicator'
  ).then((m) => m.AlertsIndicator),
);

export interface Props {
  id: string;
  availableCohorts: AvailableCohort[] | null;
}

export const TrendSummary = ({ availableCohorts, id }: Props) => {
  const {
    loading: ttiLoading,
    error: ttiError,
    data: ttiData,
  } = useToplineChartData(id, 'tti');
  const {
    loading: fmpLoading,
    error: fmpError,
    data: fmpData,
  } = useToplineChartData(id, 'fmp');

  const [percentile] = usePageParam('percentile');
  const [showWeekend] = usePageParam('showWeekend');
  const [focusedCohort] = usePageParam('focusedCohort');
  const [selectedDate] = usePageParam('selectedDate');

  const ttiSeriesForSummary = ttiData.experience?.dailyToplineTrend?.find(
    (series) => series.cohortValue === focusedCohort,
  );
  const fmpSeriesForSummary = fmpData.experience?.dailyToplineTrend?.find(
    (series) => series.cohortValue === focusedCohort,
  );

  const isAlertListOnDailySummaryEnabled = useFeatureFlag(
    'perf-portal.alerts.list.on-daily-summary-section',
    false,
  );

  const { fmp, fmpDod, fmpWow, tti, ttiDod, ttiWow } = useMemo(() => {
    const findValueInSeriesForDate = (s?: ToplineTrendSerie, dt?: Date) =>
      s?.data?.find((d) => d.day === (dt ? toGQLDate(dt) : ''))?.value;

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
  }, [selectedDate, showWeekend, ttiSeriesForSummary, fmpSeriesForSummary]);

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
      {(ttiError || fmpError) &&
      (!ttiSeriesForSummary || !fmpSeriesForSummary) ? (
        <ErrorImg src={storm} />
      ) : ttiLoading || fmpLoading ? (
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
            <Suspense fallback={<PageTransitionRatioSpotlightLoading />}>
              <PageTransitionRatioSpotlight experienceId={id} />
            </Suspense>
          </SpotlightContainer>
        </Container>
      )}
    </SectionContainer>
  );
};
