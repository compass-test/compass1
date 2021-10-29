import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  md,
  Props,
} from '@atlaskit/docs';

const buttonsProps = require('!!extract-react-types-loader!../src/buttons');

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

  ${code`import Buttons from '@atlassian/mpt-elements';`}

  ${(<Props props={buttonsProps} />)}
  `;
