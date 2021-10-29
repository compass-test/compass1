import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

const ChooseToMigrateApps = require('../examples/00-basic').default;

const ChooseToMigrateAppsProps = require('!!extract-react-types-loader!../extract-react-types/ChooseToMigrateApps.tsx');

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

  # Choose to migrate apps

  ${code`import ChooseToMIgrateApps from '@atlassian/mpt-choose-to-migrate-apps';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={ChooseToMigrateApps}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(<Props props={ChooseToMigrateAppsProps} />)}
  `;
