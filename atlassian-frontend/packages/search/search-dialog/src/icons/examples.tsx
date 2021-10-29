import React from 'react';
import * as Icons from '.';
import styled from '@emotion/styled';

const Td = styled.td`
  border: 1px solid #ededed;
  text-align: center;
  padding: 1em;
`;

const HeadTd = styled.td`
  text-align: center;
  padding: 1em;
  background: #ededed;
  font-weight: bold;
`;

export const Collection = () => {
  return (
    <table>
      <thead>
        <HeadTd>Display Name</HeadTd>
        <HeadTd>Component</HeadTd>
      </thead>
      <tbody>
        {Object.values(Icons).map((Icon, idx) => (
          <tr>
            <Td>
              {Icon.displayName ? (
                <code>{Icon.displayName}</code>
              ) : (
                'No display name'
              )}
            </Td>
            <Td>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <Icon key={idx} />
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default { title: 'Search Dialog/Icons' };
