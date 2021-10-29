import React from 'react';

import { Example, md } from '@atlaskit/docs';

export default md`


## Insets✨
Containers that have guaranteed whitespace between their boundaries and the content. Referred to as padding in CSS.

### Modes
Insets come in three different types:
- SQUARE: Padding will be equal in all sides
- STRETCH: Larger padding at top and bottom with lower padding at the sides
- SQUISH: Larger padding values at the sides and lower padding at top & bottom.

  ${(
    <Example
      packageName="@atlassian/commerce-layout"
      Component={require('../src/common/ui/spacing/inset/examples').default}
      title="Basic example"
      source={require('!!raw-loader!../src/common/ui/spacing/inset/examples')}
    />
  )}

`;
