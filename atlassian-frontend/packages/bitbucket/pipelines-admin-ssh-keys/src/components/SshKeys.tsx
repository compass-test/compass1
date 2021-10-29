import React, { useCallback, useState } from 'react';

import Spinner from '@atlaskit/spinner';
import { KeyPair } from '@atlassian/pipelines-models';

import AddKey from './AddKey';
import SplashScreen from './SplashScreen';
import { Loading, SshKeysWrapper } from './styled';
import ViewKey from './ViewKey';

type Props = {
  keyPair: KeyPair;
  createKeyPair: (data: { private_key: string; public_key: string }) => void;
  deleteKeyPair: () => void;
  generateKeyPair: () => void;
  isFetchingKeyPair: boolean;
};

const SshKeys: React.FC<Props> = ({
  keyPair,
  createKeyPair,
  deleteKeyPair,
  generateKeyPair,
  isFetchingKeyPair,
}) => {
  const [isShowingAddKey, setIsShowingAddKey] = useState(false);

  const deleteKeyPairAndResetScreen = useCallback(() => {
    deleteKeyPair();
    setIsShowingAddKey(false);
  }, [deleteKeyPair, setIsShowingAddKey]);

  return (
    <SshKeysWrapper data-testid="pipelines-ssh-keys">
      <h4>SSH key</h4>
      {isFetchingKeyPair && (
        <Loading>
          <Spinner size="medium" />
        </Loading>
      )}
      {!isFetchingKeyPair && !keyPair.public_key && isShowingAddKey && (
        <AddKey
          createKeyPair={createKeyPair}
          cancelAddKeyView={() => setIsShowingAddKey(false)}
        />
      )}
      {!isFetchingKeyPair && !keyPair.public_key && !isShowingAddKey && (
        <SplashScreen
          generateKeyPair={generateKeyPair}
          showAddKeyView={() => setIsShowingAddKey(true)}
        />
      )}
      {!isFetchingKeyPair && keyPair.public_key && (
        <ViewKey keyPair={keyPair} onRemoveKey={deleteKeyPairAndResetScreen} />
      )}
    </SshKeysWrapper>
  );
};

export default React.memo(SshKeys);
