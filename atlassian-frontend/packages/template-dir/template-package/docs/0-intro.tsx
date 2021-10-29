import React from 'react';

import { Example, md, Props } from '@atlaskit/docs';

export default md`

  TEMPLATE_DESCRIPTION

  ## Usage

  ${(
    <Example
      packageName="TEMPLATE_PACKAGE_NAME"
      Component={require('../examples/00-basic').default}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(
    <Props
      heading="TEMPLATE_COMPONENT_NAME Props"
      props={require('!!extract-react-types-loader!../src')}
    />
  )}
`;
