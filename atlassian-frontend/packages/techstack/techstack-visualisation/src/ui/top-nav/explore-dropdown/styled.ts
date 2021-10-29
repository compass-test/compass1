import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${gridSize() * 20}px;
  margin: ${gridSize()}px;
`;

export const Header = styled.div`
  fontsize: ${headingSizes.h600.size}px;
  margin: 8px 0;
`;
