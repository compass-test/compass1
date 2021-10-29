// next.js includes styled-jsx so no need to explicitely import it
/* eslint-disable import/no-extraneous-dependencies */
import css from 'styled-jsx/css';
import { colors, borderRadius } from '@atlaskit/theme';

export const contributorContainerStyles = css`
  .cla-contributor-container {
    border: 1px solid ${colors.N40};
    border-radius: ${borderRadius()}px;
    margin-top: 2em;
    padding: 0 1em 1em 1em;
  }
`;
