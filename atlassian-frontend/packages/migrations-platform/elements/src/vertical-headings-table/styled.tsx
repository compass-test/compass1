import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Caption = styled.caption`
  color: ${colors.N900};
  font-weight: bold;
  font-size: 14px;
  margin: 0px;
  margin-bottom: 12px;
`;

export const Row = styled.tr`
  display: flex;
  padding: ${gridSize()}px 0;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const RowHeader = styled.th`
  color: ${colors.N200};
  word-break: break-word;
  text-align: left;
  flex: 1;
  margin-right: 22px;
  padding: 0;
  font-weight: 500;

  max-width: 168px;
`;

export const RowValue = styled.td`
  word-break: break-word;
  color: ${colors.N800};
  flex: 2.75;
  padding: 0;

  max-width: 371px;
`;

export const TableBody = styled.tbody`
  border-bottom: none;
`;
