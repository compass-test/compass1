import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import AddIcon from '@atlaskit/icon/glyph/add';
import { ModalTransition } from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import * as colors from '@atlaskit/theme/colors';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { AnnouncementList } from '@atlassian/dragonfruit-components';
import {
  CompassComponentOverviewFragment,
  useGetComponentAnnouncementsQuery,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { default as NoAnnouncements } from '../../../../common/assets/Announcements.svg';
import {
  filterAndSortPastAnnouncements,
  filterAndSortUpcomingAnnouncements,
} from '../../../../common/utils/announcements';
// FIXME: Do not import from parent inside 'ui' directory
// eslint-disable-next-line
import { CreateAnnouncementModal } from '../create-announcement-modal';

import { OwnAnnouncement } from './component-announcement';
import messages from './messages';
import {
  AnnouncementsSectionWrapper,
  AnnouncementsTabContent,
  CreateAnnouncementButton,
  CreateButtonText,
  EmptyStateExampleList,
} from './styled';

type Props = {
  currentComponent: CompassComponentOverviewFragment;
};

const ComponentAnnouncements: React.FC<Props> = (props: Props) => {
  const { currentComponent } = props;

  const { formatMessage } = useIntl();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const onCreateAnnouncementClose = useCallback(
    () => setIsCreateModalOpen(false),
    [setIsCreateModalOpen],
  );

  const { data, loading, error } = useGetComponentAnnouncementsQuery({
    variables: { id: currentComponent.id },
  });

  const errorUI = (
    <EmptyState
      header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
      description={formatMessage(
        messages.announcementsViewLoadingErrorDescription,
      )}
      imageUrl={ErrorIcon}
    />
  );

  if (error) {
    return errorUI;
  }

  // When loading the announcements
  if (loading) {
    return (
      <AnnouncementsSectionWrapper>
        <Spinner size={'large'} />
      </AnnouncementsSectionWrapper>
    );
  }

  const component = data?.compass?.component;

  // If we don't have a component, then we either have null or a QueryError
  if (component?.__typename !== 'CompassComponent') {
    return errorUI;
  }

  const announcements = component.announcements ?? [];

  const upcomingAnnouncements = filterAndSortUpcomingAnnouncements(
    announcements,
  );
  const pastAnnouncements = filterAndSortPastAnnouncements(announcements);

  const renderEmptyState = () => (
    <EmptyState
      header={formatMessage(messages.emptyStateHeader, {
        componentName: currentComponent.name,
      })}
      description={
        <div>
          <FormattedMessage
            {...messages.emptyStateDescription}
            values={{
              componentName: <strong>{currentComponent.name}</strong>,
            }}
          />
          <EmptyStateExampleList>
            <li>
              <FormattedMessage {...messages.emptyStateExample1} />
            </li>
            <li>
              <FormattedMessage {...messages.emptyStateExample2} />
            </li>
            <li>
              <FormattedMessage {...messages.emptyStateExample3} />
            </li>
          </EmptyStateExampleList>
        </div>
      }
      imageUrl={NoAnnouncements}
      primaryAction={
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          appearance="primary"
          testId={'component-announcements.create-button'}
        >
          {formatMessage(messages.createAnnouncement)}
        </Button>
      }
    />
  );

  const renderAnnouncementsContent = () => (
    <AnnouncementsTabContent>
      <CreateAnnouncementButton onClick={() => setIsCreateModalOpen(true)}>
        <AddIcon label="" size="small" primaryColor={colors.N500} />
        <CreateButtonText>
          {formatMessage(messages.createAnnouncement)}
        </CreateButtonText>
      </CreateAnnouncementButton>

      {upcomingAnnouncements.length > 0 && (
        <AnnouncementList testId={'component-announcements.upcoming-list'}>
          {upcomingAnnouncements.map((announcement, index) => (
            <AnnouncementList.Item key={announcement.id}>
              <OwnAnnouncement
                announcement={announcement}
                component={currentComponent}
              />
            </AnnouncementList.Item>
          ))}
        </AnnouncementList>
      )}

      {pastAnnouncements.length > 0 && (
        <AnnouncementList title="Past">
          {pastAnnouncements.map((announcement, index) => (
            <AnnouncementList.Item key={announcement.id}>
              <OwnAnnouncement
                announcement={announcement}
                component={currentComponent}
              />
            </AnnouncementList.Item>
          ))}
        </AnnouncementList>
      )}
    </AnnouncementsTabContent>
  );

  return (
    <>
      {announcements.length === 0
        ? renderEmptyState()
        : renderAnnouncementsContent()}

      <ModalTransition>
        {isCreateModalOpen && (
          <CreateAnnouncementModal
            component={currentComponent}
            onSuccess={onCreateAnnouncementClose}
            onClose={onCreateAnnouncementClose}
          />
        )}
      </ModalTransition>
    </>
  );
};

const ErrorBoundaryFallback: React.FC<Props> = () => {
  const { formatMessage } = useIntl();
  return (
    <EmptyState
      header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
      imageUrl={ErrorIcon}
    />
  );
};

export default withErrorBoundary(ComponentAnnouncements, {
  Fallback: ErrorBoundaryFallback,
  componentName: `ComponentAnnouncements`,
});
