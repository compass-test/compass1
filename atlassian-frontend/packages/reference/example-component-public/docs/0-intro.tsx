import React from 'react';

import { Example, md, Props } from '@atlaskit/docs';

export default md`

  This is a reference example of a component. Duplicate this package to your team folder and get started.

  ## Usage

  ${(
    <Example
      packageName="@atlaskit/example-component-public"
      Component={require('../examples/00-basic').default}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(
    <Props
      heading="Example Component Props"
      props={require('!!extract-react-types-loader!../src')}
    />
  )}
`;
