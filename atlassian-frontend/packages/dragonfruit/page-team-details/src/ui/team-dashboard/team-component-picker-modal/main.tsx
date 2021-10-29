import React, { useState } from 'react';

import Blanket from '@atlaskit/blanket';
import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Form, { ErrorMessage, Field } from '@atlaskit/form';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentOption } from '../../../controllers/components-add-team-owner';
import { useConfirmationModalController } from '../../../controllers/owner-override-confirmation-modal-controller';

import { ComponentSelect } from './component-select';
import messages from './messages';
import { OwnerOverrideConfirmationModal } from './owner-override-confirmation-modal';
import { Footer } from './styled';
import {
  TeamComponentPickerFormData,
  TeamComponentPickerModalProps,
} from './types';

export const TeamComponentPickerModal = (
  props: TeamComponentPickerModalProps,
) => {
  const { ownerId, onFormSubmit, ...modalProps } = props;

  const { formatMessage } = useIntl();
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [
    { isOpen: isConfirmationModalOpen, onSubmit: confirmationModalOnSubmit },
    {
      open: openConfirmationModal,
      close: closeConfirmationModal,
      setComponent,
    },
  ] = useConfirmationModalController({ onSubmit: onFormSubmit });

  const validateField = (value: ComponentOption | undefined) => {
    if (value) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  };

  const handleSubmit = (formData: TeamComponentPickerFormData) => {
    const { value, label, type, ownerId, description } = formData.component;

    if (ownerId) {
      setComponent(value, label, type);
      openConfirmationModal();
    } else {
      onFormSubmit(value, label, type, description);
    }
  };

  return (
    <>
      {/* Hide picker modal if confirmation modal is open */}
      {!isConfirmationModalOpen && (
        <ModalDialog
          testId="dragonfruit-team-component-picker-modal"
          autoFocus={false}
          isBlanketHidden
          {...modalProps}
        >
          <ModalHeader>
            <ModalTitle>
              {formatMessage(messages.addComponentModalHeading)}
            </ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Form<TeamComponentPickerFormData> onSubmit={handleSubmit}>
              {({ formProps, submitting }) => (
                <form {...formProps}>
                  <Field<ComponentOption>
                    name="component"
                    validate={validateField}
                  >
                    {({ fieldProps, error }) => (
                      <>
                        <ComponentSelect ownerId={ownerId} {...fieldProps} />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                      </>
                    )}
                  </Field>
                  <Footer>
                    <ButtonGroup>
                      <Button
                        appearance="subtle"
                        onClick={modalProps.onClose}
                        isDisabled={submitting}
                        testId="dragonfruit-team-component-picker-modal.ui.cancel-button"
                      >
                        {formatMessage(CommonMessages.cancel)}
                      </Button>
                      <LoadingButton
                        appearance="primary"
                        type="submit"
                        isLoading={submitting}
                        isDisabled={!isSubmitEnabled}
                        testId="dragonfruit-team-component-picker-modal.ui.submit-button"
                      >
                        {formatMessage(CommonMessages.save)}
                      </LoadingButton>
                    </ButtonGroup>
                  </Footer>
                </form>
              )}
            </Form>
          </ModalBody>
        </ModalDialog>
      )}
      <OwnerOverrideConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        onSubmit={confirmationModalOnSubmit}
        isBlanketHidden
      />
      <Blanket isTinted />
    </>
  );
};
