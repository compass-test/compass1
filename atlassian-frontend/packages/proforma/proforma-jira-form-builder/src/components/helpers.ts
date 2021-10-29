import { MutableRefObject } from 'react';

import { ADFEntity, traverse } from '@atlaskit/adf-utils';
import { EditorActions } from '@atlaskit/editor-core';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import {
  choiceQuestionTypes,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  AdfForm,
  adfToTemplateForm,
  FormBuilderReferenceData,
} from '@atlassian/proforma-form-builder';

export async function updateRefDataChoicesInEditor(
  editorActions: EditorActions,
  refData: FormBuilderReferenceData,
  form: TemplateForm,
): Promise<void> {
  const currentEditorValue = await editorActions.getValue();

  traverse(currentEditorValue, {
    extension: (node: ADFEntity) => {
      const isQuestionNode =
        !!node.attrs &&
        node.attrs.extensionKey === 'question' &&
        node.attrs.extensionType === 'com.thinktilt.proforma';
      const isChoiceQuestion =
        !!node.attrs?.parameters &&
        choiceQuestionTypes.includes(node.attrs.parameters.type);

      if (!isQuestionNode || !isChoiceQuestion) {
        return node;
      }

      const questionId = node.attrs!.parameters.id;
      const question = form.design.questions[`${questionId}`];
      if (!question) {
        return node;
      }

      if (question.dcId && refData.dataConnectionMap) {
        const dataConnection = refData.dataConnectionMap.get(question.dcId);

        if (dataConnection) {
          node.attrs!.parameters.choices = dataConnection.choices;
        }
      } else if (question.jiraField && refData.jiraFieldMap) {
        const jiraField = refData.jiraFieldMap.get(question.jiraField);

        if (jiraField) {
          node.attrs!.parameters.choices = jiraField.choices;
        }
      }
    },
  });

  editorActions.replaceDocument(currentEditorValue, false, false);
}

export function getCurrentForm(
  editorActions: EditorActions,
  savedForm: MutableRefObject<TemplateForm | undefined>,
): TemplateForm | null {
  const editorView = editorActions._privateGetEditorView();
  const currentForm = savedForm.current;
  if (!editorView || !currentForm) {
    return null;
  }
  const { doc } = editorView.state;
  const serializer = new JSONTransformer();
  const currentAdf = serializer.encode(doc);
  return adfToTemplateForm(currentForm, currentAdf as AdfForm);
}

export function formHasChanged(
  savedForm: TemplateForm,
  currentForm: TemplateForm,
): boolean {
  return JSON.stringify(savedForm) !== JSON.stringify(currentForm);
}
