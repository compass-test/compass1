import { css } from '@emotion/core';

export const flex = css`
  display: flex;
  padding: 10px;
`;

export const flexAlignCenter = css`
  ${flex};
  align-items: center;
`;

export const flexJustifyCenter = css`
  ${flex};
  justify-content: center;
`;

export const flexGrow = css`
  flex-grow: 1;
`;

export const bold = css`
  font-weight: bold;
`;

export const inlineText = css`
  margin-right: 5px;
  display: inline-block;
`;

export const center = css`
  text-align: center;
`;

export const link = css`
  color: #0065ff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const nowrap = css`
  white-space: nowrap;
`;

export const transitionTiming = css`
  transition: all 0.3s;
`;
