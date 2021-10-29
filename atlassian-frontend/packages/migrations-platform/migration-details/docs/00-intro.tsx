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

  This package includes components for displaying information about a migration, including:

  - MigrationStatus
  - JiraMigrationConfiguration
  - JiraMigrationTasklist
  
`;
