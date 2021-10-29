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

import {
  IntlQuestionKeysMessages,
  QuestionKeysMessages,
} from './QuestionKeysMessages.intl';

interface QuestionKeysConflictPopupProps {
  onCancel: () => void;
  questionKey: string;
}

export const QuestionKeysConflictPopup = ({
  onCancel,
  questionKey,
}: QuestionKeysConflictPopupProps) => {
  return (
    <Modal onClose={onCancel}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlQuestionKeysMessages[QuestionKeysMessages.Heading]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          <FormattedMessage
            {...IntlQuestionKeysMessages[QuestionKeysMessages.Message]}
            values={{ questionKey }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button appearance="warning">
          <FormattedMessage
            {...IntlQuestionKeysMessages[QuestionKeysMessages.Close]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};
