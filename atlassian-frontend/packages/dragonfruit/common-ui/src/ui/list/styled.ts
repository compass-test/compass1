import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

import { ListItem } from './list-item';

export const List = styled.ul`
  border: 1px solid ${colors.N40};
  border-radius: 3px;
  overflow: hidden; // Hide overflow on the rounded corners

  ${ListItem}:not(:last-child) {
    border-bottom: 1px solid ${colors.N40};
  }

  // These styles remove default ul styles
  margin: 0;
  padding-left: 0;
  list-style-type: none;
`;
