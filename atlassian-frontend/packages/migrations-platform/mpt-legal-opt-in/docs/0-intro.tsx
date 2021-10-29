import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  md,
  Props,
} from '@atlaskit/docs';

const legalOptInProps = require('!!extract-react-types-loader!../extract-react-types/mpt-legal-opt-in');

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

  ${code`import { LegalOptIn } from '@atlassian/mpt-legal-opt-in';`}

  ${(<Props props={legalOptInProps} />)}

`;
