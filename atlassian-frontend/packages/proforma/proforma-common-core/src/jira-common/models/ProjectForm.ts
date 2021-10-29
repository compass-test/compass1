export interface TemplateFormIndex {
  id: number;
  projectId: number;
  name: string;
  project: string;
  updated: {
    iso8601: string;
    friendly: string;
  };
  requesttypes: RequestType[];
  editUrl: string;
}

export enum TicketType {
  IssueType = 'issue',
  RequestType = 'request',
}

// Confusingly, this can represent either an IssueType or RequestType
export interface RequestType {
  id: string;
  name: string;
  portal: boolean;
  hidden: boolean;
  newIssue: boolean;
  iconUrl?: string;
  type: TicketType;
}
