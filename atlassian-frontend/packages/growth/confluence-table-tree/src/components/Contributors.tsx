import React from 'react';
import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';
import { ProfileCardTrigger, ProfileClient } from '@atlaskit/profilecard';
import {
  UIAnalyticsEvent,
  withAnalyticsEvents,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import {
  fireUIAnalytics,
  fireOperationalAnalytics,
} from '@atlassian/analytics-bridge';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { ContributorsContainer } from '../styled';
import messages from '../messages';

interface AvatarWithProfileCardProps {
  userId: string;
  username: string;
  cloudId?: string;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

const openUserProfileWindow = (userId: string) =>
  window.open(`/wiki/display/~${userId}`, '_blank');

const DIRECTORY_URL = '/gateway/api/directory/graphql';

const AvatarWithProfileCardBase = (
  props: AvatarWithProfileCardProps & InjectedIntlProps,
) => {
  const { userId, cloudId, createAnalyticsEvent, intl } = props;

  const profileClient = new ProfileClient({
    url: DIRECTORY_URL,
  });

  return (
    <ProfileCardTrigger
      cloudId={cloudId}
      userId={userId}
      resourceClient={profileClient}
      analytics={(eventName: any) => {
        if (eventName === 'profile-card.view' && createAnalyticsEvent) {
          fireOperationalAnalytics(
            createAnalyticsEvent({}),
            'confluencePageTreeAvatar profileCardView',
          );
        }
      }}
      actions={[
        {
          label: intl.formatMessage(messages.viewProfile),
          callback: () => {
            openUserProfileWindow(userId);
          },
        },
      ]}
    >
      <Avatar
        {...props}
        onClick={(_, analyticsEvent?: UIAnalyticsEvent) => {
          if (analyticsEvent) {
            fireUIAnalytics(analyticsEvent, 'confluencePageTreeAvatar', {
              dropdown: false,
            });
          }
        }}
      />
    </ProfileCardTrigger>
  );
};

const AvatarWithProfileCard = withAnalyticsEvents()(
  injectIntl(AvatarWithProfileCardBase),
);

interface ContributorsProps {
  cloudId: string | null;
  contributors?: {
    publishers?: {
      users: any[];
    };
  };
  testId?: string;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  isAvatarTooltipDisabled?: boolean;
}

const ContributorsBase = ({
  cloudId,
  contributors,
  testId,
  createAnalyticsEvent,
  intl,
  isAvatarTooltipDisabled,
}: ContributorsProps & InjectedIntlProps) => {
  if (
    !cloudId ||
    !contributors ||
    !contributors.publishers ||
    !contributors.publishers.users
  ) {
    if (createAnalyticsEvent) {
      fireOperationalAnalytics(
        createAnalyticsEvent({}),
        'confluencePageTree unknownContributor',
      );
    }
    return <small>{intl.formatMessage(messages.unknown)}</small>;
  }

  const data: any[] = contributors.publishers.users.map((user) => ({
    name: user.displayName,
    size: 'medium',
    src: user.profilePicture.path,
    userId: user.accountId,
  }));

  const AvatarWithCloudId = (avatarProps: any) => (
    <AvatarWithProfileCard {...avatarProps} cloudId={cloudId} />
  );

  const handleAvatarClicked = (
    _event: React.MouseEvent,
    _analyticsEvent: any,
    index: number,
  ) => {
    if (createAnalyticsEvent) {
      const event = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'avatar',
      });
      fireUIAnalytics(event, 'confluencePageTreeAvatar', {
        dropdown: true,
      });
    }
    openUserProfileWindow(data[index].userId);
  };

  return (
    <ContributorsContainer>
      <AvatarGroup
        appearance="stack"
        data={data}
        avatar={AvatarWithCloudId}
        size="small"
        maxCount={3}
        onAvatarClick={handleAvatarClicked}
        testId={testId && `${testId}--avatargroup`}
        isTooltipDisabled={isAvatarTooltipDisabled}
      />
    </ContributorsContainer>
  );
};

const Contributors = withAnalyticsEvents()(injectIntl(ContributorsBase));

export {
  Contributors,
  AvatarWithProfileCard,
  AvatarWithProfileCardBase,
  ContributorsBase,
};
