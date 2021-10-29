import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const HeaderWrapper = styled.div`
  margin: ${gridSize() * 3}px ${gridSize() * 8}px;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Heading = styled.h3``;

export const PackageSelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;
