// next.js includes styled-jsx so no need to explicitely import it
/* eslint-disable import/no-extraneous-dependencies */
import css from 'styled-jsx/css';
import { colors, borderRadius, gridSize } from '@atlaskit/theme';

const cardWidth = gridSize() * 28;

export const cardStyles = css`
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 2em;
  }

  .card {
    background: ${colors.N20};
    border: 1px solid ${colors.N40};
    border-radius: ${borderRadius()}px;
    flex: 1 1 ${cardWidth}px;
    min-width: ${cardWidth}px;
    padding: 1em;
    width: ${cardWidth}px;
  }

  .card-link {
    color: inherit;
    display: block;
    text-decoration: none;
    margin: 0 0 2em 0;
  }
`;
