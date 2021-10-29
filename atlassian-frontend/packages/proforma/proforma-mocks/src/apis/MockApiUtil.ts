import {
  ApiUtil,
  ResponseType,
} from '@atlassian/proforma-common-core/jira-common-apis';
import { BackendSettingUrls } from '@atlassian/proforma-common-core/jira-common-models';
import {
  AuthUtil,
  ErrorUtils,
} from '@atlassian/proforma-common-core/jira-common-utils';

export class MockApiUtil extends ApiUtil {
  public constructor(
    urls: BackendSettingUrls,
    authUtil: AuthUtil,
    errorUtils: ErrorUtils,
  ) {
    super(urls, authUtil, errorUtils);
  }

  _fetchApi(
    proForma: boolean,
    method: string,
    path: string,
    responseType: ResponseType,
    body?: any,
  ): Promise<any> {
    return Promise.reject('Not yet implemented. Implement as needed.');
  }
}
