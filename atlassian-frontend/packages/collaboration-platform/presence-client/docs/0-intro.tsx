import { code, md } from '@atlaskit/docs';

export default md`
## Introduction:
  This client is used to connect to ([presence-service](https://bitbucket.org/atlassian/presence-service/src/master/) to get the information of user presences.
  The client will listen to those events to know the presences of users: 'participant:joined', 'participant:left'.
  It's up to the consumers to use those information to render avatar groups or broadcast messages.

  The client offers 2 main features:
  - Synchronized presence state: this is to synchronize users' presence between browser sessions.
  - Broadcast messages: this feature is to fire a messages and forget. Messages are broadcasted but not saved anywhere.

  This package is private to Atlassian.

## How to initialize a new client:
${code`
import { Presence } from '@atlassian/presence-client';

const presentClient = new Presence({
  spaceKey: 'string',
  presenceServerUrl: 'string',
  initialData: 'anything'
  });

// this to connect to presence BE service
presenceClient.on('connected', () => {
  // your implementation goes here
});
`}
`;
