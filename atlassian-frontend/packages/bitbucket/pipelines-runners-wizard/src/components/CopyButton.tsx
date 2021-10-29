import React, { useCallback } from 'react';

import useClipboard from 'react-use-clipboard';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CopyIcon from '@atlaskit/icon/glyph/copy';
import Tooltip from '@atlaskit/tooltip';

import { CodeActionIcon, CodeActionIconContainer } from './styled';

type Props = {
  name: string;
  content: string;
  analyticEventId: string;
  setRunCommandActioned?: (isActioned: boolean) => void;
  notCopiedLabel?: string;
  copiedLabel?: string;
  tooltipMessage?: string;
};

const CopyButton: React.FC<Props> = ({
  name,
  content,
  analyticEventId,
  setRunCommandActioned,
  notCopiedLabel: customNotCopiedLabel,
  copiedLabel: customCopiedLabel,
  tooltipMessage: customTooltipMessage,
}) => {
  const tooltipMessage = customTooltipMessage || `Copy ${name}`;
  const isNotCopiedLabel = customCopiedLabel || `${name} copied`;
  const isCopiedLabel = customNotCopiedLabel || `copy ${name}`;

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [isCopied, setCopied] = useClipboard(content || '', {
    successDuration: 3000,
  });

  const onCopyClick = useCallback(
    (evt) => {
      evt.stopPropagation();
      setCopied();
      // keep track of whether the docker command was copied at any stage
      if (name === 'command' && setRunCommandActioned) {
        setRunCommandActioned(true);
      }
      if (name) {
        createAnalyticsEvent({
          action: 'clicked',
          actionSubject: 'button',
          actionSubjectId: analyticEventId,
          attributes: { name },
        }).fire();
      }
    },
    [
      setCopied,
      setRunCommandActioned,
      name,
      createAnalyticsEvent,
      analyticEventId,
    ],
  );

  return (
    <>
      <Tooltip
        position="top"
        content={isCopied ? 'Copied to clipboard' : tooltipMessage}
      >
        <CodeActionIconContainer
          {...(isCopied ? {} : { onClick: onCopyClick })}
        >
          <CodeActionIcon>
            {isCopied ? (
              <CheckCircleIcon
                label={isNotCopiedLabel}
                primaryColor="green"
                size="small"
              />
            ) : (
              <CopyIcon label={isCopiedLabel} size="small" />
            )}
          </CodeActionIcon>
        </CodeActionIconContainer>
      </Tooltip>
    </>
  );
};

export default React.memo(CopyButton);
