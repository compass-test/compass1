import React, { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import FieldBase from '@atlaskit/field-base';
import Form, { ErrorMessage, Field } from '@atlaskit/form';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Input from '@atlaskit/input';
import Spinner from '@atlaskit/spinner';
import TextField from '@atlaskit/textfield';
import { KnownHost, PublicKey } from '@atlassian/pipelines-models';

import { DOCS_KNOWN_HOSTS } from '../const';

import { ClearForm, KnownHostsWrapper, Table } from './styled';

type Props = {
  knownHosts: KnownHost[];
  publicKey: PublicKey;
  createKnownHost: (knownHost: {
    hostname: string;
    public_key: PublicKey;
  }) => void;
  deleteKnownHost: (knownHost: KnownHost, knownHostIndex: number) => void;
  getPublicKey: (hostname: string) => void;
  clearPublicKey: () => void;
  isFetchingKnownHosts: boolean;
  isFetchingPublicKey: boolean;
};

const KnownHosts: React.FC<Props> = ({
  knownHosts,
  publicKey,
  createKnownHost,
  deleteKnownHost,
  getPublicKey,
  clearPublicKey,
  isFetchingKnownHosts,
  isFetchingPublicKey,
}) => {
  const [hostname, setHostname] = useState('');

  const hasPublicKey = useMemo(
    () => (publicKey.key && publicKey.md5_fingerprint ? true : false),
    [publicKey],
  );

  const onClearForm = useCallback(() => {
    clearPublicKey();
    setHostname('');
  }, [setHostname, clearPublicKey]);

  const onAddHost = useCallback(
    ({ hostname }: { hostname: string }) => {
      createKnownHost({
        hostname,
        public_key: publicKey,
      });
      onClearForm();
    },
    [createKnownHost, onClearForm, publicKey],
  );

  const onFetchFingerprint = useCallback(
    ({ hostname }: { hostname: string }) => getPublicKey(hostname),
    [getPublicKey],
  );

  return (
    <KnownHostsWrapper data-testid="pipelines-known-hosts">
      <h4>Known hosts</h4>
      <p>
        Add a host address below, then click <b>Fetch</b> to the see the host's
        fingerprint. Read about{' '}
        <Button
          href={DOCS_KNOWN_HOSTS}
          spacing="none"
          appearance="link"
          target="_blank"
          onClick={(e, analyticEvent) => {
            analyticEvent
              .update({
                actionSubjectId: 'knownHostsDocumentationLink',
                source: 'pipelinesSshKeysScreen',
              })
              .fire();
          }}
        >
          known hosts for Pipelines
        </Button>
        .
      </p>
      <Form onSubmit={hasPublicKey ? onAddHost : onFetchFingerprint}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field
              isRequired
              name="hostname"
              defaultValue={hostname}
              transform={(event: any) => {
                setHostname(event.currentTarget.value);
                return event.currentTarget.value;
              }}
            >
              {({ fieldProps }: any) => (
                <>
                  <TextField
                    placeholder="Host address"
                    isReadOnly={isFetchingPublicKey || hasPublicKey}
                    {...fieldProps}
                  />
                  {hasPublicKey && (
                    <ClearForm>
                      <Button
                        appearance="subtle"
                        iconBefore={<CrossIcon label="Clear host" />}
                        onClick={onClearForm}
                      />
                    </ClearForm>
                  )}
                </>
              )}
            </Field>
            <FieldBase
              appearance="standard"
              isFitContainerWidthEnabled
              isLoading={isFetchingPublicKey}
            >
              <Input
                value={
                  hasPublicKey
                    ? publicKey.md5_fingerprint.replace('md5:', '')
                    : ''
                }
                name="fingerprint"
                placeholder={
                  isFetchingPublicKey
                    ? 'Fetching Fingerprint...'
                    : 'Click ‘Fetch’ to see the host’s fingerprint'
                }
                disabled
                isEditing
              />
            </FieldBase>
            {publicKey.key ? (
              <Button
                type="submit"
                appearance="primary"
                isDisabled={isFetchingPublicKey}
              >
                Add host
              </Button>
            ) : (
              <Button type="submit" isDisabled={isFetchingPublicKey}>
                Fetch
              </Button>
            )}
          </form>
        )}
      </Form>
      {publicKey.error ? (
        <ErrorMessage>
          Unable to fetch fingerprints, check host SSH connection and try again
        </ErrorMessage>
      ) : null}
      {knownHosts.filter((host) => host.error).length ? (
        <ErrorMessage>Failed to add known host</ErrorMessage>
      ) : null}
      <Table>
        <thead>
          <tr>
            <th>Host address</th>
            <th>Fingerprint</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {knownHosts.length > 0 &&
            knownHosts.map((knownHost: KnownHost, key: number) => (
              <tr key={key}>
                <td>{knownHost.hostname}</td>
                <td>
                  {knownHost.public_key.md5_fingerprint.replace('md5:', '')}
                </td>
                <td>
                  {knownHost.uuid && (
                    <Button
                      appearance="subtle"
                      iconAfter={<CrossIcon label="Remove" />}
                      onClick={() => deleteKnownHost(knownHost, key)}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          {(!knownHosts.length || isFetchingKnownHosts) && (
            <tr>
              <td colSpan={3}>
                {isFetchingKnownHosts ? (
                  <Spinner size="small" />
                ) : (
                  <p>You haven’t added a host yet</p>
                )}
              </td>
            </tr>
          )}
        </tfoot>
      </Table>
    </KnownHostsWrapper>
  );
};

export default React.memo(KnownHosts);
