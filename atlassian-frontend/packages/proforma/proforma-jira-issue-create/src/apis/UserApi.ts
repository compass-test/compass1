import { FormDetails } from './IssueCreateFormApiV3';

export interface UserApi {
  getPreferredForm(projectId?: number): Promise<FormDetails>;
}
