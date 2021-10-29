import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const LinkSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${gridSize() * 2}px;
`;
