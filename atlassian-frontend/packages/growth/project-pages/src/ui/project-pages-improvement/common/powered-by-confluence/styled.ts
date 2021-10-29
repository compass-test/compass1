import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { N300 } from '@atlaskit/theme/colors';

export const PoweredBy = styled.div`
  font-size: 11px;
  line-height: 14px;
  display: inline-flex;
  align-items: center;
  color: ${N300};
`;

export const ButtonWrapper = styled.div`
  margin-left: ${gridSize() / 2}px;
`;

export const LogoWrapper = styled.div`
  margin: 0 ${gridSize() / 2}px;
`;
