import React from 'react';

import { FormattedMessage } from 'react-intl';

import { useJiraCheckService } from '../services';

import { messages } from './messages';
import {
  PanelContent,
  PanelContentBody,
  PanelContentHeader,
  PanelContentTitle,
  PanelInfoText,
} from './styled';
import type { TeamWorkProps } from './types';
import WorkList from './work-list';

export default function TeamWork({
  teamId,
  cloudId,
  jiraAvailable,
  infoText,
  actions,
  testId,
}: TeamWorkProps) {
  const { isJiraAvailable } = useJiraCheckService(cloudId);
  const jira = isJiraAvailable || jiraAvailable;

  return !jira ? null : (
    <PanelContent data-testid={testId}>
      <PanelContentHeader>
        <div>
          <PanelContentTitle>
            <FormattedMessage {...messages.title} />
          </PanelContentTitle>
          {infoText && <PanelInfoText>{infoText}</PanelInfoText>}
        </div>

        {actions && <div>{actions}</div>}
      </PanelContentHeader>

      <PanelContentBody>
        <WorkList teamId={teamId} />
      </PanelContentBody>
    </PanelContent>
  );
}
