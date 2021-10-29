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
  ConnectionConflictPopupMessages,
  IntlConnectionConflictPopupMessages,
} from './ConnectionConflictPopupMessages.intl';
import { ConnectionConflict } from './detectConnectionConflict';

interface ConnectionConflictPopupProps extends ConnectionConflict {
  onCancel: () => void;
}

export const ConnectionConflictPopup = ({
  jiraField,
  dataConnection,
  cause,
  onCancel,
}: ConnectionConflictPopupProps) => {
  return (
    <Modal onClose={onCancel}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlConnectionConflictPopupMessages[
                ConnectionConflictPopupMessages.Heading
              ]}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        <div>
          <FormattedMessage
            {...IntlConnectionConflictPopupMessages[
              ConnectionConflictPopupMessages
                .CannotLinkJiraFieldAndDataConnection
            ]}
          />
        </div>
        {cause === 'dc' && (
          <>
            <div>
              <FormattedMessage
                {...IntlConnectionConflictPopupMessages[
                  ConnectionConflictPopupMessages.RemoveJiraField
                ]}
              />
            </div>
            <table>
              <col width="180" />
              <tr>
                <td>
                  <FormattedMessage
                    {...IntlConnectionConflictPopupMessages[
                      ConnectionConflictPopupMessages.ExistingJiraField
                    ]}
                  />
                </td>
                <td>{jiraField.name}</td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage
                    {...IntlConnectionConflictPopupMessages[
                      ConnectionConflictPopupMessages.NewDataConnection
                    ]}
                  />
                </td>
                <td>{dataConnection.name}</td>
              </tr>
            </table>
          </>
        )}
        {cause === 'jf' && (
          <>
            <div>
              <FormattedMessage
                {...IntlConnectionConflictPopupMessages[
                  ConnectionConflictPopupMessages.RemoveDataConnection
                ]}
              />
            </div>
            <table>
              <col width="180" />
              <tr>
                <td>
                  <FormattedMessage
                    {...IntlConnectionConflictPopupMessages[
                      ConnectionConflictPopupMessages.ExistingDataConnection
                    ]}
                  />
                </td>
                <td>{dataConnection.name}</td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage
                    {...IntlConnectionConflictPopupMessages[
                      ConnectionConflictPopupMessages.NewJiraField
                    ]}
                  />
                </td>
                <td>{jiraField.name}</td>
              </tr>
            </table>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button appearance="warning" onClick={onCancel}>
          <FormattedMessage
            {...IntlConnectionConflictPopupMessages[
              ConnectionConflictPopupMessages.Close
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};
