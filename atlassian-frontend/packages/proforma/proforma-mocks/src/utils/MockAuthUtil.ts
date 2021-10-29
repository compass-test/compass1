import { AuthUtil } from '@atlassian/proforma-common-core/jira-common-utils';

export class MockAuthUtil extends AuthUtil {
  public constructor(apiBaseUrl: string) {
    super({ apiBaseUrl });
  }
}
