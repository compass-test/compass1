// next.js includes styled-jsx so no need to explicitely import it
/* eslint-disable import/no-extraneous-dependencies */
import css from 'styled-jsx/css';
import { gridSize } from '@atlaskit/theme';

const minColumnWidth = gridSize() * 32;

export const formStyles = css`
  .cla-container {
    display: flex;
    flex-wrap: wrap;
  }

  .cla {
    flex: 1 1 ${minColumnWidth}px;
    min-width: ${minColumnWidth}px;
    padding: 0 0 2em 0;
  }

  .cla-footer {
    display: flex;
    margin: 1em 0 0 2em;
  }

  .cla-footer-item {
    align-items: center;
    display: flex;
    width: 50%;
  }

  .cla-footer-item.checkbox {
    margin-top: -${gridSize()}px;
  }

  .cla-footer-item.submit {
    justify-content: flex-end;
  }

  .scrollable-area {
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .cla-legal {
    padding: 2em;
  }
`;
