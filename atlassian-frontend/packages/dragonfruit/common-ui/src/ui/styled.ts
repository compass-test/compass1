import { css } from 'styled-components';

export const lineClamp = (lines: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;
