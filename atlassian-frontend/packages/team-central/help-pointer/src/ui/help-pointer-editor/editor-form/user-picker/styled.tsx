import styled from '@emotion/styled';

import { N10, N40 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const UserPickerStyledDiv = styled.div`
  > div > div {
    background-color: ${token(
      'color.background.transparentNeutral.hover',
      N10,
    )};
    border-color: ${token('color.border.neutral', N40)};
  }
`;
