import { defineMessages } from 'react-intl';

export default defineMessages({
  cannotAccessDragonfruit: {
    id: 'dragonfruit-site-permissions.cannotAccessDragonfruit',
    defaultMessage: 'Cannot access dragonfruit',
    description:
      'This refers to the heading of the modal shown when the user does not have access to dragonfruit.',
  },
  needAccessToJira: {
    id: 'dragonfruit-site-permissions.needAccessToJira',
    defaultMessage:
      'You must have access to {JiraLink} in order to use dragonfruit.',
    description:
      'This refers to the first paragraph of the modal shown when the user does not have access to dragonfruit.',
  },
  contactAdministrator: {
    id: 'dragonfruit-site-permissions.contactAdministrator',
    defaultMessage: 'Please contact your administrator.',
    description:
      'This refers to the second paragraph of the modal shown when the user does not have access to dragonfruit.',
  },
});
