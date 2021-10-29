import React from 'react';

import { AtlassianInternalWarning, Example, md } from '@atlaskit/docs';

import BasicExample from '../examples/01-basic';
import SlackDisabledExample from '../examples/02-slack-disabled';

export default md`
  ${(<AtlassianInternalWarning />)}

  This component provides a form for sharing the current URL to Slack.

  ## Usage

  See the following examples:

  ${(
    <Example
      packageName="@atlassian/share-to-slack"
      Component={BasicExample}
      title="Basic"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}

  ## Disabled Slack integration

  Sometimes the Slack integration is disabled by an admin. When users attempt to
  share to Slack, they’ll be notified that Slack is disabled and that an admin
  can enable it.

  ${(
    <Example
      packageName="@atlassian/share-to-slack"
      Component={SlackDisabledExample}
      title="Slack disabled"
      source={require('!!raw-loader!../examples/02-slack-disabled')}
    />
  )}
`;
