import styled from 'styled-components';

import { sizes } from '@atlaskit/icon';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  border-radius: ${borderRadius()};
  height: ${sizes.medium};
  width: ${sizes.medium};
`;

export const Text = styled.span`
  margin-left: ${gridSize()}px;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
