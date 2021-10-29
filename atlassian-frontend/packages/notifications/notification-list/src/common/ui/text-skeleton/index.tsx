import styled from '@emotion/styled';

import { N20 } from '@atlaskit/theme/colors';

export const TextSkeleton = styled.div<{
  height?: string;
  width?: string;
  marginBottom?: string;
  color?: string;
}>`
  height: ${(props) => props.height || '16px'};
  width: ${(props) => props.width || '269px'};
  border-radius: 3px;
  background-color: ${(props) => props.color || N20};
  margin-bottom: ${(props) => props.marginBottom || '4px'};
`;
