import React, { useState } from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import { FormField } from '@atlassian/proforma-common-core/jira-common';

import { ConnectionType } from '../../../models/ConnectionType';
import { DataConnectionMessage } from '../../../stores/DataConnectionMessages.intl';
import { DataConnectionStore } from '../../../stores/DataConnectionStore';
import { RestConnectionDetailsStore } from '../../../stores/RestConnectionDetailsStore';
import {
  DataConnectionsMessage,
  IntlDataConnectionsMessages,
} from '../../DataConnectionsMessages.intl';
import { Footer } from '../Footer';
import { WizardSection } from '../styled';

import {
  ConnectionDetailsMessage,
  IntlConnectionDetailsMessages,
} from './ConnectionDetailsMessages.intl';
import { RestApiSettings } from './RestApiSettings';

interface ConnectionDetailsProps {
  dataConnectionStore: DataConnectionStore;
  previousWizardStep: () => void;
  nextWizardStep: () => void;
}

export const ConnectionDetails = observer(
  ({
    dataConnectionStore,
    previousWizardStep,
    nextWizardStep,
  }: ConnectionDetailsProps) => {
    const [isValidating, setIsValidating] = useState(false);

    let connectionNameValidationError: JSX.Element | undefined;
    const connectionName = dataConnectionStore.name;
    if (!connectionName || connectionName.trim().length < 1) {
      connectionNameValidationError = (
        <FormattedMessage
          {...IntlConnectionDetailsMessages[
            ConnectionDetailsMessage.RequiredField
          ]}
        />
      );
    }

    let connectionUrlValidationError: DataConnectionMessage | undefined;
    if (
      dataConnectionStore.detailsStore instanceof RestConnectionDetailsStore
    ) {
      connectionUrlValidationError = dataConnectionStore.detailsStore.validateUrl();
    }

    const validate = (): boolean => {
      if (!connectionNameValidationError && !connectionUrlValidationError) {
        setIsValidating(false);
        return true;
      } else {
        setIsValidating(true);
        return false;
      }
    };

    return (
      <>
        <WizardSection>
          <p>
            <FormattedMessage
              {...IntlConnectionDetailsMessages[ConnectionDetailsMessage.Para1]}
            />
          </p>
          <form>
            <NameField
              dataConnectionStore={dataConnectionStore}
              error={isValidating ? connectionNameValidationError : undefined}
            />
            <ConnectionTypeField dataConnectionStore={dataConnectionStore} />
            {dataConnectionStore.detailsStore instanceof
              RestConnectionDetailsStore && (
              <RestApiSettings store={dataConnectionStore.detailsStore} />
            )}
          </form>
        </WizardSection>
        <Footer
          previousWizardStep={previousWizardStep}
          nextWizardStep={() => {
            if (!validate()) {
              return;
            }
            nextWizardStep();
          }}
        />
      </>
    );
  },
);

const NameField = injectIntl(
  observer(
    ({
      dataConnectionStore,
      error,
      intl,
    }: {
      dataConnectionStore: DataConnectionStore;
      error?: JSX.Element;
    } & InjectedIntlProps) => {
      return (
        <FormField
          label={
            <FormattedMessage
              {...IntlConnectionDetailsMessages[
                ConnectionDetailsMessage.NameLabel
              ]}
            />
          }
          info={
            <FormattedMessage
              {...IntlConnectionDetailsMessages[
                ConnectionDetailsMessage.NameInfo
              ]}
            />
          }
          error={error}
          required
        >
          <TextField
            placeholder={intl.formatMessage(
              IntlConnectionDetailsMessages[
                ConnectionDetailsMessage.NamePlaceholder
              ],
            )}
            value={dataConnectionStore.name}
            isInvalid={!!error}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dataConnectionStore.updateName(e.target.value)
            }
          />
        </FormField>
      );
    },
  ),
);

const ConnectionTypeField = injectIntl(
  observer(
    ({
      dataConnectionStore,
      intl,
    }: { dataConnectionStore: DataConnectionStore } & InjectedIntlProps) => {
      const options = [
        {
          label: intl.formatMessage(
            IntlDataConnectionsMessages[
              DataConnectionsMessage.TypeOptionRestApiLabel
            ],
          ),
          value: ConnectionType.RestApi,
        },
      ];
      const selected = options.find(o => o.value === dataConnectionStore.type);

      return (
        <FormField
          label={
            <FormattedMessage
              {...IntlConnectionDetailsMessages[
                ConnectionDetailsMessage.TypeLabel
              ]}
            />
          }
        >
          <Select
            placeholder={intl.formatMessage(
              IntlConnectionDetailsMessages[
                ConnectionDetailsMessage.TypePlaceholder
              ],
            )}
            value={selected}
            onChange={selection =>
              dataConnectionStore.updateConnectionType((selection as any).value)
            }
            options={options}
            isDisabled
          />
        </FormField>
      );
    },
  ),
);
