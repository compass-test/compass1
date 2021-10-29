import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Container = styled.div`
  margin-top: ${gridSize() * 3}px;
`;
export const TableWrapper = styled.div`
  margin-left: ${gridSize() * 1.5}px;
`;

export const EmptyStateWrapper = styled.div`
  display: 'none';
  lineheight: '0';
  height: '0';
`;

export const EmptyStateDescriptionWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: ${gridSize() * 38}px;
  overflow: hidden;
`;

export const CreateComponentFormWrapper = styled.div`
  margin-top: -${gridSize() * 5}px;
`;
