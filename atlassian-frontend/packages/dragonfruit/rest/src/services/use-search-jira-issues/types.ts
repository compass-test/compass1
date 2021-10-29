// Absolutely not a completely thorough set of fields from the Jira REST endpoints!

export type SearchJiraIssuesInput = {
  cloudId: string;
  jql: string;
  startAt?: number;
  maxResults?: number;
  lazy?: boolean;
  validateQuery?: 'strict' | 'warn' | 'none';
  onCompleted?: (data: SearchJiraIssuesResult) => void;
};

export type SearchJiraIssuesResult = {
  issues: JiraIssue[];
  maxResults: number;
  startAt: number;
  total: number;
};

export type JiraIssue = {
  id: string;
  key: string;
  fields: {
    assignee?: JiraUser;
    components: JiraComponent[];
    created: string; //time stamp i.e. "2021-09-21T14:18:38.993-0700"
    creator: JiraUser;
    labels: string[];
    issuetype: JiraIssueType;
    priority: JiraPriority;
    project: JiraProject;
    reporter: JiraUser;
    status: JiraStatus;
    updated: string; // timestamp
    summary: string;
  };
};

export type JiraIssueType = {
  avatarId: number;
  description?: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
};

export type JiraComponent = {
  id: string;
  description?: string;
  name: string;
};

export type JiraUser = {
  accountId: string;
  displayName: string;
  avatarUrls: {
    '16x16': string;
    '24x24': string;
    '32x32': string;
    '48x48': string;
  };
};

export type JiraPriority = {
  id: string;
  iconUrl: string;
  name: string;
};

export type JiraProject = {
  avatarUrls: {
    '16x16': string;
    '24x24': string;
    '32x32': string;
    '48x48': string;
  };
  id: string;
  key: string;
  name: string;
};

export type JiraStatus = {
  description?: string;
  id: string;
  name: string;
  statusCategory: {
    colorName: string; // i.e. "blue-gray"
    id: number;
    key: string;
    name: string;
  };
};
