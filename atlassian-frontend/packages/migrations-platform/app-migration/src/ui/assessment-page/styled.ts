import styled from 'styled-components';

import { N200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

import { tableWrapperStyles } from '../../common/ui/app-table';

const GRID_SIZE = gridSize();

export const Wrapper = styled.div`
  ${tableWrapperStyles}

  margin-top: ${GRID_SIZE * 4}px;
`;

export const FooterText = styled.span`
  color: ${N200};
  white-space: nowrap;
`;
