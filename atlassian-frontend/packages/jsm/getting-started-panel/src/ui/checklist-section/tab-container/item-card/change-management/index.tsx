import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useLinkClickedEvent } from '../../../../../common/analytics';
import { TaskId } from '../../../../../common/types';

import { useUrlData } from '../../../../../common/ui/url-data';
import { LinkWithFullClickEvents } from '../../../../link-utility';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';

import messages from './messages';

const actionSubjectIds = {
  bestPractices: 'jsmGettingStartedPanelChangeManagementBestPractices',
};

const ChangeManagementItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { onTaskComplete } = useUrlData();
  const linkClickHandler = useLinkClickedEvent(actionSubjectIds.bestPractices, {
    handler: (e) => {
      e.stopPropagation();
      onTaskComplete(TaskId.MakeTheMostOfChangeManagement);
    },
  });
  const keyElements = {
    bestPracticesForChangeManagement: (
      <LinkWithFullClickEvents
        href="https://support.atlassian.com/jira-service-desk-cloud/docs/best-practices-for-change-management/"
        target="_blank"
        onLinkClick={linkClickHandler}
      >
        {intl.formatMessage(messages.bestPracticesForChangeManagement)}
      </LinkWithFullClickEvents>
    ),
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.changeManagementDescription)}
      instructions={[
        makeInstruction(messages.changeManagementStep1, keyElements),
        makeInstruction(messages.changeManagementStep2, keyElements),
      ]}
    />
  );
};

export const ChangeManagementItemCardContent = injectIntl(
  ChangeManagementItemCardContentBase,
);
