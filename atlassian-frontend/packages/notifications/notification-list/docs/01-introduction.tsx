import React from 'react';

import { Example, md } from '@atlaskit/docs';

export default md`

  Docs are available in the sidebar:
  - [Running locally](notification-list/docs/running-locally)
  - [Testing](notification-list/docs/testing)
  - [Implementing](notification-list/docs/implementing)

  This is the package for the new notifications experience, \`notification-list\`. Updates from the [existing experience](https://bitbucket.org/atlassian/pf-home-ui/src/master/) include:

  - The ability to filter notifications by read state (i.e. read and unread) with a new “Only show unread” checkbox in the top right.
  - Notifications can no longer be deleted, now only marked as read or unread (and filtered out as such).
  - The experience is now user centric - that is, notifications from all sites will now appear in the list. (The current experience filters notifications to the current cloud id)

  _Note._ Self-service notifications are not yet live for the in-app notifications drawer.

  ## Questions / need help or support?
  
  The \`notification-list\` component is owned by Your Work; reach out at [#notificationsplatform](https://atlassian.slack.com/archives/CFG86D0HF) on Slack (please use the !disturbed alias during business hours).

  ${(
    <Example
      Component={require('../examples/00-basic').default}
      title="Basic notification list"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}
`;
