import React, { useCallback } from 'react';

import useClipboard from 'react-use-clipboard';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CopyIcon from '@atlaskit/icon/glyph/copy';
import Tooltip from '@atlaskit/tooltip';

import { CopyTextIcon, CopyTextIconContainer } from './styled';

type Props = {
  name: string;
  content: string;
  notCopiedLabel?: string;
  copiedLabel?: string;
  tooltipMessage?: string;
};

const CopyButton: React.FC<Props> = ({
  name,
  content,
  notCopiedLabel: customNotCopiedLabel,
  copiedLabel: customCopiedLabel,
  tooltipMessage: customTooltipMessage,
}) => {
  const tooltipMessage = customTooltipMessage || `Copy ${name}`;
  const isNotCopiedLabel = customCopiedLabel || `${name} copied`;
  const isCopiedLabel = customNotCopiedLabel || `copy ${name}`;

  const [isCopied, setCopied] = useClipboard(content || '', {
    successDuration: 3000,
  });

  const onCopyClick = useCallback(
    (evt) => {
      evt.stopPropagation();
      setCopied();
    },
    [setCopied],
  );

  return (
    <>
      <Tooltip
        position="top"
        content={isCopied ? 'Copied to clipboard' : tooltipMessage}
      >
        <CopyTextIconContainer {...(isCopied ? {} : { onClick: onCopyClick })}>
          <CopyTextIcon>
            {isCopied ? (
              <CheckCircleIcon
                label={isNotCopiedLabel}
                primaryColor="green"
                size="small"
              />
            ) : (
              <CopyIcon label={isCopiedLabel} size="small" />
            )}
          </CopyTextIcon>
        </CopyTextIconContainer>
      </Tooltip>
    </>
  );
};

export default React.memo(CopyButton);
