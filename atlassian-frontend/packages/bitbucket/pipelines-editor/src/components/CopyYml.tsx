import React, { useCallback } from 'react';

import useClipboard from 'react-use-clipboard';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CopyIcon from '@atlaskit/icon/glyph/copy';
import Tooltip from '@atlaskit/tooltip';

import { CopyTextIcon, CopyTextIconContainer } from './styled';

type Props = {
  oneClickCopy: boolean;
  isPipe?: boolean;
  name?: string;
  yml: string;
};

const CopyYml: React.FC<Props> = ({ oneClickCopy, isPipe, name, yml }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [isCopied, setCopied] = useClipboard(yml || '', {
    successDuration: 3000,
  });

  const isNotCopiedLabel = isPipe ? 'copy pipe' : 'copy step';
  const isCopiedLabel = isPipe ? 'pipe copied' : 'step copied';

  const onCopyClick = useCallback(
    (evt) => {
      evt.stopPropagation();
      setCopied();
      if (name && isPipe !== undefined) {
        createAnalyticsEvent({
          action: 'clicked',
          actionSubject: 'button',
          actionSubjectId: isPipe ? 'copyPipe' : 'copyStep',
          attributes: { name },
        }).fire();
      }
    },
    [createAnalyticsEvent, isPipe, name, setCopied],
  );

  return (
    <>
      {oneClickCopy && (
        <Tooltip
          position="top"
          content={isCopied ? 'Copied to clipboard' : 'Copy script'}
        >
          <CopyTextIconContainer
            {...(isCopied ? {} : { onClick: onCopyClick })}
          >
            <CopyTextIcon>
              {isCopied ? (
                <CheckCircleIcon
                  label={isCopiedLabel}
                  primaryColor="green"
                  size="small"
                />
              ) : (
                <CopyIcon label={isNotCopiedLabel} size="small" />
              )}
            </CopyTextIcon>
          </CopyTextIconContainer>
        </Tooltip>
      )}
      {!oneClickCopy && (
        <div>
          <Tooltip
            position="left"
            content={isCopied ? 'Copied to clipboard' : 'Copy'}
          >
            <Button
              onClick={onCopyClick}
              iconBefore={<CopyIcon label="copy" />}
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default React.memo(CopyYml);
