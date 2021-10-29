import React, { MouseEventHandler, useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import {
  HiddenLegendLabelTextToReserveBoldWidthOnly,
  LegendContainer,
  LegendItem as LegendItemDiv,
  LegendLabel,
  LegendLabelText,
  LegendSvg,
} from './styled';
import { Props } from './types';

interface LegendItemProps {
  label: string;
  color: string;
  checked: boolean;
  onClick: MouseEventHandler;
  onDoubleClick?: MouseEventHandler;
}

const LegendItem = ({
  label,
  color,
  checked,
  onClick,
  onDoubleClick,
}: LegendItemProps) => (
  // @ts-ignore super weird typescript issue with for onClick and onDoubleClickCapture
  <LegendItemDiv onClick={onClick} onDoubleClick={onDoubleClick}>
    <LegendSvg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="img"
        aria-label={label}
      >
        <rect
          width="24"
          height="24"
          rx="15%"
          fill={color}
          opacity={checked ? 1 : 0.25}
        />
        {checked && (
          <path
            d="M6.735 12.322a1 1 0 0 0-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 0 0 3.939-3.883l.04-.04a492.598 492.598 0 0 0 3.658-3.643 1 1 0 0 0-1.424-1.404 518.42 518.42 0 0 1-3.64 3.625l-.04.04a2049.114 2049.114 0 0 1-3.775 3.722l-3.098-3.363z"
            fill="#fff"
          ></path>
        )}
      </svg>
    </LegendSvg>
    <LegendLabel>
      <LegendLabelText bold={checked}>{label}</LegendLabelText>

      {/* Code below so that Legend does not move around when ticked & unticked */}
      <HiddenLegendLabelTextToReserveBoldWidthOnly>
        {label}
      </HiddenLegendLabelTextToReserveBoldWidthOnly>
    </LegendLabel>
  </LegendItemDiv>
);

export const ToplineLegend = ({
  availableCohorts,
  visibleCohorts,
  isAllCohortVisible,
  onShowAllCohorts,
  onShowOnlyCohort,
  onHideCohort,
  onShowCohort,
}: Props) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const showAllCohorts = useCallback(() => {
    onShowAllCohorts();

    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'percentile',
      source: 'metric',
      attributes: {
        cohort: 'all',
      },
    });
    sendUIEvent(analyticsEvent);
  }, [createAnalyticsEvent, onShowAllCohorts]);

  const legendItemClicked = (cohort: string) => {
    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'legendItem',
      source: 'metric',
      attributes: {
        cohort,
      },
    });
    sendUIEvent(analyticsEvent);
  };

  const legendItemDblClicked = (cohort: string) => {
    onShowOnlyCohort(cohort);
    const analyticsEvent = createAnalyticsEvent({
      action: 'dblClicked',
      actionSubject: 'legendItem',
      source: 'metric',
      attributes: {
        cohort,
      },
    });
    sendUIEvent(analyticsEvent);
  };

  return (
    <>
      {availableCohorts.length > 1 && (
        <LegendContainer>
          <LegendItem
            label="Show All"
            color={colors.N60}
            checked={isAllCohortVisible}
            onClick={showAllCohorts}
          />
          {availableCohorts?.map(({ cohort, color }) => (
            <LegendItem
              key={cohort}
              label={cohort}
              color={color}
              checked={visibleCohorts.includes(cohort)}
              onClick={(e) => {
                if (e.nativeEvent.detail > 1) {
                  return;
                }
                if (visibleCohorts.includes(cohort)) {
                  onHideCohort(cohort);
                } else {
                  onShowCohort(cohort);
                }

                legendItemClicked(cohort);
              }}
              onDoubleClick={() => {
                legendItemDblClicked(cohort);
              }}
            />
          ))}
        </LegendContainer>
      )}
    </>
  );
};
