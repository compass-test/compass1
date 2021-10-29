import { FormDetails } from '../../src/apis/IssueCreateFormApiV3';
import { UserApi } from '../../src/apis/UserApi';

import { MockIssueCreateFormApiV3 } from './MockIssueCreateFormApiV3';

export class MockUserApi implements UserApi {
  constructor(private mockIssueCreateFormApiV3: MockIssueCreateFormApiV3) {}

  public getPreferredForm(projectId: number): Promise<FormDetails> {
    return new Promise<FormDetails>((resolve): void => {
      setTimeout((): void => {
        const preferredForm = this.mockIssueCreateFormApiV3.availableForms[0];
        resolve(preferredForm);
      }, 1000);
    });
  }
}
