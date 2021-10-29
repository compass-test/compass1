import React from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { ModalTitleContainer } from '../styles';

import { FieldChoiceChange } from './detectFieldChoiceChange';
import {
  FieldChoiceChangePopupMessages,
  IntlFieldChoiceChangePopupMessages,
} from './FieldChoiceChangePopupMessages.intl';

interface FieldChoiceChangePopupProps extends FieldChoiceChange {
  onConfirm: () => void;
  onCancel: () => void;
}

export const FieldChoiceChangePopup = ({
  jiraField,
  onConfirm,
  onCancel,
}: FieldChoiceChangePopupProps) => {
  return (
    <Modal onClose={onCancel}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlFieldChoiceChangePopupMessages[
                FieldChoiceChangePopupMessages.Heading
              ]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          <FormattedMessage
            {...IntlFieldChoiceChangePopupMessages[
              FieldChoiceChangePopupMessages.Message
            ]}
            values={{ jiraFieldName: jiraField.name }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onCancel}>
          <FormattedMessage
            {...IntlFieldChoiceChangePopupMessages[
              FieldChoiceChangePopupMessages.Cancel
            ]}
          />
        </Button>
        <Button autoFocus appearance="warning" onClick={onConfirm}>
          <FormattedMessage
            {...IntlFieldChoiceChangePopupMessages[
              FieldChoiceChangePopupMessages.ReplaceChoices
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};
