import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';
import { FormStore } from '@atlassian/proforma-common-core/form-system-stores';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  UserSearchType,
} from '@atlassian/proforma-common-core/jira-common-models';
import {
  loadChoicesFn,
  loadFieldValuesFn,
} from '@atlassian/proforma-common-core/jira-common-stores';
import {
  BrowserUtils,
  ErrorUtils,
} from '@atlassian/proforma-common-core/jira-common-utils';

import {
  FormDetails,
  IssueCreateFormApiV3,
} from '../../apis/IssueCreateFormApiV3';
import { CreateFormStore } from '../CreateFormStore';

export function loadCreateFormStoreFn(
  browserUtils: BrowserUtils,
  errorUtils: ErrorUtils,
  issueCreateFormApiV3: IssueCreateFormApiV3,
): (formDetails: FormDetails) => Promise<CreateFormStore | undefined> {
  return (formDetails: FormDetails): Promise<CreateFormStore | undefined> => {
    return issueCreateFormApiV3
      .getForm(formDetails.projectId, formDetails.projectFormId)
      .then(form => {
        if (form) {
          const formStore = new FormStore(
            loadFieldValuesFn(
              (
                request: ApiFieldValuesRequest,
              ): Promise<ApiFieldValuesResponse> =>
                issueCreateFormApiV3.postFieldValues(
                  formDetails.projectId,
                  formDetails.issueType.id,
                  request,
                ),
            ),
            loadChoicesFn(
              (templateFormId: number): Promise<ApiFormChoicesResponse> =>
                issueCreateFormApiV3.getFormChoices(
                  formDetails.projectId,
                  templateFormId,
                  formDetails.issueType.id,
                  formDetails.requestType?.id,
                ),
              issueCreateFormApiV3.getInsightChoices.bind(issueCreateFormApiV3),
            ),
            (
              searchType: UserSearchType | undefined,
              questionId: number,
              query: string,
            ): Promise<SelectOption[]> => {
              if (searchType) {
                return issueCreateFormApiV3.searchUsers(
                  formDetails.projectId,
                  formDetails.projectFormId,
                  questionId,
                  query,
                );
              }
              return browserUtils.searchUser(query);
            },
            form,
          );
          return new CreateFormStore(
            formDetails,
            formStore,
            browserUtils,
            issueCreateFormApiV3,
          );
        }
      });
  };
}
