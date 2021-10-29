import React from 'react';
import { css } from '@emotion/core';
import { gridSize } from '@atlaskit/theme';
import { ButtonGroup } from '@atlaskit/button';

const stopPropagation = (event) => event.stopPropagation();

export const ExampleActionContainer = ({ children }) => {
  return (
    /**
     * This element uses an `onMouseDown` to block event propagation
     * to its parent but is not itself interactive.
     */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        padding: ${0.5 * gridSize()}px;

        z-index: 1;
      `}
      // Stops the code expanding when you click an action
      onMouseDown={stopPropagation}
    >
      <ButtonGroup>{children}</ButtonGroup>
    </div>
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  );
};
