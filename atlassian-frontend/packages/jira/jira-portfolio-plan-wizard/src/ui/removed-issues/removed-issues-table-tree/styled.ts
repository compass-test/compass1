import styled from 'styled-components';

import { Cell } from '@atlaskit/table-tree';
import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const RowSummary = styled.div`
  display: flex;
  justify-content: center;
  width: '100%';
`;

export const RowIndent = styled.div<{ depth: number }>`
  margin-left: ${(props) => gridSize() * 3 * props.depth}px;
`;

export const TableTreeContainer = styled.div`
  [role='rowgroup'] [role='row'] {
    &:hover {
      background-color: ${colors.N20};

      .hidden-dropdown-menu {
        opacity: 1;
      }
    }
  }
  [role='gridcell'] {
    padding: 10px 25px;
  }
  [aria-controls] {
    padding-top: 2px;
  }
`;

export const RowMeatballsMenu = styled.div`
  margin-left: auto;
  flex: none;
`;

export const FullWidthCell = styled(Cell)`
  > span {
    width: 100%;
  }
`;

export const IssueSummary = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

  > img {
    margin-right: ${gridSize()}px;
  }
`;

export const EmptyTable = styled.p`
  min-height: ${gridSize() * 20}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
