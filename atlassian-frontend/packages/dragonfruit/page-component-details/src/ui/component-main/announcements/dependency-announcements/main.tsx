import React from 'react';

import { useRouterActions } from 'react-resource-router';

import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import Spinner from '@atlaskit/spinner';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  Dependencies,
  ErrorIcon,
} from '@atlassian/dragonfruit-common-ui/assets';
import { AnnouncementList } from '@atlassian/dragonfruit-components';
import {
  CompassComponent,
  GetComponentDependencyAnnouncementsQuery,
} from '@atlassian/dragonfruit-graphql';
import {
  ComponentDetailPageUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import {
  filterAndSortPastAnnouncements,
  filterAndSortUpcomingAnnouncements,
} from '../../../../common/utils/announcements';

import { DependencyAnnouncement } from './dependency-announcement';
import messages from './messages';
import { AnnouncementsSectionWrapper, AnnouncementsTabContent } from './styled';

type Props = {
  currentComponent: Pick<CompassComponent, 'id'>;
  data?: GetComponentDependencyAnnouncementsQuery;
};

const DependencyAnnouncements: React.FC<Props> = (props: Props) => {
  const { currentComponent, data } = props;

  const { formatMessage } = useIntl();
  const { push } = useRouterActions();

  // When loading the announcements
  if (!data) {
    return (
      <AnnouncementsSectionWrapper>
        <Spinner size={'large'} />
      </AnnouncementsSectionWrapper>
    );
  }

  const component = data?.compass?.component;

  // If we don't have a component, then we either have null or a QueryError
  if (
    component?.__typename !== 'CompassComponent' ||
    component.relationships?.__typename !== 'CompassRelationshipConnection'
  ) {
    return (
      <EmptyState
        header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
        description={formatMessage(
          messages.announcementsViewLoadingErrorDescription,
        )}
        imageUrl={ErrorIcon}
      />
    );
  }

  const relationships = component.relationships.nodes ?? [];

  const announcements = relationships
    .flatMap((relationship) => relationship.endNode?.announcements)
    .filter(notEmpty);

  // Empty state for when the component has no dependencies
  if (relationships.length === 0) {
    const onActionClick = () =>
      push(
        routes.COMPONENT_DETAILS(
          currentComponent.id,
          ComponentDetailPageUrlParam.DEPENDENCIES,
        ),
      );

    return (
      <EmptyState
        header={formatMessage(messages.noDependenciesEmptyStateHeader)}
        description={formatMessage(
          messages.noDependenciesEmptyStateDescription,
        )}
        imageUrl={Dependencies}
        primaryAction={
          <Button appearance="primary" onClick={onActionClick}>
            {formatMessage(messages.goToDependenciesButton)}
          </Button>
        }
      />
    );
  }

  // Empty state for when the component has dependencies, but no dependency announcements
  if (announcements.length === 0) {
    return (
      <EmptyState
        header={formatMessage(messages.noAnnouncementsEmptyStateHeader)}
        description={formatMessage(
          messages.noAnnouncementsEmptyStateDescription,
        )}
        imageUrl={Dependencies}
      />
    );
  }

  const upcomingAnnouncements = filterAndSortUpcomingAnnouncements(
    announcements,
  );
  const pastAnnouncements = filterAndSortPastAnnouncements(announcements);

  return (
    <AnnouncementsTabContent>
      {upcomingAnnouncements.length > 0 && (
        <AnnouncementList>
          {upcomingAnnouncements.map((announcement, index) => (
            <AnnouncementList.Item key={announcement.id}>
              <DependencyAnnouncement
                announcement={announcement}
                acknowledgingComponentId={currentComponent.id}
              />
            </AnnouncementList.Item>
          ))}
        </AnnouncementList>
      )}

      {pastAnnouncements.length > 0 && (
        <AnnouncementList title="Past">
          {pastAnnouncements.map((announcement, index) => (
            <AnnouncementList.Item key={announcement.id}>
              <DependencyAnnouncement
                announcement={announcement}
                acknowledgingComponentId={currentComponent.id}
              />
            </AnnouncementList.Item>
          ))}
        </AnnouncementList>
      )}
    </AnnouncementsTabContent>
  );
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const ErrorBoundaryFallback: React.FC<Props> = () => {
  const { formatMessage } = useIntl();
  return (
    <EmptyState
      header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
      imageUrl={ErrorIcon}
    />
  );
};

export default withErrorBoundary(DependencyAnnouncements, {
  Fallback: ErrorBoundaryFallback,
  componentName: `DependencyAnnouncements`,
});
