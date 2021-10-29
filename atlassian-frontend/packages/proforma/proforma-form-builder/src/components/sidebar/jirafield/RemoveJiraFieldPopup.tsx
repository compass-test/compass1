import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import {
  JiraField,
  jiraFieldTypeDescription,
} from '@atlassian/proforma-common-core/jira-common-models';

import { questionTypeToFieldTypes } from '../../../utils/questionTypeToFieldTypes';
import { ModalTitleContainer } from '../styles';

import { QuestionTypeFieldChange } from './detectQuestionTypeFieldChange';
import {
  IntlRemoveJiraFieldPopupMessages,
  RemoveJiraFieldPopupMessages,
} from './RemoveJiraFieldPopupMessages.intl';

interface RemoveJiraFieldPopupProps extends QuestionTypeFieldChange {
  jiraField: JiraField;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RemoveJiraFieldPopup = ({
  newQuestionType,
  jiraField,
  onConfirm,
  onCancel,
}: RemoveJiraFieldPopupProps) => {
  return (
    <Modal onClose={onCancel}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlRemoveJiraFieldPopupMessages[
                RemoveJiraFieldPopupMessages.Heading
              ]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          <FormattedMessage
            {...IntlRemoveJiraFieldPopupMessages[
              RemoveJiraFieldPopupMessages.WillRemoveLink
            ]}
          />
        </div>
        <div>
          <FormattedMessage
            {...IntlRemoveJiraFieldPopupMessages[
              RemoveJiraFieldPopupMessages.CannotRemainLinked
            ]}
            values={{ jiraFieldName: jiraField.name }}
          />
        </div>
        <table>
          <col width="180" />
          <tr>
            <td>
              <FormattedMessage
                {...IntlRemoveJiraFieldPopupMessages[
                  RemoveJiraFieldPopupMessages.CurrentQuestionType
                ]}
              />
            </td>
            <td>
              <FormattedMessage
                {...jiraFieldTypeDescription(jiraField.fieldType)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <FormattedMessage
                {...IntlRemoveJiraFieldPopupMessages[
                  RemoveJiraFieldPopupMessages.NewQuestionType
                ]}
              />
            </td>
            <td>
              <FormattedMessage
                {...jiraFieldTypeDescription(
                  questionTypeToFieldTypes(newQuestionType)[0],
                )}
              />
            </td>
          </tr>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onCancel}>
          <FormattedMessage
            {...IntlRemoveJiraFieldPopupMessages[
              RemoveJiraFieldPopupMessages.Cancel
            ]}
          />
        </Button>
        <Button autoFocus appearance="warning" onClick={onConfirm}>
          <FormattedMessage
            {...IntlRemoveJiraFieldPopupMessages[
              RemoveJiraFieldPopupMessages.RemoveJiraField
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};
