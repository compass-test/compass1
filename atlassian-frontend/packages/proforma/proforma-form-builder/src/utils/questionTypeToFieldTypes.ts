import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import { JiraFieldType } from '@atlassian/proforma-common-core/jira-common-models';

export function questionTypeToFieldTypes(
  questionType: FormQuestionType,
): JiraFieldType[] {
  switch (questionType) {
    case FormQuestionType.TextShort:
    case FormQuestionType.TextLong:
    case FormQuestionType.TextParagraph:
    case FormQuestionType.TextEmail:
      return [JiraFieldType.Text];
    case FormQuestionType.TextUrl:
      return [JiraFieldType.Url];
    case FormQuestionType.ChoiceDropdown:
    case FormQuestionType.ChoiceSingle:
      return [JiraFieldType.SingleChoice, JiraFieldType.InsightObject];
    case FormQuestionType.ChoiceMultiple:
    case FormQuestionType.ChoiceDropdownMultiple:
      return [JiraFieldType.MultiChoice, JiraFieldType.InsightObjects];
    case FormQuestionType.Date:
      return [JiraFieldType.Date];
    case FormQuestionType.DateTime:
    case FormQuestionType.Time:
      return [JiraFieldType.DateTime];
    case FormQuestionType.Number:
      return [JiraFieldType.Number];
    case FormQuestionType.UserSingle:
      return [JiraFieldType.SingleUser];
    case FormQuestionType.UserMultiple:
      return [JiraFieldType.MultiUser];
    default:
      return [JiraFieldType.Unsupported];
  }
}
