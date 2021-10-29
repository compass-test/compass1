import React, { ReactElement } from 'react';

import Button from '@atlaskit/button';
import { useModalControls } from '@atlassian/dragonfruit-common-ui';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { OwnerOverrideConfirmationModal } from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const OwnerOverrideConfirmationModalExample = () => {
  const [{ isOpen }, { open, close }] = useModalControls({ isOpen: true });

  return (
    <>
      <OwnerOverrideConfirmationModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={close}
      />
      <Button appearance="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
};
