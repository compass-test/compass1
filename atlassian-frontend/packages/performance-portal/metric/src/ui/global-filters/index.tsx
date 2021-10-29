import React, { useCallback, useMemo } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ButtonGroup } from '@atlaskit/button';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import {
  CohortType,
  Environment,
  PageLoadType,
} from '@atlassian/performance-portal-common';
import {
  COHORT_TYPE_LABELS,
  ENVIRONMENT_OPTIONS,
  PERCENTILE_OPTIONS,
} from '@atlassian/performance-portal-common/constants';
import {
  SelectedParam,
  useQueryParamSerialized,
} from '@atlassian/performance-portal-query-param';

import { ToplineAggregation } from '../../__generated__/graphql';
import RadioDropdownMenu, {
  onChangeHandlerType,
} from '../../common/ui/radio-dropdown-menu';
import {
  useCohortTypeParam,
  useEnvParam,
  useFocusedCohortParam,
  usePageLoadTypeParam,
  usePercentileParam,
  useShowWeekendParam,
} from '../../common/utils/metric-page-param';
import { useMetricPageState } from '../../common/utils/metric-page-state';

import { GlobalFiltersContainer } from './styled';

enum weekends {
  hidden = 'hidden',
  visible = 'visible',
}

const pageLoadTypeMenuItems = [
  {
    label: 'initial load',
    value: PageLoadType.INITIAL,
  },
  {
    label: 'combined',
    value: PageLoadType.COMBINED,
  },
  {
    label: 'transition',
    value: PageLoadType.TRANSITION,
  },
];

const weekendTypeMenuItems = [
  {
    label: weekends.hidden,
    value: 'hidden',
  },

  {
    label: weekends.visible,
    value: 'visible',
  },
];

export const GlobalFilters = () => {
  const [percentile, setPercentile] = usePercentileParam();

  const [environment, setEnvironment] = useEnvParam();

  const [pageLoadType, setPageLoadType] = usePageLoadTypeParam();

  const [cohortType, setCohortType] = useCohortTypeParam();

  const [showWeekend, setShowWeekend] = useShowWeekendParam();

  const [, setFocusedCohort] = useFocusedCohortParam();

  const [, setVisibleCohorts] = useQueryParamSerialized(
    'visibleCohort',
    SelectedParam,
  );

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const handlePercentileChange = useCallback<onChangeHandlerType>(
    (value) => {
      setPercentile(value as ToplineAggregation);
      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'percentile',
        source: 'metric',
        attributes: {
          percentile: value,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [setPercentile, createAnalyticsEvent],
  );

  const handleEnvironmentChange = useCallback<onChangeHandlerType>(
    (value) => {
      setEnvironment(value as Environment);
      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'environment',
        source: 'metric',
        attributes: {
          env: value,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [setEnvironment, createAnalyticsEvent],
  );

  const handlePageLoadChange = useCallback<onChangeHandlerType>(
    (type) => {
      setPageLoadType(type as PageLoadType);
      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'pageLoadType',
        source: 'metric',
        attributes: {
          type,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [setPageLoadType, createAnalyticsEvent],
  );

  const handleCohortTypeChange = useCallback<onChangeHandlerType>(
    (type) => {
      setCohortType(type as CohortType);
      setFocusedCohort(undefined);
      setVisibleCohorts(undefined);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'cohort',
        source: 'metric',
        attributes: {
          cohort: type,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [setCohortType, setFocusedCohort, setVisibleCohorts, createAnalyticsEvent],
  );

  const handleWeekendChange = useCallback<onChangeHandlerType>(
    (to) => {
      setShowWeekend(to === 'visible');
      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'weekendFilter',
        source: 'metric',
        attributes: {
          enabled: to === 'visible',
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [setShowWeekend, createAnalyticsEvent],
  );

  const [pageState] = useMetricPageState();

  const availableCohortTypes = useMemo(() => {
    return (
      pageState.metric?.availableCohortTypes
        ?.filter((v) => v != null)
        .map((v) => v!.toString()) ?? [CohortType.ALL]
    );
  }, [pageState.metric?.availableCohortTypes]);

  const cohortTypeMenuItems = useMemo(() => {
    return Object.entries(COHORT_TYPE_LABELS)
      .filter(([value]) => availableCohortTypes.includes(value as CohortType))
      .map(([value, label]) => {
        return { value, label };
      });
  }, [availableCohortTypes]);

  return (
    <GlobalFiltersContainer>
      <ButtonGroup>
        <RadioDropdownMenu
          label="Percentile"
          menuItems={PERCENTILE_OPTIONS}
          onChange={handlePercentileChange}
          defaultValue={percentile}
        />
        <RadioDropdownMenu
          label="Environment"
          menuItems={ENVIRONMENT_OPTIONS}
          onChange={handleEnvironmentChange}
          defaultValue={environment}
        />
        <RadioDropdownMenu
          label="Page Load Type"
          menuItems={pageLoadTypeMenuItems}
          onChange={handlePageLoadChange}
          defaultValue={pageLoadType}
        />
        <RadioDropdownMenu
          label="Split By"
          menuItems={cohortTypeMenuItems}
          onChange={handleCohortTypeChange}
          defaultValue={cohortType}
        />

        <RadioDropdownMenu
          label="Weekends"
          menuItems={weekendTypeMenuItems}
          onChange={handleWeekendChange}
          defaultValue={showWeekend ? 'visible' : 'hidden'}
        />
      </ButtonGroup>
    </GlobalFiltersContainer>
  );
};
