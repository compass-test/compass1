import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { h400 } from '@atlaskit/theme/typography';

export const Container = styled.div`
  text-align: center;
`;

export const Title = styled.p`
  ${h400()}
`;

export const Body = styled.p`
  margin-top: ${gridSize() * 1}px;
  margin-bottom: ${gridSize() * 2}px;
`;

export const Image = styled.img`
  display: block;
  margin: ${gridSize() * 3}px auto ${gridSize() * 3}px;
  width: 55px;
  height: 73px;
  max-width: 55px;
  max-height: 73px;
`;
