import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';

export const ThresholdItemWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const FieldWrapper = styled.div`
  margin-left: ${gridSize() * 2}px;
  min-height: 91px;
  &:nth-child(1) {
    margin-left: 0;
  }
`;
