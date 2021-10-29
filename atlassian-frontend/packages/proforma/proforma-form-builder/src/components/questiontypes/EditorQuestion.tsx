import React from 'react';

import { NodeSelection } from 'prosemirror-state';
import { isNodeSelection } from 'prosemirror-utils';
import { FormattedMessage } from 'react-intl';

import { EditorActions } from '@atlaskit/editor-core';
// eslint-disable-next-line no-restricted-imports
import { Label } from '@atlaskit/field-base';
import {
  LabelWrapper,
  QuestionErrorMsg,
  QuestionHelperMsg,
} from '@atlassian/proforma-common-core/form-system';
import {
  FormQuestionType,
  QuestionParameters,
} from '@atlassian/proforma-common-core/form-system-models';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';
import {
  FormBuilderMessage,
  IntlFormBuilderMessages,
} from '../JiraAdfFormBuilderMessages.intl';

import { DragHandle } from './DragHandle';
import { EditorDate } from './EditorDate';
import { EditorDateTime } from './EditorDateTime';
import { EditorDropdown } from './EditorDropdown';
import { EditorLongText } from './EditorLongText';
import { EditorMultipleChoice } from './EditorMultipleChoice';
import { EditorMultipleUserPicker } from './EditorMultipleUserPicker';
import { EditorNumber } from './EditorNumber';
import { EditorParagraph } from './EditorParagraph';
import { EditorShortText } from './EditorShortText';
import { EditorSingleChoice } from './EditorSingleChoice';
import { EditorSingleUserPicker } from './EditorSingleUserPicker';
import { EditorTime } from './EditorTime';

interface EditorQuestionProps {
  question: QuestionParameters;
  editorActions: EditorActions;
  refData: FormBuilderReferenceData;
}

function isQuestionSelected(
  editorActions: EditorActions,
  questionId: number,
): boolean {
  const editorView = editorActions._privateGetEditorView();

  if (!editorView) {
    return false;
  }

  const { selection } = editorView.state;
  if (!isNodeSelection(selection)) {
    return false;
  }

  const nodeSelection = selection as NodeSelection;

  return (
    nodeSelection.node &&
    nodeSelection.node.attrs &&
    nodeSelection.node.attrs.parameters &&
    nodeSelection.node.attrs.parameters.id === questionId &&
    nodeSelection.node.attrs.extensionKey === 'question'
  );
}

/**
 * A question rendered in the form builder editor. Intended to look like the real questions, but does not share
 * code with question components from the form system because they require MobX which isn't available in the editor.
 */
export const EditorQuestion: React.FunctionComponent<EditorQuestionProps> = ({
  question,
  editorActions,
  refData,
}) => {
  const { id, label, description, validation } = question;
  const { rq } = validation;

  const isSelected = isQuestionSelected(editorActions, id);

  return (
    <div>
      {isSelected && (
        <DragHandle
          tooltipMsg={
            <FormattedMessage
              {...IntlFormBuilderMessages[
                FormBuilderMessage.DragHandleQuestionTooltip
              ]}
            />
          }
        />
      )}
      <LabelWrapper>
        <Label
          htmlFor={`pf-fb-questionview-${id}`}
          label={label}
          isRequired={rq}
        />
      </LabelWrapper>
      <QuestionHelperMsg description={description} />
      {renderQuestion(question, refData)}
      <QuestionErrorMsg validationErrors={null} />
    </div>
  );
};

const renderQuestion = (
  question: QuestionParameters,
  refData: FormBuilderReferenceData,
) => {
  switch (question.type) {
    case FormQuestionType.ChoiceDropdown:
      return <EditorDropdown {...question} />;
    case FormQuestionType.ChoiceMultiple:
      const jiraField = question.jiraField
        ? refData.jiraFieldMap?.get(question.jiraField)
        : undefined;
      return (
        <EditorMultipleChoice {...question} jiraFieldDetails={jiraField} />
      );
    case FormQuestionType.ChoiceSingle:
      return <EditorSingleChoice {...question} />;
    case FormQuestionType.ChoiceDropdownMultiple:
      return <EditorDropdown {...question} />;
    case FormQuestionType.Date:
      return <EditorDate {...question} />;
    case FormQuestionType.DateTime:
      return <EditorDateTime {...question} />;
    case FormQuestionType.Number:
      return <EditorNumber {...question} />;
    case FormQuestionType.TextEmail:
      return <EditorLongText {...question} />;
    case FormQuestionType.TextLong:
      return <EditorLongText {...question} />;
    case FormQuestionType.TextParagraph:
      return <EditorParagraph {...question} />;
    case FormQuestionType.TextShort:
      return <EditorShortText {...question} />;
    case FormQuestionType.TextUrl:
      return <EditorLongText {...question} />;
    case FormQuestionType.Time:
      return <EditorTime {...question} />;
    case FormQuestionType.UserMultiple:
      return <EditorMultipleUserPicker {...question} />;
    case FormQuestionType.UserSingle:
      return <EditorSingleUserPicker {...question} />;
    default:
      return <NotImplemented {...question} />;
  }
};

const NotImplemented: React.FunctionComponent<QuestionParameters> = question => {
  // eslint-disable-next-line no-console
  console.error(`Question type '${question.type}' is not yet implemented.`);
  return (
    <div>
      Question type <b>{question.type}</b> is not yet implemented.
    </div>
  );
};
