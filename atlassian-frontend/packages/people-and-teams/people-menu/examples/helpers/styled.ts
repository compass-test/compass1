import styled from 'styled-components';

import { N40 } from '@atlaskit/theme/colors';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

export const ExampleWrapper = styled.div`
  margin: 20px;
`;

export const AppWrapper = styled.div`
  margin: 20px;
  padding-bottom: ${gridSize}px;
  border: 1px solid ${token('color.border.neutral', N40)};
  border-radius: ${borderRadius}px;
`;

export const AppBackgroundImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  box-sizing: border-box;
  padding: 60px 100px;
`;
