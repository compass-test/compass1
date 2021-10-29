import { ApiUtil } from '@atlassian/proforma-common-core/jira-common-apis';

import { FormDetails } from './IssueCreateFormApiV3';
import { UserApi } from './UserApi';

export class LiveUserApi implements UserApi {
  private util: ApiUtil;

  public constructor(util: ApiUtil) {
    this.util = util;
  }

  public getPreferredForm(projectId?: number): Promise<FormDetails> {
    if (projectId) {
      return this.util.get(
        `/api/1/user/forms/preferred?projectId=${encodeURIComponent(
          projectId,
        )}`,
      );
    }
    return this.util.get(`/api/1/user/forms/preferred`);
  }
}
