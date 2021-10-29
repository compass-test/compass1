import React from 'react';

import { AtlassianInternalWarning, Example, md } from '@atlaskit/docs';

import ConfluenceFreePlanInfoModalBasic from '../examples/01-basic';

export default md`
${(<AtlassianInternalWarning />)}
  ## Usage

  See the following examples:

  ${(
    <Example
      packageName="@atlassian/experimental-bulk-integration"
      Component={ConfluenceFreePlanInfoModalBasic}
      title="Basic"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}
`;
