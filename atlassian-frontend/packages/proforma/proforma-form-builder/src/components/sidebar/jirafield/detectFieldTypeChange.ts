import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import {
  JiraField,
  JiraFieldType,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';
import { questionTypeToFieldTypes } from '../../../utils/questionTypeToFieldTypes';

export interface FieldTypeChange {
  jiraField: JiraField;
  oldType: JiraFieldType;
  newType: JiraFieldType;
}

export async function detectFieldTypeChange(
  refData: FormBuilderReferenceData,
  questionType: FormQuestionType,
  fieldKey?: string,
): Promise<FieldTypeChange | undefined> {
  const { jiraFieldMap } = refData;

  if (!jiraFieldMap) {
    // If the reference data hasn't loaded yet then we can't detect a change yet.
    // Note that the UI should prevent any changes until the reference has loaded so this shouldn't occur.
    return undefined;
  }

  if (!fieldKey) {
    // Removing a link to a Jira field always retains the existing question type, so there is no change to the field type
    return undefined;
  }

  const jiraField = jiraFieldMap.get(fieldKey);

  if (!jiraField) {
    // The Jira field couldn't be found on the map of fields. This shouldn't occur, but if it does then we can't detect any change.
    return undefined;
  }

  const oldTypes = questionTypeToFieldTypes(questionType);
  const newType = jiraField.fieldType;

  if (oldTypes.includes(newType)) {
    // The new field type is compatible with the existing question type; there is not change.
    return undefined;
  }

  // The new field type is different to the existing question type, so tell the caller what changed
  return { jiraField, newType, oldType: oldTypes[0] };
}
