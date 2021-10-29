export interface IssueIndexForm {
  id: number;
  projectFormId?: number;
  internal: boolean;
  submitted: boolean;
  lock: boolean;
  name: string;
  updated: string;
}
