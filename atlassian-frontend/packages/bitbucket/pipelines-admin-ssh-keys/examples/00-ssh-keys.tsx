import React from 'react';

import { forceReRender } from '@storybook/react';

import { KeyPair } from '@atlassian/pipelines-models';

import { SshKeys } from '../src';

let keyPair = new KeyPair();
let isFetchingKeyPair = false;

export default () => {
  return (
    <div style={{ width: '880px' }} data-testid="ssh-keys">
      <SshKeys
        keyPair={keyPair}
        createKeyPair={({ public_key, private_key }) => {
          isFetchingKeyPair = true;
          forceReRender();
          setTimeout(() => {
            keyPair = new KeyPair({ public_key, private_key });
            isFetchingKeyPair = false;
            forceReRender();
          }, 500);
        }}
        deleteKeyPair={() => {
          keyPair = new KeyPair();
          forceReRender();
        }}
        generateKeyPair={() => {
          keyPair = new KeyPair({
            public_key: 'foo',
            private_key: 'bar',
          });
          forceReRender();
        }}
        isFetchingKeyPair={isFetchingKeyPair}
      />
    </div>
  );
};
