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

This component allows to pick colors from color palette.

## Usage

${code`
  import ufo from '@atlassian/ufo';
`}

${(
  <Example
    packageName="@atlaskit/color-picker"
    Component={require('../examples/00-basic').default}
    source={require('!!raw-loader!../examples/00-basic')}
    title="Basic Usage"
    language="js"
  />
)}
`;
