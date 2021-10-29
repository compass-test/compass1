/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { Rendered, ButtonSetProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

export const ButtonSet: React.FunctionComponent<Rendered<ButtonSetProps>> = ({
  children,
}) => (
  <div
    css={css`
      display: flex;
      flex-wrap: wrap;
      > * {
        margin-top: ${gridSize()}px;
        margin-right: ${gridSize()}px;
      }
      margin-top: -${gridSize()}px;
      margin-right: -${gridSize()}px;
    `}
  >
    {children}
  </div>
);

export const ButtonSetFn: React.FunctionComponent<Props> = ({
  children,
  dispatch,
  Components,
  render,
  renderChildren,
}) => (
  <ButtonSet>
    {renderChildren({ children, dispatch, Components, render })}
  </ButtonSet>
);
