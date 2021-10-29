import React, { useState } from 'react';

import Button from '@atlaskit/button';
import { ModalTransition } from '@atlaskit/modal-dialog';

import TextAvatarEditor from '../src';

import { withIntlProvider } from './helpers';

function Basic() {
  const [imageURI, setImageURI] = useState('');

  const [isOpen, setOpen] = useState(false);

  function uploadImage(
    imageUri: string,
    text: string,
    color: string,
    isInvalid: boolean,
  ) {
    // Contact avatar service to upload!

    // Save locally
    setImageURI(imageUri);

    // Close modal
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={() => setOpen((open) => !open)}>Show me!</Button>

      <p>Avatar url is:</p>
      <pre>{imageURI.slice(70, 100) + '...'}</pre>

      <ModalTransition>
        {isOpen && (
          <TextAvatarEditor
            fullName="John Smith"
            manageProfileLink="#"
            handleClickCancel={() => setOpen(false)}
            handleClickUpload={uploadImage}
          />
        )}
      </ModalTransition>
    </div>
  );
}

export default withIntlProvider(Basic);
