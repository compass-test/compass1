import React from 'react';

import CopyIcon from '@atlaskit/icon/glyph/copy';

import ExampleAction from './ExampleAction';

export interface CopyProps {
  source: string;
}

export const TOOLTIP_MESSAGE = {
  PROMPT: 'Copy code',
  SUCCESS: 'Copied!',
  FAILURE: 'Copy to clipboard failed',
};

const Copy: React.FC<CopyProps> = ({ source }) => {
  const [tooltipMessage, setTooltipMessage] = React.useState(
    TOOLTIP_MESSAGE.PROMPT,
  );

  const handleSuccess = React.useCallback(() => {
    setTooltipMessage(TOOLTIP_MESSAGE.SUCCESS);
  }, [setTooltipMessage]);

  const handleError = React.useCallback(() => {
    setTooltipMessage(TOOLTIP_MESSAGE.FAILURE);
  }, [setTooltipMessage]);

  const writeToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(source).then(handleSuccess, handleError);
  }, [source, handleSuccess, handleError]);

  const resetMessage = React.useCallback(() => {
    setTooltipMessage(TOOLTIP_MESSAGE.PROMPT);
  }, [setTooltipMessage]);

  const isVisible = Boolean(navigator?.clipboard?.writeText);

  return isVisible ? (
    <ExampleAction
      icon={<CopyIcon label="" />}
      label={tooltipMessage}
      onClick={writeToClipboard}
      onMouseOver={resetMessage}
      onFocus={resetMessage}
      aria-live="assertive"
    />
  ) : null;
};

export default Copy;
