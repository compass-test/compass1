import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const CriteriasWrapper = styled.div`
  margin-top: ${gridSize() * 3}px;
`;

export const CustomModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1;
`;

export const ModalDivider = styled.div`
  border-bottom: 1px solid ${colors.N30A};
`;
