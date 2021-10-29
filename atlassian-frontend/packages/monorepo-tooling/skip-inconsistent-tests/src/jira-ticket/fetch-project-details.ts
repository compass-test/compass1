import { IssueTypes, JiraClient } from '@atlaskit/build-utils/jira';

export const DEFAULT_JIRA_AUTH = {
  username: process.env.ATLASSIAN_USER || 'unknown',
  password: process.env.ATLASSIAN_PASSWORD || 'pw',
};

const getIssueId = (issueTypes: IssueTypes[]) => {
  let issue: IssueTypes | undefined = issueTypes.find((issue: any) => {
    if (issue.name === 'Task' || issue.name === 'Bug') {
      return issue.id;
    }
  });
  if (!issue) {
    issue = issueTypes[issueTypes.length - 1];
  }
  return issue.id;
};

const fetchProjectDetails = async (
  instance: string,
  projectKey: string,
  auth = DEFAULT_JIRA_AUTH,
) => {
  const result = await new JiraClient({
    auth,
    instance,
  }).getProjectDetails(projectKey);

  try {
    const projectId = result.id;
    if (!projectId) {
      throw new Error('Unable to extract Id from project details');
    }
    const { lead = { accountId: '', name: '' } } = result;
    const assignee = {
      accountId: lead.accountId,
      name: lead.name,
    };
    if (!assignee.accountId) {
      throw new Error('Unable to extract lead from project details');
    }
    const issueTypes = result.issueTypes;
    const issueId = getIssueId(issueTypes);
    return {
      projectKey,
      projectId,
      assignee,
      issueId,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export default fetchProjectDetails;
