import React from 'react';

import { forceReRender } from '@storybook/react';

import { KnownHost, PublicKey } from '@atlassian/pipelines-models';

import { KnownHosts } from '../src';

let publicKey = new PublicKey();
let knownHosts = [] as KnownHost[];
let isFetchingKnownHosts = true;
let isFetchingPublicKey = false;

export default () => {
  setTimeout(() => {
    isFetchingKnownHosts = false;
    forceReRender();
  }, 1000);
  return (
    <div style={{ width: '880px' }} data-testid="ssh-keys">
      <KnownHosts
        knownHosts={knownHosts}
        publicKey={publicKey}
        createKnownHost={(knownHost: {
          hostname: string;
          public_key: PublicKey;
        }) => {
          knownHosts.push(
            new KnownHost({
              ...knownHost,
              uuid: `${knownHost.hostname}_${knownHosts.length}`,
              error:
                knownHost.hostname === 'adderror'
                  ? { message: 'error' }
                  : undefined,
            }),
          );
          forceReRender();
        }}
        deleteKnownHost={(knownHost, index) => {
          knownHosts.splice(index);
          forceReRender();
        }}
        getPublicKey={(hostname: string) => {
          isFetchingPublicKey = true;
          forceReRender();
          setTimeout(() => {
            publicKey =
              hostname === 'error'
                ? new PublicKey({
                    error: { message: 'error' },
                  })
                : new PublicKey({
                    key: 'foo',
                    md5_fingerprint: 'bar',
                  });
            isFetchingPublicKey = false;
            forceReRender();
          }, 1000);
        }}
        clearPublicKey={() => {
          publicKey = new PublicKey();
          forceReRender();
        }}
        isFetchingKnownHosts={isFetchingKnownHosts}
        isFetchingPublicKey={isFetchingPublicKey}
      />
    </div>
  );
};
