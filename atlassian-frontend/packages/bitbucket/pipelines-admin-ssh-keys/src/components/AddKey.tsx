import React, { useCallback } from 'react';

import Button from '@atlaskit/button';
import Form, { Field } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';

import { DOCS_CREATE_SSH_KEYS } from '../const';

import { AddKeyButtons, AddKeyRow, AddKeyWrapper } from './styled';

type Props = {
  createKeyPair: (data: { private_key: string; public_key: string }) => void;
  cancelAddKeyView: () => void;
};

const AddKey: React.FC<Props> = ({ createKeyPair, cancelAddKeyView }) => {
  const handleSubmit = useCallback((data) => createKeyPair(data), [
    createKeyPair,
  ]);

  return (
    <AddKeyWrapper>
      <p>
        Create the key pair and then paste the keys below. Read how to{' '}
        <Button
          href={DOCS_CREATE_SSH_KEYS}
          spacing="none"
          appearance="link"
          target="_blank"
          onClick={(e, analyticEvent) => {
            analyticEvent
              .update({
                actionSubjectId: 'createSshKeysDocumentationLink',
                source: 'pipelinesSshKeysScreen',
              })
              .fire();
          }}
        >
          create SSH keys
        </Button>
        .
      </p>
      <Form onSubmit={handleSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <AddKeyRow>
              <Field
                label="Private key"
                isRequired
                name="private_key"
                defaultValue=""
              >
                {({ fieldProps }: any) => (
                  <TextArea
                    placeholder="Paste your private key here"
                    {...fieldProps}
                  />
                )}
              </Field>
              <p>
                When you save the private key, we'll encrypt and mask it for
                added security.
              </p>
            </AddKeyRow>
            <AddKeyRow>
              <Field
                label="Public key"
                isRequired
                name="public_key"
                defaultValue=""
                css={{ width: '100%' }}
              >
                {({ fieldProps }: any) => (
                  <TextArea
                    placeholder="Paste your public key here"
                    {...fieldProps}
                  />
                )}
              </Field>
              <p>
                Keep your public key here for convenience. Copy the public key
                to any host with resources that Pipelines needs to access.
              </p>
            </AddKeyRow>
            <AddKeyButtons>
              <Button type="submit">Save key pair</Button>
              <Button appearance="subtle" onClick={cancelAddKeyView}>
                Cancel
              </Button>
            </AddKeyButtons>
          </form>
        )}
      </Form>
    </AddKeyWrapper>
  );
};

export default React.memo(AddKey);
