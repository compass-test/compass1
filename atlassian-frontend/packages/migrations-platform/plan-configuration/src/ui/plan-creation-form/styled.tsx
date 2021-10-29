import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Legend = styled.div`
  margin-bottom: ${gridSize() * 5}px;
`;

export const FieldContainer = styled.div`
  padding-bottom: ${gridSize() * 2}px;
`;

export const Form = styled.form`
  max-width: 385px;
  margin: 0;
`;
