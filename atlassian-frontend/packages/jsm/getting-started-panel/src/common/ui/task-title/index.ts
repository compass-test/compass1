import messages from './messages';
import { TaskId } from '../../types';
import { FormattedMessage } from 'react-intl';

const messageMap: {
  [taskId in TaskId]: FormattedMessage.MessageDescriptor;
} = {
  [TaskId.CreateItsmProject]: messages.createYourItsmProject,
  [TaskId.CustomizePortal]: messages.customizeYourPortal,
  [TaskId.AddPortalLogo]: messages.addLogoToPortal,
  [TaskId.SetupEmailRequests]: messages.setupEmailRequests,
  [TaskId.SetupServices]: messages.setupAService,
  [TaskId.AddTeamMember]: messages.addTeamMember,
  [TaskId.GoBeyondBasics]: messages.goBeyondBasics,
  [TaskId.ConnectCiCdPipeline]: messages.connectCiCdPipeline,
  [TaskId.AddChangeApprovers]: messages.addChangeApprovers,
  [TaskId.TurnOnAutomationRules]: messages.turnOnAutomationRules,
  [TaskId.MakeTheMostOfChangeManagement]:
    messages.makeTheMostOfChangeManagement,
  [TaskId.SetupProfileForNotifications]: messages.setupNotifications,
  [TaskId.SetupTeam]: messages.setupResponseTeam,
  [TaskId.AssignOwnerTeamToServices]: messages.assignTeamToServices,
  [TaskId.LevelUpIncidentManagement]: messages.levelUpIncidentManagement,
};

export const getTaskTitle = (
  key: TaskId,
): FormattedMessage.MessageDescriptor => {
  const message = messageMap[key];
  return message;
};
