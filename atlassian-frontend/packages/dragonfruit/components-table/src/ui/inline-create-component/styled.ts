import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const CreateComponentWrapper = styled.div`
  button {
    color: ${colors.N200} !important;
    margin-left: ${gridSize() * -2}px;
    :hover {
      color: #818899 !important
      text-decoration: underline;
    }
  }
`;

export const CreateComponentFormWrapper = styled.div`
  margin-top: -${gridSize() * 5}px;
`;
