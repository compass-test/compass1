import React, { useCallback } from 'react';

import fileDownload from 'js-file-download';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import Tooltip from '@atlaskit/tooltip';

import { CodeActionIcon, CodeActionIconContainer } from './styled';

type Props = {
  name: string;
  content: string;
  setRunCommandActioned: (isActioned: boolean) => void;
  notCopiedLabel?: string;
  copiedLabel?: string;
  tooltipMessage?: string;
};

const DownloadButton: React.FC<Props> = ({
  content,
  setRunCommandActioned,
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const downloadScript = useCallback(() => {
    fileDownload(content, 'start.ps1');
  }, [content]);

  const onDownloadClick = useCallback(
    (evt) => {
      evt.stopPropagation();
      setRunCommandActioned(true);
      downloadScript();
      // keep track of whether the script was downloaded
      createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId: 'runnersWizardDownloadScript',
      }).fire();
    },
    [createAnalyticsEvent, downloadScript, setRunCommandActioned],
  );

  return (
    <>
      <Tooltip position="top" content={'Download script'}>
        <CodeActionIconContainer onClick={onDownloadClick}>
          <CodeActionIcon>
            <DownloadIcon label="Download script" size="small" />
          </CodeActionIcon>
        </CodeActionIconContainer>
      </Tooltip>
    </>
  );
};

export default React.memo(DownloadButton);
