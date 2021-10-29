import React from 'react';

import { Example, md, Props } from '@atlaskit/docs';

export default md`

  undefined

  ## Usage This package connects the React Final Form form component and utilities with atlaskit components through an extended version of Field that maps the required props to make this possible.✨

  ${(
    <Example
      packageName="@atlassian/commerce-final-form"
      Component={require('../examples/01-basic').default}
      title="Basic example"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}
  ${(
    <Example
      packageName="@atlassian/commerce-final-form"
      Component={require('../examples/02-with-disabled-fields').default}
      title="Basic example"
      source={require('!!raw-loader!../examples/02-with-disabled-fields')}
    />
  )}
  ${(
    <Example
      packageName="@atlassian/commerce-final-form"
      Component={require('../examples/03-focus-on-errors').default}
      title="Basic example"
      source={require('!!raw-loader!../examples/03-focus-on-errors')}
    />
  )}
  ${(
    <Example
      packageName="@atlassian/commerce-final-form"
      Component={require('../examples/04-with-validation').default}
      title="Basic example"
      source={require('!!raw-loader!../examples/04-with-validation')}
    />
  )}

  ${(
    <Props
      heading="CommerceForm Props"
      props={require('!!extract-react-types-loader!../src')}
    />
  )}
`;
