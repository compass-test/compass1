import styled from 'styled-components';

import { N30 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const CodeBlockWrapper = styled.div`
  // this targets the root element of the CodeBlock AtlasKit component
  > span {
    border-radius: 0 0 3px 3px;
  }
`;

export const CodeHeader = styled.div`
  background: ${N30};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${gridSize()}px ${gridSize()}px ${gridSize()}px ${gridSize() * 4}px;
  border-bottom: 1px solid #dfe1e6;
  border-radius: 3px 3px 0 0;
`;

export const FileName = styled.span`
  font-weight: 500;
`;
