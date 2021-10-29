import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

const BasicExample = require('../examples/00-Radio-Label').default;

const radioLabelProps = require('!!extract-react-types-loader!../src/ui/RadioLabel');

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

  ${code`import RadioLabel from '@atlassian/mpt-radio-label';`}

  ${(
    <Example
      packageName="@atlaskit/mpt-radio-label"
      Component={() => <BasicExample height="500px" />}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-Radio-Label')}
    />
  )}

  ${(<Props props={radioLabelProps} />)}
`;
