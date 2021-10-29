import React, { useMemo } from 'react';
import { Collaborator } from '../../../state/confluence/collaborators/types';
import AvatarGroup, { AvatarProps } from '@atlaskit/avatar-group';
import styled from 'styled-components';

import Alvin from './assets/Alvin.svg';
import Eliot from './assets/Eliot.svg';
import Katina from './assets/Katina.svg';
import Norah from './assets/Norah.svg';
import Vania from './assets/Vania.svg';
import { ProfileCardTrigger, ProfileClient } from '@atlaskit/profilecard';
import Avatar from '@atlaskit/avatar';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from '../messages';

interface Props {
  collaborators?: Collaborator[];
  cloudId: string;
}

interface PopupAvatarWithCloudIdProps {
  cloudId: string;
}

interface PopupAvatarProps {
  id: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 36px;
`;

const DIRECTORY_URL = '/gateway/api/directory/graphql';

const fallback = [
  ['vania', Vania],
  ['alvin', Alvin],
  ['katina', Katina],
  ['eliot', Eliot],
  ['norah', Norah],
].map(([name, src]) => ({ name, src, id: '' }));

const openUserProfileWindow = (userId: string) =>
  window.open(getUserProfileUrl(userId), '_blank');

const getUserProfileUrl = (userId: string): string =>
  `/wiki/display/~${userId}`;

const PopupAvatar = (
  props: AvatarProps &
    PopupAvatarProps &
    PopupAvatarWithCloudIdProps &
    InjectedIntlProps,
) => {
  const profileClient = new ProfileClient({
    url: DIRECTORY_URL,
  });

  return (
    <ProfileCardTrigger
      trigger="hover"
      userId={props.id}
      resourceClient={profileClient}
      cloudId={props.cloudId}
      actions={[
        {
          label: props.intl.formatMessage(messages.viewProfile),
          callback: () => {
            openUserProfileWindow(props.id);
          },
        },
      ]}
    >
      <Avatar {...props} onClick={() => {}} />
    </ProfileCardTrigger>
  );
};

const PopupAvatarWithIntl = injectIntl(PopupAvatar);

const CollaboratorsAvatarGroup = ({ collaborators, cloudId }: Props) => {
  const { data, hasCollaborators } = useMemo(
    () => ({
      data:
        !collaborators || !Boolean(collaborators?.length)
          ? fallback
          : collaborators.map((c) => ({
              id: c.id,
              key: c.id,
              name: c.name,
              src: c.avatarUrl,
            })),
      hasCollaborators: !Boolean(collaborators?.length), // Do not show tooltips for fallback avatar icons
    }),
    [collaborators],
  );

  const handleAvatarClicked = (
    _event: React.MouseEvent,
    _analyticsEvent: any,
    index: number,
  ) => {
    if (!hasCollaborators) {
      openUserProfileWindow(data[index].id); // Do not try and open a profile on click if there are no collaborators (fallback to meeples)
    }
  };

  const PopupAvatarWithCloudId = (props: AvatarProps & PopupAvatarProps) => (
    <PopupAvatarWithIntl {...props} cloudId={cloudId} />
  );

  return (
    <Wrapper>
      <AvatarGroup
        appearance="stack"
        data={data}
        // @ts-ignore the AvatarGroup typing says it won't accept this type..
        avatar={hasCollaborators ? Avatar : PopupAvatarWithCloudId} // Do not show profile popup if there are no collaborators
        size="medium"
        isTooltipDisabled={hasCollaborators}
        onAvatarClick={handleAvatarClicked}
      />
    </Wrapper>
  );
};

export default CollaboratorsAvatarGroup;
