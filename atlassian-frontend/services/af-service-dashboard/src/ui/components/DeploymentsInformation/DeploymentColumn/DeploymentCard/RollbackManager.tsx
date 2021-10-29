/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core';

import Button, { ButtonProps } from '@atlaskit/button/standard-button';
import Modal, {
  ModalTransition,
  ModalBody,
  ModalTitle,
  ModalHeader,
  ModalFooter,
} from '@atlaskit/modal-dialog';
import Tooltip from '@atlaskit/tooltip';
import Spinner from '@atlaskit/spinner';
import RetryIcon from '@atlaskit/icon/glyph/retry';

import request from '../../../../utils/request';
import { uploadButton, buttonPrimaryColor, spinner } from './styles';

type RollbackManagerProps = {
  artefactUrl?: string;
  status: string;
  deploymentId: string;
  pipelineUuid: string;
};

type TriggerWebhookPayload = {
  pipeline: string;
};

type ButtonPropsAndText = { text: string } & ButtonProps;

type ModalState = 'confirming' | 'complete' | 'error' | 'loading';

const RollbackManager = (props: RollbackManagerProps) => {
  const { artefactUrl, status, deploymentId, pipelineUuid } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('confirming');
  const [pipelineUrl, setPipelineUrl] = useState('');
  const [error, setError] = useState('');

  const openRollbackModal = () => {
    setModalState('confirming');
    setIsOpen(true);
  };
  const closeRollbackModal = () => setIsOpen(false);
  const handleRollback = () => {
    setModalState('loading');
    request
      .post<TriggerWebhookPayload>('/api/action/trigger-rollback', {
        deploymentId,
      })
      .then(data => {
        setModalState('complete');
        setPipelineUrl(data.pipeline);
      })
      .catch(err => {
        setModalState('error');
        setError(err.message ? err.message : err);
      });
  };

  const appearance = modalState === 'error' ? 'danger' : undefined;

  const closeAction: ButtonPropsAndText = {
    text: 'Close',
    onClick: closeRollbackModal,
    appearance: 'subtle',
  };
  const confirmAction: ButtonPropsAndText = {
    text: 'Confirm',
    onClick: handleRollback,
    appearance: appearance || 'primary',
    autoFocus: true,
  };

  let actions = [];
  switch (modalState) {
    case 'confirming':
      actions = [confirmAction, closeAction];
      break;
    case 'complete':
    case 'error':
    case 'loading':
    default:
      actions = [closeAction];
      break;
  }

  if (!artefactUrl || status !== 'SUCCESSFUL') {
    return null;
  }

  return (
    <React.Fragment>
      <Tooltip content="Rollback" position="right">
        <div css={uploadButton} onClick={openRollbackModal}>
          <RetryIcon label="rollback" primaryColor={buttonPrimaryColor} />
        </div>
      </Tooltip>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeRollbackModal}>
            <ModalHeader>
              <ModalTitle
                appearance={modalState === 'error' ? 'danger' : undefined}
              >
                Trigger Rollback
              </ModalTitle>
            </ModalHeader>

            <ModalBody>
              {modalState === 'confirming' && (
                <React.Fragment>
                  <p>
                    Click 'Confirm' to rollback to{' '}
                    <b>Deployment #{pipelineUuid}</b>.
                  </p>
                </React.Fragment>
              )}
              {modalState === 'loading' && (
                <div css={spinner}>
                  <Spinner />
                </div>
              )}
              {modalState === 'error' &&
                `Error: ${
                  error || 'An error occurred while triggering rollback'
                }`}
              {modalState === 'complete' && (
                <p>
                  Rollback triggered successfully
                  {pipelineUrl && (
                    <React.Fragment>
                      {': '}
                      <a href={pipelineUrl} target="_blank">
                        Pipeline URL
                      </a>
                    </React.Fragment>
                  )}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              {actions
                .map(({ text, ...props }) => (
                  <Button key={text} {...props}>
                    {text}
                  </Button>
                ))
                .reverse()}
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </React.Fragment>
  );
};

export { RollbackManager };
