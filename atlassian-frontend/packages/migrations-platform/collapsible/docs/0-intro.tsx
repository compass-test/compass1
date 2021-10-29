import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

const CollapsibleServerExample = require('../examples/00-CollapsibleServerWithContent')
  .default;
const CollapsibleCloudExample = require('../examples/04-CollapsibleCloudWithContent')
  .default;

const collapsibleCloudProps = require('!!extract-react-types-loader!../extract-react-types/collapsible-cloud');
const collapsibleServerProps = require('!!extract-react-types-loader!../extract-react-types/collapsible-server');

export default md`
  ${(
    <div style={{ marginBottom: '0.5rem' }}>
      <AtlassianInternalWarning />
    </div>
  )}

  It exports two components:

  - CollapsibleServer
  - CollapsibleContent

  ## Usage

  ### CollapsibleServer

  ${code`import { CollapsibleServer } from '@atlassian/mpt-collapsible';`}

  ${(
    <Example
      packageName="@atlassian/mpt-collapsible"
      Component={() => <CollapsibleServerExample height="500px" />}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-CollapsibleServerWithContent')}
    />
  )}

  ${(<Props props={collapsibleServerProps} />)}

  ### CollapsibleServer

  ${code`import { CollapsibleCloud } from '@atlassian/mpt-collapsible';`}

  ${(
    <Example
      packageName="@atlassian/mpt-collapsible"
      Component={() => <CollapsibleCloudExample height="500px" />}
      title="Basic example"
      source={require('!!raw-loader!../examples/04-CollapsibleCloudWithContent')}
    />
  )}

  ${(<Props props={collapsibleCloudProps} />)}
`;
