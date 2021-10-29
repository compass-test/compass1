import React, { useState } from 'react';

import ModalDialog, {
  ModalBody,
  ModalDialogProps,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  CreateAnnouncementForm,
  CreateAnnouncementFormProps,
} from './create-announcement-form';
import messages from './messages';
import { Description } from './styled';

type CreateAnnouncementModalProps = ModalDialogProps &
  Pick<CreateAnnouncementFormProps, 'component' | 'onSuccess'>;

export function CreateAnnouncementModal(props: CreateAnnouncementModalProps) {
  const { component, onSuccess, ...modalProps } = props;

  const { formatMessage } = useIntl();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  return (
    <ModalDialog
      shouldCloseOnOverlayClick={!isSubmitting}
      shouldCloseOnEscapePress={!isSubmitting}
      {...modalProps}
    >
      <ModalHeader>
        <ModalTitle>
          {formatMessage(messages.createAnnouncementModalDialogTitle)}
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Description>
          {formatMessage(messages.modalDialogDescription)}
        </Description>
        <CreateAnnouncementForm
          component={component}
          onSubmit={() => setSubmitting(true)}
          onSuccess={onSuccess}
          onFailure={() => setSubmitting(false)}
          onCancel={props.onClose}
        />
      </ModalBody>
    </ModalDialog>
  );
}
