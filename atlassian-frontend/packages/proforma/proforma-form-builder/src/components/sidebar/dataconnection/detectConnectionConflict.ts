import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

export interface ConnectionConflict {
  jiraField: JiraField;
  dataConnection: DataConnectionResponse;
  cause: 'jf' | 'dc';
}

/**
 * Detects if a change in linked field or data connection will cause a confluct between the two.
 * Returns the Jira field and data connection if there is a conflict, or returns undefined to indicate no conflict.
 */
export function detectConnectionConflict(
  jiraField?: JiraField,
  dataConnection?: DataConnectionResponse,
  newJiraField?: JiraField,
  newDataConnection?: DataConnectionResponse,
): ConnectionConflict | undefined {
  if (jiraField && newDataConnection) {
    // This question is linked to a Jira field and about to link to a data connection
    return {
      jiraField,
      dataConnection: newDataConnection,
      cause: 'dc',
    };
  }

  if (dataConnection && newJiraField) {
    // This question is linked to a data connection and about to link to a Jira field
    return {
      dataConnection,
      jiraField: newJiraField,
      cause: 'jf',
    };
  }

  // This is not linked to both a Jira field and a data connection simultaneously, so there is no conflict
  return undefined;
}
