import styled from 'styled-components';

import { N20, N40 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const ImportLogsHeading = styled.div`
  width: 700px;
  font-weight: bold;
  margin-bottom: ${gridSize()}px;
`;

export const LogsTextArea = styled.div`
  width: 700px;
  background-color: ${N20};
  padding: ${gridSize() * 1.5}px;
  border-radius: 4px;
  border: 1px solid ${N40};
  height: 120px;
  overflow: auto;
  font-family: monospace;
  white-space: pre;
`;
