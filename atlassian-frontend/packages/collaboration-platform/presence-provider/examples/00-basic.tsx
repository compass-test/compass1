import React from 'react';

import { PresenceParticipant, PresenceProvider } from '../src';

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

export default () => (
  <PresenceProvider
    spaceKey="ari:cloud:confluence:XYZ:page/XYZ"
    presenceServerUrl="https://presence-service--app.ap-southeast-2.dev.atl-paas.net/"
    getUser={mockGetUser}
    initialData={{ accountId: mockAccountId }}
  >
    {({ participants, sessionId }) => (
      <div data-sessionid={sessionId}>
        {participants &&
          participants.map(participant => (
            <div key={participant.sessionId}>{participant.name}</div>
          ))}
      </div>
    )}
  </PresenceProvider>
);
