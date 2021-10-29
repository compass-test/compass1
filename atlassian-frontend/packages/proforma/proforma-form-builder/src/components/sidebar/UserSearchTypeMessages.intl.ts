import { defineMessages } from 'react-intl';

import { UserSearchType } from '@atlassian/proforma-common-core/jira-common-models'; // TODO: `form-builder` must not link to `jira-common`.

export interface UserSearchOption {
  value: string;
  name: string;
}

export const IntlUserSearchTypeMessages = defineMessages({
  [UserSearchType.usersWithBrowseProjectPermission]: {
    id: 'form-builder.UserSearchType.UsersWithBrowseProjectPermission',
    defaultMessage: 'Users with Browse Project permission',
  },
});
