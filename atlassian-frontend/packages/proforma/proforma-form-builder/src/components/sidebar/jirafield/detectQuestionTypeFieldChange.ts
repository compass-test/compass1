import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  JiraField,
  JiraFieldType,
} from '@atlassian/proforma-common-core/jira-common-models';

import { questionTypeToFieldTypes } from '../../../utils/questionTypeToFieldTypes';

export interface QuestionTypeFieldChange {
  jiraField?: JiraField;
  dataConnection?: DataConnectionResponse;
  newQuestionType: FormQuestionType;
}

export function detectQuestionTypeFieldChange(
  newQuestionType: FormQuestionType,
  jiraField?: JiraField,
  dataConnection?: DataConnectionResponse,
): QuestionTypeFieldChange | undefined {
  if (!jiraField && !dataConnection) {
    // There is no Jira field or data connection, so changing the question type won't change any linked field.
    return undefined;
  }

  if (jiraField) {
    const oldFieldType: JiraFieldType = jiraField.fieldType;
    const newFieldTypes: JiraFieldType[] = questionTypeToFieldTypes(
      newQuestionType,
    );

    if (!newFieldTypes.includes(oldFieldType)) {
      // The new question type is not compatible with the Jira field, so this will require a change to the linked Jira field
      return { jiraField, dataConnection, newQuestionType };
    }
  }

  if (dataConnection) {
    if (
      newQuestionType !== FormQuestionType.ChoiceDropdown &&
      newQuestionType !== FormQuestionType.ChoiceSingle &&
      newQuestionType !== FormQuestionType.ChoiceMultiple
    ) {
      // The new question type is not compatible with data connections, so this will require a change to the data connection
      return { jiraField, dataConnection, newQuestionType };
    }
  }

  // The changes to the question type will not affect linked fields
  return undefined;
}
