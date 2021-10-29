import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useLinkClickedEvent } from '../../../../../common/analytics';
import { TaskId } from '../../../../../common/types';

import { useUrlData } from '../../../../../common/ui/url-data';
import { LinkWithFullClickEvents } from '../../../../link-utility';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { useIncidentConsolidationQuickTourItemsEnabled } from '../../../../../feature-flags';

import messages from './messages';

const actionSubjectIds = {
  bestPractices: 'jsmGettingStartedPanelGoBeyondBasicsBestPractices',
};

const GoBeyondBasicsItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const quickTourIcItemsEnabled = useIncidentConsolidationQuickTourItemsEnabled();
  const { onTaskComplete } = useUrlData();
  const linkClickHandler = useLinkClickedEvent(actionSubjectIds.bestPractices, {
    handler: (e) => {
      e.stopPropagation();
      onTaskComplete(TaskId.GoBeyondBasics);
    },
  });
  const keyElements = {
    bestPractices: (
      <LinkWithFullClickEvents
        href="https://support.atlassian.com/jira-service-desk-cloud/docs/best-practices-for-it-teams-using-jira-service-desk/"
        target="_blank"
        onLinkClick={linkClickHandler}
      >
        {intl.formatMessage(messages.bestPracticesForITTeams)}
      </LinkWithFullClickEvents>
    ),
    jsmMobileApp: (
      <LinkWithFullClickEvents
        href="https://www.atlassian.com/software/jira/service-management/mobile-app"
        target="_blank"
        onLinkClick={linkClickHandler}
      >
        {intl.formatMessage(messages.jsmMobileApp)}
      </LinkWithFullClickEvents>
    ),
  };

  const instructionsWithJsmAppStep = [
    makeInstruction(messages.goBeyondBasicsBestPractisesStep1, keyElements),
    makeInstruction(messages.goBeyondBasicsDownloadAppStep2, keyElements),
    makeInstruction(messages.goBeyondBasicsDiscoverNewStep3, keyElements),
  ];

  const instructionsWithoutJsmAppStep = [
    makeInstruction(messages.goBeyondBasicsBestPractisesStep1, keyElements),
    makeInstruction(messages.goBeyondBasicsDiscoverNewStep2, keyElements),
  ];

  return (
    <ItemCardContent
      description={intl.formatMessage(messages.goBeyondBasicsDescription)}
      instructions={
        quickTourIcItemsEnabled
          ? instructionsWithJsmAppStep
          : instructionsWithoutJsmAppStep
      }
    />
  );
};

export const GoBeyondBasicsItemCardContent = injectIntl(
  GoBeyondBasicsItemCardContentBase,
);
