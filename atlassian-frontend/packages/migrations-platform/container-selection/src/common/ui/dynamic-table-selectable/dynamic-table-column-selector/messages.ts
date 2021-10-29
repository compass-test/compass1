import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'selectAllTooltip'
  | 'selectOptionsTooltip'
  | 'selectAllOnPageOption'
  | 'selectAllProjectsOption'
  | 'selectAllSpacesOption'
  | 'selectAllPlansOption'
  | 'clearAllSelectionOption';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  selectAllTooltip: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.select-all-tooltip',
    defaultMessage: 'Select all',
  },
  selectOptionsTooltip: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.select-options-tooltip',
    defaultMessage: 'Select options',
  },
  selectAllOnPageOption: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.select-all-on-page-option',
    defaultMessage: 'Select all on this page',
  },
  selectAllProjectsOption: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.select-all-projects-option',
    defaultMessage:
      'Select {totalCount, plural, one {1 project} other {all {totalCount} projects}}',
  },
  selectAllSpacesOption: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.select-all-spaces-option',
    defaultMessage:
      'Select {totalCount, plural, one {1 space} other {all {totalCount} spaces}}',
  },
  selectAllPlansOption: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.select-all-plans-option',
    defaultMessage:
      'Select {totalCount, plural, one {1 plan} other {all {totalCount} plans}}',
  },
  clearAllSelectionOption: {
    id:
      'com.atlassian.migrations-platform.container-selection.dynamic-table-selectable.clear-all-selection-option',
    defaultMessage: 'Clear all selection',
  },
});
