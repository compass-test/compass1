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

  This package contain utils for MPKit, some contents:

    - Hook utils
    - Any other util stuffs (functions etc)

  See the current folder structure before you are adding a new utility
`;
