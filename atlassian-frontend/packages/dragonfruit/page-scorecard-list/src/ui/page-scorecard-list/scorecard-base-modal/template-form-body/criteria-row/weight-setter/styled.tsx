import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import * as typography from '@atlaskit/theme/typography';

export const EditorWrapper = styled.div`
  ${typography.h400}
  display: flex;
  align-items: center;
  margin-top: 0px;

  form div {
    margin-top: 0px;
  }

  form input {
    width: ${gridSize() * 4.5}px;
  }
`;
