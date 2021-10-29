import React from 'react';

import { code, Example, md } from '@atlaskit/docs';

export default md`


## Inline✨
Inline spacers will dictate how far apart elements aligned horizontally are positioned from each other.

Inline module provides two components, One component creates a basic flex inline layout with children separated by a value determined by the size prooerty

${code`
  <InlineLayout size='LARGE'>
  {[1, 2, 3].map(() => (
    <BlueBox />
  ))}
  </InlineLayout>
`}

A stand alone compobnent is also provided, usefull when the container is pre-exsisting or in instances where inline space would vary between elements

${code`
  <Inline size='LARGE'>
    <BlueBox>{size}</BlueBox>
  </Inline>
`}

These styles can be consumed either through Styled components as above or through CSS 'factories' to enhance your own styled components, these factories return css strings.

${code`
  inlineLayoutFactory({ size: 'SMALL' })
  // or in standalone version
  inlineFactory({ size: 'SMALL' })
`}

  ${(
    <Example
      packageName="@atlassian/commerce-layout"
      Component={require('../src/common/ui/spacing/inline/examples').default}
      title="Inline components"
      source={require('!!raw-loader!../src/common/ui/spacing/inline/examples')}
    />
  )}
`;
