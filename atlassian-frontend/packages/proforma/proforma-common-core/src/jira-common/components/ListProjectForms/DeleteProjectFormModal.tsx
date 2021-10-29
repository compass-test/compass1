import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { TemplateFormIndex } from '../../models/ProjectForm';
import { ModalTitleContainer } from '../styled';

import {
  DeleteProjectFormModalMessage,
  IntlDeleteProjectFormModalMessages,
} from './DeleteProjectFormModalMessages.intl';
import { RequestTypeIcon, RequestTypeItem } from './styled';
import { groupRequestTypes } from './ticketType';
import { TypeRenderer } from './TypeRenderer';

interface DeleteProjectFormModalProps {
  onClose: () => void;
  onConfirm: () => void;
  form: TemplateFormIndex;
  requestTypes: boolean;
  typeRenderer: TypeRenderer;
}

export const DeleteProjectFormModal = ({
  onClose,
  onConfirm,
  form,
  requestTypes,
  typeRenderer,
}: DeleteProjectFormModalProps) => {
  const uniqueRequestTypes = Object.values(
    groupRequestTypes(form.requesttypes),
  ).map(([firstRequestType]) => firstRequestType);

  const types = uniqueRequestTypes.filter(typeRenderer.filter);

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitleContainer>
          <ModalTitle appearance="warning">
            <FormattedMessage
              {...IntlDeleteProjectFormModalMessages[
                DeleteProjectFormModalMessage.Heading
              ]}
              values={{ formName: form.name }}
            />
          </ModalTitle>
        </ModalTitleContainer>
      </ModalHeader>

      <ModalBody>
        {uniqueRequestTypes.length > 1 && (
          <div>
            <span>
              {!requestTypes ? (
                <FormattedMessage
                  {...IntlDeleteProjectFormModalMessages[
                    DeleteProjectFormModalMessage.WillRemoveIssueTypesMsg
                  ]}
                />
              ) : (
                <FormattedMessage
                  {...IntlDeleteProjectFormModalMessages[
                    DeleteProjectFormModalMessage.WillRemoveRequestTypesMsg
                  ]}
                />
              )}
            </span>
            <RequestTypesWrapper>
              {types.map(requestType => (
                <RequestTypeItem key={requestType.id}>
                  <RequestTypeIcon src={requestType.iconUrl} />
                  {requestType.name}
                </RequestTypeItem>
              ))}
            </RequestTypesWrapper>
          </div>
        )}
        <div>
          <FormattedMessage
            {...IntlDeleteProjectFormModalMessages[
              DeleteProjectFormModalMessage.FutureRequestMessage
            ]}
          />
        </div>
        <div>
          <FormattedMessage
            {...IntlDeleteProjectFormModalMessages[
              DeleteProjectFormModalMessage.AffectExistingIssues
            ]}
          />
        </div>{' '}
      </ModalBody>
      <ModalFooter>
        <Button appearance="default" onClick={onClose}>
          <FormattedMessage
            {...IntlDeleteProjectFormModalMessages[
              DeleteProjectFormModalMessage.Cancel
            ]}
          />
        </Button>
        <Button appearance="warning" onClick={onConfirm}>
          <FormattedMessage
            {...IntlDeleteProjectFormModalMessages[
              DeleteProjectFormModalMessage.Delete
            ]}
          />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const RequestTypesWrapper = styled.div`
  margin-top: 25px;
`;
