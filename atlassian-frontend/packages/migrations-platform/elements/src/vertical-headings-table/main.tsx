import React, { FC, ReactNode } from 'react';

import { Caption, Row, RowHeader, RowValue, TableBody } from './styled';

export type Props = {
  caption?: ReactNode;
  rows: Row[];
};

type Row = {
  header: string;
  content: ReactNode;
};

const VerticalHeadingsTable: FC<Props> = ({ caption, rows }) => {
  return (
    <table>
      {caption && <Caption>{caption}</Caption>}
      <TableBody>
        {rows.map((row, index) => (
          <Row key={index}>
            <RowHeader scope="row">{row.header}</RowHeader>
            <RowValue>{row.content}</RowValue>
          </Row>
        ))}
      </TableBody>
    </table>
  );
};

export default VerticalHeadingsTable;
