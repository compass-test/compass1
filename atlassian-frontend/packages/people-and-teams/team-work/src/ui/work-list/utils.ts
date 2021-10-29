import { jiraSearchJQL } from '../../services/team-work/utils';

export const urlPathJiraBrowse = (issueKey: string) => `/browse/${issueKey}`;

export const urlPathJiraSearch = (teamId: string) =>
  `/issues/?jql=${encodeURI(jiraSearchJQL(teamId))}`;
