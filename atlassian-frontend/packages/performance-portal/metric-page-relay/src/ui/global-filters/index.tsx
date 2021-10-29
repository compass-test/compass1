import React, { useCallback, useEffect, useMemo } from 'react';

import { graphql, useFragment } from 'react-relay';

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

import RadioDropdownMenu, {
  onChangeHandlerType,
} from '../../common/ui/radio-dropdown-menu';
import { defaultState, usePageParam } from '../../services/url-query-param';

import type { globalFiltersFragment$key } from './__generated__/globalFiltersFragment.graphql';
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

type Props = {
  data: globalFiltersFragment$key;
};

export const GlobalFilters = (props: Props) => {
  const [percentile, setPercentile] = usePageParam('percentile');
  const [environment, setEnvironment] = usePageParam('env');
  const [pageLoadType, setPageLoadType] = usePageParam('pageLoadType');
  const [cohortType, setCohortType] = usePageParam('cohortType');
  const [showWeekend, setShowWeekend] = usePageParam('showWeekend');
  const [, setFocusedCohort] = usePageParam('focusedCohort');
  const [, setVisibleCohortMap] = usePageParam('visibleCohortMap');

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const data = useFragment(
    graphql`
      fragment globalFiltersFragment on Metric {
        __typename
        ... on BrowserMetric {
          availableCohortTypes
        }
      }
    `,
    props.data,
  );

  const handlePercentileChange = useCallback<onChangeHandlerType>(
    (value) => {
      setPercentile(value as string);
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
      setFocusedCohort(defaultState.focusedCohort);
      setVisibleCohortMap(undefined);

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
    [
      setCohortType,
      setFocusedCohort,
      setVisibleCohortMap,
      createAnalyticsEvent,
    ],
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

  const availableCohortTypes = useMemo(() => {
    return (
      data?.availableCohortTypes
        ?.filter((v) => v != null)
        .map((v) => v!.toString()) ?? [CohortType.ALL]
    );
  }, [data?.availableCohortTypes]);

  useEffect(() => {
    if (!availableCohortTypes.includes(cohortType)) {
      setCohortType(
        availableCohortTypes.includes(CohortType.ALL)
          ? CohortType.ALL
          : (availableCohortTypes[0] as CohortType),
      );
    }
  }, [availableCohortTypes, cohortType, setCohortType]);

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
