import React, { useState } from 'react';

import ModalDialog, {
  ModalBody,
  ModalDialogProps,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  UpdateAnnouncementForm,
  UpdateAnnouncementFormProps,
} from './update-announcement-form';

type UpdateAnnouncementModalProps = ModalDialogProps &
  Pick<
    UpdateAnnouncementFormProps,
    'component' | 'announcement' | 'onSuccess' | 'onCancel'
  >;

export function UpdateAnnouncementModal(props: UpdateAnnouncementModalProps) {
  const { component, announcement, onSuccess, onCancel, ...modalProps } = props;

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
          {formatMessage(messages.updateAnnouncementModalDialogTitle)}
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <UpdateAnnouncementForm
          component={component}
          announcement={announcement}
          onSubmit={() => setSubmitting(true)}
          onSuccess={onSuccess}
          onFailure={() => setSubmitting(false)}
          onCancel={onCancel}
        />
      </ModalBody>
    </ModalDialog>
  );
}
