import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { jiraFieldTypeDescription } from '@atlassian/proforma-common-core/jira-common-models';

import { ModalTitleContainer } from '../styles';

import { FieldTypeChange } from './detectFieldTypeChange';
import {
  FieldTypeChangePopupMessages,
  IntlFieldTypeChangePopupMessages,
} from './FieldTypeChangePopupMessages.intl';

interface FieldTypeChangePopupProps extends FieldTypeChange {
  onConfirm: () => void;
  onCancel: () => void;
}

export const FieldTypeChangePopup = ({
  newType,
  oldType,
  jiraField,
  onConfirm,
  onCancel,
}: FieldTypeChangePopupProps) => {
  return (
    <Modal onClose={onCancel}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlFieldTypeChangePopupMessages[
                FieldTypeChangePopupMessages.Heading
              ]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          <FormattedMessage
            {...IntlFieldTypeChangePopupMessages[
              FieldTypeChangePopupMessages.WillChangeQuestionType
            ]}
            values={{ jiraFieldName: jiraField.name }}
          />
        </div>
        <table>
          <col width="180" />
          <tr>
            <td>
              <FormattedMessage
                {...IntlFieldTypeChangePopupMessages[
                  FieldTypeChangePopupMessages.CurrentQuestionType
                ]}
              />
            </td>
            <td>
              <FormattedMessage {...jiraFieldTypeDescription(oldType)} />
            </td>
          </tr>
          <tr>
            <td>
              <FormattedMessage
                {...IntlFieldTypeChangePopupMessages[
                  FieldTypeChangePopupMessages.NewQuestionType
                ]}
              />
            </td>
            <td>
              <FormattedMessage {...jiraFieldTypeDescription(newType)} />
            </td>
          </tr>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onCancel}>
          <FormattedMessage
            {...IntlFieldTypeChangePopupMessages[
              FieldTypeChangePopupMessages.Cancel
            ]}
          />
        </Button>
        <Button autoFocus appearance="warning" onClick={onConfirm}>
          <FormattedMessage
            {...IntlFieldTypeChangePopupMessages[
              FieldTypeChangePopupMessages.ChangeType
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};
