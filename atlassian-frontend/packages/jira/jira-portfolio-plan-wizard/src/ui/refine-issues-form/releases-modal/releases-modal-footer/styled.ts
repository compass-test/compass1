import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const InnerWrapper = styled.div`
  display: flex;
  flex: auto;
  align-items: center;
`;

export const Spacing = styled.div`
  width: ${gridSize() / 2}px;
`;

export const ExcludedCountWrapper = styled.div`
  margin-right: auto;
`;
