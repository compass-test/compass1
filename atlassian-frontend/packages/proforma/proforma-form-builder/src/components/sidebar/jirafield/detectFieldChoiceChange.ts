import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import {
  JiraField,
  JiraFieldType,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';

export interface FieldChoiceChange {
  jiraField: JiraField;
}

/**
 * Detects if a change in linked field will cause the choices on a question to change and thus be lost.
 * Returns the Jira field if there is a change, or returns undefined to indicate no change.
 *
 * @param refData Form builder reference data
 * @param questionType The question type that the question currently is
 * @param oldField The Jira field that the question currently is linked to, if any
 * @param newFieldKey The key of the Jira field that the question is about to be linked to, if any
 */
export function detectFieldChoiceChange(
  refData: FormBuilderReferenceData,
  questionType: FormQuestionType,
  oldField?: JiraField,
  newFieldKey?: string,
): FieldChoiceChange | undefined {
  const { jiraFieldMap } = refData;

  if (!jiraFieldMap) {
    // If the reference data hasn't loaded yet then we can't detect a change yet.
    // Note that the UI should prevent any changes until the reference has loaded so this shouldn't occur.
    return undefined;
  }

  if (oldField) {
    // The question is already linked to a Jira field, so there are no custom choices to be overwritten
    return undefined;
  }

  if (!newFieldKey) {
    // There is no field, but we're not changing to one either
    return undefined;
  }

  if (
    questionType !== FormQuestionType.ChoiceDropdown &&
    questionType !== FormQuestionType.ChoiceSingle &&
    questionType !== FormQuestionType.ChoiceMultiple &&
    questionType !== FormQuestionType.ChoiceDropdownMultiple
  ) {
    // The question isn't currently a choice question
    return undefined;
  }

  const newField = jiraFieldMap.get(newFieldKey);

  if (!newField) {
    // The Jira field couldn't be found on the map of fields. This shouldn't occur, but if it does then we can't detect any change.
    return undefined;
  }

  // We have confirmed that this is a choice question not linked to a field, but we're changing to a field. Is it a choice field we're changing to?
  if (
    newField.fieldType !== JiraFieldType.SingleChoice &&
    newField.fieldType !== JiraFieldType.MultiChoice
  ) {
    return undefined;
  }

  // The new field is a choice field, so the choices are changing
  return { jiraField: newField };
}
