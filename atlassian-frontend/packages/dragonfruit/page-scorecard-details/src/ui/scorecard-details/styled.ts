import styled from 'styled-components';

import { N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h600 } from '@atlaskit/theme/typography';

export const ErrorStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${gridSize() * 13}px;
  & > :not(:last-child) {
    margin-bottom: ${gridSize()}px;
  }
`;

export const Header = styled.div`
  ${h600()};
`;

export const Description = styled.p`
  color: ${N800};
`;

export const Image = styled.img`
  width: ${gridSize() * 20}px;
  height: ${gridSize() * 20}px;
`;

export const ComponentListWrapper = styled.div`
  margin-top: ${gridSize() * 5}px;
`;
