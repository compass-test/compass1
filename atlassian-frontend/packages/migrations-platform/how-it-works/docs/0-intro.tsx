import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  md,
  Props,
} from '@atlaskit/docs';

const howItWorksProps = require('!!extract-react-types-loader!../extract-react-types/how-it-works');

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

  ${code`import { HowItWorks } from '@atlassian/mpt-how-it-works';`}

  ${(<Props props={howItWorksProps} />)}

`;
