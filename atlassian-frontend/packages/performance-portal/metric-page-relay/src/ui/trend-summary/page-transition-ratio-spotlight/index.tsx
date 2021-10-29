import React, { useMemo } from 'react';

import addHours from 'date-fns/addHours';

import { N70 } from '@atlaskit/theme/colors';
import {
  EqualIcon,
  getDiffColor,
  getDiffIcon,
  NOT_APPLICABLE,
  roundNumber,
} from '@atlassian/performance-portal-common';

import {
  DiffAbsolute,
  DiffNumbers,
  DiffPercentage,
  NotApplicable,
  Spotlight,
} from '../../../common/ui/spotlight';
import { getStartOfDayUTC } from '../../../common/utils';
import { usePageLoadInitialRatioData } from '../../../services/metric-chart-data/page-load-initial-ratio';
import { usePageParam } from '../../../services/url-query-param';

import { PageTransitionRatioSpotlightProps } from './types';

const getFormattedPercent = (value: number) => roundNumber(value * 100);

export const PageTransitionRatioSpotlight = React.memo(
  ({ experienceId }: PageTransitionRatioSpotlightProps) => {
    const [focusedCohort] = usePageParam('focusedCohort');
    const [selectedDate] = usePageParam('selectedDate');

    const wowDate = useMemo(
      () => selectedDate && getStartOfDayUTC(addHours(selectedDate, -(7 * 24))),
      [selectedDate],
    );

    const valueAfter =
      usePageLoadInitialRatioData(experienceId, selectedDate, focusedCohort) ??
      0;

    const valueBefore =
      usePageLoadInitialRatioData(experienceId, wowDate, focusedCohort) ?? 0;

    let content: string | JSX.Element = '';
    let color = N70;
    let Icon = EqualIcon;
    if (valueAfter === undefined) {
      content = <NotApplicable>{NOT_APPLICABLE}</NotApplicable>;
    } else if (valueBefore === undefined) {
      content = (
        <DiffPercentage>{getFormattedPercent(valueAfter)}%</DiffPercentage>
      );
    } else {
      const diff = valueAfter - valueBefore;
      content = (
        <>
          <DiffPercentage>{getFormattedPercent(valueAfter)}%</DiffPercentage>
          <DiffAbsolute>{getFormattedPercent(diff || 0)}%</DiffAbsolute>
        </>
      );
      Icon = getDiffIcon(valueAfter - valueBefore);
      color = getDiffColor(valueBefore - valueAfter, 0, 2);
    }

    return (
      <Spotlight
        primaryColor={color}
        label="SPA transition ratio WoW"
        unit={'%'}
        Icon={Icon}
        loading={false}
      >
        <DiffNumbers>{content}</DiffNumbers>
      </Spotlight>
    );
  },
);

export const PageTransitionRatioSpotlightLoading = () => {
  let content: string | JSX.Element = '';
  let color = N70;
  let Icon = EqualIcon;

  return (
    <Spotlight
      primaryColor={color}
      label="SPA transition ratio WoW"
      unit={'%'}
      Icon={Icon}
      loading={true}
    >
      <DiffNumbers>{content}</DiffNumbers>
    </Spotlight>
  );
};
