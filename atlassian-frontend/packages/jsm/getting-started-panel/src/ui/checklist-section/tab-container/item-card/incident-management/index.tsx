import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useLinkClickedEvent } from '../../../../../common/analytics';
import { Product, TaskId } from '../../../../../common/types';

import { useUrlData } from '../../../../../common/ui/url-data';
import {
  CrossProductLink,
  LinkWithFullClickEvents,
} from '../../../../link-utility';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';

import messages from './messages';
import { useIncidentConsolidationQuickTourItemsEnabled } from '../../../../../feature-flags';
import {
  SdVisibilityRoles,
  useSdRole,
} from '../../../../../common/services/visibility';

const actionSubjectIds = {
  bestPractices: 'jsmGettingStartedPanelIncidentManagementBestPractices',
};

const IncidentManagementItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const quickTourIcItemsEnabled = useIncidentConsolidationQuickTourItemsEnabled();
  const [sdRole] = useSdRole();

  const { onTaskComplete, serviceDeskBaseUrl, projectKey } = useUrlData();
  const linkClickHandler = useLinkClickedEvent(actionSubjectIds.bestPractices, {
    handler: (e) => {
      e.stopPropagation();
      onTaskComplete(TaskId.LevelUpIncidentManagement);
    },
  });
  const keyElements = {
    bestPracticesForIncidentManagement: (
      <LinkWithFullClickEvents
        href="https://support.atlassian.com/jira-service-desk-cloud/docs/best-practices-for-incident-management/"
        target="_blank"
        onLinkClick={linkClickHandler}
      >
        {intl.formatMessage(messages.bestPracticesForIncidentManagement)}
      </LinkWithFullClickEvents>
    ),
    incidentManagementSettings: (
      <CrossProductLink
        linkProduct={Product.ServiceDesk}
        url={`${serviceDeskBaseUrl}/jira/servicedesk/projects/${projectKey}/settings/incident-management`}
        subjectId="jsmGettingStartedPanelCustomPortalLogoPortalSettings"
        onClick={() => onTaskComplete(TaskId.LevelUpIncidentManagement)}
      >
        {intl.formatMessage(messages.incidentManagementSettings)}
      </CrossProductLink>
    ),
  };

  const instructionsWithSettings = [
    makeInstruction(messages.incidentManagementSettingsStep1, keyElements),
    makeInstruction(messages.incidentManagementBestPractisesStep2, keyElements),
    makeInstruction(
      messages.incidentManagementImproveFurtherStep3,
      keyElements,
    ),
  ];

  const instructionsWithoutSettings = [
    makeInstruction(messages.incidentManagementBestPractisesStep1, keyElements),
    makeInstruction(
      messages.incidentManagementImproveFurtherStep2,
      keyElements,
    ),
  ];

  const shouldShowSettingsStep =
    quickTourIcItemsEnabled && sdRole === SdVisibilityRoles.Advanced;
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.incidentManagementDescription)}
      instructions={
        shouldShowSettingsStep
          ? instructionsWithSettings
          : instructionsWithoutSettings
      }
    />
  );
};

export const IncidentManagementItemCardContent = injectIntl(
  IncidentManagementItemCardContentBase,
);
