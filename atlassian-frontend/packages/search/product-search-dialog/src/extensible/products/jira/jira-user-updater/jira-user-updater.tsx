/**
 * JiraUserUpdater calls Jira's user client and uses the returned user
 * information to set value of UserContext.
 * TODO: Remove this hacky component when we move the Jira user fetching logic
 * into the Jira frontend repo.
 */

import React, { FunctionComponent } from 'react';
import { UserDetails, useUserContext } from '../../../../common/user-context';
import { useJiraCurrentUser } from '../../../../jira/clients';

interface Props {
  user?: UserDetails;
}

export const JiraUserUpdater: FunctionComponent<Props> = ({ children }) => {
  const { user, setUser } = useUserContext();
  const jiraUser = useJiraCurrentUser(user);
  setUser(jiraUser);

  return <>{children}</>;
};
