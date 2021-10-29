import React from 'react';
import { css, Global } from '@emotion/core';
import { N20, N800, N300, B400, B300 } from '@atlaskit/theme/colors';

const fonts = css`
  @font-face {
    font-family: 'Charlie Display';
    src: url('/CharlieDisplay-Regular.eot');
    src: url('/CharlieDisplay-Regular.eot?#iefix') format('embedded-opentype'),
      url('/CharlieDisplay-Regular.woff2') format('woff2'),
      url('/CharlieDisplay-Regular.woff') format('woff'),
      url('/CharlieDisplay-Regular.ttf') format('truetype'),
      url('/CharlieDisplay-Regular.svg#Charlie Display') format('svg');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Charlie Display';
    src: url('/CharlieDisplay-Semibold.eot');
    src: url('/CharlieDisplay-Semibold.eot?#iefix') format('embedded-opentype'),
      url('/CharlieDisplay-Semibold.woff2') format('woff2'),
      url('/CharlieDisplay-Semibold.woff') format('woff'),
      url('/CharlieDisplay-Semibold.ttf') format('truetype'),
      url('/CharlieDisplay-Semibold.svg#Charlie Display Semibold') format('svg');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const displayFontStack = `'Charlie Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;
export const systemFontStack = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;
export const monospaceFontStack = `'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace`;

// todo: change to rem, unpx line height
const headlines = css`
  .headline1,
  .headline2,
  .headline3,
  .hero-text {
    font-family: ${displayFontStack};
    font-weight: 400;
    color: ${N800};
  }

  .hero-text {
    font-size: 52px;
    line-height: calc(60 / 52);
  }

  .headline1 {
    font-size: 36px;
    line-height: calc(44 / 36);
  }

  .headline2 {
    font-size: 24px;
    line-height: calc(32 / 24);
  }

  .headline3 {
    font-family: ${displayFontStack};
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    line-height: calc(16 / 12);
    letter-spacing: 1px;
  }
`;

const headings = css`
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5 {
    font-family: ${systemFontStack};
    font-weight: 400;
    color: ${N800};
    &:first-child {
      margin-top: 0;
      padding-top: 0;
    }
  }

  /* Hidden div on Examples pages throws this off */
  /* Also for when the main content starts with tabs */
  div[hidden] + h2,
  div[hidden] + h3,
  [data-docs-tabs] + h2,
  [data-docs-tabs] + h3 {
    margin-top: 0;
    padding-top: 0;
  }

  /* Also for when there main content starts with tabs */
  [data-docs-tabs] + h2 {
    margin-top: 0;
    padding-top: 0;
  }

  h1,
  .h1 {
    font-size: 29px;
    line-height: calc(32 / 29);
  }

  h2,
  .h2 {
    font-size: 24px;
    line-height: calc(28 / 24);
  }

  h3,
  .h3 {
    font-size: 20px;
    line-height: calc(24 / 20);
  }

  h4,
  .h4 {
    font-size: 16px;
    line-height: calc(24 / 16);
  }

  h5,
  .h5 {
    font-size: 14px;
    line-height: calc(16 / 14);
  }

  h6,
  .h6 {
    font-weight: 600;
    font-size: 12px;
    line-height: calc(16 / 12);
  }
`;

const paragraphsAndLists = css`
  p,
  li {
    color: ${N800};
    font-size: 14px;
    line-height: calc(24 / 14);
    font-weight: 400;
    > code {
      border-radius: 3px;
      padding: 4px;
      margin: 0 1px;
      background-color: ${N20};
    }
  }

  .lg {
    font-size: 16px;
  }

  .sm {
    color: ${N300};
    font-size: 12px;
    line-height: calc(14 / 11);
  }

  code,
  .code {
    font-family: ${monospaceFontStack};
    font-weight: 400;
    font-size: 12px;
    line-height: calc(20 / 12);
  }
`;

const links = css`
  a,
  .link {
    color: ${B400};
    &:hover {
      color: ${B300};
    }
  }
`;

// TODO: change to CDN for prod

const Typography = () => (
  <Global
    styles={css`
      ${fonts}
      ${headlines}
      ${headings}
      ${paragraphsAndLists}
      ${links}
    `}
  />
);

export default Typography;
