import React from 'react';

import { code, Example, md } from '@atlaskit/docs';

export default md`


  ## The stack✨

  The stack components dictate the way elements align on top of each other and their degree of separation.

  The stack module provides two components, One component creates a basic grid stack layout with children separated by a value determined by the size prooerty

  ${code`
    <StackLayout size='LARGE'>
    {[1, 2, 3].map(() => (
      <BlueBox />
    ))}
    </StackLayout>
`}

A stand alone compobnent is also provided, usefull when the container is pre-exsisting or in instances where stack space would vary between elements

${code`
  <Stack size='LARGE'>
    <BlueBox>{size}</BlueBox>
  </Stack>
`}

These styles can be consumed either through Styled components as above or through CSS 'factories' to enhance your own styled components, these factories return css strings.

${code`
  stackLayoutFactory({ size: 'SMALL' })
  // or in standalone version
  stackFactory({ size: 'SMALL' })
`}


  ${(
    <Example
      packageName="@atlassian/commerce-layout"
      Component={require('../src/common/ui/spacing/stack/examples').default}
      title="Stack examples"
      source={require('!!raw-loader!../src/common/ui/spacing/stack/examples')}
    />
  )}
`;
