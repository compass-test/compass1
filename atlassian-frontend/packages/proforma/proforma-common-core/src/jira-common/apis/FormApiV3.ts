import { Form, UnsavedForm } from '../../form-system/models/Form';
import { SelectOption } from '../../form-system/models/SelectOption';
import { ApiFieldValuesRequest } from '../models/ApiFieldValuesRequest';
import { ApiFieldValuesResponse } from '../models/ApiFieldValuesResponse';
import { ApiFormChoicesResponse } from '../models/ApiFormChoicesResponse';
import { InsightChoiceApi, InsightChoiceApiType } from '../models/ChoiceApis';
import {
  InsightApiResponse,
  InsightObjectQuery,
} from '../models/InsightApiResponse';
import { IssueIndexForm } from '../models/IssueIndexForm';

export interface FormApiV3 {
  getFormIndex(): Promise<IssueIndexForm[]>;

  getForm(formId: number): Promise<Form | UnsavedForm>;

  submitForm(issueId: number, formId: number, lock?: boolean): Promise<Form>;

  reopenForm(issueId: number, formId: number): Promise<Form>;

  unlockForm(issueId: number, formId: number): Promise<Form>;

  getFormChoices(formId: number): Promise<ApiFormChoicesResponse>;

  postFieldValues(
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse>;

  /** Returns up to `INSIGHT_OBJECT_LIMIT + 1` responses. */
  getInsightChoices(
    customFieldId: number,
    choiceApi: InsightChoiceApi,
    query: InsightObjectQuery,
  ): Promise<InsightApiResponse>;

  searchUsers(
    formId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]>;
}

export const insightPathSegment = (
  choiceApi: InsightChoiceApi,
): string | undefined => {
  switch (choiceApi.api) {
    case InsightChoiceApiType.Default:
      return 'default';
    case InsightChoiceApiType.Deprecated:
      return 'deprecated';
    case InsightChoiceApiType.Reference:
      return 'reference';
    default:
      return;
  }
};
