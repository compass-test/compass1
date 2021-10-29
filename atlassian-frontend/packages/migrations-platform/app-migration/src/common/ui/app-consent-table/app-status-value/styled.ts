import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  margin-left: ${gridSize()}px;
  flex-grow: 1;
`;
