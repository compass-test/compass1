import { Link } from '@atlassian/search-dialog';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';
import { N500, N20, N30 } from '@atlaskit/theme/colors';

export const MoreFiltersLink = styled(Link)`
  display: block;
  text-align: center;
  border-radius: 3px;
  color: ${N500};
  cursor: pointer;
  padding: ${gridSize()}px;
  background-color: ${N20};
  transition: background 0.1s ease-out,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  &:hover {
    color: ${N500};
    background-color: ${N30};
    text-decoration: none;
    transition: background 0s ease-out,
      box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
  }
  :visited {
    color: ${N500};
  }
`;
