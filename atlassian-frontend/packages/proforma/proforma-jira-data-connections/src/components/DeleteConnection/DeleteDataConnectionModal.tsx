import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import LoadingButton from '@atlaskit/button/loading-button';
import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import SectionMessage from '@atlaskit/section-message';
import {
  CommonMessage,
  IntlCommonMessages,
  LoadingSpinner,
} from '@atlassian/proforma-common-core/jira-common';

import { TemplateFormName } from '../../models/TemplateFormName';
import { DataConnectionsUtils } from '../../utils/DataConnectionsUtils';

import {
  DeleteDataConnectionMessage,
  IntlDeleteDataConnectionMessages,
} from './DeleteDataConnectionModalMessages.intl';

interface DeleteDataConnectionModalProps {
  connectionId: string;
  dataConnectionsUtils: DataConnectionsUtils;
  deletedCallback: () => void;
  cancelCallback: () => void;
}

export const DeleteDataConnectionModal = observer(
  ({
    connectionId,
    dataConnectionsUtils,
    deletedCallback,
    cancelCallback,
  }: DeleteDataConnectionModalProps) => {
    const [templateForms, setTemplateForms] = useState<TemplateFormName[]>();
    const [deletingConnection, setDeletingConnection] = useState(false);

    useEffect(() => {
      dataConnectionsUtils
        .loadDataConnectionTemplateForms(connectionId)
        .then(loadedTemplateForms => {
          setTemplateForms(loadedTemplateForms);
        });
    }, [connectionId, dataConnectionsUtils]);

    const deleteDataConnection = (): void => {
      setDeletingConnection(true);
      dataConnectionsUtils.deleteConnection(connectionId).then(() => {
        setDeletingConnection(false);
        deletedCallback();
      });
    };

    return (
      <ModalTransition>
        <Modal>
          <ModalHeader>
            <ModalTitle appearance="warning">
              <FormattedMessage
                {...IntlDeleteDataConnectionMessages[
                  DeleteDataConnectionMessage.Title
                ]}
              />
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {templateForms === undefined ? (
              <LoadingSpinner
                message={
                  IntlDeleteDataConnectionMessages[
                    DeleteDataConnectionMessage
                      .CheckingForConnectionUsageMessage
                  ]
                }
              />
            ) : templateForms.length === 0 ? (
              <WarningList />
            ) : (
              <TemplateFormNamesField forms={templateForms} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={cancelCallback}>
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Cancel]} />
            </Button>
            <LoadingButton
              appearance="warning"
              autoFocus
              isDisabled={deletingConnection}
              isLoading={templateForms === undefined}
              onClick={deleteDataConnection}
            >
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Delete]} />
            </LoadingButton>
          </ModalFooter>
        </Modal>
      </ModalTransition>
    );
  },
);

const TemplateFormNamesField = observer(
  ({ forms }: { forms: TemplateFormName[] }) => {
    return (
      <div>
        <SectionMessage appearance="warning">
          <FormattedMessage
            {...IntlDeleteDataConnectionMessages[
              DeleteDataConnectionMessage.DataConnectionUsedByMessage
            ]}
          />
        </SectionMessage>
        <table>
          <thead>
            <tr>
              <th>
                <FormattedMessage
                  {...IntlDeleteDataConnectionMessages[
                    DeleteDataConnectionMessage.ProjectColumnName
                  ]}
                />
              </th>
              <th>
                <FormattedMessage
                  {...IntlDeleteDataConnectionMessages[
                    DeleteDataConnectionMessage.FormNameColumnName
                  ]}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, i) => (
              <tr key={i}>
                <td>{form.project}</td>
                <td>{form.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WarningList existingForms />
      </div>
    );
  },
);

const WarningList = ({
  existingForms = false,
}: {
  existingForms?: boolean;
}) => {
  return (
    <ul>
      {existingForms && (
        <li>
          <FormattedMessage
            {...IntlDeleteDataConnectionMessages[
              DeleteDataConnectionMessage.WarningListItem1
            ]}
          />
        </li>
      )}
      <li>
        <FormattedMessage
          {...IntlDeleteDataConnectionMessages[
            DeleteDataConnectionMessage.WarningListItem2
          ]}
        />
      </li>
      <li>
        <FormattedMessage
          {...IntlDeleteDataConnectionMessages[
            DeleteDataConnectionMessage.WarningListItem3
          ]}
        />
      </li>
      <li>
        <FormattedMessage
          {...IntlDeleteDataConnectionMessages[
            DeleteDataConnectionMessage.WarningListItem4
          ]}
        />
      </li>
    </ul>
  );
};
