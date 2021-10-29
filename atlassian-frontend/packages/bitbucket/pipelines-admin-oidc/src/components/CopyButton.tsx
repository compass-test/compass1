import React, { useCallback } from 'react';

import useClipboard from 'react-use-clipboard';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CopyIcon from '@atlaskit/icon/glyph/copy';
import Tooltip from '@atlaskit/tooltip';

import { CopyTextIcon, CopyTextIconContainer } from './styled';

type Props = {
  name: string;
  content: string;
};

const CopyButton: React.FC<Props> = ({ name, content }) => {
  const [isCopied, setCopied] = useClipboard(content || '', {
    successDuration: 3000,
  });

  const onCopyClick = useCallback(
    evt => {
      evt.stopPropagation();
      setCopied();
    },
    [setCopied],
  );

  const copyLabel = `Copy ${name}`;

  return (
    <Tooltip
      position="right"
      content={isCopied ? 'Copied to clipboard' : 'Copy'}
    >
      <CopyTextIconContainer {...(isCopied ? {} : { onClick: onCopyClick })}>
        <CopyTextIcon>
          {isCopied ? (
            <CheckCircleIcon label="Copied" primaryColor="green" size="small" />
          ) : (
            <CopyIcon label={copyLabel} size="small" />
          )}
        </CopyTextIcon>
      </CopyTextIconContainer>
    </Tooltip>
  );
};

export default React.memo(CopyButton);
