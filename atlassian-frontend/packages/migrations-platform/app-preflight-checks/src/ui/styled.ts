import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { N300 } from '@atlaskit/theme/colors';

const spacing = gridSize() * 3;

export const Description = styled.p`
  margin-bottom: ${spacing}px;
`;

export const List = styled.ul`
  margin: ${spacing}px 0;
  padding-left: ${gridSize() * 2}px;
`;

export const ListRow = styled.li`
  margin: ${gridSize()}px 0;
`;

export const Table = styled.table`
  margin: 16px 0;
  border-spacing: 0;

  th,
  td {
    text-align: left;
    padding: 6px 0;
    font-size: 14px;
  }

  th {
    font-weight: 600;
    color: ${N300};
    padding-bottom: 12px;
  }

  thead,
  tbody {
    border-bottom: 0;
  }
`;
