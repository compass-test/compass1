import React from 'react';

import { AtlassianInternalWarning, Example, md } from '@atlaskit/docs';

export default md`
  ${(
    <div style={{ marginBottom: '0.5rem' }}>
      <AtlassianInternalWarning />
    </div>
  )}

  # Migration Platform Analytics

  The package exposes components that help the migration assistants to emit the unified analytics events.

  ## Usage

  ### Listening to the emitted events

  ${(
    <Example
      packageName="@atlassian/mpt-analytics"
      Component={require('../examples/00-how-to-use-listener').default}
      title="Listen to the emitted events in your migration assistant"
      source={require('!!raw-loader!../examples/00-how-to-use-listener')}
    />
  )}

  ### How to emit a screen event?

  ${(
    <Example
      packageName="@atlassian/mpt-analytics"
      Component={require('../examples/01-how-to-fire-screen-event').default}
      title="Emit a screen event for particular page"
      source={require('!!raw-loader!../examples/01-how-to-fire-screen-event')}
    />
  )}

  ### How to emit an UI event from an Atlaskit component?

  Atlaskit components are tightly integrated with analytics-next; every event emit from Atlaskit will come with an outright event.

  ${(
    <Example
      packageName="@atlassian/mpt-analytics"
      Component={
        require('../examples/02-how-to-fire-ui-event-from-ak-component').default
      }
      title="Emit an UI event for AK component"
      source={require('!!raw-loader!../examples/02-how-to-fire-ui-event-from-ak-component')}
    />
  )}

  ### How to emit a custom UI event from any component?

  ${(
    <Example
      packageName="@atlassian/mpt-analytics"
      Component={require('../examples/03-how-to-fire-custom-ui-event').default}
      title="Emit an UI event for any component"
      source={require('!!raw-loader!../examples/03-how-to-fire-custom-ui-event')}
    />
  )}
`;
