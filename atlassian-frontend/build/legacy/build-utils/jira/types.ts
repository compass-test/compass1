export type Issue = {
  id: string;
  self: string;
  key: string;
  fields: Record<string, unknown>;
};

export type User = {
  accountId: string;
  emailAddress?: string;
  displayName?: string;
};

type PaginatedResponse = {
  startAt: number;
  maxResults: number;
  total: number;
};

export type PaginatedIssues = PaginatedResponse & {
  issues: Issue[];
};

export type IssueTypes = {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: string | number;
};

export type ProjectDetails = {
  expand: string;
  self: string;
  id: string;
  key: string;
  description: string;
  lead?: { [key: string]: any };
  components: { [key: string]: any }[];
  issueTypes: IssueTypes[];
  assigneeType: string;
  versions: { [key: string]: any }[];
  name: string;
  roles: { [key: string]: string };
  avatarUrls: { [key: string]: string };
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  properties: { [key: string]: string };
};

export type CreateIssueResponse = {
  id: string;
  key: string;
  self: string;
  transition?: {
    status: number;
    errorCollection?: {
      errorMessages: string[];
      errors: object;
    };
  };
};

type AttachmentResponse = {
  self: string;
  id: string;
  filename: string;
  author: User;
  created: string;
  size: number;
  mimeType: string;
  content: string;
  thumbnail: string;
};

export type AddIssueAttachementResponse = AttachmentResponse[];

type Identifier = { id: string };
type Key = { key: string };

/**
 * Atlassian Document Format (ADF)
 *
 * @see https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/
 * @see https://developer.atlassian.com/cloud/jira/platform/apis/document/playground/
 *
 * NOTE:
 * This is a deliberately loose type without validating Jira's supported content nodes.
 * An accurate & strict type is available via `DocNode` from @atlaskit/adf-schema if you
 * need it when constucting your ADF payloads.
 */
interface ADFEntity {
  type: string;
  attrs?: { [name: string]: any };
  content?: Array<ADFEntity>;
  marks?: Array<{
    type: string;
    attrs?: { [name: string]: any };
  }>;
  text?: string;
  [key: string]: any;
}

export type IssueDetails<ADFType = ADFEntity> = {
  fields: {
    assignee?: Identifier;
    components?: Identifier[];
    // custom fields start with `customfield_`
    [key: string]: string | string[] | ADFType | object | undefined;
    description: ADFType;
    duedate?: string;
    environment?: ADFType;
    fixVersions?: Identifier[];
    issuetype: Identifier;
    labels?: string[];
    parent?: Key;
    priority?: Identifier;
    project: Identifier;
    reporter?: Identifier;
    security?: Identifier;
    // ticket title
    summary: string;
    timeTracking?: {
      originalEstimate: string;
      remainingEstimate: string;
    };
    versions?: Identifier[];
  };
};
