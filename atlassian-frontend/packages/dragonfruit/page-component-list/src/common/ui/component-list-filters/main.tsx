import React from 'react';

import { di } from 'react-magnetic-di';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import MediaServicesFilterIcon from '@atlaskit/icon/glyph/media-services/filter';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { useLowScoringComponentsFilterEnabled } from '@atlassian/dragonfruit-feature-flags';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

// Per dev discussion, we are disabling the below rule as it is cleaner than moving the controller
// inside this directory or moving this component outside of common
// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useSelectedFilters } from '../../../controllers/components-use-selected-filters';

import messages from './messages';
import { ButtonContainer } from './styled';

type ListFilterProps = {
  componentType?: CompassComponentType;
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};

enum FilterType {
  UNOWNED = 'unowned',
  LOW_PERFORMING = 'low performing',
}

export function ListFilter(props: ListFilterProps) {
  di(useSelectedFilters);

  const { componentType, testId } = props;
  const [
    { filters },
    { toggleUnownedFilter, toggleLowPerformingFilter },
  ] = useSelectedFilters();
  const isLowScoringFilterEnabled = useLowScoringComponentsFilterEnabled();

  const { formatMessage } = useIntl();

  return (
    <ButtonContainer>
      <Button
        iconBefore={
          !isLowScoringFilterEnabled ? (
            <MediaServicesFilterIcon label={'Unowned components filter'} />
          ) : (
            <></>
          )
        }
        testId={`${testId}-button`}
        onClick={(
          e: React.MouseEvent<HTMLElement>,
          analyticsEvent: UIAnalyticsEvent,
        ) => {
          toggleUnownedFilter();
          fireUIAnalytics(analyticsEvent, 'listFilter', {
            componentType: componentType?.toString(),
            // Here we optimistically assume that toggleUnownedFilter() was invoked successfully above and
            // updated the state of unownedTeamSelected. Because unownedTeamSelected is updated asynchronously,
            // we cannot expect filters to have been updated.
            filterState: !filters.length ? FilterType.UNOWNED : null,
          });
        }}
        isSelected={filters.some((filter) => filter.name === 'ownerId')}
      >
        {formatMessage(messages.filterUnownedComponents)}
      </Button>
      {isLowScoringFilterEnabled && (
        <Button
          testId={`${testId}-low-performing-filter-button`}
          onClick={(
            e: React.MouseEvent<HTMLElement>,
            analyticsEvent: UIAnalyticsEvent,
          ) => {
            toggleLowPerformingFilter();
            fireUIAnalytics(analyticsEvent, 'listFilter', {
              componentType: componentType?.toString(),
              // Here we optimistically assume that toggleLowPerformingFilter() was invoked successfully above and
              // updated the state of lowPerformingSelected. Because lowPerformingSelected is updated asynchronously,
              // we cannot expect filters to have been updated.
              filterState: !filters.length ? FilterType.LOW_PERFORMING : null,
            });
          }}
          isSelected={filters.some((filter) => filter.name === 'score')}
        >
          {formatMessage(messages.filterLowPerformingComponents)}
        </Button>
      )}
    </ButtonContainer>
  );
}
