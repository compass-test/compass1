import React from 'react';

import Button from '@atlaskit/button';

import SshKeysLogo from './assets/SshKeysLogo';
import { SplashScreenButtons, SplashScreenWrapper } from './styled';

type Props = {
  generateKeyPair: () => void;
  showAddKeyView: () => void;
};

const SplashScreen: React.FC<Props> = ({ generateKeyPair, showAddKeyView }) => {
  return (
    <SplashScreenWrapper>
      <SshKeysLogo />
      <h3>SSH keys for Pipelines</h3>
      <p>
        Generate SSH keys or add your own keys into Pipelines. If you already
        have a key in your Docker container you don’t need to do anything here –
        we’ll just use that.
      </p>
      <SplashScreenButtons>
        <Button
          id="generate-keys"
          appearance="primary"
          onClick={generateKeyPair}
        >
          Generate keys
        </Button>
        <Button id="add-keys" appearance="subtle" onClick={showAddKeyView}>
          Use my own keys
        </Button>
      </SplashScreenButtons>
    </SplashScreenWrapper>
  );
};

export default React.memo(SplashScreen);
