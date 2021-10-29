import React from 'react';

import useClipboard from 'react-use-clipboard';

import Button from '@atlaskit/button';
import FieldBase, { Label } from '@atlaskit/field-base';
import TextArea from '@atlaskit/textarea';
import Tooltip from '@atlaskit/tooltip';
import { KeyPair } from '@atlassian/pipelines-models';

import AuthorizedKeysIcon from './assets/AuthorizedKeysIcon';
import LockIcon from './assets/LockIcon';
import { AuthorizedKeys, Row, ViewKeyButtons, ViewKeyWrapper } from './styled';

type Props = {
  keyPair: KeyPair;
  onRemoveKey: () => void;
};

const ViewKey: React.FC<Props> = ({ keyPair, onRemoveKey }) => {
  const [isCopied, setCopied] = useClipboard(keyPair.public_key, {
    successDuration: 1500,
  });

  return (
    <ViewKeyWrapper>
      <Row>
        <Label label="Private key">
          {
            (
              <FieldBase appearance="standard" isFitContainerWidthEnabled>
                <input disabled type="password" value="*************" />
                <LockIcon />
              </FieldBase>
            ) as any
          }
        </Label>
        <p>
          This private key will be added as a default identity in{' '}
          <strong>~/.ssh/config</strong>.
        </p>
      </Row>
      <Row>
        <Label label="Public key">
          {
            (
              <FieldBase isFitContainerWidthEnabled>
                <TextArea
                  isReadOnly
                  appearance="none"
                  defaultValue={keyPair.public_key}
                />
              </FieldBase>
            ) as any
          }
        </Label>
        <p>
          Copy this public key to <strong>~/.ssh/authorized_keys</strong> on the
          remote host.
          <br />
          <AuthorizedKeys>
            <AuthorizedKeysIcon />
            ~/.ssh/authorized_keys
          </AuthorizedKeys>
        </p>
      </Row>
      <ViewKeyButtons>
        <Tooltip
          position="right"
          content={isCopied ? 'Copied to clipboard!' : ''}
        >
          <Button onClick={setCopied}>Copy public key</Button>
        </Tooltip>
        <Button id="delete-keys" appearance="subtle" onClick={onRemoveKey}>
          Delete key pair
        </Button>
      </ViewKeyButtons>
    </ViewKeyWrapper>
  );
};

export default React.memo(ViewKey);
