import React from 'react';

import ModalDialog, {
  ModalBody,
  ModalDialogProps,
  ModalHeader,
  ModalTitle,
  OnCloseHandler,
} from '@atlaskit/modal-dialog';
import { useCompassCSVImportEnabled } from '@atlassian/dragonfruit-feature-flags';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  CreateComponentForm,
  CreateComponentFormProps,
} from './create-component-form';
import { CsvImportLink } from './csv-import-link';
import message from './messages';

type CreateComponentFormModalProps = ModalDialogProps &
  Pick<CreateComponentFormProps, 'onSuccess'>;

export const CreateComponentFormModal = (
  props: CreateComponentFormModalProps,
) => {
  const { onSuccess, ...modalProps } = props;

  const { formatMessage } = useIntl();

  const csvImportEnabled = useCompassCSVImportEnabled();

  return (
    <ModalDialog
      {...modalProps}
      testId={
        props.testId
          ? props.testId + '-form-modal'
          : 'create-component-form-modal'
      }
    >
      <ModalHeader>
        <ModalTitle>
          {formatMessage(message.createComponentFormModalDialogTitle)}
        </ModalTitle>

        {csvImportEnabled && (
          <CsvImportLink onClick={props.onClose as OnCloseHandler} />
        )}
      </ModalHeader>
      <ModalBody>
        <CreateComponentForm
          onSuccess={onSuccess}
          onCancel={props.onClose}
          testId={
            props.testId
              ? props.testId + '-component-form'
              : 'create-component-form-modal-component-form'
          }
        />
      </ModalBody>
    </ModalDialog>
  );
};
