import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import { JiraFieldType } from '@atlassian/proforma-common-core/jira-common-models';

export function fieldTypeToQuestionType(
  fieldType: JiraFieldType,
  fieldKey?: string,
): FormQuestionType {
  // Special case: If the field key is fixVersions use Dropdown multiple choice
  if (fieldKey === 'fixVersions' && fieldType === JiraFieldType.MultiChoice) {
    return FormQuestionType.ChoiceDropdownMultiple;
  }
  switch (fieldType) {
    case JiraFieldType.Date:
      return FormQuestionType.Date;
    case JiraFieldType.DateTime:
      return FormQuestionType.DateTime;
    case JiraFieldType.InsightObject:
      return FormQuestionType.ChoiceDropdown;
    case JiraFieldType.InsightObjects:
      return FormQuestionType.ChoiceDropdownMultiple;
    case JiraFieldType.MultiChoice:
      return FormQuestionType.ChoiceMultiple;
    case JiraFieldType.MultiUser:
      return FormQuestionType.UserMultiple;
    case JiraFieldType.Number:
      return FormQuestionType.Number;
    case JiraFieldType.SingleChoice:
      return FormQuestionType.ChoiceDropdown;
    case JiraFieldType.SingleUser:
      return FormQuestionType.UserSingle;
    case JiraFieldType.Text:
      return FormQuestionType.TextLong;
    case JiraFieldType.Url:
      return FormQuestionType.TextUrl;
    default:
      return FormQuestionType.TextLong;
  }
}
