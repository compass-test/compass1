import { code, md } from '@atlaskit/docs';

export default md`

  A provider to support [presence-service](https://bitbucket.org/atlassian/presence-service/src/master/).

  This package is restricted to Atlassian internal registry and can only be installed by Atlassians.

## Usage
${code`
import React from 'react';

import { PresenceProvider } from '@atlassian/presence-provider';
import { PresenceAvatarGroup } from '@atlassian/presence-avatar-group';

const spaceKey = 'ari:cloud:confluence:XYZ:page/XYZ';
const presenceServerUrl = 'https://presence-service--app.ap-southeast-2.dev.atl-paas.net/';

const mockGetUser = (): Promise<any> =>
  Promise.resolve({
    sessionId: 'demo-session-id',
    avatar: '',
    name: 'Rick Sanchez',
});

const PresenceProviderExample = () => (
  <PresenceProvider
    spaceKey={spaceKey}
    presenceServerUrl={presenceServerUrl}
    getUser={mockGetUser}
    initialData={{ accountId: 'demo-account-id' }}
  >
    {({ participants, sessionId }) => (
      <PresenceAvatarGroup sessionId={sessionId} participants={participants} />
    )}
  </PresenceProvider>
);

export default PresenceProviderExample;
`}
`;
