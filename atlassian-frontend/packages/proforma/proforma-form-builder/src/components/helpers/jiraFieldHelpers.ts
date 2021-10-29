import { findChildren } from 'prosemirror-utils';

import { EditorActions } from '@atlaskit/editor-core';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';
import { jiraFieldTypeToQuestionTypeMap } from '@atlassian/proforma-common-core/jira-common-models';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';

export function checkJiraFieldAlreadyLinked(
  jiraFieldId: string,
  editorActions: EditorActions,
): boolean {
  const editorView = editorActions._privateGetEditorView();

  if (!editorView) {
    // eslint-disable-next-line no-console
    console.error(
      'Could not check for preexisting jira fields, unable to fetch editorView',
    );
    return false;
  }

  const currentEditorValue = editorView.state.doc;

  const duplicateLinkedJiraFieldNodes = findChildren(
    currentEditorValue,
    node =>
      node.attrs &&
      node.attrs.parameters &&
      node.attrs.parameters.jiraField === jiraFieldId,
  );

  return duplicateLinkedJiraFieldNodes.length > 0;
}

export function checkJiraFieldTypeIsValid(
  jiraFieldId: string,
  pastedNodeParams: QuestionParameters,
  referenceData: FormBuilderReferenceData,
): boolean {
  const jiraField = referenceData.jiraFieldMap
    ? referenceData.jiraFieldMap.get(jiraFieldId)
    : undefined;

  if (!jiraField) {
    // eslint-disable-next-line no-console
    console.error(
      'Could not check if the type of the pasted jira field was valid, the field is not available in the refData',
    );
    return false;
  }

  const questionType = pastedNodeParams.type;
  const convertedJiraFieldType = jiraFieldTypeToQuestionTypeMap.get(
    jiraField.fieldType,
  );

  return convertedJiraFieldType
    ? convertedJiraFieldType.includes(questionType)
    : false;
}
