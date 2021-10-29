import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  md,
  Props,
} from '@atlaskit/docs';

const planNameFieldProps = require('!!extract-react-types-loader!../extract-react-types/plan-name-field-props');

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

  ${code`import PlanNameField from '@atlassian/mpt-plan-configuration';`}

  ${(<Props props={planNameFieldProps} />)}
  `;
