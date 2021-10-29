import { css } from '@emotion/core';

export { flex, flexAlignCenter, nowrap } from '../../styles';

export const container = css`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-bottom: 2px solid #dfe1e6;
`;

export const headerPadding = css`
  padding: 10px;
  margin: 10px 0;
`;

export const paragraphPadding = css`
  padding: 10px;
  margin-right: 30px;
`;
