import React, { MouseEvent } from 'react';

import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';

import { StyledClearButton } from './styled';

interface ClearButtonProps {
  isSelected: boolean;
  label: string;
  type: string;
  onClick: (e: MouseEvent<HTMLElement>) => Promise<void> | void;
}

export const ClearButton = ({ label, ...props }: ClearButtonProps) => (
  <StyledClearButton {...props} data-testid="paginated-picker.ui.clear-button">
    <EditorCloseIcon label={label} />
  </StyledClearButton>
);

ClearButton.defaultProps = {
  isSelected: false,
  type: 'button',
};

export default ClearButton;
