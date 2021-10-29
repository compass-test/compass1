import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'selectedLabel'
  | 'plansCountString'
  | 'spacesCountString'
  | 'projectsCountString';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  selectedLabel: {
    id:
      'com.atlassian.migrations-platform.container-selection.selected-containers-count.selected-label',
    defaultMessage: 'Selected',
  },
  projectsCountString: {
    id:
      'com.atlassian.migrations-platform.container-selection.selected-containers-count.projects-count-string',
    defaultMessage:
      '{selectedCount} of {totalCount} {totalCount, plural, one {project} other {projects}}',
  },
  spacesCountString: {
    id:
      'com.atlassian.migrations-platform.container-selection.selected-containers-count.spaces-count-string',
    defaultMessage:
      '{selectedCount} of {totalCount} {totalCount, plural, one {space} other {spaces}}',
  },
  plansCountString: {
    id:
      'com.atlassian.migrations-platform.container-selection.selected-containers-count.plans-count-string',
    defaultMessage:
      '{selectedCount} of {totalCount} {totalCount, plural, one {plan} other {plans}}',
  },
});
