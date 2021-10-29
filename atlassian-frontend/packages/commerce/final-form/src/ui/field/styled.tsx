import styled from '@emotion/styled';

import { R400 } from '@atlaskit/theme/colors';
import { fontFamily, gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';

// FIXME: All these are defined in design-system TODO: create a PR exporting these

// find this style at: https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/design-system/form/src/styled/Field.ts
export const Label = (styled.label as any)`
  ${h200()};
  display: inline-block;
  font-family: ${fontFamily()};
  margin-bottom: ${gridSize() * 0.5}px;
  margin-top: 0;
  ${({ isRequired }: any) => {
    if (isRequired) {
      return `:after{
        content: "*";
        color: ${R400};
        font-family: ${fontFamily()};
        padding-left: ${gridSize() * 0.25}px;
      }`;
    }
  }};
`;

// find this style at: https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/design-system/form/src/styled/Field.ts
