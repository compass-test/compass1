import React from 'react';

import {
  PresenceParticipant,
  PresenceProvider,
} from '@atlassian/presence-provider';

import { PresenceAvatarGroup } from '../src';

const mockAccountId = 'demo-account-id';

const mockUsers: { [key: string]: PresenceParticipant } = {
  [mockAccountId]: {
    sessionId: 'demo-session-id',
    avatar: '',
    name: 'Homer Simpson',
  },
};

const mockGetUser = (accountId: string): Promise<PresenceParticipant> =>
  Promise.resolve(mockUsers[accountId]);

const WithProvider = () => (
  <PresenceProvider
    spaceKey="ari:cloud:confluence:XYZ:page/XYZ"
    presenceServerUrl="https://presence-service--app.ap-southeast-2.dev.atl-paas.net/"
    getUser={mockGetUser}
    initialData={{ accountId: mockAccountId }}
  >
    {({ participants, sessionId }) => (
      <PresenceAvatarGroup sessionId={sessionId} participants={participants} />
    )}
  </PresenceProvider>
);

export default WithProvider;
