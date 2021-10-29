import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';

export const CopyableTextIconContainer = styled.span`
  cursor: pointer;
  color: ${colors.N100};
  &:active {
    color: ${colors.N600};
  }
  vertical-align: middle;
`;

export const CopiedTextIconContainer = styled.span`
  cursor: unset;
  color: ${colors.G400};
  vertical-align: middle;
`;

export const IconsContainer = styled.span`
  margin-left: 4px;
`;
