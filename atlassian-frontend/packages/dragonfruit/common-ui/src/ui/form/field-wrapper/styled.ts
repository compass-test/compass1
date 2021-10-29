import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const FieldWrapper = styled.div`
  &:not(:first-child) {
    margin-top: ${gridSize() * 2}px;
  }
`;
