import React from 'react';

import InlineDialog, { Placement } from '@atlaskit/inline-dialog';
import { P200, P300 } from '@atlaskit/theme/colors';
import InfoIcon from '@atlaskit/icon/glyph/info';
import {
  gridSize as getGridSize,
  borderRadius,
} from '@atlaskit/theme/constants';

import FocusRing from '@atlaskit/focus-ring';

import { css } from '@emotion/core';

type InfoHintProps = {
  placement?: Placement;
};

const gridSize = getGridSize();

const buttonStyles = css({
  width: gridSize * 3,
  height: gridSize * 3,
  borderRadius: borderRadius(),
  display: 'inline-grid',
  placeItems: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: P300,
  ':hover': {
    color: P200,
  },
});

const buttonActiveStyles = css({
  color: P200,
});

const contentWrapperStyles = css({
  maxWidth: 350 - 8 * gridSize,
});

/**
 * Basically an <InlineMessage type="info" /> but with a small icon
 * instead of medium.
 *
 * The touch target is still the same size though.
 */
const InfoHint: React.FC<InfoHintProps> = ({
  children,
  placement = 'bottom',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeDialog = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  const toggleDialog = React.useCallback(() => setIsOpen((isOpen) => !isOpen), [
    setIsOpen,
  ]);

  return (
    <InlineDialog
      content={<div css={contentWrapperStyles}>{children}</div>}
      isOpen={isOpen}
      onClose={closeDialog}
      placement={placement}
    >
      <FocusRing isInset>
        <button
          css={[buttonStyles, isOpen && buttonActiveStyles]}
          onClick={toggleDialog}
        >
          <InfoIcon label="" size="small" />
        </button>
      </FocusRing>
    </InlineDialog>
  );
};

export default InfoHint;
