/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { Props } from '..';

const COMPONENT_TOP_MARGIN = gridSize() * 1.5;

function applyTopMargin(element: React.ReactNode) {
  return (
    <div
      css={css`
        margin-top: ${COMPONENT_TOP_MARGIN}px;
        width: inherit;
      `}
    >
      {element}
    </div>
  );
}

const View: React.FunctionComponent<{
  nonVisibleChildren: React.ReactNode;
}> = ({ children, nonVisibleChildren }) => {
  return (
    <div
      css={css`
        display: flex;
        background: transparent;
        flex-direction: column;
        align-items: stretch;
        padding: 0;
        position: relative;
        overflow: hidden;
        align-items: flex-start;
        width: 100%;
        > * {
          margin-bottom: 0;
        }
      `}
    >
      {React.Children.map(children, (child, index) =>
        index ? (
          applyTopMargin(child)
        ) : (
          <div
            css={css`
              width: inherit;
            `}
          >
            {child}
          </div>
        ),
      )}
      {nonVisibleChildren}
    </div>
  );
};

export default View;

export const ViewFn: React.FunctionComponent<Props> = ({
  children,
  dispatch,
  Components,
  render,
  renderChildren,
}) => {
  const isChildVisible = (type: string) => !['ModalDialog'].includes(type);
  const nonVisibleChildren = children.filter(
    ({ type }) => !isChildVisible(type),
  );
  const visibleChildren = children.filter(({ type }) => isChildVisible(type));
  return (
    <View
      nonVisibleChildren={renderChildren({
        children: nonVisibleChildren,
        dispatch,
        Components,
        render,
      })}
    >
      {renderChildren({
        children: visibleChildren,
        dispatch,
        Components,
        render,
      })}
    </View>
  );
};
