import React from 'react';

import LoadingButton from '@atlaskit/button/loading-button';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OnCloseHandler,
} from '@atlaskit/modal-dialog';
import Modal from '@atlaskit/modal-dialog/modal-dialog';

export type Props = {
  close: OnCloseHandler | undefined;
  target: { name: React.ReactNode };
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const RemoveModal = (props: Props) => {
  return (
    <Modal onClose={props.close} width="small">
      <ModalHeader>
        <ModalTitle appearance="danger">Remove help link?</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <p>
          Are you sure you no longer want to share how your teams can help for{' '}
          <b>{props.target.name}</b>? This action cannot be undone
        </p>
      </ModalBody>
      <ModalFooter>
        {[
          {
            text: 'Remove',
            onClick: () => {
              props.setIsLoading(true);

              console.log('Submitting remove request ...');

              setTimeout(() => {
                props.setIsLoading(false);
                close();
              }, 3000);
            },
            isLoading: props.isLoading,
          },
          { text: 'Cancel', onClick: props.close },
        ]
          .map((props, index) => (
            <LoadingButton
              {...props}
              autoFocus={index === 0}
              appearance={index === 0 ? 'danger' || 'primary' : 'subtle'}
            >
              {props.text}
            </LoadingButton>
          ))
          .reverse()}
      </ModalFooter>
    </Modal>
  );
};

export default RemoveModal;
