import { FormChoice } from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../../models/FormBuilderReferenceData';

const loadingChoice: FormChoice = {
  id: '',
  label: 'Loading...',
};

export function isLoadingChoices(
  dataConnection: DataConnectionResponse | undefined,
  jiraField: JiraField | undefined,
  choices: any[],
  refData: FormBuilderReferenceData,
): boolean {
  const { dataConnectionMap, jiraFieldMap } = refData;
  if (dataConnection) {
    return !dataConnectionMap;
  } else if (jiraField) {
    return !jiraFieldMap;
  } else {
    return false;
  }
}

export function getQuestionChoices(
  dataConnection: DataConnectionResponse | undefined,
  jiraField: JiraField | undefined,
  choices: any[],
  refData: FormBuilderReferenceData,
): FormChoice[] {
  const { dataConnectionMap, jiraFieldMap } = refData;
  let loading;
  let options: FormChoice[];
  if (dataConnection) {
    loading = !dataConnectionMap;
    options = loading
      ? [loadingChoice]
      : dataConnection.choices && dataConnection.choices.length > 0
      ? dataConnection.choices
      : [];
  } else if (jiraField) {
    loading = !jiraFieldMap;
    options = loading
      ? [loadingChoice]
      : jiraField.choices && jiraField.choices.length > 0
      ? jiraField.choices
      : [];
  } else {
    options = choices && choices.length > 0 ? choices : [];
  }

  return options;
}
