import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
} from '@atlaskit/docs';

export default md`
${(
  <>
    <div style={{ marginBottom: '0.5rem' }}>
      <AtlassianInternalWarning />
    </div>
    <div style={{ marginTop: '0.5rem' }}>
      <DevPreviewWarning />
    </div>
  </>
)}

## Usage
This package provides a drawer component with an invite users form.

Internally, it uses \`@atlassian/invite-people\`, and shares
some of the common props.

  ${code`import InvitePeople from '@atlassian/invite-people-drawer;`}

  ${(
    <Example
      packageName="@atlassian/invite-people-drawer"
      Component={require('../examples/00-default').default}
      title="Example"
      source={require('!!raw-loader!../examples/00-default')}
    />
  )}
`;
