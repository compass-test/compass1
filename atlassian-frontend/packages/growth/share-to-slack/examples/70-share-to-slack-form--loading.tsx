import React from 'react';

import noop from 'lodash/noop';

import ShareToSlackForm from '../src/ui/ShareToSlack/forms/ShareToSlackForm';

import fakeAvatar from './helpers/fakeAvatar';
import VrWrapper, { styledForDialog } from './helpers/VrWrapper';

const teams = [{ id: '', avatar: fakeAvatar, name: 'Team 1' }];

const Component = styledForDialog(ShareToSlackForm);

export default function Example() {
  return (
    <VrWrapper>
      <Component
        product="jira"
        isLoadingTeams={true}
        teams={teams}
        selectedTeam={teams[0]}
        onChangeSelectedTeam={noop}
        onAddTeam={noop}
        isLoadingConversations={true}
        conversations={undefined}
        selectedConversation={undefined}
        onChangeSelectedConversation={noop}
        share={noop}
        isSharing={false}
      />
    </VrWrapper>
  );
}
