import {
  Form,
  FormAnswers,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  ApiUtil,
  LiveFormApi,
} from '@atlassian/proforma-common-core/jira-common-apis';

export class LivePortalFormApi extends LiveFormApi {
  private readonly serviceDeskId: number;
  private readonly apiUtil: ApiUtil;

  public constructor(util: ApiUtil, serviceDeskId: number) {
    super(util);
    this.apiUtil = util;
    this.serviceDeskId = serviceDeskId;
  }

  public saveAnswers(
    issueId: number,
    formId: number,
    answers: FormAnswers,
  ): Promise<Form> {
    return this.apiUtil.put(
      `/api/3/portal/${this.serviceDeskId}/request/${issueId}/form/${formId} `,
      answers,
    );
  }
}
