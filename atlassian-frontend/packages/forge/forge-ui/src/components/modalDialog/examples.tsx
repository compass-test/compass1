import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ModalTransition } from '@atlaskit/modal-dialog';
import {
  ButtonProps,
  ModalDialogProps,
  FormProps,
} from '@atlassian/forge-ui-types';
import {
  createDefaultExport,
  createExampleComponent,
} from '@atlassian/aux-test-utils';
import { ModalDialog as DefaultModal } from './';
import { Button as DefaultButton } from '../button';
import { Form as DefaultForm } from '../form';
import TextField from '../textfield';
import { TextPlain } from '../text';
import Image from '../image';

const Button = createExampleComponent<ButtonProps>(DefaultButton);
const ModalDialog = createExampleComponent<ModalDialogProps>(DefaultModal);
const Form = createExampleComponent<FormProps<any>>(DefaultForm);

export default createDefaultExport();

export const basic = () => {
  return (
    <ModalDialog header={'My dialog header'} onClose={action('onClose')}>
      <TextPlain content={'Hello world'} />
    </ModalDialog>
  );
};

export const withImages = () => {
  return (
    <ModalDialog header={'My dialog header'} onClose={action('onClose')}>
      <Image src="https://via.placeholder.com/600x300" alt="placeholder" />
      <Image src="https://via.placeholder.com/600x300" alt="placeholder" />
      <Image src="https://via.placeholder.com/600x300" alt="placeholder" />
      <Image src="https://via.placeholder.com/600x300" alt="placeholder" />
    </ModalDialog>
  );
};

function OpenAndClose() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleModal} text={'Open'} />
      <TextPlain content={String(isOpen)} />
      <ModalTransition>
        {isOpen && (
          <ModalDialog onClose={toggleModal} header={'My dialog header'}>
            <TextPlain content={String(isOpen)} />
          </ModalDialog>
        )}
      </ModalTransition>
    </>
  );
}

export const openAndClose = () => <OpenAndClose />;

function ModalWithForm() {
  return (
    <ModalDialog header={'My Form'} onClose={action('onClose')}>
      <Form onSubmit={action('onSubmit')} submitButtonText="Let's go">
        <TextField name="username" label="username" />
        <Button
          text="Go back"
          key="actionButton.0"
          onClick={action('go-back')}
        />
      </Form>
    </ModalDialog>
  );
}

export const withForm = () => <ModalWithForm />;
