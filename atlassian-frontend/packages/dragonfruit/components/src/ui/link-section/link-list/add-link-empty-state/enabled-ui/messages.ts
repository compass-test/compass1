import { defineMessages } from 'react-intl';

export default defineMessages({
  addFirstDashboard: {
    id: 'dragonfruit.components.links.empty-state.add-first-dashboard',
    defaultMessage:
      'Add the dashboards that have information about this component',
    description: 'Shown when a user has not added any dashboard links',
  },
  addFirstDocument: {
    id: 'dragonfruit.components.links.empty-state.add-first-document',
    defaultMessage:
      'Add documentation like runbooks, internal process docs, or specifications',
    description: 'Shown when a user has not added any document links',
  },
  addFirstOther: {
    id: 'dragonfruit.components.links.empty-state.add-other-link',
    defaultMessage: 'Add any other relevant links',
    description:
      'Shown when a user has not added any other relevant links to the component',
  },
  addFirstProject: {
    id: 'dragonfruit.components.links.empty-state.add-first-project',
    defaultMessage: 'Add a project to link this component with a Jira project',
    description: 'Shown when a user has not added any project links',
  },
  addFirstRepository: {
    id: 'dragonfruit.components.links.empty-state.add-first-repository',
    defaultMessage:
      'Add the repository where the code is stored for this component',
    description: 'Shown when a user has not added any repository links',
  },
  addFirstChatChannel: {
    id: 'dragonfruit.components.links.empty-state.add-first-chat-channel',
    defaultMessage: 'Add chat links',
    description: 'Shown when a user has not added any chat channel links',
  },
  addFirstOnCall: {
    id: 'dragonfruit.components.links.empty-state.add-first-on-call',
    defaultMessage: 'Add on-call schedules',
    description: 'Shown when a user has not added any on-call links',
  },
});
