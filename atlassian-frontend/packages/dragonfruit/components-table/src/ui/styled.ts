import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const LinkContainer = styled.div`
  padding-top: ${gridSize() / 2}px;
  padding-bottom: ${gridSize() / 2}px;
`;

export const DescriptionStyled = styled.span`
  padding: 2px;
  display: block;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 430px;
`;

export const StarStyled = styled.div`
  width: 50px;
`;

export const TeamStyled = styled.div`
  display: block;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 280px;
`;
