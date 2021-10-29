import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

const marketplaceSearchProps = require('!!extract-react-types-loader!../extract-react-types/marketplace-search');

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

  ${code`import MarketplaceSearch from '@atlassian/mpt-marketplace-search-dropdown';`}

  ${(<Props props={marketplaceSearchProps} />)}

  ${(
    <Example
      packageName="@atlassian/mpt-marketplace-search-dropdown'"
      Component={require('../examples/00-no-preselected-app').default}
      title="Preselected Marketplace App"
      source={require('!!raw-loader!../examples/00-no-preselected-app')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-marketplace-search-dropdown'"
      Component={require('../examples/01-has-preselected-app').default}
      title="Has Preselected Marketplace App"
      source={require('!!raw-loader!../examples/01-has-preselected-app')}
    />
  )}
`;
