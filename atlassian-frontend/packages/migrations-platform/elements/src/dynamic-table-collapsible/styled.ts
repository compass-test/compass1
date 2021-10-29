import styled from 'styled-components';

import { N20 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const CollapsibleContentWrapper = styled.div`
  background: ${N20};
  padding: ${gridSize() * 2}px;
`;
