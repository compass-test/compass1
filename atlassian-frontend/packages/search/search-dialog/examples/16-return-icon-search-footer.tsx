/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// @ts-ignore
import React from 'react';
import { ReturnIcon, SearchFooter } from '../src';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { alert } from '../examples-helpers/window';

const Example = () => <ReturnIcon />;

export const AdvancedSearchFooter = () => (
  <SearchFooter>
    <div
      css={css`
        cursor: pointer;
      `}
      onClick={() => alert('Clicked Advanced Search Footer')}
    >
      <div
        css={css`
          display: flex;
          padding: 10px 0;
        `}
      >
        <div
          css={css`
            flex: 1;
            align-items: center;
          `}
        >
          <SearchIcon size="small" label="" />
          <span
            css={css`
              font-size: 14px;
              line-height: 20px;
              padding-left: 20px;
            `}
          >
            Advanced issue search
          </span>
        </div>
        <ReturnIcon />
      </div>
    </div>
  </SearchFooter>
);

export default Example;
