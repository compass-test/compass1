import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CreateProjectElements } from './create-project/messages';
import { CustomPortalNameElements } from './custom-portal-name/messages';
import { CustomPortalLogoElements } from './custom-portal-logo/messages';
import { EmailSetupElements } from './email-setup/messages';
import { SetupServicesElements } from './setup-services/messages';
import { AddingUsersElements } from './adding-users/messages';
import { GoBeyondBasicsElements } from './go-beyond-basics/messages';
import { NotificationsElements } from './notifications/messages';
import { SetupTeamElements } from './setup-team/messages';
import { AssignOwnerElements } from './assign-owner/messages';
import { IncidentManagementElements } from './incident-management/messages';
import { ConnectPipelineElements } from './connect-pipeline/messages';
import { AddChangeApproversElements } from './add-change-approvers/messages';
import { AutomationRulesElements } from './automation-rules/messages';
import { ChangeManagementElements } from './change-management/messages';

type KeyElements =
  // Basics
  | CreateProjectElements
  | CustomPortalNameElements
  | CustomPortalLogoElements
  | EmailSetupElements
  | SetupServicesElements
  | AddingUsersElements
  | GoBeyondBasicsElements
  // Incidents
  | NotificationsElements
  | SetupTeamElements
  | AssignOwnerElements
  | IncidentManagementElements
  // Changes
  | ConnectPipelineElements
  | AddChangeApproversElements
  | AutomationRulesElements
  | ChangeManagementElements;

export const makeInstruction = (
  message: FormattedMessage.MessageDescriptor,
  keyElements: KeyElements,
) => ({
  key: message.id,
  element: <FormattedMessage {...message} values={{ ...keyElements }} />,
});
