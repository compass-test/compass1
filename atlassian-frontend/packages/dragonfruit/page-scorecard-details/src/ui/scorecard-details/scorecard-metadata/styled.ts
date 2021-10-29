import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { fontSizeSmall, gridSize } from '@atlaskit/theme/constants';

export const MetadataWrapper = styled.div`
  // override bottomBar margin
  margin-top: -${gridSize() * 2}px;
`;
export const OwnerWrapper = styled.div`
  color: ${colors.N400};
  font-size: ${fontSizeSmall()}px;
`;

export const ImportanceWrapper = styled.div`
  color: ${colors.N400};
  display: flex;
  margin-top: ${gridSize}px;
  font-size: ${fontSizeSmall()}px;
`;

export const ImportanceIconWithTextWrapper = styled.div`
  margin-left: ${gridSize}px;
  display: flex;
  align-items: center;
`;
