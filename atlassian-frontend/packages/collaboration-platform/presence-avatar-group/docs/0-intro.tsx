import { code, md } from '@atlaskit/docs';

export default md`
  An avatar group displays users' presence as a number of avatars grouped together in a stack.

  This package is restricted to Atlassian internal registry and can only be installed by Atlassians.
## Usage
${code`
import React from 'react';

import { PresenceAvatarGroup } from '@atlassian/presence-avatar-group';

const participants: CollabParticipant[] = [
  { sessionId: 'rick', name: 'Rick Sanchez', avatar: '' },
  { sessionId: 'morty', name: 'Morty Smith', avatar: '' },
];

const PresenceAvatarGroupExample = () => (
  <PresenceAvatarGroup sessionId="rick" participants={participants} />
);

export default PresenceAvatarGroupExample;
`}
`;
