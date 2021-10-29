/** @jsx jsx */

import { css } from '@emotion/core';

import { bold } from '../../../styles';

export const columnContainer = css`
  box-sizing: border-box;
  background: #f4f5f7;
  padding: 10px;
  border-radius: 5px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  width: 340px;
  max-height: calc(100vh - 56px - 215px);
`;

export const columnHeader = css`
  padding: 10px;
  margin: 10px 0;
  ${bold};
`;

export const scroll = css`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
