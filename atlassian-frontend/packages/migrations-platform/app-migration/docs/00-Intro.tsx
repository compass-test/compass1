import React from 'react';

import {
  AtlassianInternalWarning,
  DevPreviewWarning,
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

  # App Migration Package

  The package includes all the shared components for app migration. Including

  - AppConsentPage
`;
