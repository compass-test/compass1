import React, { ReactElement } from 'react';

import Button from '@atlaskit/button';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ConfirmationModal, DeleteModal, useModalControls } from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const ConfirmationModalExample = () => {
  const [{ isOpen }, { open, close }] = useModalControls();

  return (
    <>
      <ConfirmationModal
        closeButton="Cancel"
        heading="Change component type?"
        isOpen={isOpen}
        onClose={close}
        onSubmit={close}
        submitButton="Confirm"
      >
        Are you sure that you want to change the component type to Service?
      </ConfirmationModal>
      <Button appearance="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
};

export const ConfirmationModalWarningExample = () => {
  const [{ isOpen }, { open, close }] = useModalControls();

  return (
    <>
      <ConfirmationModal
        appearance="warning"
        closeButton="Go back"
        heading="Reset settings?"
        isOpen={isOpen}
        onClose={close}
        onSubmit={close}
        submitButton="Reset"
      >
        Compass will permanently reset all of your configuration settings. This
        can’t be undone.
      </ConfirmationModal>
      <Button appearance="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
};

export const ConfirmationModalDangerExample = () => {
  const [{ isOpen }, { open, close }] = useModalControls();

  return (
    <>
      <ConfirmationModal
        appearance="danger"
        closeButton="No, keep it"
        heading="You're about to do something bad"
        isOpen={isOpen}
        onClose={close}
        onSubmit={close}
        submitButton="Do it"
      >
        <p>Before you do this, there’s some things you should know:</p>
        <ul>
          <li>4 pages have links to this page that will break</li>
          <li>2 child pages will be left behind in the page tree</li>
        </ul>
      </ConfirmationModal>
      <Button appearance="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
};

export const DeleteModalExample = () => {
  const [{ isOpen }, { open, close }] = useModalControls();

  return (
    <>
      <DeleteModal
        heading="Are you sure you want to do this?"
        isOpen={isOpen}
        onClose={close}
        onSubmit={close}
      >
        This action cannot be undone
      </DeleteModal>
      <Button appearance="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
};

export const DeleteModalWithCustomButtonsExample = () => {
  const [{ isOpen }, { open, close }] = useModalControls();

  return (
    <>
      <DeleteModal
        closeButton="Cancel and return"
        heading="Are you sure you want to do this?"
        isOpen={isOpen}
        onClose={close}
        onSubmit={close}
        submitButton="Delete component"
      >
        This action cannot be undone
      </DeleteModal>
      <Button appearance="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
};
