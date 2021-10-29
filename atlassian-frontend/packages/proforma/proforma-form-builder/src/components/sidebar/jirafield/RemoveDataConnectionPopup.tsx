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
  DataConnectionResponse,
  jiraFieldTypeDescription,
} from '@atlassian/proforma-common-core/jira-common-models';

import { questionTypeToFieldTypes } from '../../../utils/questionTypeToFieldTypes';
import { ModalTitleContainer } from '../styles';

import { QuestionTypeFieldChange } from './detectQuestionTypeFieldChange';
import {
  IntlRemoveDataConnectionPopupMessages,
  RemoveDataConnectionPopupMessages,
} from './RemoveDataConnectionPopupMessages.intl';

interface RemoveDataConnectionPopupProps extends QuestionTypeFieldChange {
  dataConnection: DataConnectionResponse;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RemoveDataConnectionPopup = ({
  newQuestionType,
  dataConnection,
  onConfirm,
  onCancel,
}: RemoveDataConnectionPopupProps) => {
  return (
    <Modal onClose={onCancel}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlRemoveDataConnectionPopupMessages[
                RemoveDataConnectionPopupMessages.Heading
              ]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          <FormattedMessage
            {...IntlRemoveDataConnectionPopupMessages[
              RemoveDataConnectionPopupMessages.Message
            ]}
            values={{ dataConnectionName: dataConnection.name }}
          />
        </div>
        <table>
          <col width="180" />
          <tr>
            <td>
              <FormattedMessage
                {...IntlRemoveDataConnectionPopupMessages[
                  RemoveDataConnectionPopupMessages.CurrentQuestionType
                ]}
              />
            </td>
            <td>
              <FormattedMessage
                {...IntlRemoveDataConnectionPopupMessages[
                  RemoveDataConnectionPopupMessages.Choice
                ]}
              />
            </td>
          </tr>
          <tr>
            <td>
              <FormattedMessage
                {...IntlRemoveDataConnectionPopupMessages[
                  RemoveDataConnectionPopupMessages.NewQuestionType
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
            {...IntlRemoveDataConnectionPopupMessages[
              RemoveDataConnectionPopupMessages.Cancel
            ]}
          />
        </Button>
        <Button autoFocus appearance="warning" onClick={onConfirm}>
          <FormattedMessage
            {...IntlRemoveDataConnectionPopupMessages[
              RemoveDataConnectionPopupMessages.RemoveDataConnection
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};
